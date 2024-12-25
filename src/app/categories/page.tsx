'use client'

import React, {Suspense, useEffect, useRef, useState } from 'react';
import { Category } from '@/utils/types';
import categoriesRepository from '@/apiCalls/categoriesRepository';
import SearchBox from '@/components/table/SearchBox';
import { FilteredCategories } from './view/FilteredCategories ';
import ExportPDF from '@/components/table/ExportPDF';
import { GlobalProvider } from './categoryContext';

const CategoriesPage = () => {        
    const contentRef = useRef<HTMLDivElement>(null);
    
    return (
      <Suspense fallback={<div className='flex items-center justify-center'>Loading...</div>}>
      <GlobalProvider>
      <div className="overflow-hidden ref={contentRef}">
      <div className="w-full p-6 flex flex-col items-center md:flex-row md:justify-between">
        <h1 className="font-bold text-2xl mx-auto text-center lg:text-start lg:text-3xl">
          Categories
        </h1>
        
      </div>
      <div className=' flex px-6 items-center justify-between'>
        <div>
          <SearchBox/>
        </div>
        <div className="w-full lg:w-40 flex items-center lg:justify-center lg:bg-gray-100 lg:px-4 lg:rounded-md">
          <ExportPDF contentRef={contentRef} />
        </div>
        
      </div>
 
          <FilteredCategories />
    </div>
    </GlobalProvider>
    </Suspense>
    );
}

export default CategoriesPage