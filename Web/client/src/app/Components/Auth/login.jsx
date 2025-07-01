"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";
import { FaUserShield, FaLock } from "react-icons/fa";

export const SignIn = ({ setMode }) => {
  const [formData, setFormData] = useState({ role: "Admin" });
  const { Admindispatch, AdminLogin } = useContext(AdminContext);
  const { Userdispatch, UserSignIn } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, role, email } = formData;

    if (!password || !role || !email) {
      toast.error("Please fill out all fields", {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce,
      });
      return;
    }

    try {
      let logindata = role === "Admin"
        ? await AdminLogin(formData)
        : await UserSignIn(formData);

      if (!logindata || !logindata.status) {
        toast.error("Unexpected error during login.", {
          position: "top-center",
          autoClose: 5000,
          transition: Bounce,
        });
        return;
      }

      switch (logindata.status) {
        case 200:
          toast.success("Login successful", {
            position: "top-center",
            autoClose: 3000,
            transition: Bounce,
          });

          if (logindata.data.role === "admin") {
            Admindispatch({ type: "SIGN_IN", payload: logindata.data });
            router.push("/pages/Admin");
          } else {
            Userdispatch({ type: "SIGN_IN", payload: logindata.data });
            router.push("/pages/Member");
          }
          break;

        case 401:
          toast.error("Wrong password", { position: "top-center" });
          break;
        case 404:
          toast.error("User does not exist", { position: "top-center" });
          break;
        default:
          toast.error(`Login failed: ${logindata.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
      <div className="bg-white/10 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6 tracking-tight">
          CyberSecure Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-white mb-1 block">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              className="w-full px-4 py-2 bg-[#1e293b] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="Admin">Administrator</option>
              <option value="Provider">CISO</option>
              <option value="DataAnalyst">Data Analyst</option>
              <option value="Auditor">Auditor</option>
              <option value="Manager">Manager</option>
              <option value="SOCAnalyst">SOC Analyst</option>
            </select>
          </div>

          <div className="relative">
            <label className="text-sm text-white mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 pl-10 bg-[#1e293b] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <FaUserShield className="absolute top-9 left-3 text-teal-400" />
          </div>

          <div className="relative">
            <label className="text-sm text-white mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 pl-10 bg-[#1e293b] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <FaLock className="absolute top-9 left-3 text-teal-400" />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-teal-400 hover:underline"
              onClick={() => setMode("ForgotPass")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition duration-300 font-semibold tracking-wide"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
