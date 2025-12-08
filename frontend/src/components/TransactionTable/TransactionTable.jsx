import React from 'react';
import './TransactionTable.css';

const TransactionTable = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const formatCurrency = (amount) => {
    if (!amount) return '₹ 0';
    return `₹ ${Number(amount).toLocaleString('en-IN')}`;
  };

  const formatQuantity = (qty) => {
    return String(qty || 0).padStart(2, '0');
  };

  const handleCopyPhone = (phone, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
  };

  return (
    <div className="table-container">
      <div className="table-scroll-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Customer name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Product Category</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Customer Region</th>
              <th>Product ID</th>
              <th>Employee Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.transactionId || index}>
                <td>{row.transactionId || '-'}</td>
                <td>{row.date || '-'}</td>
                <td>{row.customerId || '-'}</td>
                <td>{row.customerName || '-'}</td>
                <td>
                  <span className="phone-cell">
                    <span className="phone-number">{row.phoneNumber || '-'}</span>
                    {row.phoneNumber && (
                      <button 
                        className="copy-btn" 
                        title="Copy"
                        onClick={(e) => handleCopyPhone(row.phoneNumber, e)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                      </button>
                    )}
                  </span>
                </td>
                <td>{row.gender || '-'}</td>
                <td>{row.age || '-'}</td>
                <td>{row.productCategory || '-'}</td>
                <td>{formatQuantity(row.quantity)}</td>
                <td>{formatCurrency(row.totalAmount)}</td>
                <td>{row.customerRegion || '-'}</td>
                <td>{row.productId || '-'}</td>
                <td>{row.employeeName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;