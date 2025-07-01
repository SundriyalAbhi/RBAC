const { default: mongoose } = require("mongoose");

const SystemAnnouncementSchema = new mongoose.Schema(
    {

        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
        },
        pinned: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const SystemAnnouncementModel = mongoose.model("SystemAnnouncement",SystemAnnouncementSchema)

module.exports = SystemAnnouncementModel
