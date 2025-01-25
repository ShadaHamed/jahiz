'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react'
import { GlobalProvider } from './productcontext';
import SearchBox from '@/components/table/SearchBox';
import ExportPDF from '@/components/table/ExportPDF';
import ProductsCollections from './view/ProductsCollections';
import Link from 'next/link';

function ProductsPage() {
  const contentRef = useRef<HTMLDivElement>(null);
    
;    
  return (
    <Suspense>
      <GlobalProvider>
      <div className="overflow-hidden ref={contentRef}">
      <div className="w-full fix p-6 items-center justify-center md:justify-start">
        <h1 className="font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl">
          Products Management
        </h1>   
        <div className='flex xl:justify-between items-center my-8'>
        <div>
          <SearchBox/>
        </div>
        <div  className="xl:w-40 flex items-center justify-center xl:bg-gray-100 xl:px-4 xl:rounded-md focus:shadow-md  active:bg-primaryColor active:text-white">
          <ExportPDF contentRef={contentRef} />
        </div>
      </div>
      </div>

      <div className='overflow-x-auto border rounded-lg mx-4' ref={contentRef}>
            <div className='flex justify-between items-center p-4'>
              <div className='flex flex-col'>
                <h2 className='text-xl font-bold'>Products</h2>
                <p className='hidden md:block text-sm text-gray-500'>A list of all products in your account</p>
              </div>
              <Link href='/products/create'
                className='py-2 px-4 bg-primaryColor text-white rounded-lg text-xs md:text-sm text-center'
              >Add Product</Link>
            </div>
            <div ref={contentRef} className='p-4'>
              <ProductsCollections />
            </div>
          </div>

      
    </div>
    </GlobalProvider>
    </Suspense>
  )
}

export default ProductsPage