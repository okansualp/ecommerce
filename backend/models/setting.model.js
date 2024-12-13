const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'Nostalji'
  },
  siteDescription: {
    type: String,
    required: true,
    default: 'Vintage ve Antika Ürünler'
  },
  currency: {
    type: String,
    required: true,
    enum: ['TRY', 'USD', 'EUR'],
    default: 'TRY'
  },
  language: {
    type: String,
    required: true,
    enum: ['tr', 'en'],
    default: 'tr'
  },
  timezone: {
    type: String,
    required: true,
    default: 'Europe/Istanbul'
  },
  emailNotifications: {
    type: Boolean,
    default: true
  },
  orderNotifications: {
    type: Boolean,
    default: true
  },
  stockNotifications: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  primaryColor: {
    type: String,
    default: '#D97706'
  },
  freeShippingThreshold: {
    type: Number,
    default: 500
  },
  maxCartItems: {
    type: Number,
    default: 10
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
