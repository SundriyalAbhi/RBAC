'use client';
import React, { useContext, useEffect, useState } from 'react';
import "@/app/style.css";
import { useRouter } from 'next/navigation';
import AddCompanyForm from '@/app/Components/Form/AddComapnyForm';
import { CompanyContext } from '@/app/Context/CompanyContext';

const ProviderDashboard = () => {
  const router = useRouter();
  const { GETALLCOMPANYS, GETALLADMINS, DELETECOMPANY } = useContext(CompanyContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [DataForUpdate, SetDataForUpdate] = useState({});
  const [companies, setCompanies] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (!isOpenModal) {
      GetAllCompanyHandler();
    }
  }, [isOpenModal]);

  useEffect(() => {
    GetAllCompanyHandler();
    GetAllADMINHandler();
  }, []);

  async function GetAllCompanyHandler() {
    try {
      const data = await GETALLCOMPANYS();
      if (data) setCompanies(data.AllCompanyS || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetAllADMINHandler() {
    try {
      const data = await GETALLADMINS();
      if (data) setAdmins(data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteCompany(body) {
    try {
      const status = await DELETECOMPANY(body)
      if(status==200){
        GetAllCompanyHandler()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isOpenModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transition-all duration-300">
           <div className="flex justify-between items-start border-b pb-3">
  <div>
    {/* <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add / Update Company</h3> */}
  </div>
  <button
    onClick={() => setIsOpenModal(false)}
    aria-label="Close modal"
    className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
  >
    ×
  </button>
</div>

              <div className="mt-4">
                <AddCompanyForm setIsOpenModal={setIsOpenModal} DataForUpdate={DataForUpdate} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[87.5vh] bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <DashboardCard title="Total Companies" value={companies.length} color="bg-blue-600" />
            <DashboardCard title="Total Admins" value={admins.length} color="bg-indigo-600" />
            <DashboardCard title="Active Users" value="--" color="bg-teal-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white h-[63vh] dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Companies</h2>
                <button
                  onClick={() => {
                    SetDataForUpdate({});
                    setIsOpenModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                >
                  + Add Company
                </button>
              </div>
              <div className="overflow-y-auto h-[400px] pr-2 custom-scroll">
                <ul className="space-y-3">
                  {companies.map((company, id) => (
                    <li key={id} className="bg-slate-50 hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-md flex justify-between items-center border border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{company.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{company.admins} Admin(s)</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            SetDataForUpdate(company);
                            setIsOpenModal(true);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Manage
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() => {
                            DeleteCompany(company)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white h-[63vh] dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Admins</h2>
              <div className="overflow-y-auto h-[400px] pr-2 custom-scroll">
                <ul className="space-y-3">
                  {admins.map((admin, id) => (
                    <li
                      key={id}
                      className="bg-slate-50 hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-md flex justify-between items-center border border-gray-200 dark:border-gray-600"
                    >
                      <span className="font-medium text-gray-800 dark:text-white">{admin.name}</span>
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
  <div className={`${color} text-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center`}>
    <h3 className="text-md font-medium mb-2">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default ProviderDashboard;
