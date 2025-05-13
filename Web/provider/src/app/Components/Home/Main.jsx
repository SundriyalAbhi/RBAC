import React from 'react'
import { Navbar } from './Navbar'
import { Sidebaar } from './Sidebaar'
import ProviderDashboard from '../Dashboard/Dashboard'


export const Main = () => {
  return (
    <div className="flex flex-col bg-[rgba(19,33,46,1)] min-h-screen">
      
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


