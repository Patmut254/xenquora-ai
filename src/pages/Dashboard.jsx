import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import ForecastChart from "../components/ForecastChart";
import InsightCard from "../components/InsightCard";
import { TrendingUp, Activity, Brain, ShieldCheck, Users, Globe } from "lucide-react";

const activityFeed = [
  { time: "2m ago", event: "AI analysis completed for Q3 report", status: "success" },
  { time: "8m ago", event: "Risk threshold alert: supply chain", status: "warning" },
  { time: "15m ago", event: "New enterprise client onboarded", status: "success" },
  { time: "1h ago", event: "Automated forecast model updated", status: "info" },
  { time: "2h ago", event: "Security scan completed — no threats", status: "success" },
];

const statusColor = { success: '#34D399', warning: '#FBBF24', info: '#60A5FA' };

export default function Dashboard() {
  return (
    <Layout title="Executive Dashboard" subtitle="Real-time AI-powered enterprise intelligence overview">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        <StatCard title="Revenue Growth" value="+24.8%" description="vs last quarter" trend="up" trendValue="+4.2%" icon={TrendingUp} color="purple" />
        <StatCard title="Operational Efficiency" value="91%" description="Workflows nominal" trend="up" trendValue="+2.1%" icon={Activity} color="blue" />
        <StatCard title="AI Confidence Score" value="97.3%" description="Decision accuracy" trend="up" trendValue="+0.8%" icon={Brain} color="green" />
        <StatCard title="Threat Level" value="LOW" description="No active threats" trend="neutral" icon={ShieldCheck} color="green" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <ForecastChart />
        </div>

        {/* AI Insights Panel */}
        <div className="glass neon rounded-2xl p-5 flex flex-col">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: 0 }}>AI Insights</h2>
            <span className="badge badge-purple">Live</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            <InsightCard type="opportunity" title="East Africa Expansion" content="AI models detected strong B2B market signals across 3 East African economic zones." />
            <InsightCard type="alert" title="Logistics Latency +8%" content="Two hub operations show elevated processing delays — review fulfillment chains." />
            <InsightCard type="recommendation" title="Reallocate Resources" content="Shift 15% of compute to peak-demand regions for 12% efficiency improvement." />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Activity Feed */}
        <div className="xl:col-span-2 glass neon rounded-2xl p-5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: 0 }}>Enterprise Activity</h2>
            <span className="badge badge-blue">Realtime</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {activityFeed.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < activityFeed.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor[item.status], flexShrink: 0, boxShadow: `0 0 6px ${statusColor[item.status]}` }} />
                <div style={{ flex: 1, fontSize: '12px', color: '#D1D5DB' }}>{item.event}</div>
                <div style={{ fontSize: '10px', color: '#4B5563', fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="glass neon rounded-2xl p-5">
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: '0 0 14px' }}>Platform Health</h2>
          {[
            { label: "Active Users", value: "2,847", icon: Users, pct: 78 },
            { label: "Global Nodes", value: "12 regions", icon: Globe, pct: 92 },
            { label: "AI Queries Today", value: "18,432", icon: Brain, pct: 65 },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon size={12} color="#8B5CF6" />
                    <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'Syne, sans-serif' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'white', fontFamily: 'JetBrains Mono, monospace' }}>{item.value}</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: 'linear-gradient(90deg, #7C3AED, #3B82F6)', borderRadius: 2 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
