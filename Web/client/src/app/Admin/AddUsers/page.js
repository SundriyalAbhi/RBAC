"use client"
import React from "react";
import AuthForm from "./Auth";
import "@/app/style.css";
import { Navbar } from "@/app/Components/Home/Navbar";
import { AdminSideBar } from "../AdminSideBar";
const page = () => {
  return (
    <>
      <div className="flex flex-col  bg-[rgba(19,33,46,1)]">
        <div>
          <Navbar />
        </div>

        <div className="flex flex-1">
          <AdminSideBar />
          <div className="flex-1 ">
            <AuthForm />
          </div>
            
        </div>
      </div>
    </>
  );
};

export default page;
