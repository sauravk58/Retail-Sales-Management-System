import React, { useState, useRef, useEffect } from 'react';

const AgeRangeFilter = ({ minAge, maxAge, selectedMin, selectedMax, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localMin, setLocalMin] = useState(() => selectedMin ?? '');
  const [localMax, setLocalMax] = useState(() => selectedMax ?? '');
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
      setLocalMin(selectedMin ?? '');
      setLocalMax(selectedMax ?? '');
    }
    setIsOpen(!isOpen);
  };

  const hasSelection = selectedMin !== undefined || selectedMax !== undefined;

  const handleApply = () => {
    const min = localMin !== '' ? parseInt(localMin, 10) : undefined;
    const max = localMax !== '' ? parseInt(localMax, 10) : undefined;
    onChange(min, max);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalMin('');
    setLocalMax('');
    onChange(undefined, undefined);
    setIsOpen(false);
  };

  const handlePresetClick = (min, max) => {
    setLocalMin(min);
    setLocalMax(max);
    onChange(min, max);
    setIsOpen(false);
  };

  const presets = [
    { label: '18-25', min: 18, max: 25 },
    { label: '26-35', min: 26, max: 35 },
    { label: '36-45', min: 36, max: 45 },
    { label: '46-55', min: 46, max: 55 },
    { label: '56+', min: 56, max: 100 }
  ];

  const getDisplayText = () => {
    if (selectedMin !== undefined && selectedMax !== undefined) {
      return `${selectedMin}-${selectedMax}`;
    }
    if (selectedMin !== undefined) {
      return `${selectedMin}+`;
    }
    if (selectedMax !== undefined) {
      return `Up to ${selectedMax}`;
    }
    return 'Age Range';
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
        <div className="filter-dropdown age-range-dropdown">
          {}
          <div className="age-presets">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={`age-preset-btn ${
                  localMin == preset.min && localMax == preset.max ? 'active' : ''
                }`}
                onClick={() => handlePresetClick(preset.min, preset.max)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="age-divider">or custom range</div>

          {/* Custom Range Inputs */}
          <div className="age-inputs">
            <div className="age-input-group">
              <label>Min Age</label>
              <input
                type="number"
                placeholder={String(minAge)}
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
                min={minAge}
                max={maxAge}
              />
            </div>
            <span className="age-separator">—</span>
            <div className="age-input-group">
              <label>Max Age</label>
              <input
                type="number"
                placeholder={String(maxAge)}
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
                min={minAge}
                max={maxAge}
              />
            </div>
          </div>

          {}
          <div className="age-actions">
            <button type="button" className="age-clear-btn" onClick={handleClear}>
              Clear
            </button>
            <button type="button" className="age-apply-btn" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeRangeFilter;