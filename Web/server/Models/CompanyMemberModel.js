const mongoose = require('mongoose');

const companyMemberSchema = new mongoose.Schema({
  companyId: {
    type: String,
    ref: 'Company',
    required: true,
  },
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ['ADMIN', 'Manager', 'Employee'],
    default:'Employee',
    required: true,
  },
  addedBy: {
    type: String,
    ref: 'CompanyAdmin',
  },
});

const CompanyMember = mongoose.model('CompanyMember', companyMemberSchema);

module.exports = CompanyMember
