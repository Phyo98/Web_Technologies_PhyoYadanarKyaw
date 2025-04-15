import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a29bfe", "#00cec9"];

// Dummy Data
const dummyChartData = months.map((month, i) => ({
  month,
  income: Math.floor(Math.random() * 1000) + 500,
  expenses: Math.floor(Math.random() * 800) + 300,
}));

const dummyCategoryData = [
  { category: "Food", total: 1200 },
  { category: "Transport", total: 800 },
  { category: "Entertainment", total: 600 },
  { category: "Healthcare", total: 500 },
  { category: "Utilities", total: 400 },
];

const AnalyticsSection = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [categoryData, setCategoryData] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch transactions data (Income vs Expenses per month)
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) {
        // If not logged in, use dummy data
        setChartData({
          [selectedYear]: dummyChartData,
        });
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transactions = res.data.transactions;

        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;

        const monthlyData = {
          [currentYear]: months.map((month) => ({ month, income: 0, expenses: 0 })),
          [lastYear]: months.map((month) => ({ month, income: 0, expenses: 0 })),
        };

        transactions.forEach((t) => {
          const date = new Date(t.date);
          const year = date.getFullYear();
          const monthIndex = date.getMonth();
          const amount = Number(t.amount);

          if (year === currentYear || year === lastYear) {
            if (t.type === "income") {
              monthlyData[year][monthIndex].income += amount;
            } else if (t.type === "expense") {
              monthlyData[year][monthIndex].expenses += amount;
            }
          }
        });

        setChartData(monthlyData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token, selectedYear]);

  // Fetch Expenses by Category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!token) {
        // If not logged in, use dummy category data
        setCategoryData(dummyCategoryData);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/user/expenses-by-category", {
          headers: { Authorization: `Bearer ${token}` },
          params: { year: selectedYear },
        });

        const formatted = res.data.map(item => ({
          category: item.category,
          total: parseFloat(item.total),
        }));

        setCategoryData(formatted);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [token, selectedYear]);

  const dataForSelectedYear = chartData[selectedYear] || [];

  const totalExpenses = categoryData.reduce((sum, item) => sum + item.total, 0);

  // Sort and get top 5 categories
  const topCategories = [...categoryData]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)  // Limit to top 5 categories
    .map(item => ({
      ...item,
      percentage: totalExpenses > 0 ? ((item.total / totalExpenses) * 100).toFixed(1) : 0,
    }));

  // Limit the category data to the top 5 categories for the pie chart
  const topCategoryData = topCategories;

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 flex justify-between items-center">
        Income vs Expenses ({selectedYear})
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedYear(new Date().getFullYear())}
            className={`px-4 py-2 rounded-full transition duration-300 
              ${selectedYear === new Date().getFullYear() ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Current Year
          </button>
          <button
            onClick={() => setSelectedYear(new Date().getFullYear() - 1)}
            className={`px-4 py-2 rounded-full transition duration-300 
              ${selectedYear === new Date().getFullYear() - 1 ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Last Year
          </button>
        </div>
      </h3>

      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataForSelectedYear}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart & Top Categories */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4 text-center">Expenses by Category</h4>
          {topCategoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topCategoryData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {topCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No category data available.</p>
          )}
        </div>

        {/* Top 5 Spending Categories */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-center">Top Categories</h4>
          {topCategories.length > 0 ? (
            <ul className="space-y-4">
              {topCategories.map((item, index) => (
                <li key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="text-lg font-medium">{item.category}</div>
                    <div className="text-sm text-gray-500">{item.percentage}% of total</div>
                  </div>
                  <span className="text-gray-700 font-semibold">${item.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No Top Categories</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
