import React, { useContext, useEffect } from 'react'
import { AllTools, BottomPanel } from './AllTools'
import { Navbar } from './Navbar'

export const Main = () => {
  // const {AuthData} = useContext()
  // const router = useRouter()
  // useEffect(()=>{
  //   if(AuthData.token == ""){
  //     router.push("/")
  //   }

  // },[])
  return (
     <div className="min-h-screen bg-[#0b1f33] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-8 space-y-12 overflow-auto">
        <AllTools />
        <BottomPanel />
      </main>
    </div>
  )
}

