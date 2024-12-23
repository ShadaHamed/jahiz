'use client'

import SearchBox from '@/components/table/SearchBox';
import userRepository from '@/apiCalls/userRepository';
import Link from 'next/link';
import UserTable from './views/userTable';
import React, { Suspense, useEffect, useState } from 'react';
import { MdMenu } from "react-icons/md";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import UserKanbanView from './views/UserKanbanView';
import { Role, User } from '@/utils/types';
import roleRepository from '@/apiCalls/roleRepository';
import { GlobalProvider, useGlobal } from './userContext';


const UsersPage = () => {
  const [view, setView] = useState<string>(
    typeof window !== "undefined" ? sessionStorage.getItem("selectedView") || "table" : "table"
  ); 
  //  const [users, setUsers] = useState([] as User[]);
   const [roles, setRoles] = useState([] as Role[])

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const userData = await userRepository.getAllUsers();
  //       setUsers(userData);

  //       const roleData = await roleRepository.getAllRoles();
  //       setRoles(roleData);
        
  //     } catch (error) {
  //       console.error('Failed to fetch users:', error);
  //     } 
  //   };

  //   fetchUsers();
    
  // }, []); 
  
  const handleSwitchView = (selectedView: string) => {
    setView(selectedView);
    sessionStorage.setItem("selectedView", selectedView);
  };

  const handleDelete = (id: string) => {
    // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <GlobalProvider>
      <Suspense fallback={<div>Loading...</div>}>
    <div className='overflow-hidden'>
      <div className="w-full fix p-6 items-center justify-center md:justify-start">
        <h2 className="font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl">
          Users
        </h2>
        
        <div className='flex lg:justify-between items-center my-8'>
          <div>
            <SearchBox />
          </div >
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
            className='p-2 md:p-4 bg-primaryColor text-white rounded-lg text-xs md:text-sm text-center'
            >Add User</Link>
          </div>
          <div>
            { view === 'kanban'?
             <UserKanbanView onDelete={handleDelete}/> :
             <UserTable />
             }        
          </div>
        </div>
      </div>
    </div>
          </Suspense>
    </GlobalProvider>
  )
}

export default UsersPage