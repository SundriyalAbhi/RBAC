const express = require("express");
const router = express.Router();

const { verifyToken, allowRoles } = require("../Middlewares/Admin");
const AdminController = require("../Controllers/AdminController");

const AdminRouter = express.Router();
// ✅ Register a new admin (open or protected based on your logic)
AdminRouter.post("/register", AdminController.registerAdmin);

// ✅ Login admin
AdminRouter.post("/login", AdminController.loginAdmin);

// ✅ Get all admins (protected, only accessible to existing admins)
AdminRouter.get(
  "/all",
  verifyToken,
  allowRoles("admin"),
  AdminController.getAllAdmins
);

// ✅ Update role of an admin (only by admin)
AdminRouter.put(
  "/update-role",
  verifyToken,
  allowRoles("admin", "ciso"),
  AdminController.updateAdminRole
);

// ✅ Delete an admin by ID (only by admin)
AdminRouter.delete(
  "/:adminId",
  verifyToken,
  allowRoles("admin"),
  AdminController.deleteAdmin
);

// ✅ Only admin can assign roles
AdminRouter.put(
  "/assign-role",
  verifyToken,
  allowRoles("admin"),
  AdminController.assignRole
);

// ✅ Optional: Admin can view all users
AdminRouter.get(
  "/users",
  verifyToken,
  allowRoles("admin"),
  AdminController.getAllUsers
);

// ✅ Optional: Admin can update any user's profile
AdminRouter.put(
  "/user/:id",
  verifyToken,
  allowRoles("admin"),
  AdminController.updateUser
);

// ✅ Optional: Admin can delete a user
AdminRouter.delete(
  "/user/:id",
  verifyToken,
  allowRoles("admin"),
  AdminController.deleteUser
);

module.exports = AdminRouter;
