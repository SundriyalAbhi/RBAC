"use client";
import React from "react";

import { Sidebaar } from "./Sidebar";
import Navbar from "./Navbar";
import Dashbord from "./Dashbord";

export default function Main() {
  return (
    <div className="flex h-screen">
      <Sidebaar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="shrink-0">
          <Navbar />
        </div>

        <div className="flex-1 overflow-y-auto">
          <Dashbord />
        </div>
      </div>
    </div>
  );
}
