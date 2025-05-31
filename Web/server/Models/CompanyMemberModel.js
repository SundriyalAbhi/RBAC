const mongoose = require('mongoose');
const roles = require('../Config/role');

const companyMemberSchema = new mongoose.Schema({
  companyId: {
    type: String,
    ref: 'Company',
    required: true,
  },
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  role: {
      type: String,
      enum: Object.values(roles),
      default: roles.member,
    },
  addedBy: {
    type: String,
    ref: 'CompanyAdmin',
  },
  tollsAccess:{
    type:Array
  }
});

const CompanyMember = mongoose.model('CompanyMember', companyMemberSchema);

module.exports = CompanyMember
