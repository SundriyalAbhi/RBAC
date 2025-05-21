import React from "react";

const users = [
  { id: 1, name: "Rohit Sharma", role: "Admin" },
  { id: 2, name: "Aisha Patel", role: "CISO" },
  { id: 3, name: "Rahul Verma", role: "Data Analytics" },
  { id: 4, name: "Sophia Fernandez", role: "Auditor" },
  { id: 5, name: "Vikram Mehra", role: "Admin" },
  { id: 6, name: "Aayush", role: "Admin" },
  { id: 7, name: "Aarti", role: "Data Analytics" },
  { id: 8, name: "Khushi", role: "Auditor" },
  { id: 9, name: "Rahul Dangi", role: "CISO" },
  { id: 10, name: "Ravi", role: "Admin" },
];

const UserTable = () => {
  return (
    <div className="p-4 rounded-xl shadow-md text-white bg-gradient-to-br from-[#0b1f33] to-[#081a2a]">
      <h2 className="text-xl font-bold mb-4 text-center">User List</h2>

      {/* Scrollable table container */}
      <div className="max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 p-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2 text-left text-sm">Name</th>
              <th className="p-2 text-right text-sm">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-600">
                <td className="p-2 text-left text-sm">{user.name}</td>
                <td className="p-2 text-right text-sm">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom scrollbar styling for WebKit browsers */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #2a2a2a;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default UserTable;
