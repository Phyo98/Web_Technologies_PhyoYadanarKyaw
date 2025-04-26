import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!token);
    if (user) setUserName(user.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" onClick={() => setShowMobileMenu(false)}>
          <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
            ExpenseTracker
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/expense" className="hover:text-blue-600">
            Expenses
          </Link>
          <Link to="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          <Link to="/analytics" className="hover:text-blue-600">
            Analytics
          </Link>
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center relative">
          {isLoggedIn ? (
            <div className="flex items-center relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-2xl text-gray-600 hover:text-blue-600 mr-2"
              >
                <FaUserCircle />
              </button>
              <span className="text-gray-600 mr-2">{userName}</span>
              {showDropdown && (
                <div className="absolute top-10 right-0 w-40 bg-white shadow-lg rounded-md py-2 z-50">
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
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          showMobileMenu ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-lg rounded-b-xl px-6 py-5 space-y-4">
          <Link
            to="/"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 text-gray-700 font-medium hover:text-blue-600 transition-colors"
          >
            <span>🏠</span> Home
          </Link>
          <Link
            to="/expense"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 text-gray-700 font-medium hover:text-blue-600 transition-colors"
          >
            <span>💸</span> Expenses
          </Link>
          <Link
            to="/categories"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 text-gray-700 font-medium hover:text-blue-600 transition-colors"
          >
            <span>🗂️</span> Categories
          </Link>
          <Link
            to="/analytics"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 text-gray-700 font-medium hover:text-blue-600 transition-colors"
          >
            <span>📊</span> Analytics
          </Link>

          <hr className="border-gray-200" />

          {isLoggedIn ? (
            <>
              <div className="text-sm text-gray-500">{userName}</div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 py-1 text-red-600 hover:bg-red-50 px-4 rounded-lg transition-colors"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-2 py-1 text-gray-700 font-medium  transition-colors"
              >
                🔐 Login
              </Link>
              <Link
                to="/register"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-2 py-1 text-gray-700 font-medium  transition-colors"
              >
                ✍️ Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
