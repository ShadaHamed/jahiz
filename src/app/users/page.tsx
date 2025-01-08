'use client'

import SearchBox from '@/components/table/SearchBox';
import Link from 'next/link';
import UserTable from './views/userTable';
import React, { Suspense, useEffect, useState, useRef} from 'react';
import { MdMenu } from "react-icons/md";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import UserKanbanView from './views/UserKanbanView';
import { GlobalProvider, useGlobal } from './userContext';
import TableSkeleton from './views/TableSkeleton';
import ExportPDF from '@/components/table/ExportPDF';



const UsersPage = () => {
  const [view, setView] = useState<string>(() => sessionStorage.getItem("selectedView") || "table");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSwitchView = (selectedView: string) => {
    setView(selectedView);
    sessionStorage.setItem("selectedView", selectedView);
  };

  useEffect(() => {
    const storedView = sessionStorage.getItem("selectedView") || "table";
    setView(storedView);
  }, []);

  const handleDelete = (id: string) => {
    // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
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
                  <SearchBox/>
                </div>
                <div className="w-full lg:w-40 flex items-center justify-center lg:bg-gray-100 lg:px-4 lg:rounded-md focus:shadow-md  active:bg-primaryColor active:text-white">
                  <ExportPDF contentRef={contentRef} />
                </div>
              </div>
              <div className='flex justify-between gap-1 cursor-pointer'>
                <button
                  className='bg-primaryColor text-white p-2 rounded-s-md'
                  onClick={() => handleSwitchView('kanban')}>
                  <TbLayoutKanbanFilled size={20} />
                </button>
                <button
                  className='bg-primaryColor text-white p-2 rounded-e-md'
                  onClick={() => handleSwitchView('table')}>
                  <MdMenu size={20} />
                </button>
              </div>
            </div>
              
            <div className='overflow-x-auto border rounded-lg' >
              <div className='flex justify-between items-center p-4'>
                <div className='flex flex-col'>
                  <h2 className='text-xl font-bold'>Users</h2>
                  <p className='hidden md:block text-sm text-gray-500'>A list of all the users in your account</p>
                </div>
                <Link href='users/create'
                  className='p-2 px-4 bg-primaryColor text-white rounded-lg text-xs md:text-sm text-center'
                >Add User</Link>
              </div>
              <div>
                <div>

                <div ref={contentRef}>
                  {view === "kanban" ? (
                    <UserKanbanView onDelete={handleDelete} />
                  ) : view === "table" ? (
                    <UserTable />
                  ) : (
                    <TableSkeleton /> // Skeleton loader for fallback
                  )}
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </GlobalProvider>
    </Suspense>
  )
}

export default UsersPage