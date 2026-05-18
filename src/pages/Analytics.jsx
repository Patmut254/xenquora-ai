import { useEffect, useState, useCallback, useMemo } from "react";
import Layout from "../components/Layout";
import ForecastChart from "../components/ForecastChart";
import { supabase } from "../lib/supabase";
import { useNotifications } from "../context/NotificationContext";
import { BarChart2, TrendingUp, DollarSign, Percent, Filter } from "lucide-react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, AreaChart, Area, XAxis, Tooltip } from "recharts";

const performanceData = [
  { subject: 'Revenue', A: 87 }, { subject: 'Efficiency', A: 91 },
  { subject: 'Growth', A: 78 }, { subject: 'Customer Sat', A: 94 },
  { subject: 'Risk Score', A: 82 }, { subject: 'Innovation', A: 70 },
];

const weeklyData = [
  { day: 'Mon', value: 1200 }, { day: 'Tue', value: 1890 },
  { day: 'Wed', value: 1400 }, { day: 'Thu', value: 2200 },
  { day: 'Fri', value: 1800 }, { day: 'Sat', value: 900 }, { day: 'Sun', value: 700 },
];

export default function Analytics() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { addNotification } = useNotifications();

  const fetchMetrics = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("metrics").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      // Supabase not configured - use sample data
      setMetrics([
        { id: 1, label: 'Q1 Revenue', revenue: 4200, category: 'finance' },
        { id: 2, label: 'Q2 Revenue', revenue: 5800, category: 'finance' },
        { id: 3, label: 'Q3 Revenue', revenue: 7200, category: 'finance' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  useEffect(() => {
    const channel = supabase.channel("analytics")
      .on("postgres_changes", { event: "*", schema: "public", table: "metrics" }, async () => {
        await fetchMetrics();
      })
      .subscribe((status) => { console.log("Realtime status:", status); });
    return () => { supabase.removeChannel(channel); };
  }, [fetchMetrics]);

  const filteredMetrics = useMemo(() => {
    return metrics.filter(m => {
      if (filter === "high") return m.revenue > 5000;
      if (filter === "low") return m.revenue <= 5000;
      return true;
    });
  }, [metrics, filter]);

  return (
    <Layout title="Analytics Center" subtitle="Real-time enterprise forecasting and operational intelligence">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Revenue', value: '$2.4M', icon: DollarSign, change: '+18.2%', up: true },
          { label: 'Growth Rate', value: '24.8%', icon: TrendingUp, change: '+4.1pp', up: true },
          { label: 'Avg Deal Size', value: '$48K', icon: BarChart2, change: '+7.3%', up: true },
          { label: 'Conversion Rate', value: '32%', icon: Percent, change: '+2.1%', up: true },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="glass neon rounded-2xl p-4 relative overflow-hidden">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
                <Icon size={13} color="#8B5CF6" />
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', color: 'white', letterSpacing: '-0.03em', marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: '11px', color: '#34D399', fontFamily: 'JetBrains Mono, monospace' }}>{item.change} vs last quarter</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <ForecastChart />
        </div>
        <div className="glass neon rounded-2xl p-5">
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>Performance Radar</h3>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 16px' }}>Enterprise score vs targets</p>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
                <Radar name="Score" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly + Metrics table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="glass neon rounded-2xl p-5">
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>Weekly Activity</h3>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 16px' }}>Daily query & transaction volume</p>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#374151" tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
                <Tooltip contentStyle={{ background: 'rgba(5,8,22,0.95)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#wGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass neon rounded-2xl p-5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: 0 }}>Metrics Feed</h3>
            <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
              {["all", "high", "low"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 600, textTransform: 'capitalize',
                  background: filter === f ? 'rgba(139,92,246,0.2)' : 'transparent',
                  color: filter === f ? '#A78BFA' : '#6B7280',
                }}>{f}</button>
              ))}
            </div>
          </div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[1,2,3].map(i => <div key={i} className="shimmer" style={{ height: 40, borderRadius: 10 }} />)}
            </div>
          ) : filteredMetrics.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#4B5563', fontSize: '13px' }}>No metrics data from backend.<br/>Connect Supabase to see live data.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {filteredMetrics.slice(0, 6).map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '13px', color: '#D1D5DB' }}>{m.label || `Metric ${m.id}`}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', fontWeight: 700, color: m.revenue > 5000 ? '#34D399' : '#60A5FA' }}>${m.revenue?.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
