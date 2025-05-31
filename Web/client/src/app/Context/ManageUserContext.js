"use client"

import { API, baseURL } from "@/Utils/Utils";

const { createContext, useReducer } = require("react");

let initialState = {};

if (typeof window !== "undefined") {
  initialState = JSON.parse(localStorage.getItem("UserData")) || {
    token: null,
    userId: null,
  };
} else {
  initialState = {
    token: "",
    userId: "",
  };
}

async function UserSignUp(body) {
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

function reducer(state, action) {

  switch (action.type) {
    case "SIGN_IN":
      const singinState = { ...action.payload };
      localStorage.setItem("UserData", JSON.stringify(singinState));
      return singinState;

    case "UPDATE_PROFILE":
      const updatedState = { ...state, profilepic: action.payload };
      localStorage.setItem("UserData", JSON.stringify(updatedState));
      return updatedState;

        case"SIGN_OUT":
        const signoutstate = {token:"",userId:""}
        localStorage.setItem("UserData",JSON.stringify(signoutstate));
            return signoutstate
    
        default:
            state;
    }

}

export const UserProvider = ({ children }) => {
  const [state,Userdispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{ UserAuthData:state, Userdispatch,UserSignIn, UserSignUp, UPDATEUSER }}>
      {children}
    </UserContext.Provider>
  )
}