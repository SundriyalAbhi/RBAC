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
      <div style={{ width: "100%" }} className="flex flex-row gap-4 flex-wrap">
        {/* First Child Layout */}
        <div className="flex-1 flex flex-col rounded-xl h-full text-white">
          <div
            className="flex items-center bg-[#334155] rounded-md p-4"
            style={{
              background: "linear-gradient(145deg, #0b1f33, #081a2a)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <MdAdminPanelSettings style={{ fontSize: "5.5rem" }} />
            <div className="flex flex-col">
              <h1 className="font-bold" style={{ fontSize: "1rem" }}>
                Admins 5
              </h1>
            </div>
          </div>
        </div>

        {/* Repeat the above structure 6 more times */}
        <div className="flex-1 flex flex-col rounded-xl h-full text-white">
          <div
            className="flex items-center bg-[#334155] rounded-md p-4 gap-2"
            style={{
              background: "linear-gradient(145deg, #0b1f33, #081a2a)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <FaShieldAlt style={{ fontSize: "5.5rem" }} />
            <div className="flex flex-col">
              <h1 className="font-bold" style={{ fontSize: "1rem" }}>
                Soc Analysts 2
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl h-full text-white">
          <div
            className="flex items-center bg-[#334155] rounded-md p-4 gap-3"
            style={{
              background: "linear-gradient(145deg, #0b1f33, #081a2a)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <GiArtificialIntelligence style={{ fontSize: "5.5rem" }} />
            <div className="flex flex-col">
              <h1 className="font-bold" style={{ fontSize: "1rem" }}>
                Threat Analysts 2
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl h-full text-white">
          <div
            className="flex items-center bg-[#334155] rounded-md p-4 gap-1"
            style={{
              background: "linear-gradient(145deg, #0b1f33, #081a2a)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <MdAssignment style={{ fontSize: "5.5rem" }} />
            <div className="flex flex-col">
              <h1 className="font-bold" style={{ fontSize: "1rem" }}>
                Auditors 4
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl h-full text-white">
          <div
            className="flex items-center bg-[#334155] rounded-md p-4"
            style={{
              background: "linear-gradient(145deg, #0b1f33, #081a2a)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <MdAdminPanelSettings style={{ fontSize: "5.5rem" }} />
            <div className="flex flex-col">
              <h1 className="font-bold" style={{ fontSize: "1rem" }}>
                CISO
              </h1>
              <h1>5</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl h-full text-white">
          <div
            className="flex items-center bg-[#334155] rounded-md p-4 gap-2"
            style={{
              background: "linear-gradient(145deg, #0b1f33, #081a2a)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <FaHeadSideVirus style={{ fontSize: "5.5rem" }} />
            <div className="flex flex-col">
              <h1 className="font-bold" style={{ fontSize: "1rem" }}>
                AI Developers 6
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl h-full text-white">
          <div
            className="flex items-center bg-[#334155] rounded-md p-4"
            style={{
              background: "linear-gradient(145deg, #0b1f33, #081a2a)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            <FaUserShield style={{ fontSize: "5.5rem" }} />
            <div className="flex flex-col">
              <h1 className="font-bold" style={{ fontSize: "1rem" }}>
                Security Analyst 7
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticsBox;
