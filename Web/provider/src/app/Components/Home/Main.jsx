import React, { useContext, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Sidebaar } from './Sidebaar'
import ProviderDashboard from '../Dashboard/Dashboard'
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/Context/AuthContext';


export const Main = () => {
    const {AuthData} = useContext(AuthContext)
  const router = useRouter()
  // useEffect(()=>{
  //   if(AuthData.token == ""){
  //     router.push("/")
  //   }

  // },[])
  return (
    <div className="flex flex-col bg-[#12161c] min-h-screen">
      
      <div className="h-16">
        <Navbar />
      </div>

      <div className="flex flex-1">
        <Sidebaar />

        <div className="flex-1 pt-6 px-4">
          <ProviderDashboard />
        </div>
      </div>
    </div>
  );
};


