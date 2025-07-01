"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "@/app/style.css";

function EmployeesTable({ users }) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-[#0b1f33] to-[#081a2a] p-6 rounded-xl shadow-md h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Members List</h2>
        <button
          onClick={() => router.push("/pages/Admin/ManageUser")}
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          View All
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden bg-[#0b1f33] border border-white/5 h-[38vh]">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-[#132235] text-left text-gray-300 uppercase text-xs tracking-wider">
              <th className="py-3 px-5 border-b border-[#1e293b]">ID</th>
              <th className="py-3 px-5 border-b border-[#1e293b]">Name</th>
              <th className="py-3 px-5 border-b border-[#1e293b]">Location</th>
              <th className="py-3 px-5 border-b border-[#1e293b]">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#1e293b]/40 transition duration-200 border-b border-[#1e293b]"
                >
                  <td className="py-3 px-5 text-white/80 max-w-[100px] truncate">
                    {user._id}
                  </td>
                  <td className="py-3 px-5 font-medium text-white whitespace-nowrap">
                    {`${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="py-3 px-5 text-white/70">{user.location || "N/A"}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
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
                <td colSpan={4} className="text-center py-6 text-gray-400">
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
