import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Backend server may not be running');
      return Promise.reject({ 
        success: false, 
        message: 'Cannot connect to server. Please ensure backend is running on port 5000.' 
      });
    }
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout Error: Request took too long');
      return Promise.reject({ 
        success: false, 
        message: 'Request timeout. Please try again.' 
      });
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

export const getSales = async ({ search, filters, sortBy, sortOrder, page, limit }) => {
  try {
    const params = new URLSearchParams();

    if (search && search.trim()) {
      params.append('search', search.trim());
    }

    if (filters.customerRegion?.length > 0) {
      params.append('customerRegion', filters.customerRegion.join(','));
    }
    if (filters.gender?.length > 0) {
      params.append('gender', filters.gender.join(','));
    }
    if (filters.ageMin !== undefined && filters.ageMin !== null && filters.ageMin !== '') {
      params.append('ageMin', filters.ageMin);
    }
    if (filters.ageMax !== undefined && filters.ageMax !== null && filters.ageMax !== '') {
      params.append('ageMax', filters.ageMax);
    }
    if (filters.productCategory?.length > 0) {
      params.append('productCategory', filters.productCategory.join(','));
    }
    if (filters.tags?.length > 0) {
      params.append('tags', filters.tags.join(','));
    }
    if (filters.paymentMethod?.length > 0) {
      params.append('paymentMethod', filters.paymentMethod.join(','));
    }
    if (filters.dateFrom) {
      params.append('dateFrom', filters.dateFrom);
    }
    if (filters.dateTo) {
      params.append('dateTo', filters.dateTo);
    }

    if (sortBy) {
      params.append('sortBy', sortBy);
    }
    if (sortOrder) {
      params.append('sortOrder', sortOrder);
    }

    params.append('page', page || 1);
    params.append('limit', limit || 10);

    const queryString = params.toString();
    const url = `/sales${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching:', API_BASE_URL + url);
    
    const response = await api.get(url);
    return response;
  } catch (error) {
    console.error('getSales Error:', error);
    throw error;
  }
};

export const getFilterOptions = async () => {
  try {
    const response = await api.get('/sales/filters');
    return response;
  } catch (error) {
    console.error('getFilterOptions Error:', error);
    return {
      success: true,
      data: {
        customerRegions: [],
        genders: [],
        ageRange: { min: 0, max: 100 },
        productCategories: [],
        tags: [],
        paymentMethods: [],
        dateRange: { min: '', max: '' }
      }
    };
  }
};

export default api;