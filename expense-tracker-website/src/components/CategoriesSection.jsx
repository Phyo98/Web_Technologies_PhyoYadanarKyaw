import { useEffect, useState } from "react";
import {
  FaUtensils,
  FaBus,
  FaShoppingBag,
  FaFilm,
  FaHome,
  FaBolt,
  FaHeartbeat,
  FaMoneyBillWave,
  FaBook,
  FaPlane,
  FaShieldAlt,
  FaGift,
  FaBalanceScale,
  FaHandHoldingUsd,
  FaEllipsisH,
  FaQuestion,
} from "react-icons/fa";
import { motion } from "framer-motion"; 

const iconMap = {
  "Food & Dining": <FaUtensils size={30} className="text-blue-500 mb-2 mx-auto" />,
  Transportation: <FaBus size={30} className="text-green-500 mb-2 mx-auto" />,
  Shopping: <FaShoppingBag size={30} className="text-pink-500 mb-2 mx-auto" />,
  Entertainment: <FaFilm size={30} className="text-purple-500 mb-2 mx-auto" />,
  Housing: <FaHome size={30} className="text-red-500 mb-2 mx-auto" />,
  Utilities: <FaBolt size={30} className="text-yellow-500 mb-2 mx-auto" />,
  Health: <FaHeartbeat size={30} className="text-rose-500 mb-2 mx-auto" />,
  Income: <FaMoneyBillWave size={30} className="text-emerald-500 mb-2 mx-auto" />,
  Education: <FaBook size={30} className="text-indigo-500 mb-2 mx-auto" />,
  Travel: <FaPlane size={30} className="text-sky-500 mb-2 mx-auto" />,
  Insurance: <FaShieldAlt size={30} className="text-teal-500 mb-2 mx-auto" />,
  "Gifts & Donations": <FaGift size={30} className="text-pink-400 mb-2 mx-auto" />,
  Taxes: <FaBalanceScale size={30} className="text-yellow-600 mb-2 mx-auto" />,
  "Debt Payments": <FaHandHoldingUsd size={30} className="text-red-600 mb-2 mx-auto" />,
  Miscellaneous: <FaEllipsisH size={30} className="text-gray-500 mb-2 mx-auto" />,
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [transactionsCount, setTransactionsCount] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch categories and transactions count
  useEffect(() => {
    // Fetch categories
    fetch("https://mi-linux.wlv.ac.uk/~2537566/public/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories");
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    // Fetch transaction counts if logged in
    if (token) {
      fetch("https://mi-linux.wlv.ac.uk/~2537566/public/api/transaction-counts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTransactionsCount(data.data);
          } else {
            console.error("Failed to fetch transaction counts");
          }
        })
        .catch((err) => {
          console.error("Error fetching transaction counts:", err);
        });
    }

    setLoading(false);
  }, [token]);

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Spending by Category</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className="bg-white p-6 rounded-xl shadow text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05, 
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", 
              }}
            >
              {iconMap[cat.name] || (
                <FaQuestion size={30} className="text-gray-400 mb-2 mx-auto" />
              )}
              <p className="text-lg font-medium mb-2">{cat.name}</p>
              <p className="text-blue-600 font-bold">
                {transactionsCount[cat.name] || 0} transactions
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoriesSection;
