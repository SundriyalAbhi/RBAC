"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { MdGridView } from "react-icons/md";
import { FaUserCog, FaTools, FaUsers, FaChartBar, FaBug, FaComment, FaBullhorn, FaHome } from "react-icons/fa";
import '@/app/style.css'

export const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { icon: <MdGridView />, label: "Dashboard", route: "Admin" },
    { icon: <FaUsers />, label: "Manage Users", route: "ManageUser" },
    { icon: <FaTools />, label: "Tools", route: "AllTools" },
    { icon: <FaChartBar />, label: "Real-Time Activity", route: "AllActivity" },
    { icon: <FaBug />, label: "Logs & Error Reports", route: "LogsAndErrors" },
    { icon: <FaComment />, label: "Feedback", route: "Feedback" },
    { icon: <FaBullhorn />, label: "System Announcements", route: "Announcements" },
  ];

  const handleClick = (route) => {
    const cleanedRoute = route.replace(/\s+/g, "");
    const path = cleanedRoute === "Admin" ? `/pages/${cleanedRoute}` : `/pages/Admin/${cleanedRoute}`;
    router.push(path);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      animate={{ width: isOpen ? 240 : 80 }}
      transition={{ duration: 0.3 }}
      className="bg-[#111827] text-white min-h-screen py-6 px-2 shadow-lg flex flex-col"
    >
      <div className="flex items-center justify-center mb-8">
        <FaHome className="text-2xl text-white" />
        {isOpen && <span className="ml-3 text-xl font-bold">Admin</span>}
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(item.route)}
            className="flex items-center gap-4 px-3 py-2 rounded-md cursor-pointer hover:bg-white hover:text-black transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className="mt-auto text-center text-xs text-gray-500">
        {isOpen && <p className="mt-4">© 2025 Admin Panel</p>}
      </div>
    </motion.div>
  );
};
