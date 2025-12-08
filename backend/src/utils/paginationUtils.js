
const paginateData = (data, page = 1, limit = 10) => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  
  const currentPage = Math.min(Math.max(1, page), totalPages);
  
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);
  
  const paginatedItems = data.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: endIndex
    }
  };
};

module.exports = { paginateData };