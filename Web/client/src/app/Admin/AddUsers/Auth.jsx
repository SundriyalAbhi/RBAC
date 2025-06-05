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
        password: "",
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
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative text-gray-900">
      <ToastContainer />
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-2xl"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">
        {userData ? "Edit User" : "Add New User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {["firstName", "lastName"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              name={field}
              value={data[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[field] && <p className="text-xs text-red-600 mt-1">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company ID</label>
          <input
            name="companyId"
            value={data.companyId}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
          />
          {errors.companyId && <p className="text-xs text-red-600 mt-1">{errors.companyId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            placeholder={userData ? "Leave blank to keep existing password" : ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
