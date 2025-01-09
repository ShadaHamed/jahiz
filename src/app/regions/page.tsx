'use client'

import React, { Suspense, useRef } from 'react'
import { GlobalProvider } from './regionContext'
import SearchBox from '@/components/table/SearchBox'
import Link from 'next/link'
import RegionTable from './RegionTable'
import ExportPDF from '@/components/table/ExportPDF'

function regionPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <Suspense>
      <GlobalProvider>
        <div className='overflow-hidden'>
          <div className="w-full fix p-6 items-center justify-center md:justify-start">
            <h2 className="font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl">
              Regions
            </h2>

            <div className='flex xl:justify-between items-center my-8'>
              <div>
                <SearchBox/>
              </div>
              <div className="xl:w-40 flex items-center justify-center xl:bg-gray-100 lg:px-4 xl:rounded-md focus:shadow-md  active:bg-primaryColor active:text-white">
                <ExportPDF contentRef={contentRef} />
              </div>
            </div>

            <div className='overflow-x-auto border rounded-lg' >
              <div className='flex justify-between items-center p-4'>
                <div className='flex flex-col'>
                  <h2 className='text-xl font-bold'>Regions</h2>
                  <p className='hidden md:block text-sm text-gray-500'>A list of all regions in your account</p>
                </div>
                <Link href='regions/create'
                  className='p-2 px-4 bg-primaryColor text-white rounded-lg text-xs md:text-sm text-center'
                >Add region</Link>
              </div>
              <div ref={contentRef}>
      
                <RegionTable />
                
              </div>
            </div>
          </div>
        </div>
      </GlobalProvider>
    </Suspense>
  )
}

export default regionPage