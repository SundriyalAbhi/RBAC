import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import { SocketContext } from "../Context/SocketContext";



export const SystemAnnouncementAdmin = () => {
  const [announcements, setAnnouncements] = useState([]);
  const {SendSystemAnnouncement , AdminAuthData, GetSystemAnnouncement} = useContext(AdminContext)
  const { socket } = useContext(SocketContext);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function handleAddAnnouncement () {
  try {
      if (title.trim() && message.trim()) {
      const newAnnouncement = await SendSystemAnnouncement({title , message , createdBy:AdminAuthData.adminId , companyId:AdminAuthData.companyId})
      setTitle("");
      setMessage("");
      GetAnnouncement()
    }
  } catch (error) {
    console.log(error);
  }
  };

  async function GetAnnouncement() {
    try {
      const res = await GetSystemAnnouncement({companyId:AdminAuthData.companyId})
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
      <h2 className="text-xl font-semibold mb-4">System Announcements (Admin)</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Announcement Title"
          className="w-full p-2 mb-2 rounded-md bg-gray-900 border border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter your message"
          className="w-full p-2 rounded-md bg-gray-900 border border-gray-600"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
          onClick={handleAddAnnouncement}
        >
          Post Announcement
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {announcements.map((a,id) => (
          <div key={id} className="border border-gray-600 rounded-lg p-4 bg-gray-900">
            <h4 className="text-lg font-medium text-blue-400">{a.title}</h4>
            <p className="text-sm text-gray-300">{a.message}</p>
            <p className="text-xs text-gray-500 mt-1">{a.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
