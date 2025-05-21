


import React, { useState } from "react";
import { UilTimes } from "@iconscout/react-unicons";

const threatsData = [
  { Id: 1, Name: "Rohit Sharma", Role: "Admin", Address: "New Delhi, India" },
  { Id: 2, Name: "Aisha Patel", Role: "CISO", Address: "Mumbai, India" },
  {
    Id: 3,
    Name: "Rahul Verma",
    Role: "Data Analytics",
    Address: "Bengaluru, India",
  },
  {
    Id: 4,
    Name: "Sophia Fernandez",
    Role: "Auditor",
    Address: "Kolkata, India",
  },
  { Id: 5, Name: "Vikram Mehra", Role: "Admin", Address: "Hyderabad, India" },
  { Id: 6, Name: "Neha Kapoor", Role: "CISO", Address: "Pune, India" },
  {
    Id: 7,
    Name: "Arjun Sen",
    Role: "Data Analytics",
    Address: "Chennai, India",
  },
  { Id: 8, Name: "Meera Das", Role: "Auditor", Address: "Ahmedabad, India" },
  { Id: 9, Name: "Karan Malhotra", Role: "Admin", Address: "Jaipur, India" },
  { Id: 10, Name: "Sanjana Iyer", Role: "CISO", Address: "Lucknow, India" },
];

const priorityRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function EmployeesTable() {
  const [sortType, setSortType] = useState("time");
  const [isOpen, setIsOpen] = useState(false);

  const sortedThreats = [...threatsData].sort((a, b) => {
    if (sortType === "time") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortType === "priority") {
      return priorityRank[b.threatPriority] - priorityRank[a.threatPriority];
    }
    return 0;
  });

  const ThreatTableContent = (
    <div
      className="w-full overflow-x-auto scrollbar-hide max-h-[80vh]"
      onClick={() => !isOpen && setIsOpen(true)}
      style={{ scrollbarWidth: "none" }}
    >
      <table className="w-full table-auto text-sm rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-[#334155] text-white text-center">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3"> Name</th>
            <th className="py-2 px-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {sortedThreats.map((threat) => (
            <tr
              key={threat.Id}
              className="text-center border-b border-[#1e293b] hover:bg-[#1e293b]/40"
            >
              <td className="py-2 px-3 text-white/90">{threat.Id}</td>
              <td className="py-2 px-3">{threat.Name}</td>
          
              <td className="py-2 px-3 text-white/90">
                {threat.Address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {!isOpen ? (
        ThreatTableContent
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

            {ThreatTableContent}
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeesTable;




