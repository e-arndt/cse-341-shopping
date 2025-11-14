// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },

  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 40,
  },

  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },

  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },

  brand: {
    // manufacturer
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  quantityInStock: {
    type: Number,
    required: true,
    min: 0,
  },

  countryOfOrigin: {
    type: String,
    trim: true,
    maxlength: 60,
  },

  color: {
    type: String,
    trim: true,
    maxlength: 40,
  },

  weight: {
    type: Number,
    min: 0,
  },

  size: {
    type: String,
    trim: true,
    maxlength: 40,
  },
});

module.exports = mongoose.model('Product', productSchema);
