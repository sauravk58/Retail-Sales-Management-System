const applyFilters = (data, filters) => {
  let filteredData = [...data];

  if (filters.customerRegion && filters.customerRegion.length > 0) {
    filteredData = filteredData.filter(item =>
      item.customerRegion && filters.customerRegion.includes(item.customerRegion)
    );
  }

  if (filters.gender && filters.gender.length > 0) {
    filteredData = filteredData.filter(item =>
      item.gender && filters.gender.includes(item.gender)
    );
  }

  if (filters.ageMin !== undefined && !isNaN(filters.ageMin)) {
    filteredData = filteredData.filter(item => {
      const age = parseInt(item.age, 10);
      return !isNaN(age) && age >= filters.ageMin;
    });
  }

  if (filters.ageMax !== undefined && !isNaN(filters.ageMax)) {
    filteredData = filteredData.filter(item => {
      const age = parseInt(item.age, 10);
      return !isNaN(age) && age <= filters.ageMax;
    });
  }

  if (filters.productCategory && filters.productCategory.length > 0) {
    filteredData = filteredData.filter(item =>
      item.productCategory && filters.productCategory.includes(item.productCategory)
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    filteredData = filteredData.filter(item => {
      if (!item.tags) return false;
      const itemTags = Array.isArray(item.tags) 
        ? item.tags 
        : (typeof item.tags === 'string' ? item.tags.split(',').map(t => t.trim()) : []);
      return itemTags.some(tag => filters.tags.includes(tag));
    });
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    filteredData = filteredData.filter(item =>
      item.paymentMethod && filters.paymentMethod.includes(item.paymentMethod)
    );
  }

  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    fromDate.setHours(0, 0, 0, 0);
    filteredData = filteredData.filter(item => {
      if (!item.date) return false;
      const itemDate = new Date(item.date);
      return itemDate >= fromDate;
    });
  }

  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    toDate.setHours(23, 59, 59, 999);
    filteredData = filteredData.filter(item => {
      if (!item.date) return false;
      const itemDate = new Date(item.date);
      return itemDate <= toDate;
    });
  }

  return filteredData;
};

module.exports = { applyFilters };