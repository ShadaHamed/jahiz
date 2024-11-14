'use client' 

import Link from 'next/link';
import { IoMdArrowDropdown, IoMdCart } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { ShortArrowBackButton, ShortArrowForwardButton } from "@/components/Buttons";
import { useEffect, useState } from 'react';
import {users} from "@/utils/data"
import Image from "next/image";
import profile from '../../public/profile.png';
import { MdMenu, MdClose, MdPeopleAlt, MdLogout, MdArrowBack, MdArrowForward } from "react-icons/md";


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);       // Controls mobile visibility
  const [isCollapsed, setIsCollapsed] = useState(false); // Controls collapsible display
  const user = users.find(user => user.user_id === 1);
  
  const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default behavior that may interfere
    e.stopPropagation(); // Prevent event from bubbling up and triggering unwanted actions
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsOpen((prev) => (!prev))
  }
  return (
    <>
      {/* Menu Icon for mobile */}
      <button 
        className="fixed top-4 left-8 md:hidden p-2 cursor-pointer"
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
        } transition-all duration-300 ease-in-out md:relative md:translate-x-0
        `}
      >
        {/* Close Button for mobile*/}
        <button
        className='absolute top-4 right-4 md:hidden'
        onClick={() => setIsOpen(false)}>
          <MdClose size={25} />
        </button>

        {/* Collaps/Expand button */}
        <div 
          className='m-4 flex text-center justify-between'>
          <h4 className={`font-bold ${isCollapsed ? 'hidden' : ''}`}>LOGO</h4>
          <button type='button'
            className='hidden md:block text-gray-800 bg-gray-50 rounded-lg p-2'
            onClick={toggleSidebar}>
            {isCollapsed ? <MdArrowForward/> : <MdArrowBack />}
          </button>
        </div>
        
        {/* Sidebar content */}
        <div className="p-4 space-y-4">
          <h4 className={`text-gray-700 ${isCollapsed ? 'hidden' : ''}`}>MARKETING</h4>
        
            <Link href="/admin/dashboard" passHref>
              <div className={`flex items-center p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}
                 onClick={() => setIsOpen(false)}>
              <MdDashboard />
              {!isCollapsed && <span className="ml-2">Dashboard</span>}
            </div>
          </Link>
         
           

          <Link href="/marketplace">
            <div className={`flex items-center p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}
                 onClick={() => setIsOpen(false)}>
                <IoMdCart />
              {!isCollapsed && <span className="ml-2"> Marketplace </span>}
            </div>
          </Link>
          

          <Link href="#">
            <div className={`flex items-center p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}
                onClick={() => setIsOpen(false)}>
              <AiFillShopping />
              {!isCollapsed && <span className="ml-2"> Orders </span>}
            </div>
          </Link>

          <Link href="#">
            <div className={`flex items-center p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}
                onClick={() => setIsOpen(false)}>
                <MdPeopleAlt />
            {!isCollapsed && <span className="ml-2"> Customers </span>}
            </div>
          </Link>

          <h4 className={`text-gray-700 ${isCollapsed ? 'hidden' : ''}`}>PAYMENTS</h4>

          <Link href="#">
            <div className={`flex items-center p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}
              onClick={() => setIsOpen(false)}>
              <FaChartBar />
              {!isCollapsed && <span className="ml-2"> Ladger </span>}
            </div>
          </Link>

        </div>

        <div className={`flex text-xs gap-2 mt-20 p-2 ${isCollapsed ? 'text-center' : ''}`}>
            <Image src= {user?.photo || profile} alt="User Profile" width={35} height={35}/>
            <div className={`flex flex-col gap-2 ${isCollapsed ? 'hidden' : ''}`}>
                <span className='font-bold'>{user?.user_name}</span>
                <span className='text-gray-600'>{user?.role}</span>
            </div>
        </div>

        <div className={`flex items-center mt-15 mx-4 p-2 rounded-md hover:bg-gray-300 ${isCollapsed ? 'justify-center' : ''}`}>
        <button className='flex'>
          <MdLogout />
          {!isCollapsed && <span className="ml-2 text-sm"> Logout </span>}
        </button>
        </div>
        

       
      </div>

    </>
  );
}

export default Sidebar;
