import React from "react";
import "@/app/style.css";
import { HorizontalBarChart } from "../Charts/HorizontalBarChart";
import { TreeChart } from "../Charts/TreeChart";
import { AreaResponsiveChart } from "../Charts/AreaResponsiveChart";
// import { RadarChart } from "../Charts/RadarChart"; // assumed import
import { Map } from "../Map/Map";
import ThreatTable from "../ThreatTable/ThreatTable";


// import { DataTable } from "../Table/DataTable"; // assumed import

export default function Dashboard() {
  return (
    <div className="p-4 space-y-4 h-screen overflow-y-auto bg-[#06b5d411]" style={{ scrollbarWidth: "none" }}>

      <div className="flex gap-4 h-[50%]">
        <div className="flex-1 rounded p-2 flex items-center justify-center text-white font-bold text-lg">
          <HorizontalBarChart/>
        </div>

        <div className="flex-1  rounded p-2 flex items-center justify-center text-white font-bold text-lg">
          <TreeChart/>
        </div>

        <div className="flex flex-col gap-4 w-1/6">
          {["Report", "Report", "Report", "Report"].map((label, idx) => (
            <div key={idx} className="bg-gray-700 h-1/4 rounded p-2 flex items-center justify-center text-white font-bold text-sm">
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 h-[45%]">
        <div className="flex-1  rounded p-4 flex items-center justify-center text-white font-bold text-lg">
          <Map/>
        </div>

        <div className="flex-1  rounded p-4 flex items-center justify-center text-white font-bold text-lg">
          <AreaResponsiveChart/>
        </div>
      </div>

      {/* NEW ROW: Table and Radar Chart */}
      <div className="flex gap-4 h-[45%]">
      <div className="flex-1 bg-[#1C2541] rounded-xl p-4 flex flex-col text-white text-sm">
  <h2 className="text-center text-lg font-semibold mb-4">Recent Threats</h2>
  <ThreatTable />
  </div>


        <div className="flex-1 bg-[#f59e0b] rounded p-4 flex items-center justify-center text-black font-bold text-lg">
          RadarChart 
        </div>
      </div>
    </div>
  );
}
