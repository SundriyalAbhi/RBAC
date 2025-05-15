'use client';
import React, { useContext, useEffect, useState } from 'react';
import "@/app/style.css";
import { useRouter } from 'next/navigation';
import AddCompanyForm from '@/app/Components/Form/AddComapnyForm';
import { CompanyContext } from '@/app/Context/CompanyContext';

const ProviderDashboard = () => {
  const router = useRouter();
  const {GETALLCOMPANYS,ADDCOMPANY,UPDATECOMPANYDETAILS} = useContext(CompanyContext)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [DataForUpdate,SetDataForUpdate] = useState({}) 
  const [companies, setCompanies] = useState([]);

  const [admins, setAdmins] = useState([
    { id: 1, name: 'John Doe', company: 'TechCorp' },
    { id: 2, name: 'Jane Smith', company: 'HealthInc' },
    { id: 3, name: 'Alice Johnson', company: 'AutoHub' },
    { id: 4, name: 'Bob Martin', company: 'EduSoft' },
    { id: 5, name: 'Sara Davis', company: 'GreenWorld' },
  ]);

  async function GetAllCompanyHandler() {
    try {
      const data = await GETALLCOMPANYS()
      if(data){
        setCompanies(data.AllCompanyS || [])
      }
    } catch (error) {
      console.log(error);
    }
  }

 useEffect(() => {
  if (!isOpenModal) {
    GetAllCompanyHandler();
  }
}, [isOpenModal]);

  useEffect(() => {
  GetAllCompanyHandler();
}, []);


  return (
    <>
      {isOpenModal ? (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden={!isOpenModal}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4">
              <div className="flex items-center justify-between pb-4 border-b dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add New Company
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpenModal(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="mt-4">
                <AddCompanyForm  setIsOpenModal={setIsOpenModal} DataForUpdate={DataForUpdate}/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[87.5vh] bg-gradient-to-br from-slate-100 rounded-lg to-slate-200 p-6 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <DashboardCard title="Total Companies" value={companies.length || ""} color="bg-blue-500" />
            <DashboardCard title="Total Admins" value={admins.length} color="bg-indigo-500" />
            <DashboardCard title="Active Users" value="--" color="bg-teal-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white h-[62vh] rounded-lg shadow-md p-6 border border-gray-200 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Companies</h2>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                  onClick={() => setIsOpenModal(true)}
                >
                  + Add Company
                </button>
              </div>
              <div
                className="overflow-y-auto h-[400px] pr-2"
                style={{ scrollbarWidth: 'none' }}
              >
                <ul className="space-y-3">
                  {companies.map((company,id) => (
                    <li
                      key={id}
                      className="p-4 bg-slate-50 hover:bg-slate-100 rounded-md flex justify-between items-center border border-slate-200"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.admins} Admin(s)</p>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm" onClick={()=>{
                        SetDataForUpdate(company)
                        setIsOpenModal(true)
                      }}>
                        Manage
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white h-[62vh] rounded-lg shadow-md p-6 border border-gray-200 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Admins</h2>
              <div
                className="overflow-y-auto h-[400px] pr-2"
                style={{ scrollbarWidth: 'none' }}
              >
                <ul className="space-y-3">
                  {admins.map((admin,id) => (
                    <li
                      key={id}
                      className="p-4 bg-slate-50 hover:bg-slate-100 rounded-md flex justify-between items-center border border-slate-200"
                    >
                      <span className="font-medium text-gray-800">{admin.name}</span>
                      <span className="text-sm text-indigo-600">{admin.company}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DashboardCard = ({ title, value, color }) => (
  <div
    className={`${color} text-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center`}
  >
    <h3 className="text-md font-medium mb-2">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default ProviderDashboard;
