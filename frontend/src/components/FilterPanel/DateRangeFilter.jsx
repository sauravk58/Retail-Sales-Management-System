import React, { useState, useRef, useEffect } from 'react';

const DateRangeFilter = ({ minDate, maxDate, selectedFrom, selectedTo, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFrom, setLocalFrom] = useState(() => selectedFrom ?? '');
  const [localTo, setLocalTo] = useState(() => selectedTo ?? '');
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
    if (!isOpen) {
      setLocalFrom(selectedFrom ?? '');
      setLocalTo(selectedTo ?? '');
    }
    setIsOpen(!isOpen);
  };

  const hasSelection = selectedFrom || selectedTo;

  const handleApply = () => {
    onChange(localFrom || undefined, localTo || undefined);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalFrom('');
    setLocalTo('');
    onChange(undefined, undefined);
    setIsOpen(false);
  };

  const handlePresetClick = (days) => {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - days);
    
    const fromStr = from.toISOString().split('T')[0];
    const toStr = today.toISOString().split('T')[0];
    
    setLocalFrom(fromStr);
    setLocalTo(toStr);
    onChange(fromStr, toStr);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (selectedFrom && selectedTo) {
      return `${selectedFrom} - ${selectedTo}`;
    }
    if (selectedFrom) {
      return `From ${selectedFrom}`;
    }
    if (selectedTo) {
      return `Until ${selectedTo}`;
    }
    return 'Date';
  };

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button 
        className={`filter-btn ${hasSelection ? 'active' : ''} ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
        type="button"
      >
        <span className="filter-btn-label">{getDisplayText()}</span>
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
        <div className="filter-dropdown date-range-dropdown">
          {}
          <div className="date-presets">
            <button type="button" onClick={() => handlePresetClick(0)}>Today</button>
            <button type="button" onClick={() => handlePresetClick(7)}>Last 7 days</button>
            <button type="button" onClick={() => handlePresetClick(30)}>Last 30 days</button>
            <button type="button" onClick={() => handlePresetClick(90)}>Last 90 days</button>
          </div>

          <div className="date-divider">or select dates</div>

          {}
          <div className="date-inputs">
            <div className="date-input-group">
              <label>From</label>
              <input
                type="date"
                value={localFrom}
                onChange={(e) => setLocalFrom(e.target.value)}
                min={minDate}
                max={maxDate}
              />
            </div>
            <div className="date-input-group">
              <label>To</label>
              <input
                type="date"
                value={localTo}
                onChange={(e) => setLocalTo(e.target.value)}
                min={minDate}
                max={maxDate}
              />
            </div>
          </div>

          {}
          <div className="date-actions">
            <button type="button" className="date-clear-btn" onClick={handleClear}>
              Clear
            </button>
            <button type="button" className="date-apply-btn" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;