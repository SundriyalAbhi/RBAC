const { default: mongoose } = require("mongoose");
const roles = require("../Config/role");


const activitySchema = new mongoose.Schema({
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  AdminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: false },
    role: {
        type: String,
        enum: Object.values(roles),
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    toolName: {
        type: String,
        default: null,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    metadata: {
        type: Object,
    },
});

const ActivityModel = mongoose.model('Activity', activitySchema)

module.exports = ActivityModel

