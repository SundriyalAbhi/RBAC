"use client";
import { AdminSideBar } from "@/app/Admin/AdminSideBar";
import ManageUser from "@/app/Admin/ManageUser/ManageUser";
import { Navbar } from "@/app/Components/Home/Navbar";
import React from "react";


const page = () => {
  return (
    <div className="flex flex-col h-[100vh] bg-[rgba(19,33,46,1)]">
      <div>
        <Navbar />
      </div>

      <div className="flex flex-1 ">
        <AdminSideBar />
        <div className="flex-1 ">
          <ManageUser />
        </div>
      </div>
    </div>
  );
};

export default page;
