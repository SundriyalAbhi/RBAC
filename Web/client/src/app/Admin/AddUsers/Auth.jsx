"use client";
import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";
import "@/app/style.css";

const AuthForm = () => {
  const { AuthData } = useContext(AdminContext);
  const { UserSignUp } = useContext(UserContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    companyId: AuthData?.companyId || "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await UserSignUp(data);
      toast.success("User created successfully!");
      setData({
        firstName: "",
        lastName: "",
        role: "",
        companyId: AuthData?.companyId || "",
        email: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <ToastContainer />
      <div className="w-full max-w-[70%] bg-[#111827] p-8 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-4">
          Add User
        </h2>

        <form
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <InputField
            label="First Name"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          {/* Last Name */}
          <InputField
            label="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-400 text-md mb-2">Role</label>
            <select
              name="role"
              value={data.role}
              onChange={handleChange}
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
            {errors.role && (
              <p className="text-red-500 text-sm mt-1 pl-2">{errors.role}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg text-lg transition bg-green-700 text-gray-100 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
}) => (
  <div className="mb-4">
    <label className="block text-gray-400 text-md mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 text-md focus:ring-2 focus:ring-blue-500"
      placeholder={`Enter ${label.toLowerCase()}`}
      required
    />
    {error && <p className="text-red-500 text-sm mt-1 pl-2">{error}</p>}
  </div>
);

export default AuthForm;
