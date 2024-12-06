'use client'

import SearchBox from '@/components/table/SearchBox';
import userRepository from '@/apiCalls/userRepository';
import Link from 'next/link';
import UserTable from './userTable';
import React, { useEffect, useState } from 'react';
import { MdMenu } from "react-icons/md";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import UserKanbanView from './UserKanbanView';
import { User } from '@/utils/types';

const CustomersPage = () => {
  const [view, setView] = useState<string>(
    typeof window !== "undefined" ? sessionStorage.getItem("selectedView") || "table" : "table"
  ); 
   const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userRepository.getAllUsers();
        console.log(data)
        setUsers(data);
        
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } 
    };

    fetchUsers();
    
  }, []); 
  
  const handleSwitchView = (selectedView: string) => {
    setView(selectedView);
    sessionStorage.setItem("selectedView", selectedView);
  };

  const handleDelete = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    // <GlobalProvider>
    <div className='overflow-hidden'>
      <div className="w-full fix p-6 items-center justify-center md:justify-start">
        <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto  md:left-auto md:transform-none">Customers</h2>
        
        <div className='flex justify-between items-center my-8'>
          <div>
            <SearchBox />
          </div >
          <div className='flex justify-between gap-1 cursor-pointer'>
            <button 
                className='bg-gray-100 p-2 rounded-s-md'
                onClick={() => handleSwitchView('kanban')}>
                  <TbLayoutKanbanFilled size={20} />
                </button>
            <button 
                className='bg-gray-100 p-2 rounded-e-md'
                onClick={() => handleSwitchView('table')}>
                  <MdMenu size={20} />
                </button>
          </div>
        </div>

        <div className='overflow-x-auto border rounded-lg' >
          <div className='flex justify-between items-center p-4'>
          <div className='flex flex-col'>
              <h2 className='text-xl font-bold'>Customers</h2>
              <p className='text-sm text-gray-500'>A list of all the users in your account</p>
          </div>
          <Link href='customers/create'
            className='p-4 bg-primaryColor text-white rounded-lg text-sm'
            >Add Customer</Link>
          </div>
          <div>
            { view === 'kanban'?
             <UserKanbanView users={users} onDelete={handleDelete}/> :
             <UserTable users={users} />
             }        
          </div>
        </div>
      </div>
    </div>
    // </GlobalProvider>
  )
}

export default CustomersPage