import React from "react";
import "@/app/style.css";

export default function Dashboard() {
  return (
<>
  <div className="flex flex-col md:flex-row p-2 gap-2 overflow-y-auto">
    
    {/* Left Column: Chart + MAP */}
    <div className="flex flex-col gap-2 w-full md:w-1/2" style={{ height: "900px" }}>
      <div className="w-full bg-yellow-300 rounded-lg p-2 shadow-inner border-2 border-yellow-500 flex-1 flex items-center justify-center">
        <div className="bg-black text-white p-2 rounded">Chart Placeholder</div>
      </div>
      <div className="w-full bg-blue-300 rounded-lg p-2 shadow-lg border-2 border-blue-500 flex-1 flex items-center justify-center">
        <div className="bg-black text-white p-2 rounded">Map Placeholder</div>
      </div>
    </div>

    {/* Middle Column: Div 1–4 + Table Div */}
    <div className="flex flex-col gap-2 w-full md:w-1/3">
      <div className="h-40 bg-pink-300 rounded shadow text-center p-2 flex items-center justify-center">
        <div className="bg-black text-white p-2 rounded">Div 1 Placeholder</div>
      </div>
      <div className="h-40 bg-indigo-300 rounded shadow text-center p-2 flex items-center justify-center">
        <div className="bg-black text-white p-2 rounded">Div 2 Placeholder</div>
      </div>
      <div className="h-40 bg-emerald-300 rounded shadow text-center p-2 flex items-center justify-center">
        <div className="bg-black text-white p-2 rounded">Div 3 Placeholder</div>
      </div>
      <div className="h-40 bg-orange-300 rounded shadow text-center p-2 flex items-center justify-center">
        <div className="bg-black text-white p-2 rounded">Div 4 Placeholder</div>
      </div>
      <div className="bg-purple-300 rounded-lg p-2 shadow-md border-2 border-purple-500 flex items-center justify-center" style={{ height: "200px" }}>
        <div className="bg-black text-white p-2 rounded">Table Placeholder</div>
      </div>
    </div>

    {/* Right Column: Right Divs */}
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <div className="flex flex-col gap-2">
        <div className="h-52 bg-pink-400 rounded shadow-md text-center p-2 flex items-center justify-center">
          <div className="bg-black text-white p-2 rounded">Right Div 1 Placeholder</div>
        </div>
        <div className="h-52 bg-cyan-400 rounded shadow-md text-center p-2 flex items-center justify-center">
          <div className="bg-black text-white p-2 rounded">Right Div 2 Placeholder</div>
        </div>
        <div className="h-52 bg-lime-400 rounded shadow-md text-center p-2 flex items-center justify-center">
          <div className="bg-black text-white p-2 rounded">Right Div 3 Placeholder</div>
        </div>
        <div className="h-52 bg-rose-400 rounded shadow-md text-center p-2 flex items-center justify-center">
          <div className="bg-black text-white p-2 rounded">Right Div 4 Placeholder</div>
        </div>
      </div>
    </div>

  </div>
</>












  
  );
}
