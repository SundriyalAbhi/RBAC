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
       const responce = await API.get(`${baseURL}/company/GetAllCompany`) 
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


export const CompanyContext = createContext()

export const CompanyProvider = ({children})=>{

return(
     <CompanyContext.Provider value={{ADDCOMPANY,GETALLCOMPANYS,UPDATECOMPANYDETAILS}}>
        {children}
    </CompanyContext.Provider>
)
}