// AuthContext.js
"use client"

import { createContext, useReducer } from "react"
import { API, baseURL } from "../Utils/Utils";

let initialState = {}

if (typeof window !== "undefined") {
  initialState = JSON.parse(localStorage.getItem("UserData")) || {
    token: "",
    userId: ""
  }
} else {
  initialState = {
    token: "",
    userId: ""
  }
}

export const AuthContext = createContext();

async function ProviderSignUp(body) {
  try {
    const response = await API.post(`${baseURL}/Provider/Providersignup`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function ProviderSignIn(body) {
  try {
    const response = await API.post(`${baseURL}/Provider/Providersignin`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function SENDOTP(body) {
  try {
    const response = await API.post(`${baseURL}/otp/sentOTP`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function VERIFYOTP(body) {
  try {
    const response = await API.post(`${baseURL}/otp/verifyOTP`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      const signinState = { ...action.payload };
      localStorage.setItem("UserData", JSON.stringify(signinState));
      return signinState;

    case "UPDATE_PROFILE":
      const updatedState = { ...state, profilepic: action.payload };
      localStorage.setItem("UserData", JSON.stringify(updatedState));
      return updatedState;

    case "SIGN_OUT":
      const signoutState = { token: "", userId: "" };
      localStorage.setItem("UserData", JSON.stringify(signoutState));
      return signoutState;

    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, Authdispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ ProviderSignUp, ProviderSignIn, SENDOTP, VERIFYOTP, Authdispatch, AuthData: state }}>
      {children}
    </AuthContext.Provider>
  );
};
