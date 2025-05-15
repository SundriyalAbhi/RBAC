"use client"

import { createContext } from "react"
import { API, baseURL } from "../Utils/Utils";

export const AuthContext = createContext();

async function ProviderSignUp(body) {
    try {
        const response = await API.post(`${baseURL}/ProviderAuth/Providersignup`,body)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async function ProviderSignIn(body) {
    try {
        const response = await API.post(`${baseURL}/ProviderAuth/Providersignin`,body)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export const  AuthProvider = ({children})=>{

    return(
        <AuthContext.Provider value={{ProviderSignUp,ProviderSignIn}}>
            {children}
        </AuthContext.Provider>
    )
}