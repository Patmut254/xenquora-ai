import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold">Enterprise Overview</h2>

        <p className="text-gray-400 mt-1">Realtime operational monitoring</p>
      </div>

      <button className="relative p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
        <Bell />

        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-500" />
      </button>
    </div>
  );
}
