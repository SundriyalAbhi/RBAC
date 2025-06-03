import React, { useContext, useEffect, useState } from "react";
import {
  MdAdminPanelSettings,
  MdAssignment,
} from "react-icons/md";
import {
  GiArtificialIntelligence,
} from "react-icons/gi";
import {
  FaHeadSideVirus,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";
import { AdminContext } from "../Context/AdminContext";
import { SocketContext } from "../Context/SocketContext";
import '@/app/style.css'


const roleConfigs = [
  { key: "admin", label: "Admins", icon: <MdAdminPanelSettings size="3rem" /> },
  { key: "SOCAnalyst", label: "Soc Analysts", icon: <FaShieldAlt size="3rem" /> },
  { key: "Threat Analyst", label: "Threat Analysts", icon: <GiArtificialIntelligence size="3rem" /> },
  { key: "Auditor", label: "Auditors", icon: <MdAssignment size="3rem" /> },
  { key: "CISO", label: "CISO", icon: <MdAdminPanelSettings size="3rem" /> },
  { key: "AI Developer", label: "AI Developers", icon: <FaHeadSideVirus size="3rem" /> },
  { key: "SecurityAnalyst", label: "Security Analysts", icon: <FaUserShield size="3rem" /> },
  { key: "User Online", label: "User Online", icon: <FaUserShield size="3rem" /> },
];

const StaticsBox = ({ totalUsers }) => {
  const { UsersDataforAdmin } = useContext(AdminContext);
  const { onlineUsers } = useContext(SocketContext);
  const [roleCounts, setRoleCounts] = useState({});

  useEffect(() => {
    const counts = {};

    totalUsers?.forEach((user) => {
      const role = user.role;
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
          className="flex-1 min-w-[200px] bg-gradient-to-br from-[#0b1f33] to-[#081a2a] text-white rounded-xl p-4 shadow-xl flex items-center gap-4"
        >
          <div>{icon}</div>
          <div>
            <h1 className="text-lg font-semibold">{label}</h1>
            <p className="text-2xl font-bold">{roleCounts[key] || 0}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaticsBox;
