import { useState } from 'react';
import axios from 'axios';

function AddTransaction() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await axios.post('http://localhost:8000/api/transactions', {
      amount,
      type,
      category,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;
