"use client";
import { useState, React } from "react";
import "@/app/style.css";

const AuthForm = () => {

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-[#06b5d411]">
      <div className="bg-[#111827] p-8 rounded-lg shadow-lg w-96 border border-gray-600">
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Add User
        </h2>
        <form className="mt-6">
          <div className="mb-3">
            <label className="block text-gray-400">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-1 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-400">Role</label>
            <select className="w-full px-2 py-1 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none  pr-8">
              <option value="" disabled selected>
                Select your role
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Auditor">Auditor</option>
              <option value="SOC Analyst">SOC Analyst</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-400">Company ID</label>
            <input
              type="text"
              className="w-full px-3 py-1 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your company ID"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full px-3 py-1 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              className="w-full px-3 py-1 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-gray-100 bg-[#29903B] rounded-lg hover:bg-green-800 transition duration-300"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
