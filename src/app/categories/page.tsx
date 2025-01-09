'use client'

import React, { Suspense, useRef } from 'react';
import SearchBox from '@/components/table/SearchBox';
import { FilteredCategories } from './view/FilteredCategories ';
import ExportPDF from '@/components/table/ExportPDF';
import { GlobalProvider } from './categoryContext';

const CategoriesPage = () => {        
    const contentRef = useRef<HTMLDivElement>(null);
    
    return (
      <Suspense>
      <GlobalProvider>
      <div className="overflow-hidden ref={contentRef}">
      <div className="w-full fix p-6 items-center justify-center md:justify-start">
        <h1 className="font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl">
          Categories
        </h1>   
        <div className='flex xl:justify-between items-center my-8'>
        <div>
          <SearchBox/>
        </div>
        <div className="xl:w-40 flex items-center justify-center xl:bg-gray-100 xl:px-4 xl:rounded-md focus:shadow-md  active:bg-primaryColor active:text-white">
          <ExportPDF contentRef={contentRef} />
        </div>
      </div>
       
      </div>

      <div ref={contentRef}>
        <FilteredCategories />
      </div>
    </div>
    </GlobalProvider>
    </Suspense>
    );
}

export default CategoriesPage