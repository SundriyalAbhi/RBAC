import React from "react";
import "@/app/style.css";
import StaticsBox from "./StaticsBox";
import UserList from "./ManageUsers";
import EmployeesTable from "./EmployeesTable";

export default function AdminDashBoard() {
  return (
    <div
      // bg-[#06b5d411]
      className="p-4 space-y-4 h-screen mt-3 overflow-y-auto "
      style={{ scrollbarWidth: "none" }}
    >
      {/* Admin DashBoard First ROw */}
      <div className="flex flex-col md:flex-row gap-4  ">
        <StaticsBox />
      </div>

      {/* Admin DashBoard First ROw */}

      {/* NEW ROW: Table and Radar Chart */}
      <div className="flex flex-col md:flex-row gap-4 h-[60%]">
        <div
          className="flex-1 rounded-xl p-4 flex flex-col text-white text-sm "
          style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="text-center text-lg font-semibold mb-4">
            Total Employees
          </h2>
          <EmployeesTable />
        </div>
        <div className="flex-1 rounded   text-black font-bold text-lg ">
          <UserList />
        </div>
      </div>
      {/* ThreatTable and RaderChart */}

      <div className="flex flex-col md:flex-row gap-4 h-[45%]">
        <div
          className="flex-1 rounded-xl p-4 flex flex-col text-white text-sm"
          style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="text-center text-lg font-semibold mb-4">
            Recent Threats
          </h2>
        </div>

        <div
          className="flex-1 rounded-lg p-4 flex items-center justify-center text-black font-bold text-lg"
          style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}
        ></div>
      </div>
    </div>
  );
}
