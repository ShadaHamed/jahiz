// components/ClientLayout.tsx
'use client';

import React, { useState, ReactNode  } from 'react';
import Sidebar from '@/components/Sidebar';
import { MdClose, MdMenu  } from "react-icons/md";


interface ClientLayoutProps {
    children: ReactNode;
  }

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className="flex-1">
        <button onClick={toggleSidebar} className="p-4">
          {isSidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;
