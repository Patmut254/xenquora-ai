import Sidebar from "./Sidebar";

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <main className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-5xl font-bold">{title}</h1>

            <p className="text-gray-400 mt-3">{subtitle}</p>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
