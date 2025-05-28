import { CompanyContext } from "@/app/Context/CompanyContext";
import React, { useContext, useEffect, useState } from "react";

const AdminDetails = ({ data, onBack }) => {
  const [company, setCompany] = useState({});
  const [admin, setAdmin] = useState({});
  const { GetAdminDetails } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAdminDetails(data);
        setAdmin(response.admins || {});
        setCompany(response.company || {});
      } catch (error) {
        console.error("Error fetching details:", error);
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
      <button
        onClick={() => onBack(false)}
        className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        ← Go Back
      </button>

      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Admin Details</h2>
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 space-y-2">
          <p><strong>Name:</strong> {admin.name || "N/A"}</p>
          <p><strong>Email:</strong> {admin.email || "N/A"}</p>
          <p><strong>Role:</strong> {admin.role || "N/A"}</p>
          <p><strong>Company ID:</strong> {admin.companyId || "N/A"}</p>
          <p><strong>Created At:</strong> {new Date(admin.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(admin.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-3">Company Details</h3>
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 space-y-2">
          <p><strong>Name:</strong> {company.name || "N/A"}</p>
          <p><strong>Email:</strong> {company.email || "N/A"}</p>
          <p><strong>Industry:</strong> {company.industry || "N/A"}</p>
          <p><strong>Created By:</strong> {company.createdBy || "N/A"}</p>
          <p><strong>Created At:</strong> {new Date(company.createdAt).toLocaleString()}</p>
          <p><strong>Address:</strong> {`${company.address?.city || "N/A"}, ${company.address?.state || "N/A"}, ${company.address?.country || "N/A"}`}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
