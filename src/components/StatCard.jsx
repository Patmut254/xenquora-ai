export default function StatCard({ title, value, description }) {
  return (
    <div className="glass neon rounded-3xl p-6 transition hover:scale-[1.02]">
      <p className="text-gray-400">{title}</p>

      <h2 className="text-4xl font-bold mt-3">{value}</h2>

      <p className="text-sm text-gray-400 mt-4">{description}</p>
    </div>
  );
}
