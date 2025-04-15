// src/pages/Dashboard.js
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';
import ReportChart from '../components/ReportChart';

function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Expense Tracker Dashboard</h1>
      <AddTransaction />
      <TransactionList />
      <ReportChart />
    </div>
  );
}

export default Dashboard;
