"use client";
import { useState, React } from "react";
import "@/app/style.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D1117]">
      <div className="bg-[#151B23] p-8 rounded-lg shadow-lg w-96 border border-gray-600">
        <h2 className="text-2xl font-bold text-center text-gray-100">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form className="mt-6">
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-400">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg bg-[#0D1117] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-gray-100 bg-[#29903B] rounded-lg hover:bg-green-800 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;