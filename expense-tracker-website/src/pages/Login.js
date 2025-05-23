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
      const response = await fetch("https://mi-linux.wlv.ac.uk/~2537566/public/api/login", {
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">ExpenseTracker</h1>
      <p className="text-gray-500 mb-6">Track your expenses with ease</p>

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-1">Login</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded-md px-3 bg-gray-100">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 focus:outline-none p-2"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded-md px-3 bg-gray-100">
              <FaLock className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 focus:outline-none p-2"
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
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
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
