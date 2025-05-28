"use client"

import { API, baseURL } from "../Utils/Utils";

const { createContext, useReducer } = require("react");

async function ADDCOMPANY(body) {
    try {
        const responce = await API.post(`${baseURL}/company/AddCompany`,body)
        return responce.status
    } catch (error) {
        return { status: error?.status}
    }
}

async function GETALLCOMPANYS() {
    try {
       const responce = await API.get(`${baseURL}/Provider/GetAllCompany`) 
       return responce.data
    } catch (error) {
        return { status: error?.status}
    }
}

async function UPDATECOMPANYDETAILS(id, body) {
  try {
    const response = await API.put(`${baseURL}/company/UpdateCompanyDetails/${id}`, body);
    
    return response.status;
  } catch (error) {
    console.error("Update error:", error?.response?.data || error.message);

    return {
      status: error?.response?.status || 500,
      error: error?.response?.data || "Server error",
    };
  }
}

async function GETALLADMINS() {
  try {
    const responce = await API.get(`${baseURL}/Provider/AllAdmins`)
    return responce.data
  } catch (error) {
    console.log(error);
  }
}

async function DELETECOMPANY(body) {
  try {
    const response = await API.delete(`${baseURL}/company/DeleteCompany`, {
      data: body,
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

async function AddAdmin(body) {
  try {
      const response = await API.post(`${baseURL}/admin/register`, body);
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

async function UPDATEADMIN(id,body) {
  try {
    const responce = await API.put(`${baseURL}/admin/update/${id}`,body)
    return responce.status
  } catch (error) {
    console.log(error);
  }
}

async function SearchCompany(body) {
  try {
    const responce = await API.get(`${baseURL}/Provider/GetCompanyByName`,{
            params:{name:body.searchD}
        })
    return responce.data
  } catch (error) {
    console.log(error);
  }
}

async function SearchAdminByCompanyName(body) {
  try {
    const responce = await API.get(`${baseURL}/Provider/GetAdminByCompanyName`,{
            params:{name:body.searchD}
        })
    return responce.data
  } catch (error) {
    console.log(error);
  }
}

async function GetCompanyDetails(body) {
  try {
    const responce = await API.get(`${baseURL}/Provider/GetCompanyDetails`,{
            params:body
        })
    return responce.data
  } catch (error) {
    console.log(error);
  }
}

async function GetAdminDetails(body) {
  try {
    const responce = await API.get(`${baseURL}/Provider/GetAdminDetails`,{
            params:body
        })
    return responce.data
  } catch (error) {
    console.log(error);
  }
}

export const CompanyContext = createContext()

export const CompanyProvider = ({children})=>{

return(
     <CompanyContext.Provider value={{ADDCOMPANY,GETALLCOMPANYS,UPDATECOMPANYDETAILS,GETALLADMINS,DELETECOMPANY,AddAdmin,UPDATEADMIN,SearchCompany,SearchAdminByCompanyName,GetCompanyDetails,GetAdminDetails}}>
        {children}
    </CompanyContext.Provider>
)
}