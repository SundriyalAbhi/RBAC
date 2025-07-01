"use client"
import { AllTools } from '@/app/Components/Member/AllTools'
import { Navbar } from '@/app/Components/Member/Navbar'
import { Sidebaar } from '@/app/Components/Member/Sidebar'
import React from 'react'

const page = () => {
  return (
       <div className="flex flex-col h-screen bg-[#131f2e]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebaar />
        <main className="flex-1 overflow-y-auto p-8 bg-[#131f2e]">
          <h1 className="text-3xl font-bold text-white mb-8 border-b pb-4">
            All Tools
          </h1>
          <AllTools/>
        </main>
      </div>
    </div>
  )
}

export default page