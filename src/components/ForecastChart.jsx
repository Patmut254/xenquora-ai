/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, LineChart, Line, BarChart, Bar
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 420, forecast: 380, expenses: 210 },
  { month: "Feb", revenue: 540, forecast: 490, expenses: 260 },
  { month: "Mar", revenue: 670, forecast: 600, expenses: 290 },
  { month: "Apr", revenue: 610, forecast: 650, expenses: 280 },
  { month: "May", revenue: 790, forecast: 720, expenses: 310 },
  { month: "Jun", revenue: 920, forecast: 860, expenses: 350 },
  { month: "Jul", revenue: 1050, forecast: 980, expenses: 390 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(5,8,22,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 10, padding: '10px 14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#A78BFA', fontFamily: 'Syne, sans-serif', marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', marginBottom: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
            <span style={{ color: '#9CA3AF', fontFamily: 'JetBrains Mono, monospace' }}>{p.name}: </span>
            <span style={{ color: 'white', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>${p.value}K</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ForecastChart() {
  const [view, setView] = useState("area");

  return (
    <div className="glass neon rounded-2xl p-5 w-full min-w-0 overflow-hidden">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, margin: '0 0 2px' }}>Revenue Forecasting</h2>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>AI-projected vs actual performance</p>
        </div>
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4 }}>
          {["area", "bar"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 600, textTransform: 'capitalize',
              background: view === v ? 'rgba(139,92,246,0.2)' : 'transparent',
              color: view === v ? '#A78BFA' : '#6B7280',
              transition: 'all 0.2s'
            }}>{v}</button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          {view === "area" ? (
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="#374151" tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 3" fill="url(#gradForecast)" />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#gradRevenue)" />
            </AreaChart>
          ) : (
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#374151" tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="#374151" tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'JetBrains Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill="#8B5CF6" fillOpacity={0.8} radius={[4,4,0,0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#3B82F6" fillOpacity={0.6} radius={[4,4,0,0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
