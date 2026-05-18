import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BarChart3,
  ShieldAlert,
  Bot,
  Settings,
} from "lucide-react";

const links = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    path: "/risks",
    label: "Risk Monitor",
    icon: ShieldAlert,
  },
  {
    path: "/assistant",
    label: "AI Assistant",
    icon: Bot,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="glass neon w-full lg:w-72 p-6 rounded-3xl lg:h-[95vh]">
      <div className="mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Xenquora AI
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Enterprise Intelligence Platform
        </p>
      </div>

      <div className="space-y-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-4 rounded-2xl transition ${
                  isActive
                    ? "bg-purple-500/20 border border-purple-500/20"
                    : "bg-white/5 hover:bg-white/10"
                }`
              }
            >
              <Icon className="text-purple-400" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
