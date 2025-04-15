import { motion } from "framer-motion";

const StatCard = ({ title, value, subtitle }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-md w-full text-center transition-all duration-300 ease-out"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{
      scale: 1.03, 
      boxShadow: "0px 8px 20px rgba(2, 136, 209, 0.5), 0px 4px 12px rgba(0, 0, 0, 0.1)", 
    }}
    whileTap={{ scale: 0.98 }}
  >
    <h4 className="text-sm text-gray-600">{title}</h4>
    <p className="text-2xl font-semibold text-blue-700">{value}</p>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </motion.div>
);

const StatsCards = () => (
  <section className="grid md:grid-cols-3 gap-6 p-8 max-w-6xl mx-auto">
    <StatCard title="Average Saving" value="$1,200" subtitle="Per Month" />
    <StatCard title="Active Users" value="5,420" subtitle="This Week" />
    <StatCard title="Expenses Tracked" value="$78,000" subtitle="Total" />
  </section>
);

export default StatsCards;
