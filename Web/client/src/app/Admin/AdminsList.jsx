import React from "react";

const AdminTable = ({ admins }) => {
  return (
    <div className="p-4 rounded-xl shadow-md text-white bg-gradient-to-br from-[#0b1f33] to-[#081a2a]">
      <h2 className="text-xl font-bold mb-4 text-center">Admin List</h2>

      <div className="max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 p-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#334155] text-white text-sm border-b border-gray-600 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Company</th>
              <th className="p-2 text-right">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins?.length > 0 ? (
              admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-b border-gray-700 hover:bg-white/5 transition-all"
                >
                  <td className="p-2 text-sm">{admin._id}</td>
                  <td className="p-2 text-sm">{admin.name}</td>
                  <td className="p-2 text-sm">{admin.email}</td>
                  <td className="p-2 text-sm">{admin.companyName}</td>
                  <td className="p-2 text-sm text-right capitalize">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        admin.role === "admin"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-300"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-400 text-sm"
                >
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

export default AdminTable;
