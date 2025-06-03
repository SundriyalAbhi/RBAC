import React from "react";
import { Navbar } from "../Components/Home/Navbar";
import { Sidebaar } from "../Components/Home/Sidebaar";
import Dashboard from "../Components/Home/Dashboard";
import { AdminSideBar } from "./AdminSideBar";
import AdminDashBoard from "./AdminDashBoard";
import '@/app/style.css'

const Admin = () => {
  return (
    <div className="flex flex-col  bg-[rgba(19,33,46,1)]">
      <div >
        <Navbar />
      </div>
    
      <div className="flex flex-1">
        <AdminSideBar />
        <div className="flex-1 ">
          <AdminDashBoard />
        </div>
          
      </div>
    </div>
  );
};

export default Admin;
