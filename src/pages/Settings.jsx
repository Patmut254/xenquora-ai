import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Save, Key, Palette, Bell, Shield, Globe, CheckCircle } from "lucide-react";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");
  const [claudeKey, setClaudeKey] = useState("");
  const [orgName, setOrgName] = useState("Xenquora Enterprise");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("xenq_theme") || "dark");

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    const themes = {
      dark: { bg: "#050816", gradient1: "rgba(139,92,246,0.08)", gradient2: "rgba(59,130,246,0.06)" },
      midnight: { bg: "#000008", gradient1: "rgba(99,60,220,0.12)", gradient2: "rgba(30,80,200,0.09)" },
    };
    const t = themes[theme] || themes.dark;
    document.body.style.background = t.bg;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("xenq_theme", theme);
  }, [theme]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Layout title="Settings" subtitle="Configure your enterprise platform and AI integrations">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left: form sections */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          {/* Organization */}
          <div className="glass neon rounded-2xl p-6">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Globe size={16} color="#8B5CF6" />
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: 0 }}>Organization</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="form-label">Organization Name</label>
                <input className="xenq-input" value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="Your company name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Industry</label>
                  <select className="xenq-input" style={{ cursor: 'pointer' }}>
                    <option value="">Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Logistics</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Region</label>
                  <select className="xenq-input" style={{ cursor: 'pointer' }}>
                    <option>East Africa</option>
                    <option>West Africa</option>
                    <option>Europe</option>
                    <option>North America</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className="glass neon rounded-2xl p-6">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Key size={16} color="#8B5CF6" />
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: 0 }}>AI API Keys</h2>
            </div>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 20px', lineHeight: 1.5 }}>Keys are stored in your environment. For demo mode, these are pre-configured.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="form-label">Gemini AI API Key</label>
                <input className="xenq-input" type="password" value={geminiKey} onChange={e => setGeminiKey(e.target.value)} placeholder="AIza••••••••••••••••••••••••••••••••••••••" />
                <div style={{ fontSize: '11px', color: '#4B5563', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>Get your key → console.cloud.google.com</div>
              </div>
              <div>
                <label className="form-label">Claude (Anthropic) API Key</label>
                <input className="xenq-input" type="password" value={claudeKey} onChange={e => setClaudeKey(e.target.value)} placeholder="sk-ant-••••••••••••••••••••••••••••••••••••" />
                <div style={{ fontSize: '11px', color: '#4B5563', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>Get your key → console.anthropic.com</div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass neon rounded-2xl p-6">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Palette size={16} color="#8B5CF6" />
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: 700, margin: 0 }}>Preferences</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '13px' }}>Real-time Notifications</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: 2 }}>AI alerts and system updates</div>
                </div>
                <button onClick={() => setNotifications(!notifications)} style={{
                  width: 44, height: 24, borderRadius: 12, background: notifications ? 'linear-gradient(90deg, #7C3AED, #3B82F6)' : 'rgba(255,255,255,0.1)',
                  border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s'
                }}>
                  <div style={{ position: 'absolute', top: 3, left: notifications ? 22 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
                </button>
              </div>
              <div>
                <label className="form-label">Interface Theme</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {["dark", "midnight"].map(t => (
                    <button key={t} onClick={() => setTheme(t)} style={{
                      flex: 1, padding: '10px', borderRadius: 10, border: theme === t ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.06)',
                      background: theme === t ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer', fontSize: '12px', fontFamily: 'Syne, sans-serif', fontWeight: 600,
                      color: theme === t ? '#A78BFA' : '#6B7280', textTransform: 'capitalize', transition: 'all 0.2s'
                    }}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {saved ? <><CheckCircle size={15} /><span>Saved!</span></> : <><Save size={15} /><span>Save Changes</span></>}
          </button>
        </div>

        {/* Right: info cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: Shield, color: '#34D399', label: 'Security Status', value: '🔒 Enterprise Grade', desc: 'AES-256 encryption · SOC 2 compliant' },
            { icon: Bell, color: '#FBBF24', label: 'Plan', value: '⚡ Hackathon Demo', desc: 'Full AI features enabled' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="glass rounded-2xl p-5" style={{ border: `1px solid ${item.color}20` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Icon size={14} color={item.color} />
                  <span style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'Syne, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'white', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{item.desc}</div>
              </div>
            );
          })}

          <div className="glass rounded-2xl p-5" style={{ border: '1px solid rgba(139,92,246,0.15)', background: 'rgba(139,92,246,0.05)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'Syne, sans-serif', marginBottom: 8 }}>How to Demo</div>
            <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.7 }}>
              1. Click <b style={{ color: '#A78BFA' }}>Dashboard</b> — show metrics<br/>
              2. Click <b style={{ color: '#A78BFA' }}>AI Assistant</b> — chat with AI<br/>
              3. Click <b style={{ color: '#A78BFA' }}>Risk Monitor</b> — show threats<br/>
              4. Click <b style={{ color: '#A78BFA' }}>Analytics</b> — show charts
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
