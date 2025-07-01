const AdminModel = require('../Models/AdminModel');
const CompanyMember = require('../Models/CompanyMemberModel');
const SystemAnnouncementModel = require('../Models/SystemAnnouncementsModel');
const { getReceiverSocketId, io } = require('../Socket.IO/SocketIO');

exports.AddSystemAnnouncement = async (req, res) => {
    try {
        const { companyId, title, message, createdBy, pinned } = req.body
        const SystemAnnouncement = new SystemAnnouncementModel({ companyId, title, message, createdBy, pinned })
        SystemAnnouncement.save()
        const admins = await AdminModel.find({ companyId });
        if (admins.length > 0) {
            admins.forEach(admin => {
                const socketId = getReceiverSocketId(admin._id);
                if (socketId) {
                    io.to(socketId).emit("SystemAnnouncement", { Msg: SystemAnnouncement });
                }
            });
        }

        const Members = await CompanyMember.find({ companyId });
        if (Members.length > 0) {
            Members.forEach(members => {
                const socketId = getReceiverSocketId(members._id);
                if (socketId) {
                    io.to(socketId).emit("SystemAnnouncement", { Msg: SystemAnnouncement });
                }
            });
        }
        res.send(SystemAnnouncement)
    } catch (error) {
        console.log(error);
    }
}

exports.GetSystemAnnouncements = async (req, res) => {
    try {
        const { companyId } = req.query;
        const SystemAnnouncements = await SystemAnnouncementModel
            .find({ companyId: companyId })
            .sort({ createdAt: -1 }); 
        res.send(SystemAnnouncements);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch announcements" });
    }
};
