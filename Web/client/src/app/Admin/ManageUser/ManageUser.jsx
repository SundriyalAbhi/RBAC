import React, { useState } from "react";

const ManageUser = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      companyId: "C123",
      role: "Admin",
      lastLogin: "2024-05-01",
      registered: "2023-08-15",
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      companyId: "C456",
      role: "SOC Analyst",
      lastLogin: "2024-04-28",
      registered: "2023-09-05",
      active: false,
    },
    {
      id: 3,
      name: "Emily Johnson",
      companyId: "C789",
      role: "Threat Analyst",
      lastLogin: "2024-05-02",
      registered: "2023-06-22",
      active: true,
    },
    {
      id: 4,
      name: "Michael Brown",
      companyId: "C101",
      role: "Auditor",
      lastLogin: "2024-04-30",
      registered: "2023-07-13",
      active: false,
    },
    {
      id: 5,
      name: "Sophia Davis",
      companyId: "C112",
      role: "AI Developer",
      lastLogin: "2024-04-26",
      registered: "2023-10-01",
      active: true,
    },
    {
      id: 6,
      name: "William Wilson",
      companyId: "C131",
      role: "Security Analyst",
      lastLogin: "2024-05-03",
      registered: "2023-11-18",
      active: true,
    },
    {
      id: 7,
      name: "David Miller",
      companyId: "C144",
      role: "Admin",
      lastLogin: "2024-04-27",
      registered: "2023-12-02",
      active: false,
    },
    {
      id: 8,
      name: "Jessica Taylor",
      companyId: "C157",
      role: "SOC Analyst",
      lastLogin: "2024-05-02",
      registered: "2023-09-19",
      active: true,
    },
    {
      id: 9,
      name: "Daniel White",
      companyId: "C167",
      role: "Threat Analyst",
      lastLogin: "2024-05-04",
      registered: "2023-07-07",
      active: true,
    },
    {
      id: 10,
      name: "Ashley Green",
      companyId: "C189",
      role: "Auditor",
      lastLogin: "2024-04-29",
      registered: "2023-05-23",
      active: false,
    },
    {
      id: 11,
      name: "Christopher Martinez",
      companyId: "C200",
      role: "AI Developer",
      lastLogin: "2024-05-05",
      registered: "2023-10-30",
      active: true,
    },
    {
      id: 12,
      name: "Elizabeth Brown",
      companyId: "C212",
      role: "Security Analyst",
      lastLogin: "2024-04-25",
      registered: "2023-06-15",
      active: true,
    },
    {
      id: 13,
      name: "Emma Wilson",
      companyId: "C223",
      role: "SOC Analyst",
      lastLogin: "2024-04-20",
      registered: "2023-02-10",
      active: true,
    },
    {
      id: 14,
      name: "James Carter",
      companyId: "C235",
      role: "AI Developer",
      lastLogin: "2024-05-03",
      registered: "2023-04-05",
      active: true,
    },
    {
      id: 15,
      name: "Sarah Johnson",
      companyId: "C245",
      role: "Security Analyst",
      lastLogin: "2024-05-06",
      registered: "2023-03-25",
      active: true,
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const handleUpdate = () => {
    setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
    setEditUser(null);
  };

  return (
    <div className="relative flex flex-col items-center p-4 bg-[#06b5d411] ">
      <div className="w-[80vw] border border-gray-700 shadow-lg rounded-lg flex justify-center">
        <table className="w-full bg-[#334155] text-white text-sm text-center">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th className="p-2">User ID</th>
              <th className="p-2">User Name</th>
              <th className="p-2">Company ID</th>
              <th className="p-2">Role</th>
              <th className="p-2">Last Login</th>
              <th className="p-2">Registered</th>
              <th className="p-2">Active</th>
              <th className="p-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.companyId}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.lastLogin}</td>
                <td className="p-2">{user.registered}</td>
                <td className="p-2">{user.active ? "🟢" : "🔴"}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => setSelectedUser(user)}
                  >
                    View
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => setEditUser(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Popup Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-[400px]">
            <h2 className="text-lg font-bold mb-2">User Information</h2>
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Company ID:</strong> {selectedUser.companyId}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Last Login:</strong> {selectedUser.lastLogin}
            </p>
            <p>
              <strong>Registered:</strong> {selectedUser.registered}
            </p>
            <p>
              <strong>Active:</strong>{" "}
              {selectedUser.active ? "🟢 Active" : "🔴 Inactive"}
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

      {/* Edit Popup Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-[400px]">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <label className="block mb-2">Name:</label>
            <input
              className="w-full p-2 mb-2 bg-gray-700 rounded"
              type="text"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />

            <label className="block mb-2">Company ID:</label>
            <input
              className="w-full p-2 mb-2 bg-gray-700 rounded"
              type="text"
              value={editUser.companyId}
              onChange={(e) =>
                setEditUser({ ...editUser, companyId: e.target.value })
              }
            />

            <label className="block mb-2">Role:</label>
            <select
              className="w-full p-2 bg-gray-700 rounded"
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="Admin">Admin</option>
              <option value="SOC Analyst">SOC Analyst</option>
              <option value="Threat Analyst">Threat Analyst</option>
              <option value="Auditor">Auditor</option>
              <option value="AI Developer">AI Developer</option>
              <option value="Security Analyst">Security Analyst</option>
            </select>

            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
