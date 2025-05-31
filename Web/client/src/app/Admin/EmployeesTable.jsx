import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";

function EmployeesTable({users}) {
  const { GetUsersforAdmin, AdminAuthData } = useContext(AdminContext);
  const companyId = AdminAuthData?.companyId;
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await GetUsersforAdmin(companyId);
  //       const fetchedUsers = response.data || [];

  //       const processedUsers = fetchedUsers.map((user) => ({
  //         id: user._id,
  //         name: `${user.firstName} ${user.lastName}`,
  //         location: user.Address || "N/A",
  //         role: user.role || "Employee", // Use default if role not present
  //       }));

  //       setUsers(processedUsers);
  //     } catch (error) {
  //       console.error("Failed to fetch users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-[#0b1f33] to-[#081a2a] text-white max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500">
      <h2 className="text-xl font-bold mb-4 text-center">Employee List</h2>

      <table className="w-full table-auto border-collapse rounded overflow-hidden">
        <thead>
          <tr className="bg-[#334155] text-white text-center text-sm">
            <th className="py-3 px-4 border-b border-[#1e293b]">ID</th>
            <th className="py-3 px-4 border-b border-[#1e293b]">Name</th>
            <th className="py-3 px-4 border-b border-[#1e293b]">Location</th>
            <th className="py-3 px-4 border-b border-[#1e293b]">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user,i) => (
              <tr
                key={i}
                className="text-center hover:bg-[#1e293b]/40 transition-colors"
              >
                <td className="py-3 px-4 text-white/90">{user._id}</td>
                <td className="py-3 px-4">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-3 px-4 text-white/90">{user.location || "N/A"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-red-500/20 text-red-400"
                        : user.role === "CISO"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : user.role === "Auditor"
                        ? "bg-blue-500/20 text-blue-300"
                        : user.role === "Data Analytics"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-5 text-gray-400 text-sm"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

export default EmployeesTable;
