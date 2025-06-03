import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";
import { SocketContext } from "@/app/Context/SocketContext";
import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import '@/app/style.css'
import AuthForm from "../AddUsers/Auth";

const ALL_TOOLS = [
  "AutoSOC",
  "Phantom Radar",
  "Real-Time Radar",
  "GhostIntel",
  "ThreatMapper",
  "DataVault",
  "AI Sentinel",
];

const ManageUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [createUser, setCreateUser] = useState(null)
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const { UPDATEUSER } = useContext(UserContext);
  const { onlineUsers } = useContext(SocketContext);
  const {
    GetUsersforAdmin,
    AdminAuthData,
    GetUsersforAdminByName,
    UPDATEADMIN,
  } = useContext(AdminContext);

  const companyId = AdminAuthData.companyId;
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await GetUsersforAdmin(companyId);
      setUsers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(async () => {
      try {
        const response = search.trim()
          ? await GetUsersforAdminByName(search, controller.signal)
          : await GetUsersforAdmin(companyId);
        setUsers(response.data || []);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Search error:", err);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(handler);
    };
  }, [search]);

  const handleUpdate = async () => {
    try {
      let updated;
      if (editUser.role == "admin") {
        updated = await UPDATEADMIN(editUser);
      } else {
        updated = await UPDATEUSER(editUser);
      }
      if (updated) {
        await fetchUsers();
        setEditUser(null);
      }
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) => filterRole === "All" || user.role === filterRole
  );

  const uniqueRoles = ["All", ...new Set(users.map((u) => u.role))];

  return (
    <div className="p-6 bg-[#0f172a] min-h-screen space-y-6">
      {/* Top controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 p-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
          />
        </div>

        <select
          className="p-2 rounded-md bg-gray-800 text-white"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          {uniqueRoles.map((role, idx) => (
            <option key={idx} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() =>
            setCreateUser({
              _id: "",
              firstName: "",
              lastName: "",
              email: "",
              companyId,
              role: "",
              active: true,
              tollsAccess: [],
            })
          }
        >
          <FaPlus /> Add Member
        </button>
      </div>

      {/* User table */}
      <div className="overflow-x-auto border border-gray-700 rounded-xl shadow-lg">
        <table className="min-w-full bg-[#1e293b] text-white text-sm text-center">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Company ID</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <tr key={i} className="hover:bg-gray-700">
                <td className="p-2">{user._id}</td>
                <td className="p-2">
                  {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                </td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.companyId}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  {onlineUsers.includes(user._id) ? "🟢" : "🔴"}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-xs"
                    onClick={() => setSelectedUser(user)}
                  >
                    View
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
                    onClick={() => setEditUser({ ...user })}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="space-y-1 text-sm">
              <p>
                <strong>ID:</strong> {selectedUser._id}
              </p>
              <p>
                <strong>Name:</strong> {selectedUser.firstName}{" "}
                {selectedUser.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Company ID:</strong> {selectedUser.companyId}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {onlineUsers.includes(selectedUser._id)
                  ? "🟢 Online"
                  : "🔴 Offline"}
              </p>
              <p>
                <strong>Tools:</strong>{" "}
                {selectedUser.tollsAccess?.join(", ") || "None"}
              </p>
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              {editUser._id ? "Edit User" : "Add New User"}
            </h2>
            <input
              className="w-full p-2 bg-gray-100 rounded"
              placeholder="First Name"
              value={editUser.firstName || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, firstName: e.target.value })
              }
            />
            <input
              className="w-full p-2 bg-gray-100 rounded"
              placeholder="Last Name"
              value={editUser.lastName || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, lastName: e.target.value })
              }
            />
            <input
              className="w-full p-2 bg-gray-100 rounded"
              placeholder="Role"
              value={editUser.role || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            />
            <select
              className="w-full p-2 bg-gray-100 rounded"
              value={editUser.active ? "true" : "false"}
              onChange={(e) =>
                setEditUser({ ...editUser, active: e.target.value === "true" })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div>
              <label className="block mb-2 font-medium">Tool Access:</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto bg-gray-100 p-3 rounded">
                {ALL_TOOLS.map((tool, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={editUser.tollsAccess?.includes(tool)}
                      onChange={() => {
                        const updatedTools = editUser.tollsAccess?.includes(
                          tool
                        )
                          ? editUser.tollsAccess.filter((t) => t !== tool)
                          : [...(editUser.tollsAccess || []), tool];
                        setEditUser({ ...editUser, tollsAccess: updatedTools });
                      }}
                    />
                    {tool}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                {editUser._id ? "Update" : "Create"}
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {createUser && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <AuthForm
            onClose={() => setCreateUser(null)}
            onSuccess={() => {
              fetchUsers();
              setCreateUser(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUser;
