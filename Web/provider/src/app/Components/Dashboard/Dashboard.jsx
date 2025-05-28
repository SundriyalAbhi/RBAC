"use client";
import React, { useContext, useEffect, useState } from "react";
import "@/app/style.css";
import { useRouter } from "next/navigation";
import AddCompanyForm from "@/app/Components/Form/AddComapnyForm";
import AddAdminForm from "@/app/Components/Form/AddAdminForm";
import { CompanyContext } from "@/app/Context/CompanyContext";
import CompanyDetails from "../Details/CompanyDetails";
import AdminDetails from "../Details/AdminDetails";

const ProviderDashboard = () => {
  const {
    GETALLCOMPANYS,
    GETALLADMINS,
    DELETECOMPANY,
    ADDADMIN,
    UPDATEADMIN,
    SearchCompany,
    SearchAdminByCompanyName,
  } = useContext(CompanyContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [companies, setCompanies] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [allCompanies, setAllCompanies] = useState();
  const [allAdmins, setAllAdmins] = useState();
  const [searchCompanyData, setSearchCompanyData] = useState({ searchD: "" });
  const [searchAdminData, setSearchAdminData] = useState({ searchD: "" });
  const [isDetails, setIsDetails] = useState(""); 
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [selectedAdminDetails, setSelectedAdminDetails] = useState(null);

  useEffect(() => {
    GetAllCompanyHandler();
    GetAllADMINHandler();
  }, [isOpenModal]);

  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(() => {
      if (searchCompanyData.searchD.trim() !== "") {
        handleCompanySearch(searchCompanyData);
      } else {
        GetAllCompanyHandler();
      }
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(handler);
    };
  }, [searchCompanyData]);

  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(() => {
      if (searchAdminData.searchD.trim() !== "") {
        handleAdminSearch(searchAdminData);
      } else {
        GetAllADMINHandler();
      }
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(handler);
    };
  }, [searchAdminData]);

  async function GetAllCompanyHandler() {
    try {
      const data = await GETALLCOMPANYS();
      if (data) {
        setCompanies(data.AllCompanyS || []);
        setAllCompanies(data.AllCompanyS.length);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function GetAllADMINHandler() {
    try {
      const data = await GETALLADMINS();
      if (data) {
        setAdmins(data || []);
        setAllAdmins(data.length);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCompanySearch(payload) {
    try {
      const res = await SearchCompany(payload);
      if (res) setCompanies(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAdminSearch(payload) {
    try {
      const res = await SearchAdminByCompanyName(payload);
      if (res) setAdmins(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function DeleteCompany(body) {
    try {
      const status = await DELETECOMPANY(body);
      if (status === 200) {
        GetAllCompanyHandler();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isDetails === "CompanyDetails" ? (
        <CompanyDetails data={selectedCompanyDetails} onBack={setIsDetails} />
      ) : isDetails === "AdminDetails" ? (
        <AdminDetails data={selectedAdminDetails} onBack={setIsDetails} />
      ) : (
        <>
          {isOpenModal === "AddCompany" && (
            <ModalWrapper onClose={() => setIsOpenModal(false)}>
              <AddCompanyForm
                setIsOpenModal={setIsOpenModal}
                DataForUpdate={dataForUpdate}
              />
            </ModalWrapper>
          )}
          {isOpenModal === "AddAdmin" && (
            <ModalWrapper onClose={() => setIsOpenModal(false)}>
              <AddAdminForm
                setIsOpenModal={setIsOpenModal}
                DataForUpdate={dataForUpdate}
                ownerId="Abhi"
                companies={companies}
                ADDADMIN={ADDADMIN}
                UPDATEADMIN={UPDATEADMIN}
              />
            </ModalWrapper>
          )}

          <div className="h-[87.5vh] to-slate-200 p-6 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <DashboardCard title="Total Companies" value={allCompanies} color="bg-blue-600" />
              <DashboardCard title="Total Admins" value={allAdmins} color="bg-indigo-600" />
              <DashboardCard title="Active Users" value="--" color="bg-teal-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Companies Section */}
              <div className="bg-white h-[63vh] dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="flex justify-between items-center mb-4 gap-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Companies</h2>
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchCompanyData.searchD}
                    onChange={(e) => setSearchCompanyData({ searchD: e.target.value })}
                    className="w-full sm:w-64 px-4 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <button
                    onClick={() => {
                      setDataForUpdate({});
                      setIsOpenModal("AddCompany");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                  >
                    + Add Company
                  </button>
                </div>
                <div className="overflow-y-auto h-[400px] pr-2 custom-scroll">
                  <ul className="space-y-3">
                    {companies.map((company, id) => (
                      <li
                        key={id}
                        className="bg-slate-50 hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-md flex justify-between items-center border border-gray-200 dark:border-gray-600"
                        onClick={() => {
                          setSelectedCompanyDetails({ id: company._id });
                          setIsDetails("CompanyDetails");
                        }}
                      >
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{company.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">{company.admins} Admin(s)</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDataForUpdate(company);
                              setIsOpenModal("AddCompany");
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Manage
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              DeleteCompany(company);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Admins Section */}
              <div className="bg-white h-[63vh] dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="flex justify-between items-center mb-4 gap-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admins</h2>
                  <input
                    type="text"
                    placeholder="Search By CompanyName..."
                    value={searchAdminData.searchD}
                    onChange={(e) => setSearchAdminData({ searchD: e.target.value })}
                    className="w-full sm:w-64 px-4 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <button
                    onClick={() => {
                      setDataForUpdate({});
                      setIsOpenModal("AddAdmin");
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md"
                  >
                    + Add Admin
                  </button>
                </div>
                <div className="overflow-y-auto h-[400px] pr-2 custom-scroll">
                  <ul className="space-y-3">
                    {admins.map((admin, id) => (
                      <li
                        key={id}
                        className="bg-slate-50 hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-md flex justify-between items-center border border-gray-200 dark:border-gray-600"
                        onClick={()=>{
                          setSelectedAdminDetails({id:admin._id,companyId:admin.companyId})
                          setIsDetails("AdminDetails")
                        }}
                      >
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{admin.name}</p>
                          <p className="text-sm text-indigo-600">{admin.companyName}</p>
                        </div>
                        <button
                          onClick={() => {
                            setDataForUpdate(admin);
                            setIsOpenModal("AddAdmin");
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
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

const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
    <div className="relative w-full max-w-2xl px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transition-all duration-300">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  </div>
);

export default ProviderDashboard;
