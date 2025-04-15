import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/expense");
  };

  return (
    <section className="text-center py-20 bg-blue-200">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Track Your Expenses With Ease
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-6 mx-auto max-w-2xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Expense Tracker helps you track, analyze, and optimize your spending habits with a simple and intuitive interface.
          Say goodbye to financial stress and hello to smarter money management in just a few clicks.
        </motion.p>
        <motion.button
          onClick={handleGetStartedClick}
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
