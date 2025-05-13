const mongoose = require('mongoose');

const companyMemberSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ['ADMIN', 'Manager', 'Employee','CLIENTS'], 
    required: true,
  },
  addedBy: {
    type: String,
    ref: 'CompanyAdmin',
  },
});

const CompanyMember = mongoose.model('CompanyMember', companyMemberSchema);

module.exports = CompanyMember
