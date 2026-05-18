import Sidebar from "./Sidebar";

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen p-4 lg:p-5" style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex flex-col lg:flex-row gap-4 max-w-[1600px] mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="pulse-dot" style={{ color: '#8B5CF6', background: '#8B5CF6' }}></span>
              <span className="font-mono" style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Xenquora AI · Enterprise Intelligence
              </span>
            </div>
            <h1 style={{ fontSize: '28px', fontFamily: 'Syne, sans-serif', fontWeight: 800, margin: '4px 0 6px', letterSpacing: '-0.02em' }}>{title}</h1>
            <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>{subtitle}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
