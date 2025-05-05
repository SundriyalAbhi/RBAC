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

// A mapping for priority ranking: Higher number means higher priority
const priorityRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function ThreatTable() {
  const [sortType, setSortType] = useState("time"); // "time" or "priority"

  // Create a sorted copy of the threats array based on the selected sort type.
  const sortedThreats = [...threatsData].sort((a, b) => {
    if (sortType === "time") {
      // Sort in descending order (latest first)
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortType === "priority") {
      // Sort in descending order using our priority mapping
      return priorityRank[b.threatPriority] - priorityRank[a.threatPriority];
    }
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sorting buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setSortType("time")}
          className={`px-4 py-2 rounded ${
            sortType === "time" ? "bg-red-600" : "bg-gray-600"
          } text-black`}
        >
          Sort by Time
        </button>
        <button
          onClick={() => setSortType("priority")}
          className={`px-4 py-2 rounded ${
            sortType === "priority" ? "bg-blue-600" : "bg-gray-600"
          } text-black`}
        >
          Sort by Priority
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="shadow-lg bg-[#090E22] text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="  bg-[#a1a2b3]">
              <th className="px-4 py-2 text-center">ThreatID</th>
              <th className="px-4 py-2 ">Threat Name</th>
              <th className="px-4 py-2 ">Threat Priority</th>
              <th className="px-4 py-2">Threat Location</th>
              <th className="px-4 py-2 ">Date</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedThreats.map((threat) => (
              <tr key={threat.threatId}>
                <td className="px-4 py-2 text-center  bg-[#090E22]">
                  {threat.threatId}
                </td>
                <td className="px-4 py-2 text-center bg-[#090E22]">
                  {threat.threatName}
                </td>
                <td
                  className={`px-4 py-2 text-center font-semibold ${
                    threat.threatPriority === "High"
                      ? "text-red-400"
                      : threat.threatPriority === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {threat.threatPriority}
                </td>
                <td className="px-4 py-2 text-center">
                  {threat.threatLocation}
                </td>
                <td className="px-4 py-2 text-center">
                  {new Date(threat.timestamp).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  {new Date(threat.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ThreatTable;
