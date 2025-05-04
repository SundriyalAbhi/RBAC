import React from 'react';
import { Navbar } from './Navbar';
import { Sidebaar } from './Sidebaar';
import { TreeChart } from '../Charts/TreeChart';
import { AreaResponsiveChart } from '../Charts/AreaResponsiveChart';
import { HorizontalBarChart } from '../Charts/HorizontalBarChart';
import "@/app/style.css";

export const Main = () => {
  return (
    <div className="flex flex-col h-screen bg-[rgba(19,33,46,1)] text-white">
      <div className="h-16 shadow-md z-10">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebaar />

        <div className="flex-1 overflow-y-auto p-6 bg-gray-900 space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 bg-gray-800 p-4 rounded-lg shadow">
              <TreeChart />
            </div>
            <div className="col-span-2 bg-gray-800 p-4 rounded-lg shadow">
              <AreaResponsiveChart />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-gray-800 p-4 rounded-lg shadow">
              <HorizontalBarChart />
            </div>
            <div className="col-span-1 bg-gray-800 p-4 rounded-lg shadow flex items-center justify-center text-gray-400">
              World Map / Chart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
