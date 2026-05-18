import Layout from "../components/Layout";

const teams = [
  {
    name: "Operations Team",
    members: 18,
  },
  {
    name: "AI Intelligence Unit",
    members: 11,
  },
  {
    name: "Executive Strategy",
    members: 6,
  },
];

export default function Teams() {
  return (
    <Layout
      title="Enterprise Teams"
      subtitle="Cross-functional organizational management."
    >
      <div className="space-y-6">
        {teams.map((team, index) => (
          <div key={index} className="glass neon rounded-3xl p-6">
            <h2 className="text-2xl font-semibold">{team.name}</h2>

            <p className="text-gray-400 mt-3">{team.members} active members</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
