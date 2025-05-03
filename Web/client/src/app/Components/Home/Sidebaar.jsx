import React, { useState } from 'react';
import {
  FaHome,
  FaMapMarkedAlt,
  FaFileAlt,
  FaCog,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { motion } from 'framer-motion';

export const Sidebaar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: <FaHome />, label: 'Home' },
    { icon: <FaMapMarkedAlt />, label: 'Threat Map' },
    { icon: <FaFileAlt />, label: 'Reports' },
    { icon: <FaCog />, label: 'Settings' }
  ];

  return (
    <div  className="flex">
      <motion.div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
        animate={{ width: isOpen ? 250 : 80 }}
        transition={{ duration: 0.3, type: 'tween' }}
        className="bg-[#090e22fd] h-[90vh] p-4 text-white shadow-lg flex flex-col overflow-hidden"
      >

        <nav onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)} className="flex flex-col space-y-3 bg-yellow-300">
        <a
              href="#"
              className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition duration-200"
              onClick={() => setIsOpen(!isOpen)}>
              <span className="text-lg"><MdGridView /></span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className={`${isOpen ? 'block' : 'hidden'} text-sm font-medium whitespace-nowrap`}
              >
                Dashboard
              </motion.span>
            </a>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className={`${isOpen ? 'block' : 'hidden'} text-sm font-medium whitespace-nowrap`}
              >
                {item.label}
              </motion.span>
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};
