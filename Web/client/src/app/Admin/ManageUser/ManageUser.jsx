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

    const data = response.data;

    const usersArray = Array.isArray(data) ? data : data?.users || [];

    setUsers(usersArray);

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
        <div className="p-8 bg-[#0f172a] min-h-screen text-white space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-xs">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex gap-4 items-center">
          <select
            className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow"
          >
            <FaPlus /> Add Member
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-auto rounded-xl shadow ring-1 ring-gray-700">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-800 text-sm uppercase text-gray-300">
            <tr>
              {["User ID", "Name", "Email", "Company ID", "Role", "Status", "Actions"].map((header) => (
                <th key={header} className="px-4 py-3 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#1e293b] divide-y divide-gray-700">
            {filteredUsers.map((user, i) => (
              <tr key={i} className="hover:bg-gray-700">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{`${user.firstName || ""} ${user.lastName || ""}`.trim()}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.companyId}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 text-lg">
                  {onlineUsers.includes(user._id) ? "🟢" : "🔴"}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setEditUser({ ...user })}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white text-black rounded-xl p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="space-y-2 text-sm">
              {[
                ["ID", selectedUser._id],
                ["Name", `${selectedUser.firstName} ${selectedUser.lastName}`],
                ["Email", selectedUser.email],
                ["Company ID", selectedUser.companyId],
                ["Role", selectedUser.role],
                ["Status", onlineUsers.includes(selectedUser._id) ? "🟢 Online" : "🔴 Offline"],
                ["Tools", selectedUser.tollsAccess?.join(", ") || "None"],
              ].map(([label, value]) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
            <div className="text-right mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white text-black rounded-xl p-6 max-w-md w-full shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">
              {editUser._id ? "Edit User" : "Add New User"}
            </h2>
            {["firstName", "lastName", "role"].map((field) => (
              <input
                key={field}
                placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                value={editUser[field] || ""}
                onChange={(e) => setEditUser({ ...editUser, [field]: e.target.value })}
                className="w-full p-2 rounded bg-gray-100"
              />
            ))}
            <select
              className="w-full p-2 bg-gray-100 rounded"
              value={editUser.active ? "true" : "false"}
              onChange={(e) => setEditUser({ ...editUser, active: e.target.value === "true" })}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div>
              <label className="block text-sm font-medium mb-2">Tool Access:</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto bg-gray-100 p-2 rounded">
                {ALL_TOOLS.map((tool) => (
                  <label key={tool} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={editUser.tollsAccess?.includes(tool)}
                      onChange={() => {
                        const updated = editUser.tollsAccess?.includes(tool)
                          ? editUser.tollsAccess.filter((t) => t !== tool)
                          : [...(editUser.tollsAccess || []), tool];
                        setEditUser({ ...editUser, tollsAccess: updated });
                      }}
                    />
                    {tool}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {editUser._id ? "Update" : "Create"}
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {createUser && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
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
