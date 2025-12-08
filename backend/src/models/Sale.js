const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  customerId: {
    type: String,
    required: true,
    index: true
  },
  customerName: {
    type: String,
    required: true,
    index: true
  },
  phoneNumber: {
    type: String,
    index: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    index: true
  },
  age: {
    type: Number,
    index: true
  },
  customerRegion: {
    type: String,
    index: true
  },
  customerType: {
    type: String
  },
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String
  },
  brand: {
    type: String
  },
  productCategory: {
    type: String,
    index: true
  },
  tags: [{
    type: String
  }],
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  finalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    index: true
  },
  orderStatus: {
    type: String
  },
  deliveryType: {
    type: String
  },
  storeId: {
    type: String
  },
  storeLocation: {
    type: String
  },
  salespersonId: {
    type: String
  },
  employeeName: {
    type: String
  }
}, {
  timestamps: true
});


saleSchema.index({ customerName: 'text', phoneNumber: 'text' });


saleSchema.index({ customerRegion: 1, gender: 1, productCategory: 1 });
saleSchema.index({ date: -1 });

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;