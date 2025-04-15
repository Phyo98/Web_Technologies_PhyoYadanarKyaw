import { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTransactions(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>{t.type}: {t.amount} - {t.category}</li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
