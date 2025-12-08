import React, { useState, useRef, useEffect } from 'react';
import './SortDropdown.css';

const SortDropdown = ({ sortBy, sortOrder, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'customerName', order: 'asc', label: 'Customer Name (A-Z)' },
    { value: 'customerName', order: 'desc', label: 'Customer Name (Z-A)' },
    { value: 'date', order: 'desc', label: 'Date (Newest First)' },
    { value: 'date', order: 'asc', label: 'Date (Oldest First)' },
    { value: 'quantity', order: 'desc', label: 'Quantity (High to Low)' },
    { value: 'quantity', order: 'asc', label: 'Quantity (Low to High)' },
    { value: 'totalAmount', order: 'desc', label: 'Amount (High to Low)' },
    { value: 'totalAmount', order: 'asc', label: 'Amount (Low to High)' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSortChange(option.value, option.order);
    setIsOpen(false);
  };

  // Get current sort label
  const getCurrentLabel = () => {
    const current = sortOptions.find(
      opt => opt.value === sortBy && opt.order === sortOrder
    );
    return current ? current.label : 'Customer Name (A-Z)';
  };

  return (
    <div className={`sort-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button className="sort-trigger" onClick={toggleDropdown}>
        <span className="sort-label">Sort by: {getCurrentLabel()}</span>
        <svg 
          className={`sort-arrow ${isOpen ? 'rotated' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="sort-options">
          {sortOptions.map((option) => (
            <button
              key={`${option.value}-${option.order}`}
              className={`sort-option ${
                sortBy === option.value && sortOrder === option.order ? 'active' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
              {sortBy === option.value && sortOrder === option.order && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;