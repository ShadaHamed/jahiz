'use client'

import branchRepository from '@/apiCalls/branchRepository';
import Link from 'next/link';
import BranchTable from './BranchTable';
import { GlobalProvider } from './Context';
import React, { useRef } from 'react';
import TableTools from '@/components/table/TableTools';
import { Branch } from '@/utils/types';

const BranchPage = async () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const branches: Branch[] = await branchRepository.getAllBranches();

  return (
    <GlobalProvider>
      <div className='overflow-hidden'>
        <div className="w-full fix p-6 items-center justify-center md:justify-start">
          <h1 className='absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto  md:left-auto md:transform-none'> Branches</h1>
          <TableTools data={branches} contentRef={contentRef} />

          <div className='overflow-x-auto border rounded-lg' ref={contentRef}>
            <div className='flex justify-between items-center p-4'>
              <div className='flex flex-col'>
                <h2 className='text-xl font-bold'>Branches</h2>
                <p className='text-sm text-gray-500'>A list of all the users in your account</p>
              </div>
              <Link href='/branches/create'
                className='p-4 bg-primaryColor text-white rounded-lg text-sm'
              >Add Branch</Link>
            </div>
            <div>
              <BranchTable />
            </div>
          </div>
        </div>
      </div>
    </GlobalProvider>
  )
}

export default BranchPage