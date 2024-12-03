'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Category } from '@/utils/types';
import categoriesRepository from '@/apiCalls/categoriesRepository';
import SearchBox from '@/components/table/SearchBox';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([] as Category[]);
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesRepository.getAllCategories();
                console.log(data)
                setCategories(data);

            } catch (error) {
                console.error('Failed to fetch category:', error);
            }
        };

        fetchCategories();

    }, []);

    return (
        <div className='overflow-hidden'>
        <div className="w-full fix p-6 items-center justify-center md:justify-start">
          <h1 className='absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto  md:left-auto md:transform-none'>
            Categories
          </h1>
          <SearchBox />
        <div className="grid sm:grid-col-2 md:grid-cols-4 gap-4 p-3" ref={contentRef}>
            {categories.map((category, index) => (
                <div key={index} className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-50 h-[70%] text-sm">
                <div className="m-2.5 overflow-hidden rounded-md h-1/2 flex justify-center items-center">
                  <img className="w-full h-full object-cover" src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                </div>
                <div className="p-4 text-center">
                  <h4 className="mb-1 text-xl font-semibold text-slate-800">
                    {category.name}
                  </h4>
                </div>
                <div className="flex justify-center mb-4">
                  <button className="min-w-32  rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Details
                  </button>
                </div>
              </div>
             )) }
        </div>
        </div>
        </div>
    );
}

export default CategoriesPage