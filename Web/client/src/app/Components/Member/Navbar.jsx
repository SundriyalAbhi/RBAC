"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaBell, FaSignOutAlt } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="bg-[#0F172A] h-[10vh] px-6 flex justify-between items-center border-b border-gray-800 shadow">
      <h1 className="text-white font-bold text-xl tracking-wide">SENTINELSEC</h1>

      <div className="flex items-center gap-6">
        <button className="text-white hover:text-blue-400 transition">
          <FaBell size={18} />
        </button>
        <button className="bg-gray-700 hover:bg-red-500 px-4 py-1 rounded text-white flex items-center gap-1">
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};
