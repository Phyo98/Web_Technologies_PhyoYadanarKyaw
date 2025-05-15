import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const MockAnalyticsSection = () => {
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  
  const [monthlyData] = React.useState({
    [currentYear]: [
      { month: "Jan", income: 2500, expenses: 1800 },
      { month: "Feb", income: 2700, expenses: 1950 },
      { month: "Mar", income: 2600, expenses: 1700 },
      { month: "Apr", income: 2800, expenses: 2000 },
      { month: "May", income: 3000, expenses: 1900 },
      { month: "Jun", income: 2900, expenses: 2100 },
      { month: "Jul", income: 3100, expenses: 2200 },
      { month: "Aug", income: 3000, expenses: 2000 },
      { month: "Sep", income: 2800, expenses: 1800 },
      { month: "Oct", income: 2900, expenses: 1900 },
      { month: "Nov", income: 3200, expenses: 2100 },
      { month: "Dec", income: 3500, expenses: 2500 }
    ],
    [currentYear - 1]: [
      { month: "Jan", income: 2200, expenses: 1600 },
      { month: "Feb", income: 2300, expenses: 1700 },
      { month: "Mar", income: 2400, expenses: 1800 },
      { month: "Apr", income: 2500, expenses: 1900 },
      { month: "May", income: 2600, expenses: 2000 },
      { month: "Jun", income: 2700, expenses: 2100 },
      { month: "Jul", income: 2800, expenses: 2200 },
      { month: "Aug", income: 2900, expenses: 2300 },
      { month: "Sep", income: 3000, expenses: 2400 },
      { month: "Oct", income: 3100, expenses: 2500 },
      { month: "Nov", income: 3200, expenses: 2600 },
      { month: "Dec", income: 3300, expenses: 2700 }
    ]
  });

  const [categoryData] = React.useState({
    [currentYear]: [
      { category: "Food", total: 5000 },
      { category: "Housing", total: 12000 },
      { category: "Transportation", total: 3000 },
      { category: "Entertainment", total: 2000 },
      { category: "Healthcare", total: 1500 }
    ],
    [currentYear - 1]: [
      { category: "Food", total: 4500 },
      { category: "Housing", total: 11000 },
      { category: "Transportation", total: 2800 },
      { category: "Entertainment", total: 1800 },
      { category: "Utilities", total: 1400 }
    ]
  });

  const totalExpenses = categoryData[selectedYear].reduce(
    (sum, item) => sum + item.total, 0
  );

  return (
    <section className="max-w-6xl p-8 mx-auto">
      <h3 className="flex flex-col gap-4 mb-4 text-2xl font-semibold sm:flex-row sm:justify-between sm:items-center">
        <span>Income vs Expenses ({selectedYear})</span>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setSelectedYear(currentYear)}
            className={`text-sm sm:text-base px-4 py-2 rounded-full transition duration-300 
              ${selectedYear === currentYear ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            data-testid="current-year-btn"
          >
            Current Year
          </button>
          <button
            onClick={() => setSelectedYear(currentYear - 1)}
            className={`text-sm sm:text-base px-4 py-2 rounded-full transition duration-300 
              ${selectedYear === currentYear - 1 ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            data-testid="last-year-btn"
          >
            Last Year
          </button>
        </div>
      </h3>

      {/* Line Chart */}
      <div className="px-2 py-4 mb-8 bg-white shadow rounded-xl">
        <div data-testid="line-chart" className="flex items-center justify-center h-64">
          {monthlyData[selectedYear].map((item, index) => (
            <div key={index} className="flex flex-col items-center mx-1">
              <div className="text-xs">{item.month}</div>
              <div className="relative w-8 h-40 bg-gray-100">
                <div 
                  className="absolute bottom-0 w-full bg-green-500"
                  style={{ height: `${(item.income / 4000) * 100}%` }}
                  data-testid={`income-bar-${index}`}
                ></div>
                <div 
                  className="absolute bottom-0 w-full bg-red-500 opacity-70"
                  style={{ height: `${(item.expenses / 4000) * 100}%` }}
                  data-testid={`expense-bar-${index}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-green-500"></div>
            <span className="text-sm">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-red-500 opacity-70"></div>
            <span className="text-sm">Expenses</span>
          </div>
        </div>
      </div>

      {/* Pie Chart & Top Categories */}
      <div className="grid grid-cols-1 gap-8 p-4 bg-white shadow rounded-xl md:grid-cols-2">
        <div>
          <h4 className="mb-4 text-xl font-semibold text-center">Expenses by Category</h4>
          <div data-testid="pie-chart" className="flex items-center justify-center h-64">
            {categoryData[selectedYear].length > 0 ? (
              <div className="relative w-48 h-48 overflow-hidden bg-gray-200 rounded-full">
                {categoryData[selectedYear].map((item, index) => {
                  const percentage = (item.total / totalExpenses) * 100;
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500'];
                  return (
                    <div 
                      key={index}
                      className={`absolute ${colors[index % colors.length]}`}
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(index * (2 * Math.PI / categoryData[selectedYear].length))}% ${50 + 50 * Math.sin(index * (2 * Math.PI / categoryData[selectedYear].length))}%, ${50 + 50 * Math.cos((index + 1) * (2 * Math.PI / categoryData[selectedYear].length))}% ${50 + 50 * Math.sin((index + 1) * (2 * Math.PI / categoryData[selectedYear].length))}%)`
                      }}
                      data-testid={`pie-segment-${index}`}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">No category data available.</p>
            )}
          </div>
        </div>

        {/* Top 5 Spending Categories */}
        <div>
          <h4 className="mb-4 text-xl font-semibold text-center">Top Categories</h4>
          {categoryData[selectedYear].length > 0 ? (
            <ul className="space-y-4" data-testid="category-list">
              {categoryData[selectedYear].map((item, index) => {
                const percentage = (item.total / totalExpenses) * 100;
                return (
                  <li key={index} className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <div className="text-lg font-medium">{item.category}</div>
                      <div className="text-sm text-gray-500">{percentage.toFixed(1)}% of total</div>
                    </div>
                    <span className="font-semibold text-gray-700">${item.total.toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-500" data-testid="no-categories">No Top Categories</p>
          )}
        </div>
      </div>
    </section>
  );
};

// Tests for the mock AnalyticsSection component
describe('AnalyticsSection Component', () => {
  test('renders the analytics section correctly', () => {
    render(<MockAnalyticsSection />);
    
    expect(screen.getByText(/Income vs Expenses/)).toBeInTheDocument();
    expect(screen.getByText('Current Year')).toBeInTheDocument();
    expect(screen.getByText('Last Year')).toBeInTheDocument();
    expect(screen.getByText('Expenses by Category')).toBeInTheDocument();
    expect(screen.getByText('Top Categories')).toBeInTheDocument();
    
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('Transportation')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    
    expect(screen.getByText('$5000.00')).toBeInTheDocument();
    expect(screen.getByText('$12000.00')).toBeInTheDocument();
    expect(screen.getByText('$3000.00')).toBeInTheDocument();
    expect(screen.getByText('$2000.00')).toBeInTheDocument();
    expect(screen.getByText('$1500.00')).toBeInTheDocument();
  });

  test('switches between current year and last year', () => {
    render(<MockAnalyticsSection />);
    
    const currentYear = new Date().getFullYear();
    
    expect(screen.getByText(`Income vs Expenses (${currentYear})`)).toBeInTheDocument();
    
    const currentYearBtn = screen.getByTestId('current-year-btn');
    const lastYearBtn = screen.getByTestId('last-year-btn');
    expect(currentYearBtn.className).toContain('from-green-400');
    expect(lastYearBtn.className).not.toContain('from-green-400');
    
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    expect(screen.queryByText('Utilities')).not.toBeInTheDocument();
    
    fireEvent.click(lastYearBtn);
    expect(screen.getByText(`Income vs Expenses (${currentYear - 1})`)).toBeInTheDocument();
    
    expect(lastYearBtn.className).toContain('from-green-400');
    expect(currentYearBtn.className).not.toContain('from-green-400');
    
    expect(screen.queryByText('Healthcare')).not.toBeInTheDocument();
    expect(screen.getByText('Utilities')).toBeInTheDocument();
    
    fireEvent.click(currentYearBtn);
    
    expect(screen.getByText(`Income vs Expenses (${currentYear})`)).toBeInTheDocument();
    
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    expect(screen.queryByText('Utilities')).not.toBeInTheDocument();
  });

  test('displays category data correctly', () => {
    render(<MockAnalyticsSection />);
    
    const categoryList = screen.getByTestId('category-list');
    expect(categoryList).toBeInTheDocument();
    
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Housing')).toBeInTheDocument();
    expect(screen.getByText('Transportation')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();

    expect(screen.getByText('$5000.00')).toBeInTheDocument();
    expect(screen.getByText('$12000.00')).toBeInTheDocument();
    expect(screen.getByText('$3000.00')).toBeInTheDocument();
    expect(screen.getByText('$2000.00')).toBeInTheDocument();
    expect(screen.getByText('$1500.00')).toBeInTheDocument();
    
    const totalExpenses = 5000 + 12000 + 3000 + 2000 + 1500;
    expect(screen.getByText(`${((5000 / totalExpenses) * 100).toFixed(1)}% of total`)).toBeInTheDocument();
    expect(screen.getByText(`${((12000 / totalExpenses) * 100).toFixed(1)}% of total`)).toBeInTheDocument();
  });
});
