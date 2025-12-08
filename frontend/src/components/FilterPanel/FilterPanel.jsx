import React from 'react';
import FilterDropdown from './FilterDropdown';
import AgeRangeFilter from './AgeRangeFilter';
import DateRangeFilter from './DateRangeFilter';
import './FilterPanel.css';

const FilterPanel = ({ filters, filterOptions, onFilterChange }) => {
  
  const handleRefresh = () => {
    onFilterChange('customerRegion', []);
    onFilterChange('gender', []);
    onFilterChange('ageMin', undefined);
    onFilterChange('ageMax', undefined);
    onFilterChange('productCategory', []);
    onFilterChange('tags', []);
    onFilterChange('paymentMethod', []);
    onFilterChange('dateFrom', undefined);
    onFilterChange('dateTo', undefined);
  };

  return (
    <div className="filter-panel">
      <button 
        className="refresh-btn" 
        onClick={handleRefresh}
        title="Reset all filters"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 4v6h-6"/>
          <path d="M1 20v-6h6"/>
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
        </svg>
      </button>

      <FilterDropdown
        label="Customer Region"
        options={filterOptions.customerRegions || []}
        selectedValues={filters.customerRegion || []}
        onChange={(values) => onFilterChange('customerRegion', values)}
      />

      <FilterDropdown
        label="Gender"
        options={filterOptions.genders || []}
        selectedValues={filters.gender || []}
        onChange={(values) => onFilterChange('gender', values)}
      />

      <AgeRangeFilter
        minAge={filterOptions.ageRange?.min || 0}
        maxAge={filterOptions.ageRange?.max || 100}
        selectedMin={filters.ageMin}
        selectedMax={filters.ageMax}
        onChange={(min, max) => {
          onFilterChange('ageMin', min);
          onFilterChange('ageMax', max);
        }}
      />

      <FilterDropdown
        label="Product Category"
        options={filterOptions.productCategories || []}
        selectedValues={filters.productCategory || []}
        onChange={(values) => onFilterChange('productCategory', values)}
      />

      <FilterDropdown
        label="Tags"
        options={filterOptions.tags || []}
        selectedValues={filters.tags || []}
        onChange={(values) => onFilterChange('tags', values)}
      />

      <FilterDropdown
        label="Payment Method"
        options={filterOptions.paymentMethods || []}
        selectedValues={filters.paymentMethod || []}
        onChange={(values) => onFilterChange('paymentMethod', values)}
      />

      <DateRangeFilter
        minDate={filterOptions.dateRange?.min || ''}
        maxDate={filterOptions.dateRange?.max || ''}
        selectedFrom={filters.dateFrom}
        selectedTo={filters.dateTo}
        onChange={(from, to) => {
          onFilterChange('dateFrom', from);
          onFilterChange('dateTo', to);
        }}
      />
    </div>
  );
};

export default FilterPanel;