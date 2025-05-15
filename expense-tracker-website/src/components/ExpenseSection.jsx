import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMoneyBillWave,
  FaPiggyBank,
  FaCalculator,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExpenseSection = () => {
  const navigate = useNavigate();
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
        const res = await axios.get("https://mi-linux.wlv.ac.uk/~2537566/public/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedExpenses = res.data.transactions
          .map((t) => ({
            id: t.id,
            title: t.title,
            amount:
              t.type === "expense" ? -Math.abs(t.amount) : Math.abs(t.amount),
            date: t.date,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://mi-linux.wlv.ac.uk/~2537566/public/api/categories", {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mi-linux.wlv.ac.uk/~2537566/public/api/transactions",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newTransaction = res.data.transaction;
      const signedAmount =
        newTransaction.type === "expense"
          ? -Math.abs(newTransaction.amount)
          : Math.abs(newTransaction.amount);

      const updatedExpenses = [
        {
          id: newTransaction.id,
          title: newTransaction.title,
          amount: signedAmount,
          date: newTransaction.date,
        },
        ...expenses,
      ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

      setExpenses(updatedExpenses);

      setForm({
        title: "",
        amount: "",
        type: "expense",
        category_id: "",
        date: "",
      });
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
    <section className="max-w-6xl p-8 mx-auto">
      <h3 className="mb-2 text-2xl font-semibold">Expenses</h3>
      <p className="mb-4">Manage and track your finances</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3">
        <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
          <FaMoneyBillWave className="mb-2 text-3xl text-red-400" />
          <h4 className="mb-1 text-xl font-semibold text-gray-700">
            Total Expenses
          </h4>
          <p className="text-2xl font-bold text-red-500">
            -${Math.abs(totalExpenses).toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
          <FaPiggyBank className="mb-2 text-3xl text-green-400" />
          <h4 className="mb-1 text-xl font-semibold text-gray-700">
            Total Income
          </h4>
          <p className="text-2xl font-bold text-green-500">
            +${totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
          <FaCalculator className="mb-2 text-3xl text-blue-400" />
          <h4 className="mb-1 text-xl font-semibold text-gray-700">Balance</h4>
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
        <form
          onSubmit={handleSubmit}
          className="p-6 mb-6 bg-white shadow rounded-xl"
        >
          <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <FaPlus /> Add Transaction
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
              className="p-2 border rounded"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="p-2 border rounded"
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
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}

      {/* Transactions List */}
      <h4 className="my-3 font-bold">Recent Transactions</h4>
      <div className="p-4 bg-white shadow rounded-xl">
        {!token ? (
          <div className="py-10 text-center">
            <p
              className="mb-2 text-lg text-blue-500 transition cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Please log in or register
            </p>
            <p className="text-gray-400">
              You must be logged in to view or add transactions.
            </p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="py-10 text-center">
            <p className="mb-2 text-lg text-gray-500">No transactions yet</p>
            <p className="text-gray-400">
              Start by adding a new transaction above.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {expenses.slice(0, 10).map((expense, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="font-medium">{expense.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
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
