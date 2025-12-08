import React, { useState, useEffect, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onChange, value]);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = useCallback(() => {
    setInputValue('');
    onChange('');
  }, [onChange]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-icon">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label="Search"
      />
      {inputValue && (
        <button 
          className="search-clear" 
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;