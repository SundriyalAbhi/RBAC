"use client";
import React, { useContext } from "react";
import MemberRecentActivity from "./MemberRecentActivity";
import { UserContext } from "@/app/Context/ManageUserContext";
import { SocketContext } from "@/app/Context/SocketContext";

export default function Dashbord() {
  const { UserAuthData } = useContext(UserContext);
  const { onlineUsers } = useContext(SocketContext);

  return (
    <div className="flex-1 bg-[#0f172a] text-white p-6 space-y-6 overflow-auto h-full">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Online Now", value: onlineUsers.length },
          { title: "Tools Active", value: UserAuthData.toolsaccess.length },
        ].map((metric, i) => (
          <div
            key={i}
            className="bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl p-6 text-center shadow-md"
          >
            <p className="text-sm text-gray-400">{metric.title}</p>
            <h2 className="text-3xl font-bold mt-2 text-white">{metric.value}</h2>
          </div>
        ))}
      </div>

      {/* Activity & Tool Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl shadow-md">
          <MemberRecentActivity />
        </div>

  <div className="bg-gradient-to-br from-[#0b1f33] to-[#081a2a] p-6 rounded-2xl shadow-md">
  <h3 className="text-xl font-semibold mb-5 text-white flex items-center gap-2">
    <svg
      className="w-5 h-5 text-blue-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    Tool Access
  </h3>

  {UserAuthData?.toolsaccess?.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {UserAuthData.toolsaccess.map((tool, index) => (
        <li
          key={index}
          className="flex items-center gap-3 p-3 bg-[#1f2a3c] hover:bg-[#2a3c52] transition rounded-xl shadow-sm"
        >
          <div className="w-9 h-9 bg-blue-600/30 text-blue-300 flex items-center justify-center rounded-full font-semibold text-sm uppercase">
            {tool[0]}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white capitalize">{tool}</p>
            <p className="text-xs text-gray-400">Access granted</p>
          </div>
          <span className="text-[10px] px-2 py-[1px] bg-blue-500/20 text-blue-300 rounded-full font-semibold">
            Tool
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-400 mt-4">No tools assigned.</p>
  )}
</div>

      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["Tool Usage", "Active Time"].map((title, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="h-36 bg-gray-900/40 rounded-md flex items-center justify-center text-gray-400">
              [{title} Chart Placeholder]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
