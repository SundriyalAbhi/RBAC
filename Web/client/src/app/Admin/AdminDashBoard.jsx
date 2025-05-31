import React, { useContext, useEffect, useState } from "react";
import "@/app/style.css";
import StaticsBox from "./StaticsBox";
import EmployeesTable from "./EmployeesTable";
import AdminTable from "./AdminsList";
import { AdminContext } from "../Context/AdminContext";

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
    <div className="p-4 space-y-4 h-screen mt-3 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Statistics */}
      <div className="flex flex-col md:flex-row gap-4">
        <StaticsBox users={users} />
      </div>

      {/* Tables Section */}
      <div className="flex flex-col md:flex-row gap-4 h-[60%]">
        {/* Employees Table */}
        <div
          className="flex-1 rounded-xl p-4 flex flex-col text-white text-sm"
          style={{
            background: "linear-gradient(145deg, #0b1f33, #081a2a)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
          }}
        >
          <EmployeesTable users={users} />
        </div>

        {/* Admin Table */}
        <div className="flex-1 rounded text-black font-bold text-lg">
          <AdminTable admins={admins} />
        </div>
      </div>
    </div>
  );
}
