import Layout from "../components/Layout";

const risks = [
  {
    title: "Supply Chain Volatility",
    level: "Moderate",
  },
  {
    title: "Cloud Infrastructure Pressure",
    level: "Low",
  },
  {
    title: "Operational Expansion Risk",
    level: "Moderate",
  },
];

export default function Risks() {
  return (
    <Layout
      title="Risk Monitoring"
      subtitle="Enterprise threat intelligence and monitoring."
    >
      <div className="space-y-6">
        {risks.map((risk, index) => (
          <div key={index} className="glass neon rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{risk.title}</h2>

                <p className="text-gray-400 mt-3">
                  AI risk detection monitoring active.
                </p>
              </div>

              <div className="px-5 py-2 rounded-full bg-yellow-500/20 text-yellow-300">
                {risk.level}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
