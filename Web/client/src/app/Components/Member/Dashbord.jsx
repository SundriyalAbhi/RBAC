import React from "react";
import "@/app/style.css";
export default function Dashbord() {
  return (
    <div className="flex-1 bg-[#0f172a] text-white p-6 space-y-6 overflow-auto">
      {/* Header */}

      {/* Metrics */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-400">Online Now</p>
          <h2 className="text-3xl font-semibold mt-2">8</h2>
        </div>

        <div className="flex-1 bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-400">Tools Active</p>
          <h2 className="text-3xl font-semibold mt-2">5</h2>
        </div>

        <div className="flex-1 bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-400">Errors Today</p>
          <h2 className="text-3xl font-semibold mt-2">2</h2>
        </div>
      </div>

      {/* Activity & Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <span className="text-sm text-gray-400">Just now</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>🔵 Rohit accessed AutoSOC</li>
            <li>
              🔵 Deepika accessing SOC{" "}
              <span className="text-gray-400">3 mins ago</span>
            </li>
            <li>
              🔵 Aisha accessing Real Time Radar{" "}
              <span className="text-gray-400">5 mins ago</span>
            </li>
            <li>
              🔵 Rahul accessing AutoCom{" "}
              <span className="text-gray-400">12 mins ago</span>
            </li>
          </ul>
        </div>

        {/* Tool Access */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Tool Access</h3>
          <ul className="space-y-2 text-sm">
            <li>⚡ Phantom Radar</li>
            <li>⚙️ AutoRed</li>
            <li>🔍 Real-Time Radar</li>
            <li>💬 AutoCom</li>
          </ul>
        </div>
      </div>

      {/* Charts (Placeholder blocks) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tool Usage */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Tool Usage</h3>
          <div className="w-full h-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">
            [Tool Usage Chart]
          </div>
        </div>

        {/* Active Time */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Active Time</h3>
          <div className="w-full h-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">
            [Active Time Chart]
          </div>
        </div>
      </div>
    </div>
  );
}
