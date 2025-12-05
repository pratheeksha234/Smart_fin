import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Connect = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [summary, setSummary] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
    setResponseMessage('');
    setSummary(null);
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setResponseMessage(data.error);
          setUploadSuccess(false);
        } else {
          setUploadSuccess(true);
          setResponseMessage(data.message);
          setSummary(data.summary);
        }
      })
      .catch((err) => {
        console.error('Upload failed:', err);
        setResponseMessage('Upload failed. Try again.');
        setUploadSuccess(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Connect Your Data</h2>
        <p className="text-muted">
          Upload your CSV, Excel, or PDF file to analyze your financial summary.
        </p>
      </div>

      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept=".csv, .xlsx, .pdf"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={!file}
        >
          Connect File
        </button>

        {uploadSuccess && (
          <div className="alert alert-success mt-3">
            {responseMessage} <strong>{file.name}</strong>!
          </div>
        )}

        {!uploadSuccess && responseMessage && (
          <div className="alert alert-danger mt-3">{responseMessage}</div>
        )}
      </div>

      {summary && (
        <div className="mt-5">
          <h4 className="mb-4">📊 Summary</h4>

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Income</h5>
                  <p className="card-text">
                    ₹{summary.total_income.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Expense</h5>
                  <p className="card-text">
                    ₹{summary.total_expense.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Net Savings</h5>
                  <p className="card-text">
                    ₹{summary.savings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mb-5">
            <h5>Monthly Income vs Expense</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.monthly}>
                <XAxis dataKey="Month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#28a745" name="Income" />
                <Bar dataKey="expense" fill="#dc3545" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Expenses */}
          {summary.top_expenses && (
            <div>
              <h5>Top 5 Expense Categories</h5>
              <ul className="list-group">
                {Object.entries(summary.top_expenses).map(([cat, amt]) => (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={cat}
                  >
                    <span>{cat}</span>
                    <span>₹{amt.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-muted">
        <small>
          Note: Supported formats include .csv, .xlsx, and .pdf with columns like
          Date, Category, and Amount.
        </small>
      </div>
    </div>
  );
};

export default Connect;