import React from "react";
import '@/app/style.css'
function EmployeesTable({ users }) {
  return (
    <div className="text-white w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Member List</h2>
        <button className="text-sm text-blue-400 hover:underline">Show All</button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-md bg-[#0b1f33]">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-[#132235] text-white text-center">
              <th className="py-3 px-4 border-b border-[#1e293b]">ID</th>
              <th className="py-3 px-4 border-b border-[#1e293b]">Name</th>
              <th className="py-3 px-4 border-b border-[#1e293b]">Location</th>
              <th className="py-3 px-4 border-b border-[#1e293b]">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-[#1e293b]/40 transition"
                >
                  <td className="py-2 px-4 text-white/80 truncate max-w-[100px]">{user._id}</td>
                  <td className="py-2 px-4 text-white">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="py-2 px-4 text-white/80">{user.location || "N/A"}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-500/20 text-red-400"
                          : user.role === "CISO"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : user.role === "Auditor"
                          ? "bg-blue-500/20 text-blue-300"
                          : user.role === "SOCAnalyst"
                          ? "bg-purple-500/20 text-purple-300"
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
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesTable;
