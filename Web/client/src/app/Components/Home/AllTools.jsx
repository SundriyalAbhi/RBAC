import React, { useContext, useEffect } from "react";
import "@/app/style.css";
import { useRouter } from "next/navigation";
import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";


export const AllTools = () => {
  const router = useRouter();
  const { Admindispatch, AdminAuthData } = useContext(AdminContext);
  const { UserAuthData } = useContext(UserContext);
  const hasAdmin = AdminAuthData?.token && AdminAuthData?.userId;
  const hasUser = UserAuthData?.token && UserAuthData?.userId;

  const AuthData = hasAdmin ? AdminAuthData : hasUser ? UserAuthData : null;

  useEffect(() => {
    if (!AuthData?.token) {
      router.push("/pages/Auth");
    }
  }, [AuthData]);

  const features = [
    { name: "AutoSOC", icon: "🖥️", link: "" },
    { name: "AutoCom", icon: "💬", link: "" },
    {
      name: "Phantom Radar",
      icon: "📡",
      link: "https://phantom-radar.vercel.app/",
    },
    { name: "CyberKnowledge Engine Agent", icon: "🧠", link: "" },
    { name: "AutoRed", icon: "⚙️", link: "https://auto-red-35f6.vercel.app/" },
    { name: "ZeroCodeSec", icon: "</>", link: "" },
    { name: "GhostIntel", icon: "👻", link: "" },
    {
      name: "Real-Time Radar",
      icon: "📈",
      link: "https://real-time-radar.vercel.app/",
    },
  ];

const handleClick = (feature) => {
  if (feature.link && feature.link.startsWith("http")) {
    const { token, userId } = AuthData;
    const url = new URL(feature.link);
    url.searchParams.set("token", token);
    url.searchParams.set("userId", userId);
    window.location.href = url.toString();
  } else {
    router.push(`/pages/${feature.name.replace(/\s+/g, "")}`);
  }
};


  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold tracking-wide">SENTINELSEC</h1>
        <div className="space-x-6">
          <button className="text-gray-300 hover:text-white transition">
            Settings
          </button>
          <button
            className="text-gray-300 hover:text-white transition"
            onClick={() => {
              Admindispatch({
                type: "SIGN_OUT",
              });
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Greeting */}
      <h2 className="text-2xl font-semibold mb-6">Hello, User</h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const hasAccess = AuthData?.toolsaccess?.includes(feature.name);

          return (
            <div
              key={feature.name}
              className={`bg-gray-800 transition p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center ${
                hasAccess
                  ? "hover:bg-gray-700 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                if (hasAccess) handleClick(feature);
              }}
            >
              <div className="text-4xl mb-4 relative">
                {feature.icon}
                {!hasAccess && (
                  <span className="absolute top-0 right-0 text-sm">🔒</span>
                )}
              </div>
              <h3 className="text-lg font-medium">{feature.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
