import React, { useState, useRef, useEffect } from 'react';

const FilterDropdown = ({ label, options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter(v => v !== option)
      : [...selectedValues, option];
    onChange(newValues);
  };

  const handleSelectAll = () => {
    onChange([...options]);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const selectedCount = selectedValues.length;
  const hasSelection = selectedCount > 0;

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button 
        className={`filter-btn ${hasSelection ? 'active' : ''} ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
        type="button"
      >
        <span className="filter-btn-label">{label}</span>
        {hasSelection && (
          <span className="filter-count">{selectedCount}</span>
        )}
        <svg 
          className={`filter-arrow ${isOpen ? 'rotated' : ''}`} 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          {}
          <div className="filter-actions">
            <button 
              type="button" 
              className="filter-action-btn"
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button 
              type="button" 
              className="filter-action-btn"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
          
          <div className="filter-divider"></div>
          
          {}
          <div className="filter-options-list">
            {options.length > 0 ? (
              options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-option ${selectedValues.includes(option) ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  <span className={`filter-checkbox ${selectedValues.includes(option) ? 'checked' : ''}`}>
                    {selectedValues.includes(option) && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </span>
                  <span className="filter-option-label">{option}</span>
                </button>
              ))
            ) : (
              <div className="filter-no-options">No options available</div>
            )}
          </div>
          
          {}
          {hasSelection && (
            <div className="filter-footer">
              <span className="filter-selected-count">{selectedCount} selected</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;