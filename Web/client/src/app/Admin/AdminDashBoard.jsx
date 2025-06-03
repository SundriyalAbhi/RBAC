import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import StaticsBox from "./StaticsBox";
import EmployeesTable from "./EmployeesTable";
import RecentActivity from "./RecentActivity";
import '@/app/style.css'

export default function AdminDashBoard() {
  const { GetUsersforAdmin, GetAllAdmins, AdminAuthData } = useContext(AdminContext);
  const companyId = AdminAuthData?.companyId;

  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (!companyId) return;

    const fetchUsers = async () => {
      try {
        const response = await GetUsersforAdmin(companyId);
        setUsers(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await GetAllAdmins(companyId);
        setAdmins(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch admins:", error);
      }
    };

    fetchUsers();
    fetchAdmins();
  }, [companyId]);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome back</p>
      </div>

      {/* Stats */}
      <StaticsBox totalUsers={users} />

      {/* Two-Column Layout */}
     <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="bg-gradient-to-br from-[#0b1f33] to-[#081a2a] p-6 rounded-xl shadow-md h-full">
    <RecentActivity/>
  </div>

  <div className="bg-gradient-to-br from-[#0b1f33] to-[#081a2a] p-6 rounded-xl shadow-md h-full">
    <EmployeesTable users={users} />
  </div>
</div>

    </div>
  );
}
