import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            PHANTOM RADAR
          </span>
        </a>

        <ul className="hidden md:flex gap-8 font-medium text-gray-700 dark:text-white">
          {["Home", "About", "Services", "Pricing", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full border-2 border-transparent hover:border-blue-500 transition"
          >
            <img
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user"
              className="w-full h-full object-cover rounded-full"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Bonnie Green
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </p>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white transition"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden px-4 pb-3 pt-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <ul className="flex flex-col gap-2 text-gray-700 dark:text-white font-medium">
          {["Home", "About", "Services", "Pricing", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
