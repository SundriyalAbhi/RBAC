"use client";

import { API, baseURL } from "@/Utils/Utils";

let initialState = {};
let UsersforAdmin = [];

if (typeof window !== "undefined") {
  initialState = JSON.parse(localStorage.getItem("AdminData")) || {
    token: null,
    userId: null,
  };
} else {
  initialState = {
    token: "",
    userId: "",
  };
}

const { createContext, useReducer } = require("react");


async function AdminLogin(body) {
  try {
    const response = await API.post(`${baseURL}/admin/login`, body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function UPDATEADMIN(body) {
  try {
    const response = await API.put(`${baseURL}/admin/update/${body._id}`,body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function getprofile(authData) {
  try {
    const response = await API.get(`${baseURL}/profile/getprofile/${authData.userId}`)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function findAccount(body) {
  try {
    const response = await API.get(`${baseURL}/Userauth/MemberFindAccount/${body.email}`)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function GetAllAdmins(body) {
  try {
    const response = await API.get(`${baseURL}/admin/all`, { params: { companyId: body } })
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function SENDOTP(body) {
  try {
    const response = await API.post(`${baseURL}/otp/sentOTP`, body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function VERIFYOTP(body) {
  try {
    const response = await API.post(`${baseURL}/otp/verifyOTP`, body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function PasswordUpdate(body) {
  try {
    const response = await API.put(`${baseURL}/profile/updatepassword/`, body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function deleteaccount(authData) {
  try {
    const response = await API.delete(`${baseURL}/profile/deleteprofile/${authData.userId}`)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function profileupdate(authData, body) {
  try {
    const response = await API.put(`${baseURL}/profile/updateprofile/${authData.userId}`, body)
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function GetUsersforAdmin(body) {
  try {
    const response = await API.get(`${baseURL}/admin/users`, { params: { companyId: body } })
    return { status: response?.status, data: response?.data }
  } catch (error) {
    console.log(error);
  }
}

async function GetUsersforAdminByName(body, signal) {
  try {
    const response = await API.get(`${baseURL}/admin/GetUserByName`, { params: { name: body } }, signal)
    return { status: response?.status, data: response?.data }
  } catch (error) {
    console.log(error);
  }
}

async function Activitylog(body) {
  try {
    const response = await API.get(`${baseURL}/activity/getActivityforAdmins`, { params: { companyId: body } })
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

function Adminreducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      const singinState = { ...action.payload };
      localStorage.setItem("AdminData", JSON.stringify(singinState));
      return singinState;

    case "UPDATE_PROFILE":
      const updatedState = { ...state, profilepic: action.payload };
      localStorage.setItem("AdminData", JSON.stringify(updatedState));
      return updatedState;

    case "SIGN_OUT":
      const signoutstate = { token: "", userId: "" }
      localStorage.setItem("AdminData", JSON.stringify(signoutstate));
      return signoutstate

    default:
      state;
  }

}



export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [state, Admindispatch] = useReducer(Adminreducer, initialState)
  return (
    <AdminContext.Provider value={{ AdminAuthData: state, Admindispatch, getprofile, deleteaccount, profileupdate, findAccount, SENDOTP, VERIFYOTP, PasswordUpdate, AdminLogin, GetUsersforAdmin, GetAllAdmins, GetUsersforAdminByName, Activitylog, UPDATEADMIN }}>
      {children}
    </AdminContext.Provider>
  )
}