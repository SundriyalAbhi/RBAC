import React from 'react'
import { Navbar } from './Navbar'
import { Sidebaar } from './Sidebaar'

export const Main = () => {
  return (
    <div className="bg-[rgba(19,33,46,255)]" style={{width:"100%",height:"100vh"}}>
      {/* aayush */}
      <Navbar/>
      <Sidebaar/>
    </div>
  )
}
