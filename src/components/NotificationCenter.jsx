export default function NotificationCenter() {
  const notifications = [
    "AI anomaly detected in logistics chain.",
    "Quarterly revenue forecast updated.",
    "Infrastructure utilization exceeded 84%.",
  ];

  return (
    <div className="glass neon rounded-3xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div key={index} className="bg-white/5 rounded-2xl p-4">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
