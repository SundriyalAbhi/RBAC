import React from "react";
import "@/app/style.css";
import { HorizontalBarChart } from "../Charts/HorizontalBarChart";
import { TreeChart } from "../Charts/TreeChart";
import { AreaResponsiveChart } from "../Charts/AreaResponsiveChart";
import { Map } from "../Map/Map";
import ThreatTable from "../ThreatTable/ThreatTable";
import RadarChart from "../Charts/RadarChart";

export default function Dashboard() {
  return (
    <div
      className="p-4 space-y-4 h-screen overflow-y-auto bg-[#06b5d411]"
      style={{ scrollbarWidth: "none" }}
    >
      {/* First Row: Charts and Reports */}
      <div className="flex flex-col md:flex-row gap-4 h-[50%]">
        {/* Chart Containers */}
        <div className="flex-1 rounded p-2 flex items-center justify-center text-white font-bold text-lg">
          <HorizontalBarChart />
        </div>

        <div className="flex-1 rounded p-2 flex items-center justify-center text-white font-bold text-lg">
          <TreeChart />
        </div>

        {/* Reports Section (on large screens will be side by side, on smaller will stack) */}
        <div className="flex flex-col gap-4 w-full md:w-1/6">
          {["Report", "Report", "Report", "Report"].map((label, idx) => (
            <div
              key={idx}
              className="bg-gray-700 flex-1 rounded p-2 flex items-center justify-center text-white font-bold text-sm min-h-[60px]"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Second Row: Map and Area Chart */}
      <div className="flex flex-col md:flex-row gap-4 h-[45%]">
        {/* Map */}
        <div className="flex-1 rounded p-4 flex items-center justify-center text-white font-bold text-lg">
          <Map />
        </div>

        {/* Area Chart */}
        <div className="flex-1 rounded h-[300px] p-4 flex items-center justify-center text-white font-bold text-lg">
          <AreaResponsiveChart />
        </div>
      </div>

      {/* NEW ROW: Table and Radar Chart */}
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
          <ThreatTable />
        </div>

        <div className="flex-1 rounded p-4 flex items-center justify-center text-black font-bold text-lg">
          <RadarChart />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-[50%] ">
        <div
          className="flex-1 rounded-xl p-4 flex flex-col text-white text-sm "
          style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            width: "50%",
          }}
        >
          <h2 className="text-center text-lg font-semibold mb-4">
            Historical Trend
          </h2>
          {/* You can add internal content here */}
        </div>

        <div style={{ width: "50%"  }} className="flex flex-row gap-4">
        <div className="flex-1 flex flex-col bg-[#1f2937] rounded-xl  h-full text-white">
          {/* Vertical child layout inside */}
          <div className="flex-1 bg-[#334155] rounded-md mb-2 p-2"  style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}>
            Threate Attribute
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#1f2937] rounded-xl  h-full text-white">
          {/* Another vertical child layout */}
          <div className="flex-1 bg-[#334155] rounded-md mb-2 p-2"  style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}>
            Severity
          </div>
        </div>
        </div>
      </div>
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

        <div className="flex-1 rounded-lg p-4 flex items-center justify-center text-black font-bold text-lg"  style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}>
         
        </div>
      </div>
    </div>
  );
}
