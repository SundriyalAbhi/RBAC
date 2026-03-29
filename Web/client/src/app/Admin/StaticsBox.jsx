import React, { useContext, useEffect, useState } from "react";
import { MdAdminPanelSettings, MdAssignment } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { FaHeadSideVirus, FaShieldAlt, FaUserShield } from "react-icons/fa";
import { AdminContext } from "../Context/AdminContext";
import { SocketContext } from "../Context/SocketContext";
import '@/app/style.css';

const roleConfigs = [
  { key: "admin", label: "Admins", icon: <MdAdminPanelSettings size="1.8rem" /> },
  { key: "SOCAnalyst", label: "SOC Analysts", icon: <FaShieldAlt size="1.8rem" /> },
  { key: "Threat Analyst", label: "Threat Analysts", icon: <GiArtificialIntelligence size="1.8rem" /> },
  { key: "Auditor", label: "Auditors", icon: <MdAssignment size="1.8rem" /> },
  { key: "CISO", label: "CISO", icon: <MdAdminPanelSettings size="1.8rem" /> },
  { key: "AI Developer", label: "AI Developers", icon: <FaHeadSideVirus size="1.8rem" /> },
  { key: "SecurityAnalyst", label: "Security Analysts", icon: <FaUserShield size="1.8rem" /> },
  { key: "User Online", label: "User Online", icon: <FaUserShield size="1.8rem" /> },
];

const StaticsBox = ({ totalUsers }) => {
  const { onlineUsers } = useContext(SocketContext);
  const [roleCounts, setRoleCounts] = useState({});
useEffect(() => {
  const counts = {};

  const usersArray = Array.isArray(totalUsers)
    ? totalUsers
    : totalUsers?.users || [];

  usersArray.forEach((user) => {
    const role = user.role || "Unknown";
    counts[role] = (counts[role] || 0) + 1;
  });

  counts["User Online"] = onlineUsers?.length || 0;

  setRoleCounts(counts);
}, [totalUsers, onlineUsers]);

  return (
    <div className="w-full flex flex-wrap gap-4">
      {roleConfigs.map(({ key, label, icon }) => (
        <div
          key={key}
          className="group flex-1 min-w-[160px] max-w-[200px] bg-gradient-to-tr from-[#0b1f33] to-[#081a2a] rounded-xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-white/5"
        >
          <div className="flex items-center gap-3">
            <div className="text-blue-400 group-hover:text-blue-300 transition">{icon}</div>
            <div>
              <p className="text-xs text-gray-300 tracking-wide uppercase">{label}</p>
              <p className="text-2xl font-extrabold text-white leading-none mt-1">
                {roleCounts[key] || 0}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaticsBox;
