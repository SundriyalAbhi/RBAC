"use client";

import { API, baseURL } from "@/Utils/Utils";
import React, { createContext, useEffect, useReducer, useState } from "react";

const defaultState = {
  token: null,
  userId: null,
};

export const UserContext = createContext();

async function UserSignUp(body) {
  try {
    const response = await API.post(`${baseURL}/Member/MemberSignup`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function UserSignIn(body) {
  try {
    const response = await API.post(`${baseURL}/Member/MemberSignin`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function UPDATEUSER(body) {
  try {
    const response = await API.put(`${baseURL}/Member/UpdateMember`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

async function recordActivity(body) {
  try {
    const response = await API.post(`${baseURL}/activity/storeactivity`, body);
    return { status: response?.status, data: response?.data };
  } catch (error) {
    return { status: error?.response?.status, data: error?.response?.data };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "SIGN_IN": {
      const signinState = { ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("UserData", JSON.stringify(signinState));
        if (signinState.token) {
          document.cookie = `token=${signinState.token}; path=/; SameSite=Lax`;
        }
        if (signinState.userId) {
          document.cookie = `userId=${signinState.userId}; path=/; SameSite=Lax`;
        }
      }
      return signinState;
    }

    case "UPDATE_PROFILE": {
      const updatedState = { ...state, profilepic: action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("UserData", JSON.stringify(updatedState));
      }
      return updatedState;
    }

    case "SIGN_OUT": {
      const signoutState = { token: "", userId: "" };
      if (typeof window !== "undefined") {
        localStorage.setItem("UserData", JSON.stringify(signoutState));
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        document.cookie =
          "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
      return signoutState;
    }

    default:
      return state;
  }
}


export const UserProvider = ({ children }) => {
  const [initialStateLoaded, setInitialStateLoaded] = useState(false);
  const [state, Userdispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("UserData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Userdispatch({ type: "SIGN_IN", payload: parsed });
        } catch {
          console.warn("Failed to parse UserData");
        }
      }
      setInitialStateLoaded(true);
    }
  }, []);

  if (!initialStateLoaded) return null;

  return (
    <UserContext.Provider
      value={{
        UserAuthData: state,
        Userdispatch,
        UserSignIn,
        UserSignUp,
        UPDATEUSER,
        recordActivity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
