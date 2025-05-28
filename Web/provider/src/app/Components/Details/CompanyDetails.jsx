import { CompanyContext } from "@/app/Context/CompanyContext";
import React, { useContext, useEffect, useState } from "react";

const CompanyDetails = ({ data, onBack }) => {
  const [company, setCompany] = useState({});
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);
  const { GetCompanyDetails } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetCompanyDetails(data);
        setCompany(response.company || {});
        setMembers(response.members || []);
        setAdmins(response.admins || []);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-medium text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen overflow-auto">
      {/* Go Back Button */}
      <button
        onClick={() => onBack(false)}
        className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        ← Go Back
      </button>

      {/* Company Details */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Company Details</h2>
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          <p><strong>Name:</strong> {company.name || "N/A"}</p>
          <p><strong>Email:</strong> {company.email || "N/A"}</p>
          <p><strong>Industry:</strong> {company.industry || "N/A"}</p>
          <p><strong>Created By:</strong> {company.createdBy || "N/A"}</p>
          <p><strong>Address:</strong> {company.address?.city || "N/A"}, {company.address?.state || "N/A"}, {company.address?.country || "N/A"}</p>
        </div>
      </div>

      {/* Admin Details */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-3">Admin Details</h3>
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {admins.length > 0 ? (
            admins.map((admin, index) => (
              <div key={index} className="border-b border-gray-700 pb-2">
                <p><strong>Name:</strong> {admin.name}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Role:</strong> {admin.role}</p>
                <p><strong>Created At:</strong> {new Date(admin.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No admin data available.</p>
          )}
        </div>
      </div>

      {/* Member Details */}
      <div>
        <h3 className="text-2xl font-semibold mb-3">Member Details</h3>
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {members.length > 0 ? (
            members.map((member, index) => (
              <div key={index} className="border-b border-gray-700 pb-2">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Role:</strong> {member.role}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No member data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
