import React, { useState } from 'react';
import { format } from 'date-fns';

const Transactions = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!accountNumber.trim()) return;

    fetch(`http://127.0.0.1:5000/transactions/${accountNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setTransactions([]);
        } else {
          setTransactions(data.transactions);
          setError('');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Something went wrong. Please try again.');
      });
  };

  const downloadCSV = () => {
    if (transactions.length === 0) return;

    const headers = Object.keys(transactions[0]);
    const rows = transactions.map((tx) =>
      headers.map((key) => {
        const value = tx[key];
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${accountNumber}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">🔍 View Transactions</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {transactions.length > 0 && (
        <>
          <div className="mb-3 text-end">
            <button className="btn btn-success" onClick={downloadCSV}>
              ⬇️ Download CSV
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount (₹)</th>
                  <th>Account</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td>{format(new Date(tx.Date), 'yyyy-MM-dd')}</td>
                    <td>{tx.Category}</td>
                    <td>{tx.Description}</td>
                    <td className={tx.Amount < 0 ? 'text-danger' : 'text-success'}>
                      {tx.Amount.toLocaleString()}
                    </td>
                    <td>{tx.Account}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
