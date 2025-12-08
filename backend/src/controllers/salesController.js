const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  try {
    const {
      search = '',
      customerRegion,
      gender,
      ageMin,
      ageMax,
      productCategory,
      tags,
      paymentMethod,
      dateFrom,
      dateTo,
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const filters = {
      customerRegion: customerRegion ? customerRegion.split(',').filter(Boolean) : [],
      gender: gender ? gender.split(',').filter(Boolean) : [],
      ageMin: ageMin ? parseInt(ageMin, 10) : undefined,
      ageMax: ageMax ? parseInt(ageMax, 10) : undefined,
      productCategory: productCategory ? productCategory.split(',').filter(Boolean) : [],
      tags: tags ? tags.split(',').filter(Boolean) : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',').filter(Boolean) : [],
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined
    };

    const result = await salesService.getSalesData({
      search: search.trim(),
      filters,
      sortBy,
      sortOrder: sortOrder.toLowerCase(),
      page: Math.max(1, parseInt(page, 10) || 1),
      limit: Math.min(100, Math.max(1, parseInt(limit, 10) || 10))
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error in getSales:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const filterOptions = await salesService.getFilterOptions();
    res.json({
      success: true,
      data: filterOptions
    });
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID is required'
      });
    }

    const sale = await salesService.getSaleById(id);
    
    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: sale
    });
  } catch (error) {
    console.error('Error in getSaleById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getSales,
  getFilterOptions,
  getSaleById
};