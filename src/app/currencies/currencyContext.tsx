'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency } from '@/utils/types';
import currencyRepository from '@/apiCalls/CurrencyRepository';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE } from '@/utils/constant';

interface GlobalState {
  currentPageCurrencies: any[];
  CurrencyCount: number;
  pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredCurrencies: Currency[]; 
  loading: boolean;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  refrechCurrencies: () => Promise<void>;
}

const defaultState: GlobalState = {
  currentPageCurrencies: [],
  CurrencyCount: 0,
  pages: 1,
  pageNumber: 1,
  setPageNumber: () => {[]},
  filteredCurrencies:[],
  loading:true,
  setLoading: () => {},
  refrechCurrencies: async () => {}

};

const CurrencyContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  // const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [CurrencyCount, setCurrencyCount] = useState(0);
  const searchParams = useSearchParams(); // Access search params
  const query = searchParams.get('query') || ''; // Get the 'query' parameter
  const [noCurrencyToastShown, setNoCurrencyToastShown] = useState(false); // Prevent repeated toasts
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

// Fetch Currencies when the component mounts
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await currencyRepository.getAllCurrencies();  
        setCurrencies(currencies);
        setCurrencyCount(currencies.length);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching Currencies:', error);
      }
    };

    fetchCurrencies();  
  }, []);  

  // Filter Currencies based on the query
  const filteredCurrencies = currencies.filter((Currency) =>{

    return (
      Currency.name.toLowerCase().includes(query.toLowerCase()) ||
      Currency.name.includes(query)
    );

  });
  // Show toast notification if no Currency match
    useEffect(() => {
      if (filteredCurrencies.length === 0 && query && !noCurrencyToastShown) {
        toast.info('The Currency is not exist');
        setNoCurrencyToastShown(true);
      } else if (filteredCurrencies.length > 0) {
        setNoCurrencyToastShown(false); 
      }
    }, [filteredCurrencies, query]);

      // Pagination logic for tabel
      const pages = Math.ceil(filteredCurrencies.length / ITEMS_PER_PAGE);
      const startIndex = query ? 0 : (pageNumber - 1) * ITEMS_PER_PAGE;
      const currentPageCurrencies = query 
            ? filteredCurrencies 
            : filteredCurrencies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const refrechCurrencies = async () => {
      setLoading(true)
      try {
        const updatedCurrencies = await currencyRepository.getAllCurrencies();
        setCurrencies(updatedCurrencies);
      } catch (error) {
        console.error('Error refetching currencies:', error);
      } finally {
        setLoading(false)
      }
    };
  return (
    <CurrencyContext.Provider value={{
      currentPageCurrencies,
      CurrencyCount: filteredCurrencies.length,
      pages,
      pageNumber,
      setPageNumber,
      filteredCurrencies,
      loading, 
      setLoading,
      refrechCurrencies
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyGlobal = () => useContext(CurrencyContext);
