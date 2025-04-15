const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-white p-6 rounded-2xl shadow w-full text-center">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
  
  const StatsCards = () => (
    <section className="grid md:grid-cols-3 gap-4 p-8 max-w-6xl mx-auto">
      <StatCard title="Average Saving" value="$1,200" subtitle="Per Month" />
      <StatCard title="Active Users" value="5,420" subtitle="This Week" />
      <StatCard title="Expenses Tracked" value="$78,000" subtitle="Total" />
    </section>
  );
  
  export default StatsCards;