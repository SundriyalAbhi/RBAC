import React from "react";
import { MdAdminPanelSettings, MdAssignment } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import {
  FaHeadSideVirus,
  FaShieldAlt,
  FaUserShield,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const StaticsBox = () => {
  return (
    <>
      {/* Parent Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {/* Data Cards */}
        {[
          { icon: <MdAdminPanelSettings />, label: "Admins", count: "5" },
          { icon: <FaShieldAlt />, label: "SOC Analysts", count: "2" },
          { icon: <GiArtificialIntelligence />, label: "Threat Analysts", count: "2" },
          { icon: <MdAssignment />, label: "Auditors", count: "4" },
          { icon: <MdAdminPanelSettings />, label: "CISO", count: "5" },
          { icon: <FaHeadSideVirus />, label: "AI Developers", count: "6" },
          { icon: <FaUserShield />, label: "Security Analyst", count: "7" },
        ].map((item, index) => (
          <div key={index} className="rounded-xl h-full text-white shadow-lg">
            <div
              className="flex items-center justify-start rounded-md p-4 space-x-4"
              style={{
                background: "linear-gradient(145deg, #0b1f33, #081a2a)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="text-6xl">{item.icon}</div>
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">{item.label}</h1>
                <h2 className="text-xl">{item.count}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StaticsBox;