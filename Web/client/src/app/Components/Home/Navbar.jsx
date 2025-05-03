import React from 'react';
import '@/app/style.css';

export const Navbar = () => {
  return (
    <nav className="bg-[rgba(31,62,90,255)] h-[10vh] flex items-center justify-between px-6 shadow-md">
      <h1 className="text-white text-2xl font-serif">Global Threat</h1>

      <form className="flex items-center space-x-2">
        <input
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
        </button>
      </form>

      <div className="cursor-pointer">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full outline-green-600 outline"
        />
      </div>
    </nav>
  );
};
