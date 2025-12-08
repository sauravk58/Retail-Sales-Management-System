const searchSales = (data, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return data;
  }

  const query = searchQuery.toLowerCase().trim();
  
  const queryClean = query.replace(/[\s\-\(\)\+]/g, '');

  return data.filter(item => {
    const customerName = (item.customerName || '').toLowerCase();
    const nameMatch = customerName.includes(query);

    const phoneNumber = (item.phoneNumber || '').replace(/[\s\-\(\)\+]/g, '');
    const phoneMatch = phoneNumber.includes(queryClean);

    return nameMatch || phoneMatch;
  });
};

module.exports = { searchSales };