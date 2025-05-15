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
  "Food & Dining": <FaUtensils size={30} className="mx-auto mb-2 text-blue-500" />,
  Transportation: <FaBus size={30} className="mx-auto mb-2 text-green-500" />,
  Shopping: <FaShoppingBag size={30} className="mx-auto mb-2 text-pink-500" />,
  Entertainment: <FaFilm size={30} className="mx-auto mb-2 text-purple-500" />,
  Housing: <FaHome size={30} className="mx-auto mb-2 text-red-500" />,
  Utilities: <FaBolt size={30} className="mx-auto mb-2 text-yellow-500" />,
  Health: <FaHeartbeat size={30} className="mx-auto mb-2 text-rose-500" />,
  Income: <FaMoneyBillWave size={30} className="mx-auto mb-2 text-emerald-500" />,
  Education: <FaBook size={30} className="mx-auto mb-2 text-indigo-500" />,
  Travel: <FaPlane size={30} className="mx-auto mb-2 text-sky-500" />,
  Insurance: <FaShieldAlt size={30} className="mx-auto mb-2 text-teal-500" />,
  "Gifts & Donations": <FaGift size={30} className="mx-auto mb-2 text-pink-400" />,
  Taxes: <FaBalanceScale size={30} className="mx-auto mb-2 text-yellow-600" />,
  "Debt Payments": <FaHandHoldingUsd size={30} className="mx-auto mb-2 text-red-600" />,
  Miscellaneous: <FaEllipsisH size={30} className="mx-auto mb-2 text-gray-500" />,
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [transactionsCount, setTransactionsCount] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch categories and transactions count
  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:8000/api/categories")
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
      fetch("http://localhost:8000/api/transaction-counts", {
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
    <section className="max-w-6xl p-8 mx-auto">
      <h3 className="mb-4 text-2xl font-semibold">Spending by Category</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className="p-6 text-center bg-white shadow rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05, 
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", 
              }}
            >
              {iconMap[cat.name] || (
                <FaQuestion size={30} className="mx-auto mb-2 text-gray-400" />
              )}
              <p className="mb-2 text-lg font-medium">{cat.name}</p>
              <p className="font-bold text-blue-600">
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
