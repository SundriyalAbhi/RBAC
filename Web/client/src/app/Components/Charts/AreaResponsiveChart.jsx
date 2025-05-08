import React, { useState } from "react";
import { UilTimes } from "@iconscout/react-unicons";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 200, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 280, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 180, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 230, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 500, pv: 2000, amt: 100 },
];

export const AreaResponsiveChart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ChartContent = (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "1rem",
        borderRadius: "20px",
        background: "linear-gradient(145deg, #0b1f33, #081a2a)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        color: "white",
        fontFamily: "Segoe UI, Roboto, sans-serif",
      }}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      <h2
        style={{
          fontSize: "0.95rem",
          marginBottom: "0.75rem",
          fontWeight: 600,
          textAlign: "center",
          letterSpacing: "0.5px",
          color: "#f1f5f9",
        }}
      >
        Website Traffic Overview
      </h2>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0a2e4e" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#0a2e4e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2f45" />
          <XAxis dataKey="name" stroke="#F59E0B" fontSize={11} />
          <YAxis stroke="#F59E0B" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0a2e4e",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
              boxShadow: " #0a2e4e 0 2px 8px ",
              opacity: 0.9,
            }}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#F59E0B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <>
      {!isOpen ? (
  ChartContent
) : (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.8)",
      zIndex: 9999,
      padding: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "90%",
        height: "90%",
      }}
    >
      <button
        onClick={() => setIsOpen(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 10000,
        }}
      >
        <UilTimes size="28" color="#ffffff" />
      </button>

      {ChartContent}
    </div>
  </div>
)}

    </>
  );
};
