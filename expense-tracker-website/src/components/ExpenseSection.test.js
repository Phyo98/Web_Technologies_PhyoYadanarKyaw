import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const MockExpenseSection = () => {
  const [expenses, setExpenses] = React.useState([
    { id: 1, title: "Salary", amount: 2000, date: "2023-05-01" },
    { id: 2, title: "Rent", amount: -800, date: "2023-05-05" },
    { id: 3, title: "Groceries", amount: -150, date: "2023-05-10" },
  ]);

  const [form, setForm] = React.useState({
    title: "",
    amount: "",
    type: "expense",
    category_id: "",
    date: "",
  });

  const [categories] = React.useState([
    { id: 1, name: "Income" },
    { id: 2, name: "Housing" },
    { id: 3, name: "Food" },
    { id: 4, name: "Transportation" },
    { id: 5, name: "Entertainment" },
  ]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: expenses.length + 1,
      title: form.title,
      amount:
        form.type === "expense"
          ? -Math.abs(Number(form.amount))
          : Math.abs(Number(form.amount)),
      date: form.date,
    };

    setExpenses([newTransaction, ...expenses]);

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category_id: "",
      date: "",
    });
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
          <div data-testid="icon-expense">ExpenseIcon</div>
          <h4 className="mb-1 text-xl font-semibold text-gray-700">
            Total Expenses
          </h4>
          <p className="text-2xl font-bold text-red-500">
            -${Math.abs(totalExpenses).toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
          <div data-testid="icon-income">IncomeIcon</div>
          <h4 className="mb-1 text-xl font-semibold text-gray-700">
            Total Income
          </h4>
          <p className="text-2xl font-bold text-green-500">
            +${totalIncome.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col items-center p-6 text-center bg-white shadow rounded-xl">
          <div data-testid="icon-balance">BalanceIcon</div>
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
      {isLoggedIn && (
        <form
          onSubmit={handleSubmit}
          className="p-6 mb-6 bg-white shadow rounded-xl"
        >
          <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold">
            <div data-testid="icon-plus">PlusIcon</div> Add Transaction
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
        {!isLoggedIn ? (
          <div className="py-10 text-center">
            <p
              className="mb-2 text-lg text-blue-500 transition cursor-pointer"
              onClick={() => setIsLoggedIn(true)}
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

// Tests for the mock ExpenseSection component
describe("ExpenseSection Component", () => {
  test("renders summary cards and login prompt when not logged in", () => {
    render(<MockExpenseSection />);

    expect(screen.getByText("Total Expenses")).toBeInTheDocument();
    expect(screen.getByText("Total Income")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();

    expect(screen.getByText("Please log in or register")).toBeInTheDocument();
    expect(
      screen.getByText("You must be logged in to view or add transactions.")
    ).toBeInTheDocument();

    expect(screen.queryByText("Add Transaction")).not.toBeInTheDocument();
  });

  test("displays transactions after logging in", () => {
    render(<MockExpenseSection />);

    fireEvent.click(screen.getByText("Please log in or register"));

    expect(screen.getByText("Add Transaction")).toBeInTheDocument();

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();

    const salaryAmounts = screen.getAllByText("+$2000.00");
    expect(salaryAmounts.length).toBeGreaterThan(0);

    const rentAmounts = screen.getAllByText("-$800.00");
    expect(rentAmounts.length).toBeGreaterThan(0);

    const groceryAmounts = screen.getAllByText("-$150.00");
    expect(groceryAmounts.length).toBeGreaterThan(0);

    expect(screen.getByText("-$950.00")).toBeInTheDocument(); 
    expect(screen.getAllByText("+$2000.00").length).toBeGreaterThan(0); 
    expect(screen.getByText("$1050.00")).toBeInTheDocument(); 
  });

  test("allows adding a new transaction", () => {
    render(<MockExpenseSection />);

    fireEvent.click(screen.getByText("Please log in or register"));

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Movie Tickets" },
    });

    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "25" },
    });

    const typeSelect = screen.getByDisplayValue("Expense");
    fireEvent.change(typeSelect, { target: { value: "expense" } });

    const categorySelect = screen.getByDisplayValue("Select Category");
    fireEvent.change(categorySelect, { target: { value: "5" } });

    const dateInput = screen.getByDisplayValue("");
    fireEvent.change(dateInput, { target: { value: "2023-05-15" } });

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Movie Tickets")).toBeInTheDocument();
  });
});
