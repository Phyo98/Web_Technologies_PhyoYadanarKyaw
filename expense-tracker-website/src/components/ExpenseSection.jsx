import { useEffect, useState } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaPiggyBank, FaCalculator, FaPlus } from "react-icons/fa";

const ExpenseSection = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category_id: "",
    date: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedExpenses = res.data.transactions.map((t) => ({
          category: t.title, 
          amount: t.type === "expense" ? -Math.abs(t.amount) : Math.abs(t.amount),
        }));

        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (token) {
      fetchTransactions();
      fetchCategories();
    }
  }, [token]);

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/transactions", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newTransaction = res.data.transaction;
      const signedAmount =
        newTransaction.type === "expense"
          ? -Math.abs(newTransaction.amount)
          : Math.abs(newTransaction.amount);

      setExpenses((prev) => [
        ...prev,
        {
          category: newTransaction.title, 
          amount: signedAmount,
        },
      ]);

      setForm({ title: "", amount: "", type: "expense", category_id: "", date: "" });
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  const totalExpenses = expenses
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = expenses
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome + totalExpenses;

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold mb-2">Expenses</h3>
      <p className="mb-4">Manage and track your finances</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
          <FaMoneyBillWave className="text-3xl text-red-400 mb-2" />
          <h4 className="text-xl font-semibold text-gray-700 mb-1">Total Expenses</h4>
          <p className="text-2xl font-bold text-red-500">
            -${Math.abs(totalExpenses).toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
          <FaPiggyBank className="text-3xl text-green-400 mb-2" />
          <h4 className="text-xl font-semibold text-gray-700 mb-1">Total Income</h4>
          <p className="text-2xl font-bold text-green-500">
            +${totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center">
          <FaCalculator className="text-3xl text-blue-400 mb-2" />
          <h4 className="text-xl font-semibold text-gray-700 mb-1">Balance</h4>
          <p
            className={`text-2xl font-bold ${
              balance < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Transaction Form */}
      {token && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaPlus /> Add Transaction
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="border rounded p-2"
            />
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
              className="border rounded p-2"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {/* Category Dropdown */}
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow p-4">
        {!token ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg mb-2">Please log in or register</p>
            <p className="text-gray-400">You must be logged in to view or add transactions.</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg mb-2">No transactions yet</p>
            <p className="text-gray-400">Start by adding a new transaction above.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {expenses.map((expense, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{expense.category}</span>
                <span
                  className={`font-semibold ${
                    expense.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {expense.amount < 0
                    ? `-$${Math.abs(expense.amount).toFixed(2)}`
                    : `+$${expense.amount.toFixed(2)}`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ExpenseSection;
