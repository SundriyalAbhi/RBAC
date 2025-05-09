import React, { useState } from 'react';
import { UilTimes } from "@iconscout/react-unicons";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const data = [
  { name: 'Redline', value: 80000 },
  { name: 'Mozi', value: 72000 },
  { name: 'Amadey', value: 60000 },
  { name: 'Mirai', value: 32000 },
  { name: 'evilginx2', value: 30000 },
  { name: 'Cobalt Strike', value: 20000 },
  { name: 'Bashlite', value: 18000 },
  { name: 'Gamaredon Group', value: 15000 },
  { name: 'Mirai', value: 12000 },
  { name: 'TR', value: 10000 },
];

export const HorizontalBarChart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const HorizontalBarChartContent = 
  <div
  style={{
    width: "100%",
    height: "100%",
    padding: '1rem',
    borderRadius: '16px',
    background: 'linear-gradient(145deg, #0b1f33, #081a2a)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    color: 'white',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    borderColor:'#334155'
  }}
  onClick={() => !isOpen && setIsOpen(true)}
>
  <h3
    style={{
      fontSize: '0.95rem',
      fontWeight: 600,
      marginBottom: '0.75rem',
      textAlign: 'center',
      color: '#f1f5f9',
    }}
  >
    Top Malware Detections
  </h3>

  <ResponsiveContainer width="100%" height="85%">
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 10, right: 40, left: -50, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#1f2d3d" />
      <XAxis
        type="number"
        stroke="#F59E0B"
        tick={{ fontSize: 10 }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        dataKey="name"
        type="category"
        stroke="#F59E0B"
        width={130}
        tick={{ fontSize: 10 }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: '#0a2e4e',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '12px',
          boxShadow: ' #0a2e4e 0 2px 8px ',
          opacity: 0.9  ,
        }}
        cursor={{ fill: "#06b5d411"}}
      />
      <Bar dataKey="value" fill="#f59e0b" radius={[0, 10, 10, 0]}>
        <LabelList dataKey="value" position="right" fill="#fff" fontSize={10} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
  return (
    <>
   {!isOpen ? (
     HorizontalBarChartContent
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
   
         {HorizontalBarChartContent}
       </div>
     </div>
   )}
  </>
  );
};
