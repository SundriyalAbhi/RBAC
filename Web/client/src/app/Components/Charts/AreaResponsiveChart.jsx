import React from "react";
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
  return (
    <div
      className="w-full h-full p-4 rounded-2xl"
      style={{
        background: "linear-gradient(145deg, #0b1f33, #081a2a)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        color: "white",
        fontFamily: "Segoe UI, Roboto, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "0.95rem",
          marginBottom: "0.75rem",
          fontWeight: 600,
          textAlign: "center",
          color: "#f1f5f9",
        }}
      >
        Website Traffic Overview
      </h2>
      {/* This makes it fit exactly in the parent */}
      <div style={{ width: "100%", height: "calc(100% - 2rem)" }}>
        <ResponsiveContainer width="100%" height="100%">
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
            <XAxis dataKey="name" stroke="#1B96B3" fontSize={11} />
            <YAxis stroke="#1B96B3" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a2e4e",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "12px",
                border: "none",
              boxShadow: '#0a2e4e 0 2px 8px ',

              }}
            />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#1B96B3"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
