"use client";
import AddCompanyForm from "@/app/Components/Form/AddComapnyForm";
import { Navbar } from "@/app/Components/Home/Navbar";
import { Sidebaar } from "@/app/Components/Home/Sidebaar";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 hidden md:block border-r">
          <Sidebaar />
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <AddCompanyForm />
        </main>
      </div>
    </div>
  );
};

export default Page;
