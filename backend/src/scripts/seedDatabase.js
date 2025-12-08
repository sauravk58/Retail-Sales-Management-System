const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Sale = require('../models/Sale');

const MONGODB_URI = process.env.MONGODB_URI;

const columnMapping = {
  'Transaction ID': 'transactionId',
  'Date': 'date',
  'Customer ID': 'customerId',
  'Customer Name': 'customerName',
  'Phone Number': 'phoneNumber',
  'Gender': 'gender',
  'Age': 'age',
  'Customer Region': 'customerRegion',
  'Customer Type': 'customerType',
  'Product ID': 'productId',
  'Product Name': 'productName',
  'Brand': 'brand',
  'Product Category': 'productCategory',
  'Tags': 'tags',
  'Quantity': 'quantity',
  'Price per Unit': 'pricePerUnit',
  'Discount Percentage': 'discountPercentage',
  'Total Amount': 'totalAmount',
  'Final Amount': 'finalAmount',
  'Payment Method': 'paymentMethod',
  'Order Status': 'orderStatus',
  'Delivery Type': 'deliveryType',
  'Store ID': 'storeId',
  'Store Location': 'storeLocation',
  'Salesperson ID': 'salespersonId',
  'Employee Name': 'employeeName'
};

const normalizeRow = (row) => {
  const normalized = {};
  
  for (const [csvCol, value] of Object.entries(row)) {
    const key = columnMapping[csvCol.trim()] || csvCol.trim();
    normalized[key] = value;
  }
  
  
  if (normalized.date) {
    normalized.date = new Date(normalized.date);
  }
  
  
  normalized.age = parseInt(normalized.age, 10) || 0;
  normalized.quantity = parseInt(normalized.quantity, 10) || 1;
  normalized.pricePerUnit = parseFloat(normalized.pricePerUnit) || 0;
  normalized.discountPercentage = parseFloat(normalized.discountPercentage) || 0;
  normalized.totalAmount = parseFloat(normalized.totalAmount) || 0;
  normalized.finalAmount = parseFloat(normalized.finalAmount) || normalized.totalAmount;
  
 
  if (normalized.tags && typeof normalized.tags === 'string') {
    normalized.tags = normalized.tags.split(',').map(t => t.trim()).filter(t => t);
  } else {
    normalized.tags = [];
  }
  
  return normalized;
};

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    
    console.log('Clearing existing data...');
    await Sale.deleteMany({});
    
    const csvPath = path.join(__dirname, '../data/sales.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('CSV file not found at:', csvPath);
      process.exit(1);
    }
    
    const records = [];
    
    console.log('Reading CSV file...');
    
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          const normalized = normalizeRow(row);
          records.push(normalized);
        })
        .on('end', resolve)
        .on('error', reject);
    });
    
    console.log(`Found ${records.length} records`);
    
    
    const batchSize = 1000;
    let inserted = 0;
    
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await Sale.insertMany(batch, { ordered: false });
      inserted += batch.length;
      console.log(`Inserted ${inserted}/${records.length} records`);
    }
    
    console.log('Database seeded successfully!');
    console.log(`Total records: ${records.length}`);
    
   
    console.log('Creating indexes...');
    await Sale.createIndexes();
    console.log('Indexes created');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();