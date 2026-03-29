import React, { useContext, useEffect, useState } from "react";
import "@/app/style.css";
import { useRouter } from "next/navigation";
import { AdminContext } from "@/app/Context/AdminContext";
import { UserContext } from "@/app/Context/ManageUserContext";

export const AllTools = () => {
  const router = useRouter();
  const { Admindispatch, AdminAuthData } = useContext(AdminContext);
  const {StoreSessionData, recordActivity } = useContext(UserContext);
  const AuthData = AdminAuthData

//   useEffect(() => {
//     if (!AuthData?.token) {
//       router.push("/pages/Auth");
//     }
//   }, [AuthData]);

  console.log(AuthData);
  

  const features = [
    { name: "AutoSOC", icon: "🖥️", link: "" },
    { name: "AutoCom", icon: "💬", link: "" },
    {
      name: "Phantom Radar",
      icon: "📡",
      link: "https://phantom-radar.vercel.app/",
    },
    { name: "CyberKnowledge Engine Agent", icon: "🧠", link: "" },
    { name: "AutoRed", icon: "⚙️", link: "https://auto-red-35f6.vercel.app/" },
    { name: "ZeroCodeSec", icon: "</>", link: "" },
    { name: "GhostIntel", icon: "👻", link: "" },
    {
      name: "Real-Time Radar",
      icon: "📈",
      link: "https://real-time-radar.vercel.app/",
    },
  ];

 async function RecordActivity(featureName) {
  try {
    const body = {
      companyId: AuthData.companyId,
      role: AuthData.role,
      action: "Access Tool",
      toolName: featureName,
    };

    if (AuthData.role === "user") {
      body.userId = AuthData.userId;
    } else if (AuthData.role === "admin") {
      body.AdminId = AuthData.adminId;
    }

    const res = await recordActivity(body);
  } catch (error) {
    console.log("Activity error:", error?.response?.data || error.message);
  }
}


const handleClick = async (feature) => {
  if (!AuthData) return;

  const { token ,userId } = AuthData;
  const toolName = feature.name;

  try {
    console.log(userId);
     const res = await StoreSessionData({ userId:userId, token, toolName })
    const sessionId = res.data._id
    

    if (feature.link && feature.link.startsWith("http") && sessionId !== undefined) {
      RecordActivity(feature.name)
      const url = new URL(feature.link);
      url.searchParams.set("sessionId", sessionId);
      window.location.href = url.toString();
    } 
    // else {
    //   router.push(`/pages/${feature.name.replace(/\s+/g, "")}?sessionId=${sessionId}`);
    // }
  } catch (error) {
    console.error("Failed to create session:", error);
  }
};



  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const hasAccess = AuthData?.toolsaccess?.includes(feature.name);

          return (
            <div
              key={feature.name}
              onClick={() => hasAccess && handleClick(feature)}
              className={`p-6 rounded-xl border border-gray-700 shadow-md bg-gray-800 flex flex-col items-center justify-center text-center transition ${
                hasAccess
                  ? "hover:bg-gray-700 hover:scale-[1.02] cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="text-4xl mb-4 relative">
                {feature.icon}
                {!hasAccess && (
                  <span className="absolute top-0 right-0 text-xs text-red-400">🔒</span>
                )}
              </div>
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              {hasAccess ? (
                <p className="text-sm text-green-400 mt-2">Access Granted</p>
              ) : (
                <p className="text-sm text-red-400 mt-2">No Access</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const BottomPanel = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted: ${feedback}`);
    setFeedback("");
  };

  return (
    <section className="mt-12 bg-[#1f2f44] rounded-xl p-6 shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Recent Activity</h4>
          <ul className="list-disc list-inside text-gray-300 text-sm max-h-48 overflow-auto">
            <li>Used AutoSOC - 10 mins ago</li>
            <li>Launched Phantom Radar - 2 hours ago</li>
            <li>Submitted Feedback - Yesterday</li>
          </ul>
        </div>

        {/* Feedback Form */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Feedback</h4>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <textarea
              rows={3}
              className="resize-none p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
            <button
              type="submit"
              className="self-end px-5 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-3">System Notices</h4>
          <ul className="list-disc list-inside text-gray-300 text-sm max-h-48 overflow-auto">
            <li>System maintenance on June 10th, 12AM - 4AM UTC.</li>
            <li>New tool: GhostIntel available now.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

