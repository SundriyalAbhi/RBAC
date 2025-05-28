"use client";
import { useState, React, useContext } from "react";
import "@/app/style.css";
import { AdminContext } from "@/app/Context/ManageUserContext";

const AuthForm = () => {
  const { CreateUser } = useContext(AdminContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    companyId: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!data.role) newErrors.role = "Role selection is required";
    if (!data.companyId.trim()) newErrors.companyId = "Company ID is required";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";
    if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    CreateUser(data);
    setData({
      firstName: "",
      lastName: "",
      role: "",
      companyId: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  // Check if the form is valid before enabling the button
  const isValid = Object.keys(errors).length === 0 && Object.values(data).every(field => field.trim() !== "");

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-[70%] bg-[#111827] p-8 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-4">
          Add User
        </h2>
        <form
          className="mt-4 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 text-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1 pl-2">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 text-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1 pl-2">{errors.lastName}</p>}
          </div>

          {/* Company ID */}
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">Company ID</label>
            <input
              type="text"
              name="companyId"
              value={data.companyId}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 text-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company ID"
              required
            />
            {errors.companyId && <p className="text-red-500 text-sm mt-1 pl-2">{errors.companyId}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 text-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 pl-2">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 text-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 pl-2">{errors.password}</p>}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">Role</label>
            <select
              name="role"
              value={data.role}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-400 text-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Auditor">Auditor</option>
              <option value="SOC Analyst">SOC Analyst</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1 pl-2">{errors.role}</p>}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className={`w-full py-4 text-gray-100 rounded-lg text-lg transition bg-green-700`}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;