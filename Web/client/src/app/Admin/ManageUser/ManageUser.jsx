import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";
import { useSocket } from "@/Utils/Socket";
import React, { useContext, useEffect, useState } from "react";

const ManageUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const { UPDATEUSER } = useContext(UserContext);
  const { onlineUsers } = useSocket();

  const { GetUsersforAdmin, AdminAuthData } = useContext(AdminContext);
  const companyId = AdminAuthData.companyId;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetUsersforAdmin(companyId);
        setUsers(response.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async () => {
    try {
      const updated = await UPDATEUSER(editUser);
      if (updated) {
        setEditUser(null);
      }
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-2">
      <div className="w-full border border-gray-700 shadow-lg rounded-lg flex justify-center">
        <table className="w-full bg-[#334155] text-white text-sm text-center">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th className="p-2">User ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Company ID</th>
              <th className="p-2">Role</th>
              <th className="p-2">Last Login</th>
              <th className="p-2">Registered</th>
              <th className="p-2">Online</th>
              <th className="p-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="hover:bg-gray-800">
                <td className="p-2">{user._id}</td>
                <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="p-2">{user.companyId}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.lastLogin || "N/A"}</td>
                <td className="p-2">{user.registered || "N/A"}</td>
                <td className="p-2">
                  {onlineUsers.includes(user._id) ? "🟢" : "🔴"}
                </td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => setSelectedUser(user)}
                  >
                    View
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-[400px]">
            <h2 className="text-lg font-bold mb-2">User Information</h2>
            <p>
              <strong>ID:</strong> {selectedUser._id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
            <p>
              <strong>Company ID:</strong> {selectedUser.companyId}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Last Login:</strong> {selectedUser.lastLogin || "N/A"}
            </p>
            <p>
              <strong>Registered:</strong> {selectedUser.registered || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {onlineUsers.includes(selectedUser._id)
                ? "🟢 Online"
                : "🔴 Offline"}
            </p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-[400px]">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>

            <label className="block mb-1">First Name:</label>
            <input
              className="w-full p-2 mb-3 bg-gray-200 rounded"
              type="text"
              value={editUser.firstName || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, firstName: e.target.value })
              }
            />

            <label className="block mb-1">Last Name:</label>
            <input
              className="w-full p-2 mb-3 bg-gray-200 rounded"
              type="text"
              value={editUser.lastName || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, lastName: e.target.value })
              }
            />

            <label className="block mb-1">Role:</label>
            <input
              className="w-full p-2 mb-3 bg-gray-200 rounded"
              type="text"
              value={editUser.role || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            />

            <label className="block mb-1">Active Status:</label>
            <select
              className="w-full p-2 mb-3 bg-gray-200 rounded"
              value={editUser.active ? "true" : "false"}
              onChange={(e) =>
                setEditUser({ ...editUser, active: e.target.value === "true" })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Update
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
    </div>
  );
};

export default ManageUser;
