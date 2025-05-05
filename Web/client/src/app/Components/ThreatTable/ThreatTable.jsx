import React, { useState } from "react";

const threatsData = [
  {
    threatId: "101",
    threatName: "Malware Attack",
    threatPriority: "High",
    threatLocation: "Server 1",
    timestamp: "2025-05-03T21:00:00",
  },
  {
    threatId: "102",
    threatName: "Phishing Attempt",
    threatPriority: "Medium",
    threatLocation: "Email Gateway",
    timestamp: "2025-05-03T20:15:00",
  },
  {
    threatId: "103",
    threatName: "DDoS Attack",
    threatPriority: "Low",
    threatLocation: "Web Server",
    timestamp: "2025-05-03T19:45:00",
  },
  {
    threatId: "104",
    threatName: "SQL Injection",
    threatPriority: "High",
    threatLocation: "Database Server",
    timestamp: "2025-05-03T22:30:00",
  },
  {
    threatId: "105",
    threatName: "Cross-Site Scripting",
    threatPriority: "Medium",
    threatLocation: "App Server",
    timestamp: "2025-05-03T20:30:00",
  },
  {
    threatId: "106",
    threatName: "Ransomware",
    threatPriority: "High",
    threatLocation: "Backup Server",
    timestamp: "2025-05-03T10:30:00",
  },
];

const priorityRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function ThreatTable() {
  const [sortType, setSortType] = useState("time");

  const sortedThreats = [...threatsData].sort((a, b) => {
    if (sortType === "time") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortType === "priority") {
      return priorityRank[b.threatPriority] - priorityRank[a.threatPriority];
    }
    return 0;
  });

  return (
    <div className="w-full overflow-x-auto" style={{scrollbarWidth: "none"}}>
      {/* Sorting Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setSortType("time")}
          className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
            sortType === "time" ? "bg-red-500 text-white" : "bg-gray-700 text-white/70"
          }`}
        >
          Sort by Time
        </button>
        <button
          onClick={() => setSortType("priority")}
          className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
            sortType === "priority" ? "bg-blue-500 text-white" : "bg-gray-700 text-white/70"
          }`}
        >
          Sort by Priority
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto text-sm rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-[#334155] text-white text-center">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">Threat Name</th>
            <th className="py-2 px-3">Priority</th>
            <th className="py-2 px-3">Location</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedThreats.map((threat) => (
            <tr
              key={threat.threatId}
              className="text-center border-b border-[#1e293b] hover:bg-[#1e293b]/40"
            >
              <td className="py-2 px-3 text-white/90">{threat.threatId}</td>
              <td className="py-2 px-3">{threat.threatName}</td>
              <td
                className={`py-2 px-3 font-semibold ${
                  threat.threatPriority === "High"
                    ? "text-red-400"
                    : threat.threatPriority === "Medium"
                    ? "text-yellow-300"
                    : "text-green-400"
                }`}
              >
                {threat.threatPriority}
              </td>
              <td className="py-2 px-3 text-white/90">{threat.threatLocation}</td>
              <td className="py-2 px-3 text-white/80">
                {new Date(threat.timestamp).toLocaleDateString()}
              </td>
              <td className="py-2 px-3 text-white/80">
                {new Date(threat.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThreatTable;
