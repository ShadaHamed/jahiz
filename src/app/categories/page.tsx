'use client'

import React, {Suspense, useEffect, useRef, useState } from 'react';
import { Category } from '@/utils/types';
import categoriesRepository from '@/apiCalls/categoriesRepository';
import SearchBox from '@/components/table/SearchBox';
import { FilteredCategories } from './FilteredCategories ';
import ExportPDF from '@/components/table/ExportPDF';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([] as Category[]);
        
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesRepository.getAllCategories();
                setCategories(data);

            } catch (error) {
                console.error('Failed to fetch category:', error);
            }
        };

        fetchCategories();

    }, []);
   

    return (
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
 
       <Suspense fallback={<div>Loading...</div>}>
          <FilteredCategories categories={categories} />
        </Suspense>
    </div>
    
    );
}

export default CategoriesPage