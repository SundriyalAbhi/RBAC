import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";

export const SignIn = ({ setMode }) => {
  const [formData, setFormData] = useState({ role: "Admin" });
  const { Admindispatch, AdminLogin } = useContext(AdminContext);
  const { Userdispatch, UserSignIn, recordActivity } = useContext(UserContext);
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
      let logindata;

      if (role === "Admin") {
        logindata = await AdminLogin(formData);
      } else {
        logindata = await UserSignIn(formData);
      }

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
          toast.info("Login successful", {
            position: "top-center",
            autoClose: 5000,
            transition: Bounce,
          });

          if (logindata.data.role === "admin") {
            Admindispatch({ type: "SIGN_IN", payload: logindata.data });
            router.push("/pages/Admin");
          } else {
            Userdispatch({ type: "SIGN_IN", payload: logindata.data });
            if (logindata.data.role) {
              router.push("/pages/Home");
            }
          }

          break;

        case 401:
          toast.error("Wrong password", {
            position: "top-center",
            autoClose: 5000,
            transition: Bounce,
          });
          break;

        case 404:
          toast.error("User does not exist", {
            position: "top-center",
            autoClose: 5000,
            transition: Bounce,
          });
          break;

        default:
          toast.error(`Login failed: ${logindata.message || "Unknown error"}`, {
            position: "top-center",
            autoClose: 5000,
            transition: Bounce,
          });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="Admin">Administrator</option>
              <option value="Provider">CISO</option>
              <option value="DataAnalyst">Data Analyst</option>
              <option value="Auditor">Auditor</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="SOCAnalyst">SOC Analyst</option>
            </select>
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-teal-700 hover:underline"
              onClick={() => setMode("ForgotPass")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
