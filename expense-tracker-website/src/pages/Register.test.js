import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const MockRegister = () => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setErrors([]);
    
    if (password !== confirm) {
      setErrors(prev => [...prev, "Passwords do not match"]);
      return;
    }
    
    if (password.length < 8) {
      setErrors(prev => [...prev, "Password must be at least 8 characters long"]);
      return;
    }

    console.log("Form submitted with:", { userName, email, password, confirm });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-3xl font-bold text-center text-blue-600">ExpenseTracker</h2>
        <p className="mb-6 text-center text-gray-600">Track your expenses with ease</p>

        <h3 className="mb-1 text-xl font-semibold">Create an account</h3>
        <p className="mb-6 text-sm text-gray-500">Enter your details to create your account</p>

        {errors.length > 0 && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded">
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full py-2 bg-gray-100 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 bg-gray-100 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 bg-gray-100 outline-none"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full py-2 bg-gray-100 outline-none"
                required
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-medium text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

// Tests for the mock Register component
describe("Register Component", () => {
  test("renders register form correctly", () => {
    render(<MockRegister />);
    
    expect(screen.getByText("ExpenseTracker")).toBeInTheDocument();
    expect(screen.getByText("Create an account")).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("********")[0]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("********")[1]).toBeInTheDocument();
    
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("allows entering user details", () => {
    render(<MockRegister />);
    
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getAllByPlaceholderText("********")[0];
    const confirmInput = screen.getAllByPlaceholderText("********")[1];
    
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmInput, { target: { value: "password123" } });
    
    expect(nameInput.value).toBe("Test User");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
    expect(confirmInput.value).toBe("password123");
  });

  test("toggles password visibility when buttons are clicked", () => {
    render(<MockRegister />);
    
    const passwordInput = screen.getAllByPlaceholderText("********")[0];
    const confirmInput = screen.getAllByPlaceholderText("********")[1];
    
    const toggleButtons = screen.getAllByRole("button", { name: "Show" });
    const passwordToggle = toggleButtons[0];
    const confirmToggle = toggleButtons[1];
    
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmInput).toHaveAttribute("type", "password");
    
    fireEvent.click(passwordToggle);
    fireEvent.click(confirmToggle);
    
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(confirmInput).toHaveAttribute("type", "text");
    
    const hideButtons = screen.getAllByRole("button", { name: "Hide" });
    fireEvent.click(hideButtons[0]);
    fireEvent.click(hideButtons[1]);
    
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmInput).toHaveAttribute("type", "password");
  });

  test("shows error when passwords do not match", () => {
    render(<MockRegister />);
    
    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getAllByPlaceholderText("********")[0], { target: { value: "password123" } });
    fireEvent.change(screen.getAllByPlaceholderText("********")[1], { target: { value: "password456" } });
    
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  test("shows error when password is too short", () => {
    render(<MockRegister />);
    
    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getAllByPlaceholderText("********")[0], { target: { value: "short" } });
    fireEvent.change(screen.getAllByPlaceholderText("********")[1], { target: { value: "short" } });
    
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    
    expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
  });

  test("submits form when all inputs are valid", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    
    render(<MockRegister />);
    
    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getAllByPlaceholderText("********")[0], { target: { value: "password123" } });
    fireEvent.change(screen.getAllByPlaceholderText("********")[1], { target: { value: "password123" } });
    
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    
    expect(consoleSpy).toHaveBeenCalledWith("Form submitted with:", {
      userName: "Test User",
      email: "test@example.com",
      password: "password123",
      confirm: "password123"
    });
    
    consoleSpy.mockRestore();
  });
});
