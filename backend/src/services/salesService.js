const Sale = require('../models/Sale');

const buildQuery = (filters) => {
  const query = {};
 
  if (filters.customerRegion && filters.customerRegion.length > 0) {
    query.customerRegion = { $in: filters.customerRegion };
  }
  
 
  if (filters.gender && filters.gender.length > 0) {
    query.gender = { $in: filters.gender };
  }
  
  
  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    query.age = {};
    if (filters.ageMin !== undefined) {
      query.age.$gte = filters.ageMin;
    }
    if (filters.ageMax !== undefined) {
      query.age.$lte = filters.ageMax;
    }
  }
  

  if (filters.productCategory && filters.productCategory.length > 0) {
    query.productCategory = { $in: filters.productCategory };
  }
  
  
  if (filters.tags && filters.tags.length > 0) {
    query.tags = { $in: filters.tags };
  }
  
 
  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    query.paymentMethod = { $in: filters.paymentMethod };
  }
 
  if (filters.dateFrom || filters.dateTo) {
    query.date = {};
    if (filters.dateFrom) {
      query.date.$gte = new Date(filters.dateFrom);
    }
    if (filters.dateTo) {
      const endDate = new Date(filters.dateTo);
      endDate.setHours(23, 59, 59, 999);
      query.date.$lte = endDate;
    }
  }
  
  return query;
};


const buildSearchQuery = (search) => {
  if (!search || !search.trim()) {
    return {};
  }
  
  const searchTerm = search.trim();
  
  return {
    $or: [
      { customerName: { $regex: searchTerm, $options: 'i' } },
      { phoneNumber: { $regex: searchTerm, $options: 'i' } }
    ]
  };
};


const getSalesData = async ({ search, filters, sortBy, sortOrder, page, limit }) => {
  try {
    
    const searchQuery = buildSearchQuery(search);
    const filterQuery = buildQuery(filters);
    const combinedQuery = { ...searchQuery, ...filterQuery };
    
    
    const sortOptions = {};
    sortOptions[sortBy || 'date'] = sortOrder === 'asc' ? 1 : -1;
    
   
    const totalItems = await Sale.countDocuments(combinedQuery);
    
 
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const skip = (currentPage - 1) * limit;
    
    
    const data = await Sale.find(combinedQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();
    
    const formattedData = data.map(item => ({
      ...item,
      date: item.date ? item.date.toISOString().split('T')[0] : null
    }));
    
    // Calculate stats using aggregation
    const statsResult = await Sale.aggregate([
      { $match: combinedQuery },
      {
        $group: {
          _id: null,
          totalUnitsSold: { $sum: '$quantity' },
          totalAmount: { $sum: '$totalAmount' },
          totalDiscount: { $sum: { $subtract: ['$totalAmount', '$finalAmount'] } },
          salesRecords: { $sum: 1 },
          discountRecords: {
            $sum: { $cond: [{ $gt: ['$discountPercentage', 0] }, 1, 0] }
          }
        }
      }
    ]);
    
    const stats = statsResult[0] || {
      totalUnitsSold: 0,
      totalAmount: 0,
      totalDiscount: 0,
      salesRecords: 0,
      discountRecords: 0
    };
    
    return {
      data: formattedData,
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
      },
      stats: {
        totalUnitsSold: Math.round(stats.totalUnitsSold || 0),
        totalAmount: Math.round((stats.totalAmount || 0) * 100) / 100,
        totalDiscount: Math.round((stats.totalDiscount || 0) * 100) / 100,
        salesRecords: stats.salesRecords || 0,
        discountRecords: stats.discountRecords || 0
      }
    };
  } catch (error) {
    console.error('Error in getSalesData:', error);
    throw error;
  }
};


const getFilterOptions = async () => {
  try {
    const [
      customerRegions,
      genders,
      productCategories,
      tags,
      paymentMethods,
      ageStats,
      dateStats
    ] = await Promise.all([
      Sale.distinct('customerRegion'),
      Sale.distinct('gender'),
      Sale.distinct('productCategory'),
      Sale.distinct('tags'),
      Sale.distinct('paymentMethod'),
      Sale.aggregate([
        {
          $group: {
            _id: null,
            minAge: { $min: '$age' },
            maxAge: { $max: '$age' }
          }
        }
      ]),
      Sale.aggregate([
        {
          $group: {
            _id: null,
            minDate: { $min: '$date' },
            maxDate: { $max: '$date' }
          }
        }
      ])
    ]);
    
    const ageRange = ageStats[0] || { minAge: 0, maxAge: 100 };
    const dateRange = dateStats[0] || { minDate: null, maxDate: null };
    
    return {
      customerRegions: customerRegions.filter(Boolean).sort(),
      genders: genders.filter(Boolean).sort(),
      ageRange: {
        min: ageRange.minAge || 0,
        max: ageRange.maxAge || 100
      },
      productCategories: productCategories.filter(Boolean).sort(),
      tags: tags.filter(Boolean).sort(),
      paymentMethods: paymentMethods.filter(Boolean).sort(),
      dateRange: {
        min: dateRange.minDate ? dateRange.minDate.toISOString().split('T')[0] : '',
        max: dateRange.maxDate ? dateRange.maxDate.toISOString().split('T')[0] : ''
      }
    };
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    throw error;
  }
};


const getSaleById = async (transactionId) => {
  try {
    const sale = await Sale.findOne({ transactionId }).lean();
    if (sale && sale.date) {
      sale.date = sale.date.toISOString().split('T')[0];
    }
    return sale;
  } catch (error) {
    console.error('Error in getSaleById:', error);
    throw error;
  }
};

module.exports = {
  getSalesData,
  getFilterOptions,
  getSaleById
};