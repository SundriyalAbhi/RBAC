import { UserContext } from "@/app/Context/ManageUserContext";
import { SocketContext } from "@/app/Context/SocketContext";
import React, { useContext, useEffect, useState } from "react";


export const SystemAnnouncementsUser = () => {
  const [announcements, setAnnouncements] = useState([]);
  const {GetSystemAnnouncement , UserAuthData} = useContext(UserContext)
  const { socket } = useContext(SocketContext);

    async function GetAnnouncement() {
      try {
        const res = await GetSystemAnnouncement({companyId:UserAuthData.companyId})
        if(res.status==200){
          setAnnouncements(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(()=>{
      GetAnnouncement()
    },[])

        useEffect(() => {
          if (!socket) return;
          const handleSystemAnnouncement= (data) => {
            if (data?.Msg && typeof data.Msg === "object") {
              setAnnouncements((prev) => [data.Msg, ...prev]);
            }
          };
          socket.on("SystemAnnouncement", handleSystemAnnouncement);
          return () => socket.off("SystemAnnouncement", GetAnnouncement);
        }, [socket]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">📢 System Announcements</h2>

      {announcements.length === 0 ? (
        <p className="text-gray-400">No announcements at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((item) => (
            <li key={item.id} className="border border-gray-700 p-4 rounded-lg bg-gray-900">
              <h4 className="font-semibold text-blue-400">{item.title}</h4>
              <p className="text-sm text-gray-300">{item.message}</p>
              <p className="text-xs text-gray-500 mt-1">{item.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
