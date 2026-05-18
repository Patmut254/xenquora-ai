import { Lightbulb, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const typeConfig = {
  opportunity: { icon: TrendingUp, color: '#34D399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)', label: 'Opportunity' },
  alert: { icon: AlertTriangle, color: '#FBBF24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)', label: 'Alert' },
  recommendation: { icon: CheckCircle, color: '#60A5FA', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.15)', label: 'Action' },
  insight: { icon: Lightbulb, color: '#A78BFA', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.15)', label: 'Insight' },
};

export default function InsightCard({ title, content, type = "insight" }) {
  const cfg = typeConfig[type] || typeConfig.insight;
  const Icon = cfg.icon;

  return (
    <div style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 14,
      padding: '14px 16px',
      transition: 'all 0.2s ease',
    }}
    className="hover:scale-[1.01]"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: `${cfg.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={12} color={cfg.color} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif' }}>{title}</span>
          <span style={{ fontSize: '9px', fontWeight: 700, color: cfg.color, background: `${cfg.color}15`, padding: '2px 7px', borderRadius: 20, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cfg.label}</span>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>{content}</p>
    </div>
  );
}
