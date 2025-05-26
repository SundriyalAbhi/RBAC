import React, { useContext, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Sidebaar } from './Sidebaar'
import { AllTools } from './AllTools'

export const Main = () => {
  // const {AuthData} = useContext(AuthContext)
  // const router = useRouter()
  // useEffect(()=>{
  //   if(AuthData.token == ""){
  //     router.push("/")
  //   }

  // },[])
  return (

    <div className="flex flex-col  bg-[rgba(19,33,46,1)]">
    <div className="h-16">
      <Navbar />
    </div>
  
    <div className="flex flex-1">
      
        <Sidebaar />
      
  
      <div className="flex-1 " >
        <AllTools/> 
      </div>
  </div>
  </div>
  )
}

