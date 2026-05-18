import Layout from "../components/Layout";

export default function Workspace() {
  return (
    <Layout
      title="Organization Workspace"
      subtitle="Enterprise collaboration and operational environments."
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="glass neon rounded-3xl p-6">Marketing Workspace</div>

        <div className="glass neon rounded-3xl p-6">Operations Workspace</div>

        <div className="glass neon rounded-3xl p-6">
          AI Intelligence Workspace
        </div>
      </div>
    </Layout>
  );
}
