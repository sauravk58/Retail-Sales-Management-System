
const applySorting = (data, sortBy = 'date', sortOrder = 'desc') => {
  const sortedData = [...data];

  const sortFunctions = {
    date: (a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    },
    quantity: (a, b) => {
      const qtyA = a.quantity || 0;
      const qtyB = b.quantity || 0;
      return sortOrder === 'desc' ? qtyB - qtyA : qtyA - qtyB;
    },
    customerName: (a, b) => {
      const nameA = (a.customerName || '').toLowerCase();
      const nameB = (b.customerName || '').toLowerCase();
      const comparison = nameA.localeCompare(nameB);
      return sortOrder === 'desc' ? -comparison : comparison;
    },
    totalAmount: (a, b) => {
      const amountA = a.totalAmount || 0;
      const amountB = b.totalAmount || 0;
      return sortOrder === 'desc' ? amountB - amountA : amountA - amountB;
    },
    finalAmount: (a, b) => {
      const amountA = a.finalAmount || 0;
      const amountB = b.finalAmount || 0;
      return sortOrder === 'desc' ? amountB - amountA : amountA - amountB;
    }
  };

  const sortFunction = sortFunctions[sortBy] || sortFunctions.date;
  sortedData.sort(sortFunction);

  return sortedData;
};

module.exports = { applySorting };