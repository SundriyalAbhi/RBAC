"use client"
import { Navbar } from "@/app/Components/Home/Navbar";
import React from "react";
import { AdminSideBar } from "../AdminSideBar";
import ManageUser from "./ManageUser";

const page = () => {
  return (
    <div className="flex flex-col  bg-[rgba(19,33,46,1)]">
      <div>
        <Navbar />
      </div>

      <div className="flex flex-1">
        <AdminSideBar />
        <div className="flex-1 ">
          <ManageUser />
        </div>
          
      </div>
    </div>
  );
};

export default page;
