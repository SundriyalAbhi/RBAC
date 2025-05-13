const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    city: String,
    state: String,
    country: String,
  },
  createdBy: {
    type: String,
    ref: 'Owner',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company
