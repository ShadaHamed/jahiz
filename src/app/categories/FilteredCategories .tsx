'use client'

import Image from 'next/image';
import React, {Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Category } from '@/utils/types';


export const FilteredCategories = ({ categories }: { categories: Category[] }) => {
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
    const searchParams = useSearchParams();
  
    useEffect(() => {
      if (categories.length > 0) {
        const query = searchParams.get('query') || '';
        const filtered = categories.filter((category) =>
          category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
      }
    }, [categories, searchParams]);
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {filteredCategories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col mx-6 md:mx-0 bg-white shadow-lg border border-gray-200 rounded-lg transition-transform hover:scale-105"
          >
            <div className="overflow-hidden rounded-t-lg flex justify-center items-center bg-gray-100">
              <Image
                className="w-full h-[100px] object-cover"
                width={300}
                height={200}
                src={`/images/${category.name}.jpg`}
                alt={`${category.name} picture`}
              />
            </div>
            <div className="p-4 text-center">
              <h4 className="mb-2 text-lg font-semibold text-gray-800">
                {category.name}
              </h4>
              <button
                className="w-full rounded-md bg-primaryColor py-2 px-4 text-sm font-medium text-white transition hover:bg-primaryColor_2 focus:ring focus:ring-blue-300 active:bg-blue-700 disabled:opacity-50"
                type="button"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  