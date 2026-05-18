import { useEffect, useState, useCallback, useMemo } from "react";

import Layout from "../components/Layout";

import ForecastChart from "../components/ForecastChart";

import Topbar from "../components/Topbar";

import { supabase } from "../lib/supabase";

import { ClipLoader } from "react-spinners";

import { useNotifications } from "../context/NotificationContext";

export default function Analytics() {
  const [metrics, setMetrics] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const { addNotification } = useNotifications();

  // Fetch metrics
  const fetchMetrics = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("metrics")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setMetrics(data || []);
    } catch (error) {
      console.error("Supabase Error:", error);

      addNotification("Failed to load analytics data.", "error");
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  // Initial load
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!mounted) return;

      await fetchMetrics();
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetchMetrics]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase

      .channel("analytics")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "metrics",
        },

        async (payload) => {
          console.log("Realtime update:", payload);

          addNotification("Realtime analytics updated.", "success");

          await fetchMetrics();
        },
      )

      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMetrics, addNotification]);

  // Filtered metrics
  const filteredMetrics = useMemo(() => {
    return metrics.filter((metric) => {
      if (filter === "high") {
        return metric.revenue > 5000;
      }

      if (filter === "low") {
        return metric.revenue <= 5000;
      }

      return true;
    });
  }, [metrics, filter]);

  return (
    <Layout
      title="Analytics Center"
      subtitle="Realtime enterprise forecasting and operational intelligence."
    >
      <Topbar />

      <div className="space-y-6">
        {/* Forecast Chart */}
        <ForecastChart />

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {["all", "high", "low"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-3 rounded-2xl border transition ${
                filter === type
                  ? "bg-purple-500/20 border-purple-500/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="glass neon rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Live Enterprise Metrics</h2>

            {loading && <ClipLoader color="#8B5CF6" size={24} />}
          </div>

          {!loading && filteredMetrics.length === 0 && (
            <div className="text-gray-400">No analytics data available.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMetrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
              >
                <h3 className="text-lg font-semibold mb-5">
                  Metric #{metric.id}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>

                    <p className="text-3xl font-bold mt-1">${metric.revenue}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Efficiency</p>

                    <p className="text-3xl font-bold mt-1">
                      {metric.efficiency}%
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Created</p>

                    <p className="text-sm mt-1">
                      {new Date(metric.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="glass neon rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Revenue Intelligence
            </h2>

            <p className="text-gray-400 leading-8">
              AI forecasting models indicate continued enterprise revenue
              expansion across operational regions and strategic verticals.
            </p>
          </div>

          <div className="glass neon rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Operational Signals</h2>

            <p className="text-gray-400 leading-8">
              Realtime infrastructure analysis predicts stable scaling with
              moderate resource optimization requirements next quarter.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
