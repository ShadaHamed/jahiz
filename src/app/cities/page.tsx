'use client'

import React, { useRef, Suspense } from 'react';
import { GlobalProvider } from './cityContex'
import SearchBox from '@/components/table/SearchBox'
import Link from 'next/link'
import CityTable from './CityTable'
import ExportPDF from '@/components/table/ExportPDF'

function cityPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Suspense>
      <GlobalProvider>
        <div className='overflow-hidden'>
          <div className="w-full fix p-6 items-center justify-center md:justify-start">
            <h2 className="font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl">
              Cities
            </h2>

            <div className='flex lg:justify-between items-center my-8'>
              <div>
                <SearchBox/>
              </div>
              <div className="w-full lg:w-40 flex items-center justify-center lg:bg-gray-100 lg:px-4 lg:rounded-md focus:shadow-md  active:bg-primaryColor active:text-white">
                <ExportPDF contentRef={contentRef} />
              </div>
            </div>

            <div className='overflow-x-auto border rounded-lg' >
              <div className='flex justify-between items-center p-4'>
                <div className='flex flex-col'>
                  <h2 className='text-xl font-bold'>Ciities</h2>
                  <p className='hidden md:block text-sm text-gray-500'>A list of all the cities in your account</p>
                </div>
                <Link href='cities/create'
                  className='p-2 px-4 bg-primaryColor text-white rounded-lg text-xs md:text-sm text-center'
                >Add City</Link>
              </div>
              <div ref={contentRef}>
      
                <CityTable />
                
              </div>
            </div>
          </div>
        </div>
      </GlobalProvider>
    </Suspense>
  )
}

export default cityPage