const { default: mongoose } = require("mongoose");
const roles = require("../Config/role");


const AdminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [roles.admin, roles.moderator, roles.client],
      default: roles.client,
    },
  });

  const AdminModel = mongoose.model('Admin',AdminSchema);

  module.exports = AdminModel