import React from 'react';
import "@/app/style.css";
import { useRouter } from 'next/navigation';

export const AllTools = () => {
  const router = useRouter();

  const features = [
    { name: "AutoSOC", icon: "🖥️", link: "" },
    { name: "AutoCom", icon: "💬", link: "" },
    { name: "Phantom Radar", icon: "📡", link: "https://phantom-radar.vercel.app/" },
    { name: "CyberKnowledge Engine Agent", icon: "🧠", link: "" },
    { name: "AutoRed", icon: "⚙️", link: "https://auto-red-35f6.vercel.app/" },
    { name: "ZeroCodeSec", icon: "</>", link: "" },
    { name: "GhostIntel", icon: "👻", link: "" },
    { name: "Real-Time Radar", icon: "📈", link: "https://real-time-radar.vercel.app/" },
  ];

  const handleClick = (feature) => {
    if (feature.link && feature.link.startsWith("http")) {
      window.location.href = feature.link; 
    } else {
      const route = feature.link || `/pages/${feature.name.replace(/\s+/g, "")}`;
      router.push(route);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold tracking-wide">SENTINELSEC</h1>
        <div className="space-x-6">
          <button className="text-gray-300 hover:text-white transition">Settings</button>
          <button className="text-gray-300 hover:text-white transition">Logout</button>
        </div>
      </header>

      {/* Greeting */}
      <h2 className="text-2xl font-semibold mb-6">Hello, User</h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="bg-gray-800 hover:bg-gray-700 transition p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => handleClick(feature)}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-medium">{feature.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
