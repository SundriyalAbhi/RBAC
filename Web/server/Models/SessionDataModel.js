const { default: mongoose } = require("mongoose");


const ToolsSessionSchema = new mongoose.Schema({
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

const ToolsSession = mongoose.model("ToolsSessionData",ToolsSessionSchema)

module.exports = ToolsSession
