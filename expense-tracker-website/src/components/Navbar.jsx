import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(!!token);
    if (user) {
      setUserName(user.name); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-600">ExpenseTracker</h1>

        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/expense" className="hover:text-blue-600">Expenses</Link>
          <Link to="/categories" className="hover:text-blue-600">Categories</Link>
          <Link to="/analytics" className="hover:text-blue-600">Analytics</Link>
        </div>

        <div className="relative flex items-center">
          {isLoggedIn ? (
            <div className="relative flex items-center">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-2xl text-gray-600 hover:text-blue-600 mr-2"
              >
                <FaUserCircle />
              </button>

              <span className="text-gray-600 mr-2">{userName}</span>
              {showDropdown && (
                <div className="absolute mt-20 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
