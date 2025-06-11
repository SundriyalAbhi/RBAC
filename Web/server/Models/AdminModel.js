const { default: mongoose } = require("mongoose");
const roles = require("../Config/role");


const AdminSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    firstName: { type: String },
    lastName: { type: String },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    companyName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.client,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tollsAccess: {
      type: Array
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);


const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel