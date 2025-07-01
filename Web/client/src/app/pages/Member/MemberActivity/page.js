"use client";
import MemberRecentActivity from "@/app/Components/Member/MemberRecentActivity";
import { Navbar } from "@/app/Components/Member/Navbar";
import { Sidebaar } from "@/app/Components/Member/Sidebar";
import React from "react";

const AllActivityPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#131f2e]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebaar />
        <main className="flex-1 overflow-y-auto p-8 bg-[#131f2e]">
          <h1 className="text-3xl font-bold text-white mb-8 border-b pb-4">
            All User Activity
          </h1>
          <MemberRecentActivity showAll={true} />
        </main>
      </div>
    </div>
  );
};

export default AllActivityPage;
