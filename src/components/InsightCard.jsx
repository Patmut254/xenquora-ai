export default function InsightCard({ title, content }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="text-gray-400 mt-3 text-sm leading-7">{content}</p>
    </div>
  );
}
