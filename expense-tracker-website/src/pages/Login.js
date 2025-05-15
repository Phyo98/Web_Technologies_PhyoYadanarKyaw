import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const text = await response.text();
      let data;
  
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Invalid JSON response: " + text);
      }
  
      if (!response.ok) {
        if (data.errors && data.errors.email) {
          toast.error(data.errors.email[0]);
        } else {
          toast.error(data.message || "Login failed");
        }
        return;
      }
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <h1 className="mb-2 text-4xl font-bold text-blue-600">ExpenseTracker</h1>
      <p className="mb-6 text-gray-500">Track your expenses with ease</p>

      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h2 className="mb-1 text-xl font-bold">Login</h2>
        <p className="mb-6 text-sm text-gray-500">Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded-md">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-100 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded-md">
              <FaLock className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-100 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
