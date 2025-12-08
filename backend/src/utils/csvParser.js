const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');


let salesDataCache = [];
let isDataLoaded = false;


const columnMapping = {
  'Customer ID': 'customerId',
  'customer_id': 'customerId',
  'CustomerID': 'customerId',
  
  'Customer Name': 'customerName',
  'customer_name': 'customerName',
  'CustomerName': 'customerName',
  
  'Phone Number': 'phoneNumber',
  'phone_number': 'phoneNumber',
  'PhoneNumber': 'phoneNumber',
  'Phone': 'phoneNumber',
  
  'Gender': 'gender',
  'gender': 'gender',
  
  'Age': 'age',
  'age': 'age',
  
  'Customer Region': 'customerRegion',
  'customer_region': 'customerRegion',
  'CustomerRegion': 'customerRegion',
  'Region': 'customerRegion',
  
  'Customer Type': 'customerType',
  'customer_type': 'customerType',
  'CustomerType': 'customerType',
  
  'Product ID': 'productId',
  'product_id': 'productId',
  'ProductID': 'productId',
  
  'Product Name': 'productName',
  'product_name': 'productName',
  'ProductName': 'productName',
  
  'Brand': 'brand',
  'brand': 'brand',
  
  'Product Category': 'productCategory',
  'product_category': 'productCategory',
  'ProductCategory': 'productCategory',
  'Category': 'productCategory',
  
  'Tags': 'tags',
  'tags': 'tags',
  
  'Quantity': 'quantity',
  'quantity': 'quantity',
  'Qty': 'quantity',
  
  'Price per Unit': 'pricePerUnit',
  'price_per_unit': 'pricePerUnit',
  'PricePerUnit': 'pricePerUnit',
  'Unit Price': 'pricePerUnit',
  
  'Discount Percentage': 'discountPercentage',
  'discount_percentage': 'discountPercentage',
  'DiscountPercentage': 'discountPercentage',
  'Discount %': 'discountPercentage',
  'Discount': 'discountPercentage',
  
  'Total Amount': 'totalAmount',
  'total_amount': 'totalAmount',
  'TotalAmount': 'totalAmount',
  
  'Final Amount': 'finalAmount',
  'final_amount': 'finalAmount',
  'FinalAmount': 'finalAmount',
  
  'Transaction ID': 'transactionId',
  'transaction_id': 'transactionId',
  'TransactionID': 'transactionId',
  'Transaction_ID': 'transactionId',
  
  'Date': 'date',
  'date': 'date',
  'Order Date': 'date',
  
  'Payment Method': 'paymentMethod',
  'payment_method': 'paymentMethod',
  'PaymentMethod': 'paymentMethod',
  
  'Order Status': 'orderStatus',
  'order_status': 'orderStatus',
  'OrderStatus': 'orderStatus',
  'Status': 'orderStatus',
  
  'Delivery Type': 'deliveryType',
  'delivery_type': 'deliveryType',
  'DeliveryType': 'deliveryType',
  
  'Store ID': 'storeId',
  'store_id': 'storeId',
  'StoreID': 'storeId',
  
  'Store Location': 'storeLocation',
  'store_location': 'storeLocation',
  'StoreLocation': 'storeLocation',
  
  'Salesperson ID': 'salespersonId',
  'salesperson_id': 'salespersonId',
  'SalespersonID': 'salespersonId',
  'Employee ID': 'salespersonId',
  
  'Employee Name': 'employeeName',
  'employee_name': 'employeeName',
  'EmployeeName': 'employeeName',
  'Salesperson Name': 'employeeName'
};

const normalizeRow = (row) => {
  const normalized = {};
  
  for (const [csvColumn, value] of Object.entries(row)) {
    const standardField = columnMapping[csvColumn] || columnMapping[csvColumn.trim()];
    
    if (standardField) {
      normalized[standardField] = value;
    } else {
      const camelCaseKey = csvColumn
        .trim        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      normalized[camelCaseKey] = value;
    }
  }
  
  return cleanRow(normalized);
};

const cleanRow = (row) => {
  const cleaned = { ...row };
  
  if (cleaned.age) {
    cleaned.age = parseInt(cleaned.age, 10) || 0;
  }
  if (cleaned.quantity) {
    cleaned.quantity = parseInt(cleaned.quantity, 10) || 0;
  }
  if (cleaned.pricePerUnit) {
    cleaned.pricePerUnit = parseFloat(cleaned.pricePerUnit) || 0;
  }
  if (cleaned.discountPercentage) {
    cleaned.discountPercentage = parseFloat(cleaned.discountPercentage) || 0;
  }
  if (cleaned.totalAmount) {
    cleaned.totalAmount = parseFloat(cleaned.totalAmount) || 0;
  }
  if (cleaned.finalAmount) {
    cleaned.finalAmount = parseFloat(cleaned.finalAmount) || cleaned.totalAmount || 0;
  }
  
  if (cleaned.tags && typeof cleaned.tags === 'string') {
    cleaned.tags = cleaned.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
  } else if (!cleaned.tags) {
    cleaned.tags = [];
  }
  
  if (cleaned.date) {
    cleaned.date = formatDate(cleaned.date);
  }
  
  const stringFields = [
    'customerId', 'customerName', 'phoneNumber', 'gender', 
    'customerRegion', 'customerType', 'productId', 'productName',
    'brand', 'productCategory', 'paymentMethod', 'orderStatus',
    'deliveryType', 'storeId', 'storeLocation', 'salespersonId',
    'employeeName', 'transactionId'
  ];
  
  stringFields.forEach(field => {
    if (cleaned[field] && typeof cleaned[field] === 'string') {
      cleaned[field] = cleaned[field].trim();
    }
  });
  
  return cleaned;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  
  if (isNaN(date.getTime())) {
    const parts = dateStr.split(/[\/\-]/);
    if (parts.length === 3) {
      const [first, second, third] = parts.map(p => parseInt(p, 10));
      
      if (first > 12) {
        return `${third}-${String(second).padStart(2, '0')}-${String(first).padStart(2, '0')}`;
      } else if (third > 31) {
        return `${third}-${String(first).padStart(2, '0')}-${String(second).padStart(2, '0')}`;
      }
    }
    return dateStr; // Return as-is if can't parse
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const loadCSVData = () => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/sales.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.warn('⚠️  CSV file not found at:', csvPath);
      console.warn('⚠️  Please place your sales.csv file in backend/src/data/');
      salesDataCache = [];
      isDataLoaded = true;
      resolve([]);
      return;
    }
    
    const results = [];
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        const normalizedRow = normalizeRow(row);
        results.push(normalizedRow);
      })
      .on('end', () => {
        salesDataCache = results;
        isDataLoaded = true;
        console.log(`✅ Loaded ${results.length} records from CSV`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV file:', error);
        reject(error);
      });
  });
};

const getSalesData = () => {
  if (!isDataLoaded) {
    console.warn('⚠️  Data not loaded yet. Call loadCSVData() first.');
    return [];
  }
  return salesDataCache;
};

const reloadCSVData = async () => {
  isDataLoaded = false;
  salesDataCache = [];
  return loadCSVData();
};

module.exports = {
  loadCSVData,
  getSalesData,
  reloadCSVData
};