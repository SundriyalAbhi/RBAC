"use client";

import { API, baseURL } from "@/Utils/Utils";

const { createContext, useReducer } = require("react");

async function CreateUser(body) {
  try {
    console.log("Auth Body",body);
    
    const response = await API.post(`${baseURL}/admin/register`, body);
    // return { status: response?.status, data: response?.data };
  } catch (error) {
    console.log(error);

    // return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function UpdateUser(body) {
  try {
    console.log("AuthBody", body);

    // const response = await API.post(`${baseURL}/MamberAuth/MemberSignin`, body);
    // return { status: response?.status, data: response?.data };
  } catch (error) {
    console.log(error);

    // return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function DeleteUser(authData) {
  try {
    const response = await API.get(
      `${baseURL}/profile/getprofile/${authData.userId}`
    );
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  return (
    <AdminContext.Provider
      value={{
        CreateUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
