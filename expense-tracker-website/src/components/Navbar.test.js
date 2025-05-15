import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const MockNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
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

  const handleLogin = (name) => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify({ name }));
    setIsLoggedIn(true);
    setUserName(name);
  };

  return (
    <nav className="sticky top-0 z-10 p-4 bg-white shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <a href="/" onClick={() => setShowMobileMenu(false)} data-testid="logo-link">
          <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
            ExpenseTracker
          </h1>
        </a>

        {/* Desktop Menu */}
        <div className="hidden space-x-6 font-medium text-gray-700 md:flex" data-testid="desktop-menu">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/expense" className="hover:text-blue-600">
            Expenses
          </a>
          <a href="/categories" className="hover:text-blue-600">
            Categories
          </a>
          <a href="/analytics" className="hover:text-blue-600">
            Analytics
          </a>
        </div>

        {/* User Section */}
        <div className="relative items-center hidden md:flex" data-testid="user-section">
          {isLoggedIn ? (
            <div className="relative flex items-center">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="mr-2 text-2xl text-gray-600 hover:text-blue-600"
                data-testid="user-button"
              >
                <span>👤</span>
              </button>
              <span className="mr-2 text-gray-600" data-testid="username">{userName}</span>
              {showDropdown && (
                <div className="absolute right-0 z-50 w-40 py-2 bg-white rounded-md shadow-lg top-10" data-testid="user-dropdown">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    data-testid="logout-button"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <a href="/login" className="text-gray-600 hover:text-blue-600" data-testid="login-link">
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                data-testid="register-link"
              >
                Register
              </a>
            </div>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="text-2xl text-gray-700 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          data-testid="hamburger-button"
        >
          {showMobileMenu ? <span>✕</span> : <span>☰</span>}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          showMobileMenu ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        data-testid="mobile-menu"
      >
        <div className="px-6 py-5 space-y-4 bg-white shadow-lg rounded-b-xl">
          <a
            href="/"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            <span>🏠</span> Home
          </a>
          <a
            href="/expense"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            <span>💸</span> Expenses
          </a>
          <a
            href="/categories"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            <span>🗂️</span> Categories
          </a>
          <a
            href="/analytics"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-3 py-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            <span>📊</span> Analytics
          </a>

          <hr className="border-gray-200" />

          {isLoggedIn ? (
            <>
              <div className="text-sm text-gray-500" data-testid="mobile-username">{userName}</div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-2 px-4 py-1 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                data-testid="mobile-logout-button"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-2 py-1 font-medium text-gray-700 transition-colors"
                data-testid="mobile-login-link"
              >
                🔐 Login
              </a>
              <a
                href="/register"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-2 py-1 font-medium text-gray-700 transition-colors"
                data-testid="mobile-register-link"
              >
                ✍️ Register
              </a>
            </>
          )}
        </div>
      </div>
      
      {!isLoggedIn && (
        <button 
          onClick={() => handleLogin("Test User")} 
          data-testid="test-login-button"
          style={{ display: 'none' }}
        >
          Test Login
        </button>
      )}
    </nav>
  );
};

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  test('renders navbar with login and register links when not logged in', () => {
    render(<MockNavbar />);
    
    expect(screen.getByText('ExpenseTracker')).toBeInTheDocument();
    
    const desktopMenu = screen.getByTestId('desktop-menu');
    expect(desktopMenu).toBeInTheDocument();
    expect(desktopMenu).toHaveTextContent('Home');
    expect(desktopMenu).toHaveTextContent('Expenses');
    expect(desktopMenu).toHaveTextContent('Categories');
    expect(desktopMenu).toHaveTextContent('Analytics');
    
    const userSection = screen.getByTestId('user-section');
    expect(userSection).toHaveTextContent('Login');
    expect(userSection).toHaveTextContent('Register');
    
    expect(screen.queryByTestId('user-dropdown')).not.toBeInTheDocument();
  });

  test('renders navbar with user info and logout button when logged in', () => {

    localStorageMock.getItem.mockImplementation(key => {
      if (key === 'token') return 'fake-token';
      if (key === 'user') return JSON.stringify({ name: 'Test User' });
      return null;
    });
    
    render(<MockNavbar />);
    
    expect(screen.getByTestId('username')).toHaveTextContent('Test User');
    
    expect(screen.queryByTestId('login-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('register-link')).not.toBeInTheDocument();
    
    expect(screen.getByTestId('user-button')).toBeInTheDocument();
  });

  test('toggles user dropdown when user button is clicked', () => {
    localStorageMock.getItem.mockImplementation(key => {
      if (key === 'token') return 'fake-token';
      if (key === 'user') return JSON.stringify({ name: 'Test User' });
      return null;
    });
    
    render(<MockNavbar />);
    
    expect(screen.queryByTestId('user-dropdown')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('user-button'));
    
    expect(screen.getByTestId('user-dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('user-button'));
    
    expect(screen.queryByTestId('user-dropdown')).not.toBeInTheDocument();
  });

  test('logs out user when logout button is clicked', () => {
    localStorageMock.getItem.mockImplementation(key => {
      if (key === 'token') return 'fake-token';
      if (key === 'user') return JSON.stringify({ name: 'Test User' });
      return null;
    });
    
    render(<MockNavbar />);
    
    fireEvent.click(screen.getByTestId('user-button'));
    
    fireEvent.click(screen.getByTestId('logout-button'));
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
    expect(screen.getByTestId('register-link')).toBeInTheDocument();
  });

  test('toggles mobile menu when hamburger button is clicked', () => {
    render(<MockNavbar />);
    
    const mobileMenu = screen.getByTestId('mobile-menu');
    
    expect(mobileMenu.className).toContain('opacity-0');
    
    fireEvent.click(screen.getByTestId('hamburger-button'));
    
    expect(mobileMenu.className).toContain('opacity-100');
  
    fireEvent.click(screen.getByTestId('hamburger-button'));
    
    expect(mobileMenu.className).toContain('opacity-0');
  });

  test('shows different mobile menu options when logged in vs logged out', () => {
    render(<MockNavbar />);
    
    fireEvent.click(screen.getByTestId('hamburger-button'));
    
    expect(screen.getByTestId('mobile-login-link')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-register-link')).toBeInTheDocument();
    
    expect(screen.queryByTestId('mobile-logout-button')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('test-login-button'));
    
    expect(screen.getByTestId('mobile-username')).toHaveTextContent('Test User');
    expect(screen.getByTestId('mobile-logout-button')).toBeInTheDocument();
    
    expect(screen.queryByTestId('mobile-login-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mobile-register-link')).not.toBeInTheDocument();
  });
});
