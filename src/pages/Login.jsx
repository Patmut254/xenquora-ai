import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate("/");
    setLoading(false);
  };

  const handleDemo = () => {
    navigate("/");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 1 }}>
      {/* Decorative orbs */}
      <div style={{ position: 'fixed', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '20%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              <Zap size={22} color="white" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #A78BFA, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Xenquora AI</span>
          </div>
          <p style={{ color: '#4B5563', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', margin: 0 }}>Enterprise Intelligence Platform</p>
        </div>

        <div className="glass neon rounded-2xl p-8" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Top accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)' }} />

          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', margin: '0 0 4px' }}>Welcome back</h2>
          <p style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 28px' }}>Sign in to your enterprise workspace</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="form-label">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} color="#4B5563" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  placeholder="admin@company.com"
                  className="xenq-input"
                  style={{ paddingLeft: 38 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#4B5563" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="xenq-input"
                  style={{ paddingLeft: 38, paddingRight: 42 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', padding: 0 }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: '12px', color: '#F87171' }}>{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
              {loading ? "Authenticating..." : <><span>Sign In</span><ArrowRight size={14} /></>}
            </button>

            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', position: 'absolute', top: '50%', left: 0, right: 0 }} />
              <span style={{ position: 'relative', background: 'transparent', padding: '0 12px', fontSize: '11px', color: '#4B5563', fontFamily: 'JetBrains Mono, monospace' }}>or</span>
            </div>

            <button type="button" onClick={handleDemo} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Zap size={13} />
              <span>Enter Demo Mode</span>
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#374151', margin: '20px 0 0', fontFamily: 'JetBrains Mono, monospace' }}>
            Demo: use any email + password to continue
          </p>
        </div>
      </div>
    </div>
  );
}
