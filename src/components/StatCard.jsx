import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({ title, value, description, trend, trendValue, icon: Icon, color = "purple" }) {
  const colors = {
    purple: { accent: '#8B5CF6', glow: 'rgba(139,92,246,0.15)', light: '#A78BFA' },
    blue: { accent: '#3B82F6', glow: 'rgba(59,130,246,0.15)', light: '#60A5FA' },
    green: { accent: '#10B981', glow: 'rgba(16,185,129,0.15)', light: '#34D399' },
    amber: { accent: '#F59E0B', glow: 'rgba(245,158,11,0.15)', light: '#FBBF24' },
  };
  const c = colors[color] || colors.purple;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? '#34D399' : trend === 'down' ? '#F87171' : '#9CA3AF';

  return (
    <div className="glass neon rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden" style={{ cursor: 'default' }}>
      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />
      
      {/* Background glow blob */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: c.glow, filter: 'blur(20px)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Syne, sans-serif', margin: 0 }}>{title}</p>
        {Icon && (
          <div style={{ width: 30, height: 30, borderRadius: 8, background: c.glow, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${c.accent}33` }}>
            <Icon size={14} color={c.light} />
          </div>
        )}
      </div>

      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '30px', letterSpacing: '-0.03em', color: 'white', lineHeight: 1, marginBottom: 10 }}>{value}</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '12px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>{description}</p>
        {trendValue && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '11px', fontWeight: 600, color: trendColor, fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>
            <TrendIcon size={12} />
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
}
