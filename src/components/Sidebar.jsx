import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, ShieldAlert, Bot, Settings, Zap } from "lucide-react";

const links = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, desc: "Overview" },
  { path: "/analytics", label: "Analytics", icon: BarChart3, desc: "Metrics" },
  { path: "/risks", label: "Risk Monitor", icon: ShieldAlert, desc: "Threats" },
  { path: "/assistant", label: "AI Assistant", icon: Bot, desc: "Intelligence" },
  { path: "/settings", label: "Settings", icon: Settings, desc: "Config" },
];

export default function Sidebar() {
  return (
    <aside className="glass neon lg:w-60 xl:w-64 rounded-2xl p-5 lg:h-[calc(100vh-40px)] lg:sticky lg:top-5 flex flex-col" style={{ flexShrink: 0 }}>
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <Zap size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #A78BFA, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Xenquora
          </span>
        </div>
        <p style={{ fontSize: '11px', color: '#4B5563', marginLeft: '40px', fontFamily: 'JetBrains Mono, monospace' }}>Enterprise AI v2.0</p>
      </div>

      {/* System status */}
      <div className="glass rounded-xl p-3 mb-6" style={{ border: '1px solid rgba(16,185,129,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pulse-dot" style={{ color: '#10B981', background: '#10B981', flexShrink: 0 }}></span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#34D399', fontFamily: 'Syne, sans-serif' }}>Systems Operational</div>
            <div style={{ fontSize: '10px', color: '#4B5563', fontFamily: 'JetBrains Mono, monospace' }}>AI Engine · 97.3% uptime</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: '10px', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', fontFamily: 'JetBrains Mono, monospace', paddingLeft: '8px' }}>Navigation</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl transition-all duration-200 ${
                    isActive ? "active-nav" : "inactive-nav"
                  }`
                }
                style={({ isActive }) => ({
                  padding: '10px 12px',
                  background: isActive ? 'rgba(139,92,246,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(139,92,246,0.25)' : '1px solid transparent',
                  textDecoration: 'none',
                  color: isActive ? '#A78BFA' : '#6B7280',
                })}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(139,92,246,0.08)', flexShrink: 0
                }}>
                  <Icon size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontFamily: 'Syne, sans-serif', fontWeight: 600, lineHeight: 1.2 }}>{link.label}</div>
                  <div style={{ fontSize: '10px', opacity: 0.5, fontFamily: 'JetBrains Mono, monospace' }}>{link.desc}</div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User area */}
      <div className="glass rounded-xl p-3 mt-4" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700, color: 'white', flexShrink: 0,
            fontFamily: 'Syne, sans-serif'
          }}>X</div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#E5E7EB', fontFamily: 'Syne, sans-serif' }}>Enterprise Admin</div>
            <div style={{ fontSize: '10px', color: '#4B5563', fontFamily: 'JetBrains Mono, monospace' }}>admin@xenquora.ai</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
