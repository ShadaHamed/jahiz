'use client'

import Image from 'next/image';
import React, {Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, redirect } from 'next/navigation';
import { Category } from '@/utils/types';
import { FaPlus } from "react-icons/fa";
import UpdateCategoryModal from './EditCategoryModel';
import { useCategoryContext } from '../categoryContext';
import categoryRepository from '@/apiCalls/categoriesRepository';
import { toast } from 'react-toastify';

export const FilteredCategories = () => {
    const {filteredCategories, setFilteredCategories, refetchCategories} = useCategoryContext()
    const [dropdownOpen, setDropdownOpen] = useState<number | null>();
    const [editingCategory, setEditingCategory] = useState<Category | null>(null); // To track the category being edited
    const searchParams = useSearchParams();
  
    const handleCategoryUpdated = async () => {
      setDropdownOpen(null);
      await refetchCategories(); // Refresh the category list
    };
    // useEffect(() => {
    //   if (categories.length > 0) {
    //     const query = searchParams.get('query') || '';
    //     const filtered = categories.filter((category) =>
    //       category.name.toLowerCase().includes(query.toLowerCase())
    //     );
    //     setFilteredCategories(filtered);
    //   }
    // }, [categories, searchParams]);
    
    const toggleDropdown = (index: number) => {
      setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this category?');
    if (!confirmed) return;

    try {
        await categoryRepository.deleteCategory(id); 
        toast.success('Category deleted successfully!');
        await refetchCategories();
    } catch (error) {
        toast.error('Failed to delete category. Please try again.');
    }
};

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">

        <div
          className="flex flex-col items-center p-4 mx-6 md:mx-0 bg-gray-100 text-white rounded-lg transition-transform hover:scale-105">
          <div className="overflow-hidden rounded-full w-20 h-20 flex justify-center items-center">
            <div className='bg-gray-300 w-[80px] h-[80px] flex items-center justify-center cursor-pointer' onClick={() => redirect('/categories/create')}>
              <FaPlus size={20} className='text-gray-700'/>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h4 className="text-lg font-semibold text-gray-800">
            Create Category
            </h4>
          </div>
        </div>

        {filteredCategories.map((category, index) => (
          <div
          key={index}
          className="relative flex flex-col items-center p-4 mx-6 md:mx-0 bg-gray-200 text-gray-800 shadow-lg border border-gray-200 rounded-lg transition-transform hover:scale-105"
        >
                 <button
                  id={`dropdownButton-${index}`}
                  onClick={() => toggleDropdown(index)}
                  className="absolute top-2 right-2 inline-block text-darkColor hover:bg-secondaryColor/50 focus:outline-none hover:scale-110 focus:text-primaryColor rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id={`dropdown-${index}`}
                  className={`absolute right-2 top-10 z-10 ${dropdownOpen === index ? "block" : "hidden"
                    } text-sm bg-white border border-secondaryColor rounded-lg shadow-md`}
                >
                  <ul className="py-2">
                    <li onClick={() => setEditingCategory(category)} className='cursor-pointer'>
                      <a
                        // href={`/users/edit/${user.id}`}
                        className="block px-4 py-2 text-primaryColor hover:bg-light"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-light"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
      
          <div className="overflow-hidden rounded-full w-20 h-20 flex justify-center items-center">
            <Image
              className="object-cover w-[80px] h-[80px]"
              width={80}
              height={80}
              src={`/images/${category.image}.jpg`}
              alt={`${category.name} picture`}
            />
          </div>
         
       
          <div className="mt-4 text-center">
            <h4 className="text-lg font-semibold text-gray-800">
              {category.name}
            </h4>
            <p className="text-sm text-gray-500">55 products</p> {/* Example members */}
          </div>
        </div>
        ))}
        {/* Update Modal */}
          {editingCategory && (
            <UpdateCategoryModal
              setOpen={() => setEditingCategory(null)}
              text={editingCategory.name}
              categoryID={editingCategory.id}
              onCategoryUpdated={handleCategoryUpdated}
            />
          )}
      </div>
    );
  };
  