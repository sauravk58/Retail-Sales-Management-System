import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import SearchBar from './components/SearchBar/SearchBar';
import FilterPanel from './components/FilterPanel/FilterPanel';
import StatsCards from './components/StatsCards/StatsCards';
import TransactionTable from './components/TransactionTable/TransactionTable';
import SortDropdown from './components/SortDropdown/SortDropdown';
import Pagination from './components/Pagination/Pagination';
import Loader from './components/Loader/Loader';
import { getSales, getFilterOptions } from './services/api';
import './App.css';

const App = () => {
  // Data state
  const [salesData, setSalesData] = useState([]);
  const [stats, setStats] = useState({
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0,
    salesRecords: 0,
    discountRecords: 0
  });
  const [filterOptions, setFilterOptions] = useState({
    customerRegions: [],
    genders: [],
    ageRange: { min: 0, max: 100 },
    productCategories: [],
    tags: [],
    paymentMethods: [],
    dateRange: { min: '', max: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Filter state
  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    ageMin: undefined,
    ageMax: undefined,
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateFrom: '',
    dateTo: ''
  });

  // Sort state
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await getFilterOptions();
        if (response.success) {
          setFilterOptions(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch sales data
  const fetchSalesData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getSales({
        search: searchQuery,
        filters,
        sortBy,
        sortOrder,
        page: currentPage,
        limit: 10
      });

      if (response.success) {
        setSalesData(response.data);
        setStats(response.stats);
        setPagination(response.pagination);
      } else {
        throw new Error(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch sales data');
      console.error('Error fetching sales:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  // Reset to page 1 when search, filters, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortBy, sortOrder]);

  // Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterName, values) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: values
    }));
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="app">
      <button 
        className="mobile-menu-btn" 
        onClick={() => setSidebarOpen(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <h1 className="page-title">Sales Management System</h1>
          </div>
          <div className="header-right">
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Name, Phone no."
            />
          </div>
        </header>

        <section className="filter-section">
          <div className="filters-left">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="filters-right">
            <SortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        </section>

        <section className="stats-section">
          <StatsCards stats={stats} />
        </section>

        {error && (
          <div className="error-container">
            <div className="error-message">
              <span>⚠️ {error}</span>
              <button className="retry-btn" onClick={fetchSalesData}>
                Retry
              </button>
            </div>
          </div>
        )}

        <section className="table-section">
          {loading ? (
            <div className="loading-container">
              <Loader />
            </div>
          ) : salesData.length > 0 ? (
            <TransactionTable data={salesData} />
          ) : (
            <div className="no-results">
              <div className="no-results-icon">📭</div>
              <h3>No results found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>

        {!loading && salesData.length > 0 && (
          <section className="pagination-section">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={handlePageChange}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default App;