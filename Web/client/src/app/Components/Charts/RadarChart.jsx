import React, { useState } from 'react';
import { UilTimes } from "@iconscout/react-unicons";

import {
  Radar
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ['Design', 'Development', 'Marketing', 'Sales', 'Support', 'Management'],
  datasets: [
    {
      label: 'Team A',
      data: [65, 59, 90, 81, 56, 55],
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      pointBackgroundColor: 'rgba(34, 202, 236, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
      borderWidth: 2,
    },
    {
      label: 'Team B',
      data: [28, 48, 40, 19, 96, 27],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#f1f5f9',
        font: { size: 12 }
      }
    },
    tooltip: {
      backgroundColor: '#0a2e4e',
      titleColor: '#fff',
      bodyColor: '#f1f5f9',
      borderColor: '#334155',
      borderWidth: 1,
      boxPadding: 6,
    }
  },
  scales: {
    r: {
      angleLines: {
        color: '#334155',
      },
      grid: {
        color: '#1e293b',
      },
      pointLabels: {
        color: '#f1f5f9',
        font: { size: 10 },
      },
      ticks: {
        color: '#f59e0b',
        backdropColor: 'transparent',
        stepSize: 20,
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};


export default function RadarChart() {
const [isOpen, setIsOpen] = useState(false);
const RadarChartContent =     
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
  borderColor: '#334155',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
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
  Team Skill Radar Comparison
</h3>
<div
  style={{
    width: '100%',
    height: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Radar data={data} options={options} />
</div>
</div>
  
  return (
    <>
      {!isOpen ? (
  RadarChartContent
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

      {RadarChartContent}
    </div>
  </div>
)}
    </>
  );
}
