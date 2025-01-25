'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/utils/types';
import productsRepository from '@/apiCalls/productsRepository';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { KANBAN_ITEMS_PER_PAGE } from '@/utils/constant';

interface GlobalState {
  currentPageProducts: Product[];
  productsCount: number;
  pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  refetchProducts: () => Promise<void>;
  isActiveProducts: boolean; 
  setIsActiveProducts: (value: boolean | ((prev: boolean) => boolean)) => void;
  loading:boolean;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;

}

const defaultState: GlobalState = {
  currentPageProducts: [],
  productsCount: 0,
  pages: 1,
  pageNumber: 1,
  setPageNumber: () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
  refetchProducts: async () => {},
  isActiveProducts: true,
  setIsActiveProducts: () => {},
  loading:true,
  setLoading: () => {}
};

const ProductsContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [noProductsToastShown, setNoProductsToastShown] = useState(false);
  const [isActiveProducts, setIsActiveProducts] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;

  const setPageNumber = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('pageNumber', page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  //fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await productsRepository.getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchProducts();
  }, []);

  //get query search 
  useEffect(() => {
    const query = searchParams.get('query') || '';
    const filtered = products.filter((products) =>
      (products.name || '').toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    if (filtered.length === 0 && query && !noProductsToastShown) {
      toast.info("No products found.");
      setNoProductsToastShown(true);
    } else if (filtered.length > 0) {
      setNoProductsToastShown(false);
    }
  }, [products, searchParams, noProductsToastShown]);

  // page logic  
  const query = searchParams.get('query') || '';
  const pages = Math.ceil(filteredProducts.length / KANBAN_ITEMS_PER_PAGE);
  const startIndex = query? 0 : (pageNumber - 1) * KANBAN_ITEMS_PER_PAGE;
  const currentPageProducts = query? filteredProducts :
   filteredProducts.slice(
    startIndex,
    Math.min(startIndex + KANBAN_ITEMS_PER_PAGE, filteredProducts.length)
  );

  //refresh page
  const refetchProducts = async () => {
    setLoading(true);
    try {
      const updatedProducts = await productsRepository.getAllProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error refetching products:', error);
    }
    setLoading(false);
  };
  

  return (
    <ProductsContext.Provider
      value={{
        currentPageProducts,
        productsCount: filteredProducts.length,
        pages,
        pageNumber,
        setPageNumber,
        filteredProducts,
        setFilteredProducts,
        refetchProducts,
        isActiveProducts,
        setIsActiveProducts,
        loading,
        setLoading
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};


export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within an AuthProvider');
  }
  return context;
};