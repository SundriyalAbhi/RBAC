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

// Role config to map icon and label
const roleConfigs = [
  { key: "Admin", label: "Admins", icon: <MdAdminPanelSettings size="3rem" /> },
  { key: "SOCAnalyst", label: "Soc Analysts", icon: <FaShieldAlt size="3rem" /> },
  { key: "Threat Analyst", label: "Threat Analysts", icon: <GiArtificialIntelligence size="3rem" /> },
  { key: "Auditor", label: "Auditors", icon: <MdAssignment size="3rem" /> },
  { key: "CISO", label: "CISO", icon: <MdAdminPanelSettings size="3rem" /> },
  { key: "AI Developer", label: "AI Developers", icon: <FaHeadSideVirus size="3rem" /> },
  { key: "SecurityAnalyst", label: "Security Analysts", icon: <FaUserShield size="3rem" /> },
];

const StaticsBox = ({users}) => {
  const { UsersDataforAdmin } = useContext(AdminContext);
  const [roleCounts, setRoleCounts] = useState({});

  useEffect(() => {
    const counts = {};
    users?.forEach((user) => {
      counts[user.role] = (counts[user.role] || 0) + 1;
    });
    setRoleCounts(counts);
    console.log(roleCounts);
    
  }, [users]);
  
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
