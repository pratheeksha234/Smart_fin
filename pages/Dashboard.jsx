import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const kpiData = {
    income: '₹1,20,000',
    expenses: '₹95,000',
    savings: '₹25,000',
    prediction: 'Next ideal investment → June 2025'
  };

  const savingsBarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Monthly Savings (₹)',
        data: [10000, 12000, 8000, 15000, 11000],
        backgroundColor: '#60a5fa'
      }
    ]
  };

  const trendLineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Income (₹)',
        data: [25000, 27000, 23000, 30000, 28000],
        borderColor: '#10b981',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Expenses (₹)',
        data: [20000, 22000, 25000, 18000, 25000],
        borderColor: '#ef4444',
        tension: 0.3,
        fill: false
      }
    ]
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 SmartFin Dashboard</h2>

      {/* KPI Cards */}
      <div className="row text-center mb-4">
        {Object.entries(kpiData).map(([key, value], index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div className="card shadow-sm h-100 border-primary">
              <div className="card-body">
                <h6 className="card-title text-uppercase text-muted">{key.replace(/_/g, ' ')}</h6>
                <h5 className="card-text">{value}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">💰 Monthly Savings</h5>
            <Bar data={savingsBarData} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">📈 Income vs Expenses</h5>
            <Line data={trendLineData} />
          </div>
        </div>
      </div>

      {/* AI Insight Block */}
      <div className="card p-4 mt-4 shadow-sm border-0 bg-light">
        <h5>🧠 AI Insight</h5>
        <p>This space will show smart insights about your financial behavior. For example, it might suggest increasing your emergency fund or optimizing investments based on trends.</p>
      </div>
    </div>
  );
};

export default Dashboard;
