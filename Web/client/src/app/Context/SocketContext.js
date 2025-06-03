"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { UserContext } from "./ManageUserContext";
import { AdminContext } from "./AdminContext";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { UserAuthData } = useContext(UserContext);
  const { AdminAuthData } = useContext(AdminContext);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  const hasAdmin = AdminAuthData?.token && AdminAuthData?.adminId;
  const hasUser = UserAuthData?.token && UserAuthData?.userId;

  const userId = hasAdmin ? AdminAuthData.adminId : hasUser ? UserAuthData.userId : null;

  useEffect(() => {
    if (userId) {
      const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8087", {
        query: { userId },
        transports: ["websocket"],
      });

      socketRef.current = socket;

    //   socket.on("connect", () => {
    //     console.log("Connected:", socket.id);
    //   });

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Disconnect on tab/browser close
      const cleanup = () => {
        if (socketRef.current) {
          socketRef.current.emit("manualLogout", { userId });
          socketRef.current.disconnect();
        }
      };

      window.addEventListener("beforeunload", cleanup);

      return () => {
        cleanup();
        window.removeEventListener("beforeunload", cleanup);
      };
    }
  }, [userId]);

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.emit("manualLogout", { userId });
      socketRef.current.disconnect();
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
        disconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
