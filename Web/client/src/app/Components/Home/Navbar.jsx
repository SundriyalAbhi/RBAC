import React from "react";
import "@/app/style.css"; // Ensure Tailwind CSS is properly applied
import { IoSearch } from "react-icons/io5";

export const Navbar = () => {
  return (
    <nav className="bg-[#1E293B] h-[10vh] flex items-center justify-between px-6 shadow-md">
      {/* Logo Section */}
      <span className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-blue-400 to-purple-400 
        text-lg sm:text-xl md:text-2xl">
        PHANTOM RADAR
      </span>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <form className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 w-32 sm:w-48 md:w-64"
          />
          <button className="absolute right-2">
            <IoSearch className="text-white text-xl" />
          </button>
        </form>

        {/* Profile Image */}
        <img
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
          alt="Profile"
          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-blue-500 hover:border-white transition duration-300"
        />
      </div>
    </nav>
  );
};
