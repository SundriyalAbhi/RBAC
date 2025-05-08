import React from "react";
import "@/app/style.css";
import { IoSearch } from "react-icons/io5";
import style from "./NavStyle.css"
export const Navbar = () => {
  return (
    <nav className="bg-[#1E293B] h-[10vh] flex items-center justify-between px-6 shadow-md">
      <h1 className="text-white text-2xl font-serif ">PHANTOM RADAR</h1>

      <div className="cursor-pointer flex gap-4 items-center">
        <form className="flex items-center space-x-2">
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <button>
              <IoSearch className="icon" />
            </button>
          </div>

          {/* <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-1 text-white border border-white rounded-md hover:bg-white hover:text-red-600 transition duration-200"
        >
          Search
        </button> */}
        </form>
        <img
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
          alt="Profile"
          className="w-10 h-10 rounded-full outline-green-600 outline"
        />
      </div>
    </nav>
  );
};
