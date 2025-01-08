'use client'

import SearchBox from '@/components/table/SearchBox';
import Link from 'next/link';
import UserTable from './views/userTable';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { MdMenu } from "react-icons/md";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import UserKanbanView from './views/UserKanbanView';
import { GlobalProvider } from './userContext';
import TableSkeleton from './views/TableSkeleton';
import ExportPDF from '@/components/table/ExportPDF';
import MainSkeleton from './views/MainSkeleton';

const UsersPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<string | null>(null); // Null initially to indicate loading state
  const [isHydrated, setIsHydrated] = useState(false); // Tracks if the component is hydrated

  useEffect(() => {
    setIsHydrated(true); // Indicates that the component has mounted
    const savedView = sessionStorage.getItem("selectedView") || "table";
    console.log('Saved view (useEffect):', savedView);
    setView(savedView);
  }, []);

  useEffect(() => {
    console.log('View updated:', view); // Logs changes to the view
  }, [view]);

  if (!isHydrated || view === null) {
    // Show a loading state while determining the view
    return <MainSkeleton />
  }

  const handleViewChange = (newView: string) => {
    setView(newView);
    sessionStorage.setItem("selectedView", newView);
  };

  return (
    <Suspense>
      <GlobalProvider>
        <div className='overflow-hidden'>
          <div className="w-full fix p-6 items-center justify-center md:justify-start">
            <h2 className="font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl">
              Users
            </h2>

            <div className='flex lg:justify-between items-center my-8'>
              <div className='flex items-center justify-center gap-2'>
                <div>
                  <SearchBox />
                </div>
                <div className="w-full lg:w-40 flex items-center justify-center lg:bg-gray-100 lg:px-4 lg:rounded-md focus:shadow-md active:bg-primaryColor active:text-white">
                  <ExportPDF contentRef={contentRef} />
                </div>
              </div>
              <div className='flex justify-between gap-1 cursor-pointer'>
                <button
                  className='bg-primaryColor text-white p-2 rounded-s-md'
                  onClick={() => handleViewChange('kanban')}>
                  <TbLayoutKanbanFilled size={20} />
                </button>
                <button
                  className='bg-primaryColor text-white p-2 rounded-e-md'
                  onClick={() => handleViewChange('table')}>
                  <MdMenu size={20} />
                </button>
              </div>
            </div>

            <div className='overflow-x-auto border rounded-lg'>
              <div className='flex justify-between items-center p-4'>
                <div className='flex flex-col'>
                  <h2 className='text-xl font-bold'>Users</h2>
                  <p className='hidden md:block text-sm text-gray-500'>A list of all the users in your account</p>
                </div>
                <Link
                  href='users/create'
                  className='p-2 px-4 bg-primaryColor text-white rounded-lg text-xs md:text-sm text-center'
                >
                  Add User
                </Link>
              </div>
              <div>
                <div ref={contentRef}>
                  {view === "kanban" ? (
                    <UserKanbanView onDelete={() => {}} />
                  ) : view === "table" ? (
                    <UserTable />
                  ) : (
                    <TableSkeleton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlobalProvider>
    </Suspense>
  );
};

export default UsersPage;
