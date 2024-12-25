'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category } from '@/utils/types';
import categoryRepository from '@/apiCalls/categoriesRepository';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { KANBAN_ITEMS_PER_PAGE } from '@/utils/constant';

interface GlobalState {
  currentPageCategories: Category[];
  categoryCount: number;
  pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredCategories: Category[];
  setFilteredCategories: (categories: Category[]) => void;
  refetchCategories: () => Promise<void>;
}

const defaultState: GlobalState = {
  currentPageCategories: [],
  categoryCount: 0,
  pages: 1,
  pageNumber: 1,
  setPageNumber: () => {},
  filteredCategories: [],
  setFilteredCategories: () => {},
  refetchCategories: async () => {}
};

const CategoryContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [noCategoryToastShown, setNoCategoryToastShown] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;

  const setPageNumber = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('pageNumber', page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryRepository.getAllCategories();
        console.log('categories', categories)
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const query = searchParams.get('query') || '';
    const filtered = categories.filter((category) =>
      (category.name || '').toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
    if (filtered.length === 0 && query && !noCategoryToastShown) {
      toast.info("No categories found.");
      setNoCategoryToastShown(true);
    } else if (filtered.length > 0) {
      setNoCategoryToastShown(false);
    }
  }, [categories, searchParams, noCategoryToastShown]);

  const pages = Math.ceil(filteredCategories.length / KANBAN_ITEMS_PER_PAGE);
  const startIndex = (pageNumber - 1) * KANBAN_ITEMS_PER_PAGE;
  const currentPageCategories = filteredCategories.slice(
    startIndex,
    Math.min(startIndex + KANBAN_ITEMS_PER_PAGE, filteredCategories.length)
  );
  const refetchCategories = async () => {
    try {
      const updatedCategories = await categoryRepository.getAllCategories();
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error refetching categories:', error);
    }
  };
  

  return (
    <CategoryContext.Provider
      value={{
        currentPageCategories,
        categoryCount: filteredCategories.length,
        pages,
        pageNumber,
        setPageNumber,
        filteredCategories,
        setFilteredCategories,
        refetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};


export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within an AuthProvider');
  }
  return context;
};