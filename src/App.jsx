import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Analytics from "./pages/Analytics";

import Assistant from "./pages/Assistant";

import Risks from "./pages/Risks";

import Settings from "./pages/Settings";

import Teams from "./pages/Teams";

import Reports from "./pages/Reports";

import Workspace from "./pages/Workspace";

import AuditLogs from "./pages/AuditLogs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/analytics" element={<Analytics />} />

      <Route path="/assistant" element={<Assistant />} />

      <Route path="/risks" element={<Risks />} />

      <Route path="/settings" element={<Settings />} />

      <Route path="/teams" element={<Teams />} />

      <Route path="/reports" element={<Reports />} />

      <Route path="/workspace" element={<Workspace />} />

      <Route path="/audit-logs" element={<AuditLogs />} />
    </Routes>
  );
}
