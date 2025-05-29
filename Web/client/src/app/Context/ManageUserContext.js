"use client"

import { API, baseURL } from "@/Utils/Utils";

const { createContext } = require("react");


async function UserSignUp(body) {
    console.log("ll");
  
  try {
    const response = await API.post(`${baseURL}/Member/MemberSignup`, body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function UserSignIn(body) {
  try {
    const response = await API.post(`${baseURL}/Member/MemberSignin`, body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function UPDATEUSER(body) {
  try {
    const response = await API.put(`${baseURL}/Member/UpdateMember`,body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

  return (
    <UserContext.Provider value={{ UserSignIn, UserSignUp, UPDATEUSER }}>
      {children}
    </UserContext.Provider>
  )
}