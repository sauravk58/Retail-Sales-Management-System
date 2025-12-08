const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');


router.get('/sales', salesController.getSales);

router.get('/sales/filters', salesController.getFilterOptions);

router.get('/sales/:id', salesController.getSaleById);

module.exports = router;