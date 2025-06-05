const ActivityModel = require("../Models/ActivityModel");
const AdminModel = require("../Models/AdminModel");
const CompanyMember = require("../Models/CompanyMemberModel");
const { io, getReceiverSocketId } = require("../Socket.IO/SocketIO");


exports.storeActivity = async (req, res) => {
  try {
    const { companyId, userId } = req.body;
    const activity = new ActivityModel(req.body);
    await activity.save();
    const admins = await AdminModel.find({ companyId });

    admins.forEach(admin => {
      const socketId = getReceiverSocketId(admin._id); 
      if (socketId) {
        io.to(socketId).emit("RecentActivity", { Msg: activity });
      }
    });

    const userSocketId = getReceiverSocketId(userId);
    if (userSocketId) {
      io.to(userSocketId).emit("RecentActivity", { Msg: activity });
    }

    res.status(201).send(activity);
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ message: "Failed to add activity" });
  }
};


exports.logActivity = async ({ companyId, userId, AdminId, role, action }) => {
  try {
    const activity = await ActivityModel.create({
      companyId,
      userId: userId || AdminId,
      role,
      action,
      timestamp: new Date()
    });

    let activityDta = {
      ...activity._doc 
    };


    if (userId) {
      const user = await CompanyMember.findById(userId);
      if (user) {
        activityDta.firstName = user.firstName;
        activityDta.lastName = user.lastName;
      }
    }

     if (AdminId) {
      const user = await AdminModel.findById(AdminId);
      if (user) {
        activityDta.firstName = user.firstName;
        activityDta.lastName = user.lastName;
      }
    }

    const admins = await AdminModel.find({ companyId });
    admins.forEach(admin => {
      let socketId = getReceiverSocketId(admin._id); 
      if (socketId && AdminId !==admin._id) {
        io.to(socketId).emit("RecentActivity", { Msg: activityDta });
      }
    });

    const userSocketId = getReceiverSocketId(userId);
    if (userSocketId) {
      io.to(userSocketId).emit("RecentActivity", { Msg: activityDta });
    }

  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};




exports.GetActivityforAdmins = async (req, res) => {
  try {
    const { companyId } = req.query;

    const activities = await ActivityModel.find({ companyId }).sort({ timestamp: -1 });

    const enhancedActivities = await Promise.all(
      activities.map(async (activity) => {
        let user = null;

        if (activity.role === "admin") {
          user = await AdminModel.findById(activity.userId).select("firstName lastName email");
        } else {
          user = await CompanyMember.findById(activity.userId).select("firstName lastName email");
        }

        return {
          ...activity._doc,
          firstName: user?.firstName || "Unknown",
          lastName: user?.lastName || "Unknown",
          userEmail: user?.email || "Unknown",
        };
      })
    );

    res.status(200).json(enhancedActivities);
  } catch (error) {
    console.error("Error fetching admin activities:", error);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};



exports.GetActivityforMember = async (req, res) => {
  try {
    const { companyId, userId } = req.body;
    const activities = await ActivityModel.find({ companyId, userId }).sort({ timestamp: -1 });
    res.send(activities);
  } catch (error) {
    console.error("Error fetching member activities:", error);
    res.status(500).json({ message: "Failed to fetch member activity" });
  }
};
