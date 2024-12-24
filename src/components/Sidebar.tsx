'use client' 

import Link from 'next/link';
import {  IoMdCart } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { useState } from 'react';
import Image from "next/image"
// import profile from '../../public/profile.png';
import { MdMenu, MdClose, MdPeopleAlt, MdLogout, MdArrowBack, MdArrowForward } from "react-icons/md";
import { useAuth } from '@/app/(user)/AuthContext';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { usePathname } from 'next/navigation';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);       // Controls mobile visibility
  const [isCollapsed, setIsCollapsed] = useState(false); // Controls collapsible display
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();

  const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default behavior that may interfere
    e.stopPropagation(); // Prevent event from bubbling up and triggering unwanted actions
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Menu Icon for mobile */}
      <button 
        className="fixed lg:hidden p-6 cursor-pointer z-10"
        onClick={() => setIsOpen(true)}
      >
        {/* Menu icon */}
        <MdMenu size={30}/>
      </button>

      {/* Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed left-0 top-0 h-screen z-50 ${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-gray-200 text-darkColor transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-in-out lg:relative lg:translate-x-0
        `}
      >
        {/* Close Button for mobile*/}
        <button
        className='absolute top-4 right-4 md:hidden z-100'
        onClick={() => setIsOpen(false)}>
          <MdClose size={25} />
        </button>

        {/* Collaps/Expand button */}
        <div 
          className='m-4 flex text-center justify-between'>
          <h4 className={`font-bold ${isCollapsed ? 'hidden' : ''}`}>LOGO</h4>
          <button type='button'
            className='hidden lg:block text-gray-800 bg-gray-50 rounded-lg p-2'
            onClick={toggleSidebar}>
            {isCollapsed ? <MdArrowForward/> : <MdArrowBack />}
          </button>
        </div>
        
        {/* Sidebar content */}
        <div className="p-4 space-y-4">
          <h4 className={`text-gray-700 font-bold ${isCollapsed ? 'hidden' : ''}`}>MARKETING</h4>
        
            <Link href="/admin/dashboard" passHref>
              <div className={`flex items-center p-2 rounded-md ${isCollapsed ? 'justify-center' : ''} ${pathname === '/admin/dashboard' ? 'bg-primaryColor text-white': ''}`}               
               onClick={() => setIsOpen(false)}>
                <MdDashboard className='text-[#a75ff0]' />
              {!isCollapsed && <span className="ml-2">Dashboard</span>}
            </div>
          </Link>
         
           

          <Link href="/branches">
            <div className={`flex items-center p-2 rounded-md  ${isCollapsed ? 'justify-center' : ''} ${pathname === '/branches' ? 'bg-primaryColor text-white': ''}`}
                 onClick={() => setIsOpen(false)}>
                <IoMdCart className='text-[#a75ff0]'/>
              {!isCollapsed && <span className="ml-2"> Branches </span>}
            </div>
          </Link>
          

          <Link href="/categories">
            <div className={`flex items-center p-2 rounded-md ${isCollapsed ? 'justify-center' : ''} ${pathname === '/categories' ? 'bg-primaryColor text-white': ''}`}
                onClick={() => setIsOpen(false)}>
              <BiSolidCategoryAlt className='text-[#a75ff0]' />
              {!isCollapsed && <span className="ml-2"> Categories </span>}
            </div>
          </Link>

          <Link href="/users">
            <div className={`flex items-center p-2 rounded-md  ${isCollapsed ? 'justify-center' : ''} ${pathname === '/users' ? 'bg-primaryColor text-white': ''}`}
                onClick={() => setIsOpen(false)}>
                <MdPeopleAlt className='text-[#a75ff0]'/>
            {!isCollapsed && <span className="ml-2"> Users </span>}
            </div>
          </Link>

          <h4 className={`text-gray-800 font-bold ${isCollapsed ? 'hidden' : ''}`}>PAYMENTS</h4>

          {user ? <Link href="#">
            <div className={`flex items-center p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}
              onClick={() => setIsOpen(false)}>
              <FaChartBar />
              {!isCollapsed && <span className="ml-2"> Ladger </span>}
            </div>
          </Link> : ""}

        </div>

        {isAuthenticated && (<div className={`flex text-xs gap-2 mt-20 p-2 ${isCollapsed ? 'text-center' : ''}`}>
            <Image src="/profile.png" alt="User Profile" width={35} height={35}/>
            <div className={`flex flex-col gap-2 ${isCollapsed ? 'hidden' : ''}`}>
                <span className='font-bold'>{user?.name.en}</span>
                <span className='text-gray-600'>Admin Manager</span>
            </div>
        </div>)}

        {isAuthenticated && (<div className={`flex items-center mt-15 mx-4 p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}>
        <button className='flex'
                onClick={logout}>
          <MdLogout />
          {!isCollapsed && <span className="ml-2 text-sm"> Logout </span>}
        </button>
        </div>)}
        

       
      </div>

    </>
  );
}

export default Sidebar;
