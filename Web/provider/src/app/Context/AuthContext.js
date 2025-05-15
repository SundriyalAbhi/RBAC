"use client"

import { createContext, useReducer } from "react"
import { API, baseURL } from "../Utils/Utils";

let initialState={}

if(typeof window !=="undefined")
{
    
    initialState=JSON.parse(localStorage.getItem("UserData"))||{
        token:"",
        userId:""
    }
}else{
    initialState={
        token:"",
        userId:""
    }
}

export const AuthContext = createContext();

async function ProviderSignUp(body) {
    try {
        const response = await API.post(`${baseURL}/ProviderAuth/Providersignup`,body)
        return response?.data
    } catch (error) {
        console.log(error);
        
    }
}

async function ProviderSignIn(body) {
    try {
        const response = await API.post(`${baseURL}/ProviderAuth/Providersignin`,body)
        return { status: response?.status, data: response?.data}
    } catch (error) {
        console.log(error);
        
    }
}

async function SENDOTP(body) {
    try {
        const response= await API.post(`${baseURL}/otp/sentOTP`,body)
        return response?.data
    } catch (error) {
        return error?.response?.status
    }
}

async function VERIFYOTP(body) {
    try {
        const response= await API.post(`${baseURL}/otp/verifyOTP`,body)
        return response?.data
    } catch (error) {
        return error?.response?.status
    }
}

function reducer(state,action){

    switch (action.type) {
        case "SIGN_IN":
        const singinState={...action.payload}
        localStorage.setItem("UserData",JSON.stringify(singinState));
        return singinState;

        case "UPDATE_PROFILE":
        const updatedState={...state,profilepic:action.payload}
        localStorage.setItem("UserData",JSON.stringify(updatedState));
        return updatedState;

        case"SIGN_OUT":
        const signoutstate = {token:"",userId:""}
        localStorage.setItem("UserData",JSON.stringify(signoutstate));
            return signoutstate
    
        default:
            state;
    }

}

export const  AuthProvider = ({children})=>{
const [state,Authdispatch] = useReducer(reducer,initialState)
    return(
        <AuthContext.Provider value={{ProviderSignUp,ProviderSignIn,SENDOTP,VERIFYOTP,Authdispatch,AuthData:state}}>
            {children}
        </AuthContext.Provider>
    )
}