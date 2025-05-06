import React from 'react'
import { Navbar } from './Navbar'
import { Sidebaar } from './Sidebaar'
import Dashboard from './Dashboard'

export const Main = () => {
  return (
<<<<<<< HEAD
    <div className="bg-[rgba(19,33,46,255)]" style={{width:"100%",height:"100vh"}}>
      {/* aayush */}
      <Navbar/>
      <Sidebaar/>
=======
    <div className="flex flex-col  bg-[rgba(19,33,46,1)]">
    <div className="h-16">
      <Navbar />
>>>>>>> 60acbc71a117cb8d4dd85694392e09ff223b52a2
    </div>
  
    <div className="flex flex-1">
      
        <Sidebaar />
      
  
      <div className="flex-1 " >
        <Dashboard/> 
      </div>
    </div>
  </div>
  )
}

