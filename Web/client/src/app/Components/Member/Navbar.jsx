"use client";
import "@/app/style.css";
import React from "react";

export default function Navbar() {
  return (
    <div className="h-16 px-6 bg-[#0f172a] flex items-center justify-between shadow-md">
      <h1 className="text-2xl text-white font-bold">MEMBER</h1>
      <button className="bg-gray-700 hover:bg-red-500 px-4 py-2 rounded-lg text-white font-medium">
        Logout
      </button>
    </div>
  );
}
