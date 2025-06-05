const { default: mongoose } = require("mongoose");


const ToolAuthSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  toolName: {
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
  
}, { timestamps: true });

const AuthModel = mongoose.model("ToolAuthData",ToolAuthSchema)

module.exports = AuthModel
