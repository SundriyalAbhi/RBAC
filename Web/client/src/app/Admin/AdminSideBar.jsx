"use client";
import React, { useState } from "react";
import {
  FaHome,
  FaMapMarkedAlt,
  FaFileAlt,
  FaCog,
  FaUserCog,
  FaUserPlus,
  FaTimes,
} from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuItems = [
    { icon: <MdGridView />, label: "DashBoard", route: "Admin" },
    { icon: <FaUserPlus />, label: "Add Users", route: "Add Users" },
    { icon: <FaUserCog />, label: "Manage Users", route: "Manage User" },
  ];

  const handleClick = (route) => {
    const cleanedRoute = route.replace(/\s+/g, ""); 
    if (cleanedRoute.startsWith("http")) {
      window.location.href = cleanedRoute;
    } else if (cleanedRoute == "Admin") {
      router.push(`/pages/${cleanedRoute}`);
    } else {
      router.push(`/pages/Admin/${cleanedRoute}`);
    }
  };

  return (
    <div className="flex">
      <motion.div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        animate={{ width: isOpen ? 250 : 80 }}
        transition={{ duration: 0.3, type: "tween" }}
        className={` bg-[${
          isOpen ? "#111827" : "#111827"
        }] p-4 text-white shadow-lg flex flex-col overflow-hidden`}
      >
        <nav
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="flex flex-col space-y-3"
        >
          <a
            href="#"
            className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition duration-200"
            onClick={() => {
              setIsOpen(!isOpen)
              router.push("/pages/Home")
            }}
          >
            <span className="text-lg">
              <FaHome />
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                isOpen ? "block" : "hidden"
              } text-sm font-medium whitespace-nowrap`}
            >
              Home
            </motion.span>
          </a>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white hover:text-red-600 transition duration-200"
              onClick={() => {
                handleClick(item.route);
              }}
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
