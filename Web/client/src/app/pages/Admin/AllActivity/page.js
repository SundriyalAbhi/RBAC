"use client";
import { AdminSideBar } from '@/app/Admin/AdminSideBar';
import RecentActivity from '@/app/Admin/RecentActivity';
import { Navbar } from '@/app/Components/Home/Navbar';
import React from 'react';

const AllActivityPage = () => {
  return (
    <div className="flex flex-col h-[94vh] bg-[rgba(19,33,46,1)]">
      <div>
        <Navbar />
      </div>

      <div className="flex flex-1 ">
        <AdminSideBar />
        <div className="flex-1 mt-6">
         <h1 className="text-2xl font-bold mb-6 border-b pb-2   text-white ml-20">All User Activity</h1>
           <RecentActivity showAll={true} />
        </div>
      </div>
    </div>
  );
};

export default AllActivityPage;
