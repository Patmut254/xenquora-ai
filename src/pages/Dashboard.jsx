import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import ForecastChart from "../components/ForecastChart";
import InsightCard from "../components/InsightCard";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <Layout
            title="Executive Dashboard"
            subtitle="AI-powered enterprise intelligence overview."
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
                <StatCard
                    title="Revenue Growth"
                    value="+24.8%"
                    description="Quarterly sales performance increasing."
                />

                <StatCard
                    title="Operational Efficiency"
                    value="91%"
                    description="Enterprise workflows running optimally."
                />

                <StatCard
                    title="AI Confidence"
                    value="97%"
                    description="Decision engine accuracy score."
                />

                <StatCard
                    title="Threat Level"
                    value="Low"
                    description="No major operational threats detected."
                />
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <div className="xl:col-span-2">
                    <ForecastChart />
                </div>

                <div className="glass neon rounded-3xl p-6">
                    <h2 className="text-2xl font-semibold mb-6">AI Insights</h2>

                    <div className="space-y-4">
                        <InsightCard
                            title="Growth Opportunity"
                            content="AI models detected strong expansion potential across East African B2B markets."
                        />

                        <InsightCard
                            title="Operational Alert"
                            content="Supply chain latency increased by 8% in two logistics hubs."
                        />

                        <InsightCard
                            title="Recommendation"
                            content="Reallocate infrastructure resources to improve fulfillment performance."
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
