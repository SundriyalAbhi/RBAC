import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@/app/Context/ManageUserContext";
import { AdminContext } from "@/app/Context/AdminContext";
import { io } from "socket.io-client";

export const useSocket = () => {
  const { UserAuthData } = useContext(UserContext);
  const { AdminAuthData } = useContext(AdminContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  const hasAdmin = AdminAuthData?.token && AdminAuthData?.adminId;
  const hasUser = UserAuthData?.token && UserAuthData?.userId;

  const userId = hasAdmin ? AdminAuthData.adminId : hasUser ? UserAuthData.userId : null;

  useEffect(() => {
    if (userId) {
      const socket = io(process.env.NEXT_PUBLIC_API_URL || "https://gtr-unpf.onrender.com", {
        query: { userId },
      });

      socketRef.current = socket;

      // socket.on("connect", () => {
      //   console.log("Connected:", socket.id);
      // });

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on unmount or logout
      const cleanup = () => {
        if (socketRef.current) {
          socketRef.current.emit("manualLogout", { userId });
          socketRef.current.disconnect();
        }
      };

      window.addEventListener("beforeunload", cleanup); // tab/browser close

      return () => {
        cleanup();
        window.removeEventListener("beforeunload", cleanup);
      };
    }
  }, [userId]);

  return {
    socket: socketRef.current,
    onlineUsers,
    disconnectSocket: () => {
      if (socketRef.current) {
        socketRef.current.emit("manualLogout", { userId });
        socketRef.current.disconnect();
      }
    },
  };
};
