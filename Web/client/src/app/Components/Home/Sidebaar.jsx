import React, { useState } from 'react';
import {
  FaHome,
  FaMapMarkedAlt,
  FaFileAlt,
  FaCog,
} from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Sidebaar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: 'Home' },
    { icon: <FaMapMarkedAlt />, label: 'Threat Map' },
    { icon: <FaFileAlt />, label: 'Reports' },
    { icon: <FaCog />, label: 'Settings' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar container */}
      <motion.div
        initial={{ width: 80 }}
        animate={{ width: isOpen ? 250 : 80 }}
        transition={{ duration: 0.3, type: 'tween' }}
        className={`
          fixed top-0 left-0 h-full z-40 
          bg-[#111827] text-white shadow-lg flex flex-col 
          overflow-hidden transition-all duration-300
          ${isOpen ? 'w-[250px]' : 'w-[80px]'}
          md:relative md:block md:w-[250px]
        `}
      >
        <nav className="flex flex-col space-y-3 mt-16 md:mt-6 px-4">
          {/* Dashboard Link */}
          <a
            href="#"
            className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition duration-200"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-lg"><MdGridView /></span>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                Dashboard
              </motion.span>
            )}
          </a>

          {/* Other Menu Items */}
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </a>
          ))}
        </nav>
      </motion.div>
    </>
  );
};
