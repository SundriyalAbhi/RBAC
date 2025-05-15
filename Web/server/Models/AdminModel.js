const { default: mongoose } = require("mongoose");
const roles = require("../Config/role");


const AdminSchema = new mongoose.Schema({
    companyId: {
    type: String,
    ref: 'Company',
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  company:{type:String},
  role: { type: String, default: 'Admin' },
  });

  const AdminModel = mongoose.model('Admin',AdminSchema);

  module.exports = AdminModel