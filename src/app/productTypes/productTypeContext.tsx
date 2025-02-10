'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category, ProductType } from '@/utils/types';
import productTypeRepository from '@/apiCalls/productTypesRepository';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE } from '@/utils/constant';
import categoryRepository from '@/apiCalls/categoriesRepository';

interface GlobalState {
  currentPage: any[];
  processedProductTypes: any[];
  productTypesCount: number;
  pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredProductTypes: ProductType[]; 
  loading: boolean;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  refrechProductTypes: () => Promise<void>;
}

const defaultState: GlobalState = {
  currentPage: [],
  processedProductTypes: [],
  productTypesCount: 0,
  pages: 1,
  pageNumber: 1,
  setPageNumber: () => {[]},
  filteredProductTypes:[],
  loading:true,
  setLoading: () => {},
  refrechProductTypes: async () => {}

};

const ProductTypesContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [filteredProductTypes, setFilteredProductTypes] = useState<ProductType[]>([]);
  const [productTypesCount, setProductTypesCount] = useState(0);
  const searchParams = useSearchParams(); // Access search params
  const query = searchParams.get('query') || ''; // Get the 'query' parameter
  const [noProductTypeToastShown, setNoProductTypeToastShown] = useState(false); // Prevent repeated toasts
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  
  // Extract pageNumber from URL
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  // Function to update pageNumber in URL
  const setPageNumber = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('pageNumber', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryRepository.getAllCategories(); 
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();  
  }, []); 

// Fetch ProductTypes when the component mounts
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const ProductTypes = await productTypeRepository.getAllProductTypes();  
        setProductTypes(ProductTypes);
        setProductTypesCount(ProductTypes.length);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching ProductTypes:', error);
      }
    };

    fetchProductTypes();  
  }, []);  

  // Filter ProductTypes based on the query
  const filteredProductTypes = productTypes.filter((ProductType) =>{

    return (
      ProductType.name.toLowerCase().includes(query.toLowerCase()) ||
      ProductType.name.includes(query)
    );

  });
  // Show toast notification if no ProductType match
    useEffect(() => {
      if (filteredProductTypes.length === 0 && query && !noProductTypeToastShown) {
        toast.info('The ProductType is not exist');
        setNoProductTypeToastShown(true);
      } else if (filteredProductTypes.length > 0) {
        setNoProductTypeToastShown(false); 
      }
    }, [filteredProductTypes, query]);

      // Pagination logic for tabel
      const pages = Math.ceil(filteredProductTypes.length / ITEMS_PER_PAGE);
      const startIndex = query ? 0 : (pageNumber - 1) * ITEMS_PER_PAGE;
      const currentPage = query 
            ? filteredProductTypes 
            : filteredProductTypes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      const processedProductTypes = (currentPage || []).map(productType => {
        const {categoryID, ...rest } = productType;
  
        // Find the category name based on the categoryID
        const category = categories.find(category => category.id === productType.categoryID);
        const category_Name = category?.category_Name 
  
        return {
          ...rest,
          category_Name
        };
        
      });

    const refrechProductTypes = async () => {
      setLoading(true)
      try {
        const updatedProductTypes = await productTypeRepository.getAllProductTypes();
        setProductTypes(updatedProductTypes);
      } catch (error) {
        console.error('Error refetching ProductTypes:', error);
      } finally {
        setLoading(false)
      }
    };
  return (
    <ProductTypesContext.Provider value={{
      currentPage,
      processedProductTypes,
      productTypesCount: filteredProductTypes.length,
      pages,
      pageNumber,
      setPageNumber,
      filteredProductTypes,
      loading, 
      setLoading,
      refrechProductTypes
    }}>
      {children}
    </ProductTypesContext.Provider>
  );
};

export const useProductTypeGlobal = () => useContext(ProductTypesContext);
