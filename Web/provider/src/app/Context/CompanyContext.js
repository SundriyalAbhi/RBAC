"use client"

import { API, baseURL } from "../Utils/Utils";

const { createContext, useReducer } = require("react");

let initialstate;

async function ADDCOMPANY(body) {
    try {
        const responce = await API.post(`${baseURL}/company/AddCompany`,body)
        return responce.status
    } catch (error) {
        return { status: error?.status}
    }
}

async function GETALLCOMPANYS(body) {
    try {
       const responce = await API.get(`${baseURL}/company/GetAllCompany`,body) 
       return responce.data
    } catch (error) {
        return { status: error?.status}
    }
}

function reducer(state,action){
    switch(action.type){
        case"":
    }
}

export const CompanyContext = createContext()

export const CompanyProvider = ({children})=>{
    const[state,Companydispatch] = useReducer(reducer,initialstate)

return(
     <CompanyContext.Provider value={{}}>
        {children}
    </CompanyContext.Provider>
)
}