'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { City } from '@/utils/types';
import cityRepository from '@/apiCalls/cityRepository';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE } from '@/utils/constant';

interface GlobalState {
  processedCities: any[];
  currentPageCities: any[];
  cityCount: number;
  pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredCities: City[]; 
  loading: boolean;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  refrechCities: () => Promise<void>;
}

const defaultState: GlobalState = {
  processedCities: [],
  currentPageCities: [],
  cityCount: 0,
  pages: 1,
  pageNumber: 1,
  setPageNumber: () => {[]},
  filteredCities:[],
  loading:true,
  setLoading: () => {},
  refrechCities: async () => {}

};

const cityContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<City[]>([]);
  // const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [cityCount, setCityCount] = useState(0);
  const searchParams = useSearchParams(); // Access search params
  const query = searchParams.get('query') || ''; // Get the 'query' parameter
  const [noCityToastShown, setNoCityToastShown] = useState(false); // Prevent repeated toasts
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

// Fetch cities when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await cityRepository.getAllCities();  
        setCities(cities);
        setCityCount(cities.length);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();  
  }, []);  

  // Filter cities based on the query
  const filteredCities = cities.filter((city) =>{

    const englishName = city.name?.en || ''; // Default to an empty string if undefined
    const arabicName = city.name?.ar || ''; // Default to an empty string if undefined

    return (
      englishName.toLowerCase().includes(query.toLowerCase()) ||
      arabicName.includes(query)
    );

  });
  // Show toast notification if no city match
    useEffect(() => {
      if (filteredCities.length === 0 && query && !noCityToastShown) {
        toast.info('The city is not exist');
        setNoCityToastShown(true);
      } else if (filteredCities.length > 0) {
        setNoCityToastShown(false); // Reset flag if branches are found
      }
    }, [filteredCities, query]);

      // Pagination logic for tabel
      const pages = Math.ceil(filteredCities.length / ITEMS_PER_PAGE);
      const startIndex = query ? 0 : (pageNumber - 1) * ITEMS_PER_PAGE;
      const currentPageCities = query 
            ? filteredCities // Show all filtered cities during search
            : filteredCities.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      
    const processedCities = (currentPageCities || []).map(city => {
      const { name, ...rest } = city;
      return {
        ...rest,
        english_name: name.en,
        arabic_name: name.ar, 
      };
      
    });

    const refrechCities = async () => {
      setLoading(true)
      try {
        const updatedCities = await cityRepository.getAllCities();
        setCities(updatedCities);
      } catch (error) {
        console.error('Error refetching cities:', error);
      } finally {
        setLoading(false)
      }
    };
  return (
    <cityContext.Provider value={{
      processedCities,
      currentPageCities,
      cityCount: filteredCities.length,
      pages,
      pageNumber,
      setPageNumber,
      filteredCities,
      loading, 
      setLoading,
      refrechCities
    }}>
      {children}
    </cityContext.Provider>
  );
};

export const useCityGlobal = () => useContext(cityContext);
