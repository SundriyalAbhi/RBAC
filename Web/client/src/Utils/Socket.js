import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/Context/ManageUserContext";
import { AdminContext } from "@/app/Context/AdminContext";
import { io } from "socket.io-client";

export const useSocket = () => {
  const { UserAuthData } = useContext(UserContext);
  const { AdminAuthData } = useContext(AdminContext);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const hasAdmin = AdminAuthData?.token && AdminAuthData?.adminId;
  const hasUser = UserAuthData?.token && UserAuthData?.userId;
  
  const AuthData = hasAdmin
    ? AdminAuthData.adminId
    : hasUser
      ? UserAuthData.userId
      : null;
      

  useEffect(() => {
    if (AuthData) {
      // console.log("Connecting socket with userId:", AuthData.userId);

      const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8087", {
        query: {
          userId: AuthData,
        },
      });

      setSocket(socketInstance);

      // socketInstance.on("connect", () => {
      //   console.log("Socket connected:", socketInstance.id);
      // });

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [AuthData]);

  return { socket, onlineUsers };
};
