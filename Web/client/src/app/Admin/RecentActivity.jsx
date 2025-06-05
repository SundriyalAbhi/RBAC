"use client";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import { useRouter } from "next/navigation";
import { SocketContext } from "../Context/SocketContext";
import "@/app/style.css";

const RecentActivity = ({ showAll = false }) => {
  const [activity, setActivity] = useState([]);
  const { Activitylog, AdminAuthData } = useContext(AdminContext);
  const { socket } = useContext(SocketContext);
  const companyId = AdminAuthData?.companyId;
  const router = useRouter();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await Activitylog(companyId);
        if (res.data && Array.isArray(res.data)) {
          const sorted = res.data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setActivity(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      }
    };
    if (companyId) fetchActivity();
  }, [companyId]);

  useEffect(() => {
    if (!socket) return;
    const handleRecentActivity = (data) => {
      if (data?.Msg && typeof data.Msg === "object") {
        setActivity((prev) => [data.Msg, ...prev]);
      }
    };
    socket.on("RecentActivity", handleRecentActivity);
    return () => socket.off("RecentActivity", handleRecentActivity);
  }, [socket]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return time.toLocaleDateString();
  };

  const getInitial = (firstName = "", lastName = "") =>
    (firstName[0] || lastName[0] || "?").toUpperCase();

  return (
    <div className="bg-gradient-to-br from-[#0b1f33] to-[#081a2a] p-6 rounded-xl shadow-md h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {showAll ? "All User Activity" : "Recent User Activity"}
        </h2>
        {!showAll && (
          <button
            onClick={() => router.push("/pages/Admin/AllActivity")}
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View All
          </button>
        )}
      </div>

      <div className={`${showAll ? "max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar" : ""}`}>
        {activity.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No activity found.</p>
        ) : (
          <ul className="space-y-4">
            {(showAll ? activity : activity.slice(0, 4)).map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-[#1e293b] p-4 rounded-xl hover:bg-[#2b3c52] transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600/30 text-white text-xs font-bold">
                    {getInitial(item.firstName, item.lastName)}
                  </div>
                  <div className="text-xs leading-snug">
                    <p className="m-0">
                      <span className="font-semibold">
                        {item.firstName} {item.lastName}
                      </span>{" "}
                      {item.toolName ? "accessed" : "performed"}{" "}
                      <span className="inline-block px-2 py-[1px] bg-blue-500/20 text-blue-300 text-[10px] rounded-full font-medium ml-1">
                        {item.toolName || item.action}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatTimeAgo(item.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
