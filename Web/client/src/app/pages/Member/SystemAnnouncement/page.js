"use client"
import { Navbar } from '@/app/Components/Home/Navbar'
import { Sidebaar } from '@/app/Components/Member/Sidebar'
import { SystemAnnouncementsUser } from '@/app/Components/Member/SystemAnnouncementsUser'
import React from 'react'

const page = () => {
  return (
       <div className="flex flex-col h-screen bg-[#131f2e]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebaar />
        <main className="flex-1 overflow-y-auto p-8 bg-[#131f2e]">
          <SystemAnnouncementsUser/>
        </main>
      </div>
    </div>
  )
}

export default page