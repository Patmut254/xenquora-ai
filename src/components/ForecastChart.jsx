import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", value: 420 },
  { month: "Feb", value: 540 },
  { month: "Mar", value: 670 },
  { month: "Apr", value: 610 },
  { month: "May", value: 790 },
  { month: "Jun", value: 920 },
];

export default function ForecastChart() {
  return (
    <div className="glass neon rounded-3xl p-6 w-full min-w-0 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Trend Forecasting</h2>

        <p className="text-gray-400 mt-2 text-sm">
          AI projected operational performance
        </p>
      </div>

      {/* CRITICAL FIX */}
      <div
        className="w-full min-w-0"
        style={{
          height: "400px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />

                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

            <XAxis dataKey="month" stroke="#9CA3AF" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorForecast)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
