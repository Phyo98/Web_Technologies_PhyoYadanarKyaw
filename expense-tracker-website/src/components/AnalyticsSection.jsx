import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', income: 3200, expenses: 2100 },
  { month: 'Feb', income: 2800, expenses: 1800 },
  { month: 'Mar', income: 3500, expenses: 2300 },
  { month: 'Apr', income: 3000, expenses: 1900 },
];

const AnalyticsSection = () => (
  <section className="p-8 max-w-6xl mx-auto">
    <h3 className="text-2xl font-semibold mb-4">Income vs Expenses</h3>
    <div className="bg-white rounded-xl shadow p-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2} />
          <Line type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default AnalyticsSection;