const express = require("express");
const router = express.Router();

const { verifyToken, allowRoles } = require("../Middlewares/Admin");
const { getAllAdmins, updateAdmin, loginAdmin, updateAdminRole, assignRole, getAllUsers, updateUser, deleteUser, registerAdmin, deleteAdmin, GetAdminByName } = require("../Controllers/AdminController");

const AdminRouter = express.Router();
AdminRouter.post("/register",registerAdmin);

AdminRouter.post("/login", loginAdmin);

AdminRouter.put("/update/:id", updateAdmin);

AdminRouter.get("/all", getAllAdmins);

AdminRouter.put("/update-role", verifyToken, allowRoles("admin", "ciso"), updateAdminRole);

AdminRouter.get("/GetAdminByName",GetAdminByName)

AdminRouter.delete(
  "/:adminId",
  verifyToken,
  allowRoles("admin"),
  deleteAdmin
);

AdminRouter.put(
  "/assign-role",
  verifyToken,
  allowRoles("admin"),
  assignRole
);

AdminRouter.get(
  "/users",
  // verifyToken,
  // allowRoles("admin"),
  getAllUsers
);

AdminRouter.put(
  "/user/:id",
  verifyToken,
  allowRoles("admin"),
  updateUser
);

AdminRouter.delete(
  "/user/:id",
  verifyToken,
  allowRoles("admin"),
  deleteUser
);

module.exports = AdminRouter;
