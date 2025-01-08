'use client'

import Link from 'next/link';
import BranchTable from './BranchTable';
import { GlobalProvider, useGlobal } from './Context';
import React, {  Suspense, useRef } from 'react';
import TableTools from '@/components/table/TableTools';

const BranchContent = ( ) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { filteredBranches } = useGlobal();

  
  return (
      <div className='overflow-hidden'>
        <div className="w-full fix p-6 items-center justify-center md:justify-start">
          <h1 className=' font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl'> Branches</h1>
          <TableTools data={filteredBranches} contentRef={contentRef} />
          <div className='overflow-x-auto border rounded-lg' ref={contentRef}>
            <div className='flex justify-between items-center p-4'>
              <div className='flex flex-col'>
                <h2 className='text-xl font-bold'>Branches</h2>
                <p className='hidden md:block text-sm text-gray-500'>A list of all branches in your account</p>
              </div>
              <Link href='/branches/create'
                className='p-2 px-4 bg-primaryColor text-white rounded-lg text-xs md:text-sm text-center'
              >Add Branch</Link>
            </div>
            <div>
              <BranchTable/>
            </div>
          </div>
        </div>
      </div>
  )
}

const BranchPage = () => {
  return (
    <GlobalProvider>
      <Suspense>
      <BranchContent />
      </Suspense>
    </GlobalProvider>
  );
};

export default BranchPage