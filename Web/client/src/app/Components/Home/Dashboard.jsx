import React from "react";
import "@/app/style.css";
import { HorizontalBarChart } from "../Charts/HorizontalBarChart";
import { TreeChart } from "../Charts/TreeChart";
import { AreaResponsiveChart } from "../Charts/AreaResponsiveChart";
import { Map } from "../Map/Map";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-4 h-screen overflow-y-auto bg-[rgba(7,26,46,255)]">

      <div className="flex gap-4 h-[50%]">

        <div className="flex-1 bg-[rgba(1,31,61,255)] rounded p-2 flex items-center justify-center text-white font-bold text-lg">
          <HorizontalBarChart/>
        </div>

        <div className="flex-1 bg-[rgba(1,31,61,255)] rounded p-4 flex items-center justify-center text-white font-bold text-lg">
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
        <div className="flex-1 bg-gray-700 rounded p-4 flex items-center justify-center text-white font-bold text-lg">
          <Map/>
        </div>

        <div className="flex-1 bg-[rgba(1,31,61,255)] rounded p-4 flex items-center justify-center text-white font-bold text-lg">
          <AreaResponsiveChart/>
        </div>
      </div>
    </div>
  );
}
