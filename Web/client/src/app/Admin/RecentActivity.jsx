import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import { useRouter } from "next/navigation";
import '@/app/style.css'
const RecentActivity = ({ showAll = false }) => {
  const [activity, setActivity] = useState([]);
  const { Activitylog, AdminAuthData } = useContext(AdminContext);
  const companyId = AdminAuthData?.companyId;
  const router = useRouter();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await Activitylog(companyId);
        setActivity(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivity();
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours`;
    return time.toLocaleDateString();
  };

  const getInitial = (firstName = "", lastName = "") =>
    (firstName[0] || lastName[0] || "?").toUpperCase();

  return (
    <div className="text-white p-4 rounded-lg shadow-lg bg-[#0f172a] w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {showAll ? "All User Activity" : "Recent User Activity"}
        </h3>
        {!showAll && (
          <button
            onClick={() => router.push("/pages/Admin/AllActivity")}
            className="text-sm text-blue-400 hover:underline focus:outline-none"
          >
            All Activity
          </button>
        )}
      </div>

      <ul className="space-y-4">
        {activity.length === 0 ? (
          <p className="text-gray-400">No activity found.</p>
        ) : (
          (showAll ? activity : activity.slice(0, 4)).map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-sm font-semibold text-white/80">
                  {getInitial(item.firstName, item.lastName)}
                </div>
                <span className="text-sm text-white">
                  <span className="font-medium">
                    {item.firstName} {item.lastName}
                  </span>{" "}
                  {item.toolName?"accesses":" "}
                  <span className="text-white px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20">
                    {item.toolName || item.action}
                  </span>
                </span>
              </div>
              <span className="text-xs text-white/60">
                {formatTimeAgo(item.timestamp)}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
