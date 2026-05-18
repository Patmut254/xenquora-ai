import Layout from "../components/Layout";

const logs = [
  {
    action: "User login",
    time: "2 mins ago",
  },

  {
    action: "AI report generated",
    time: "10 mins ago",
  },

  {
    action: "Analytics updated",
    time: "25 mins ago",
  },
];

export default function AuditLogs() {
  return (
    <Layout
      title="Audit Logs"
      subtitle="Enterprise security and activity tracking."
    >
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={index} className="glass neon rounded-2xl p-5">
            <h3 className="font-semibold">{log.action}</h3>

            <p className="text-gray-400 mt-2">{log.time}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
