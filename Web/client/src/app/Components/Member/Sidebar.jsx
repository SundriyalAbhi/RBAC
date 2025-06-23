import React, { useState } from "react";
import { FaHome, FaMapMarkedAlt, FaFileAlt, FaCog } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { motion } from "framer-motion";

export const Sidebaar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: "Tools" },
    { icon: <FaMapMarkedAlt />, label: "Activity" },
    { icon: <FaFileAlt />, label: "Reports" },
    { icon: <FaCog />, label: "Feedback" },
  ];

  return (
    <div className="flex">
      <motion.div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        animate={{ width: isOpen ? 250 : 80 }}
        transition={{ duration: 0.3, type: "tween" }}
        style={{ backgroundColor: isOpen ? "#1F2937" : "#0F172A" }}
        className="p-4 text-white shadow-lg flex flex-col overflow-hidden"
      >
        <nav className="flex flex-col space-y-3">
          {isOpen && (
            <h1 className="text-xl font-bold text-white px-3 mb-2">
              SENTINELSEC
            </h1> 

          
          )}

          <a
            href="#"
            className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-lg">
              <MdGridView />
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                isOpen ? "block" : "hidden"
              } text-sm font-medium whitespace-nowrap`}
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
                className={`${
                  isOpen ? "block" : "hidden"
                } text-sm font-medium whitespace-nowrap`}
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
