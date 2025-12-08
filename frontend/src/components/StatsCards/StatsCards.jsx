import React from 'react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const formatNumber = (num) => {
    if (!num) return '0';
    return Number(num).toLocaleString('en-IN');
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  return (
    <div className="stats-cards">
      {}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Total units sold</span>
          <svg className="stat-info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        </div>
        <div className="stat-value">
          {formatNumber(stats.totalUnitsSold)}
        </div>
      </div>

      {}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Total Amount</span>
          <svg className="stat-info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        </div>
        <div className="stat-value">
          {formatCurrency(stats.totalAmount)}
          <span className="stat-sub">({formatNumber(stats.salesRecords)} SRs)</span>
        </div>
      </div>

      {}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Total Discount</span>
          <svg className="stat-info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        </div>
        <div className="stat-value">
          {formatCurrency(stats.totalDiscount)}
          <span className="stat-sub">({formatNumber(stats.discountRecords)} SRs)</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;