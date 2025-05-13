import React, { useState } from 'react';
import "@/app/style.css";

const ProviderDashboard = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'TechCorp', admins: 2 },
    { id: 2, name: 'HealthInc', admins: 1 },
    { id: 3, name: 'AutoHub', admins: 4 },
    { id: 4, name: 'EduSoft', admins: 3 },
    { id: 5, name: 'GreenWorld', admins: 2 },
  ]);

  const [admins, setAdmins] = useState([
    { id: 1, name: 'John Doe', company: 'TechCorp' },
    { id: 2, name: 'Jane Smith', company: 'HealthInc' },
    { id: 3, name: 'Alice Johnson', company: 'AutoHub' },
    { id: 4, name: 'Bob Martin', company: 'EduSoft' },
    { id: 5, name: 'Sara Davis', company: 'GreenWorld' },
  ]);

  return (
    <div className='h-[87.5vh] bg-gradient-to-br from-slate-100 rounded-lg to-slate-200 p-6 overflow-hidden'>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
        <DashboardCard title="Total Companies" value={companies.length} color="bg-blue-500" />
        <DashboardCard title="Total Admins" value={admins.length} color="bg-indigo-500" />
        <DashboardCard title="Active Users" value="--" color="bg-teal-500" />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        <div className='bg-white h-[62vh] rounded-lg shadow-md p-6 border border-gray-200 flex flex-col'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-gray-700'>Companies</h2>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm'>
              + Add Company
            </button>
          </div>
          <div className='overflow-y-auto h-[400px] pr-2'style={{scrollbarWidth:"none"}}>
            <ul className='space-y-3'>
              {companies.map((company) => (
                <li
                  key={company.id}
                  className='p-4 bg-slate-50 hover:bg-slate-100 rounded-md flex justify-between items-center border border-slate-200'
                >
                  <div>
                    <p className='font-medium text-gray-800'>{company.name}</p>
                    <p className='text-sm text-gray-500'>{company.admins} Admin(s)</p>
                  </div>
                  <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm'>
                    Manage
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='bg-white h-[62vh] rounded-lg shadow-md p-6 border border-gray-200 flex flex-col'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Admins</h2>
          <div className='overflow-y-auto h-[400px] pr-2'style={{scrollbarWidth:"none"}}>
            <ul className='space-y-3'>
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className='p-4 bg-slate-50 hover:bg-slate-100 rounded-md flex justify-between items-center border border-slate-200'
                >
                  <span className='font-medium text-gray-800'>{admin.name}</span>
                  <span className='text-sm text-indigo-600'>{admin.company}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, color }) => (
  <div className={`${color} text-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center`}>
    <h3 className='text-md font-medium mb-2'>{title}</h3>
    <p className='text-4xl font-bold'>{value}</p>
  </div>
);

export default ProviderDashboard;
