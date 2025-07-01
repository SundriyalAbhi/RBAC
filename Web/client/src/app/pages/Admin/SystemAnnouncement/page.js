"use client"
import { AdminSideBar } from '@/app/Admin/AdminSideBar'
import { SystemAnnouncementAdmin } from '@/app/Admin/SystemAnnouncementAdmin'
import { Navbar } from '@/app/Components/Home/Navbar'
import React from 'react'

const page = () => {
  return (
       <div className="flex flex-col h-screen bg-[#131f2e]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <AdminSideBar />
        <main className="flex-1 overflow-y-auto p-8 bg-[#131f2e]">
          <SystemAnnouncementAdmin/>
        </main>
      </div>
    </div>
  )
}

export default page