"use client";
import { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";
import "@/app/style.css";

const roles = [
  "Admin",
  "User",
  "Administrator",
  "Provider",
  "DataAnalyst",
  "Auditor",
  "Manager",
  "SOCAnalyst",
];

const AuthForm = ({ onClose, onSuccess, userData }) => {
  const { AdminAuthData } = useContext(AdminContext);
  const { UserSignUp } = useContext(UserContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    companyId: AdminAuthData?.companyId || "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      setData((prev) => ({
        ...prev,
        ...userData,
        password: "", // never prefill password
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (!userData && AdminAuthData?.companyId) {
      setData((prev) => ({ ...prev, companyId: AdminAuthData.companyId }));
    }
  }, [AdminAuthData, userData]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!data.role.trim()) newErrors.role = "Please select a role.";
    if (!data.companyId.trim()) newErrors.companyId = "Company ID is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Invalid email format.";
    if (!userData && data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await UserSignUp(data);

      if (response.status === 200) {
        toast.success(userData ? "User updated successfully!" : "User created successfully!");
        setData({
          firstName: "",
          lastName: "",
          role: "",
          companyId: AdminAuthData?.companyId || "",
          email: "",
          password: "",
        });
        setErrors({});
        onSuccess?.();
        onClose?.();
      } else {
        toast.error(response.data?.message || "Submission failed.");
        if (response.data?.errors) setErrors(response.data.errors);
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative">
      <ToastContainer />
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-5 text-center">
        {userData ? "Edit User" : "Add New User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name & Last Name */}
        {["firstName", "lastName"].map((name) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              {name === "firstName" ? "First Name" : "Last Name"}
            </label>
            <input
              name={name}
              value={data[name]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role}</p>
          )}
        </div>

        {/* Company ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Company ID</label>
          <input
            name="companyId"
            value={data.companyId}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
          />
          {errors.companyId && (
            <p className="text-red-500 text-xs mt-1">{errors.companyId}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-gray-100"
            placeholder={userData ? "Leave blank to keep existing password" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading
            ? userData
              ? "Updating..."
              : "Submitting..."
            : userData
            ? "Update User"
            : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
