import { Pie } from 'react-chartjs-2';

function ReportChart() {
  const data = {
    labels: ['Food', 'Transport', 'Shopping'], // replace dynamically
    datasets: [{
      data: [300, 100, 200], // replace dynamically
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  return (
    <div>
      <h2>Spending Chart</h2>
      <Pie data={data} />
    </div>
  );
}

export default ReportChart;
