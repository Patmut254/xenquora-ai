import Layout from "../components/Layout";
import { AlertTriangle, CheckCircle, AlertOctagon, TrendingUp, Activity, Clock } from "lucide-react";

const risks = [
  {
    title: "Supply Chain Volatility",
    level: "Moderate",
    category: "Operational",
    score: 62,
    detail: "Two logistics hubs experiencing elevated latency. East African routes showing +8% delay. AI monitoring active.",
    updated: "3 min ago",
    trend: "stable"
  },
  {
    title: "Cloud Infrastructure Pressure",
    level: "Low",
    category: "Technical",
    score: 28,
    detail: "Compute utilization at 71%. No degradation detected. Auto-scaling policies engaged for peak windows.",
    updated: "12 min ago",
    trend: "improving"
  },
  {
    title: "Operational Expansion Risk",
    level: "Moderate",
    category: "Strategic",
    score: 54,
    detail: "Rapid onboarding pace in Q3 may outpace support capacity. Recommend hiring review in next 30 days.",
    updated: "1h ago",
    trend: "rising"
  },
  {
    title: "Market Concentration Risk",
    level: "Low",
    category: "Financial",
    score: 33,
    detail: "Top 3 clients represent 41% of revenue. Diversification strategy performing well — risk declining.",
    updated: "4h ago",
    trend: "improving"
  },
  {
    title: "Regulatory Compliance",
    level: "Clear",
    category: "Legal",
    score: 8,
    detail: "All enterprise data policies in compliance. Last audit: 100% pass rate. No new regulations flagged.",
    updated: "1d ago",
    trend: "stable"
  },
];

const levelConfig = {
  High: { color: '#F87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', icon: AlertOctagon },
  Moderate: { color: '#FBBF24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', icon: AlertTriangle },
  Low: { color: '#60A5FA', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', icon: Activity },
  Clear: { color: '#34D399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', icon: CheckCircle },
};

const trendConfig = {
  rising: { icon: TrendingUp, color: '#F87171', label: 'Rising' },
  stable: { icon: Activity, color: '#FBBF24', label: 'Stable' },
  improving: { icon: TrendingUp, color: '#34D399', label: 'Improving' },
};

export default function Risks() {
  const totalScore = Math.round(risks.reduce((a, r) => a + r.score, 0) / risks.length);

  return (
    <Layout title="Risk Monitor" subtitle="Enterprise threat intelligence — AI-powered risk detection and scoring">
      {/* Overview bar */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Overall Risk Score', value: `${totalScore}/100`, color: '#FBBF24' },
          { label: 'Active Threats', value: '0 Critical', color: '#34D399' },
          { label: 'Monitoring Coverage', value: '100%', color: '#60A5FA' },
          { label: 'Last Scan', value: '2 min ago', color: '#A78BFA' },
        ].map((item, i) => (
          <div key={i} className="glass rounded-2xl p-4" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: item.color, letterSpacing: '-0.02em' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Risk cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {risks.map((risk, i) => {
          const cfg = levelConfig[risk.level] || levelConfig.Low;
          const Icon = cfg.icon;
          const tCfg = trendConfig[risk.trend];
          const TIcon = tCfg.icon;

          return (
            <div key={i} className="glass rounded-2xl p-5 hover:scale-[1.005] transition-all duration-200" style={{ border: `1px solid ${cfg.border}`, background: cfg.bg }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Score gauge */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', border: `3px solid ${cfg.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${cfg.color}08` }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px', color: cfg.color }}>{risk.score}</span>
                  </div>
                  <span style={{ fontSize: '9px', color: '#4B5563', fontFamily: 'JetBrains Mono, monospace' }}>SCORE</span>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon size={16} color={cfg.color} />
                      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: 0, color: 'white' }}>{risk.title}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 20 }}>{risk.category}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: cfg.color, background: `${cfg.color}15`, padding: '3px 10px', borderRadius: 20, fontFamily: 'Syne, sans-serif' }}>{risk.level}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.5, margin: '0 0 10px' }}>{risk.detail}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '11px', color: tCfg.color, fontFamily: 'JetBrains Mono, monospace' }}>
                      <TIcon size={11} />
                      <span>{tCfg.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '10px', color: '#4B5563', fontFamily: 'JetBrains Mono, monospace' }}>
                      <Clock size={10} />
                      <span>Updated {risk.updated}</span>
                    </div>
                  </div>
                  {/* Score bar */}
                  <div style={{ marginTop: 10, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${risk.score}%`, background: `linear-gradient(90deg, ${cfg.color}80, ${cfg.color})`, borderRadius: 2, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
