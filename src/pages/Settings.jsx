import Layout from "../components/Layout";

export default function Settings() {
  return (
    <Layout
      title="Platform Settings"
      subtitle="Manage enterprise integrations and platform controls."
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass neon rounded-3xl p-6">
          <h2 className="text-2xl font-semibold mb-6">AI Integrations</h2>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Gemini AI API</h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Connected successfully
                  </p>
                </div>

                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Claude API</h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Connected successfully
                  </p>
                </div>

                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass neon rounded-3xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Deployment</h2>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="font-semibold">Environment</p>

              <p className="text-gray-400 mt-2">Production</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="font-semibold">Hosting</p>

              <p className="text-gray-400 mt-2">Vercel Cloud Infrastructure</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
