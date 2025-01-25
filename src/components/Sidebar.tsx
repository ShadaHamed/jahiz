'use client' 

import Link from 'next/link';
import {  IoMdCart } from "react-icons/io";
import { MdDashboard,MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaChartBar, FaCity  } from "react-icons/fa";
import { GrStatusPlaceholderSmall } from "react-icons/gr";

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
        onClick={() => {
          setIsOpen(true);
          setIsCollapsed(false)
        }}
      >
        {/* Menu icon */}
        <MdMenu size={30}/>
      </button>

      {/* Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed flex flex-col justify-between left-0 top-0 h-screen z-50  ${
          isCollapsed ? 'w-16 items-center' : 'w-64'
        } bg-gray-200 text-darkColor transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-in-out lg:relative lg:translate-x-0
        `}
      >
        {/* Top of sidebar */}
        <div className='p-4'>
           {/* Close Button for mobile*/}
          <button
          className='absolute top-6 right-4 lg:hidden z-100'
          onClick={() => setIsOpen(false)}>
            <MdClose size={25} />
          </button>

          {/* Collaps/Expand button */}
          <div 
            className='p-4 flex text-center justify-between'>
            <h4 className={`font-bold ${isCollapsed ? 'hidden' : ''}`}>LOGO</h4>
            <button type='button'
              className='hidden lg:block text-gray-800 bg-gray-50 rounded-lg p-2'
              onClick={toggleSidebar}>
              {isCollapsed ? <MdArrowForward/> : <MdArrowBack />}
            </button>
          </div>
        
       
        
        {/* Sidebar content */}
        <div className="p-4 space-y-4">
          <h4 className={`text-gray-700 font-bold mb-1 ${isCollapsed ? 'hidden' : ''}`}>MARKETING</h4>
        
            <Link href="/admin/dashboard" passHref>
              <div className={`flex items-center p-2 rounded-md ${isCollapsed ? 'justify-center' : ''} ${pathname === '/admin/dashboard' ? 'bg-primaryColor text-white': ''}`}               
               onClick={() => setIsOpen(false)}>
                <MdDashboard className='text-slate-500' />
              {!isCollapsed && <span className="ml-2">Dashboard</span>}
            </div>
          </Link>
         
           

          <Link href="/branches">
            <div className={`flex items-center p-2 rounded-md  ${isCollapsed ? 'justify-center' : ''} ${pathname === '/branches' ? 'bg-primaryColor text-white': ''}`}
                 onClick={() => setIsOpen(false)}>
                <IoMdCart className='text-slate-500'/>
              {!isCollapsed && <span className="ml-2"> Branches </span>}
            </div>
          </Link>

          <Link href="/cities">
            <div className={`flex items-center p-2 rounded-md  ${isCollapsed ? 'justify-center' : ''} ${pathname === '/cities' ? 'bg-primaryColor text-white': ''}`}
                 onClick={() => setIsOpen(false)}>
                <FaCity className='text-slate-500'/>
              {!isCollapsed && <span className="ml-2"> Cities </span>}
            </div>
          </Link>

          <Link href="/regions">
            <div className={`flex items-center p-2 rounded-md  ${isCollapsed ? 'justify-center' : ''} ${pathname === '/regions' ? 'bg-primaryColor text-white': ''}`}
                 onClick={() => setIsOpen(false)}>
                <GrStatusPlaceholderSmall className='text-slate-500'/>
              {!isCollapsed && <span className="ml-2"> Regions </span>}
            </div>
          </Link>
          

          <Link href="/categories">
            <div className={`flex items-center p-2 rounded-md ${isCollapsed ? 'justify-center' : ''} ${pathname === '/categories' ? 'bg-primaryColor text-white': ''}`}
                onClick={() => setIsOpen(false)}>
              <BiSolidCategoryAlt className='text-slate-500' />
              {!isCollapsed && <span className="ml-2"> Categories </span>}
            </div>
          </Link>

          <Link href="/products">
            <div className={`flex items-center p-2 rounded-md  ${isCollapsed ? 'justify-center' : ''} ${pathname === '/products' ? 'bg-primaryColor text-white': ''}`}
                onClick={() => setIsOpen(false)}>
                <MdOutlineProductionQuantityLimits className='text-slate-500'/>
            {!isCollapsed && <span className="ml-2"> Products </span>}
            </div>
          </Link>

          <Link href="/users">
            <div className={`flex items-center p-2 rounded-md  ${isCollapsed ? 'justify-center' : ''} ${pathname === '/users' ? 'bg-primaryColor text-white': ''}`}
                onClick={() => setIsOpen(false)}>
                <MdPeopleAlt className='text-slate-500'/>
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
        </div>
          
          {/* Bottom of sidebar */}
        <div className='mb-2 p-4'>
          {isAuthenticated && (
          <div className={`flex text-xs gap-2 mt-20 p-2 ${isCollapsed ? 'text-center' : ''}`}>
              <Image src="/profile.png" alt="User Profile" width={35} height={35}/>
              <div className={`flex flex-col gap-2 ${isCollapsed ? 'hidden' : ''}`}>
                  <span className='font-bold'>{user?.name.en}</span>
                  <span className='text-gray-600'>Admin Manager</span>
              </div>
          </div>)}

          {isAuthenticated && (
          <div className={`flex items-center mt-21 mx-4 mb-4 px-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}>
          <button className='flex ml-6'
                  onClick={logout}>
            <MdLogout />
            {!isCollapsed && <span className="ml-2 text-sm"> Logout </span>}
          </button>
          </div>)}
        </div>
        

       
      </div>

    </>
  );
}

export default Sidebar;
