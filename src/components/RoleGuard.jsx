export default function RoleGuard({ role, allowedRoles, children }) {
  if (!allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-2xl">
        Access Denied
      </div>
    );
  }

  return children;
}
