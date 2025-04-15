import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './components/Hero';
import StatsCards from './components/StatsCards';
import ExpenseSection from './components/ExpenseSection';
import CategoriesSection from './components/CategoriesSection';
import AnalyticsSection from './components/AnalyticsSection';

import Login from './pages/Login';
import Register from './pages/Register';

function Home() {
  return (
    <>
      <Hero />
      <StatsCards />
      <ExpenseSection />
      <CategoriesSection />
      <AnalyticsSection />
    </>
  );
}

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/expense" element={<ExpenseSection />} />
          <Route path="/categories" element={<CategoriesSection />} />
          <Route path="/analytics" element={<AnalyticsSection />} />
        </Routes>
      </main>
      {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
