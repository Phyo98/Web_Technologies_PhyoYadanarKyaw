import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaUserPlus, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; 
import { getToken, getUser } from "../utils/auth";

const Register = () => {
  const [userName, setUserName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName, 
          email,
          password,
          password_confirmation: confirm,
        }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        console.log("Raw response:", text);
        alert("Invalid response from the server.");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // console.log("Logged in user:", getUser());
      // console.log("Token:", getToken());

      navigate("/");

    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-3xl font-bold text-center text-blue-600">ExpenseTracker</h2>
        <p className="mb-6 text-center text-gray-600">Track your expenses with ease</p>

        <h3 className="mb-1 text-xl font-semibold">Create an account</h3>
        <p className="mb-6 text-sm text-gray-500">Enter your details to create your account</p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* User Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded">
              <FaUserPlus className="mr-2 text-gray-400" />
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
              <FaEnvelope className="mr-2 text-gray-400" />
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
              <FaLock className="mr-2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 bg-gray-100 outline-none"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="flex items-center px-3 bg-gray-100 border rounded">
              <FaLock className="mr-2 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full py-2 bg-gray-100 outline-none"
                required
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full gap-2 py-2 font-medium text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
          >
            <FaUserPlus />
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
