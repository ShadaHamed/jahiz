'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { City, Region } from '@/utils/types';
import cityRepository from '@/apiCalls/cityRepository';
import regionRepository from '@/apiCalls/regionRepository';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE } from '@/utils/constant';

interface GlobalState {
  processedRegions: any[];
  currentPageRegions: any[];
  RegionCount: number;
  pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredRegions: City[]; 
  loading: boolean;
  refrechRegions: () => Promise<void>;
  uniqueCities: any[];
}

const defaultState: GlobalState = {
  processedRegions: [],
  currentPageRegions: [],
  RegionCount: 0,
  pages: 1,
  pageNumber: 1,
  setPageNumber: () => {[]},
  filteredRegions:[],
  loading:true,
  refrechRegions: async () => {},
  uniqueCities: [],
};

const regionContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  // const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [RegionCount, setRegionCount] = useState(0);
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

      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();  
  }, []);  

  // Fetch regions when the component mounts
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regions = await regionRepository.getAllRegions();  
        setRegions(regions);
        setLoading(false)

      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchRegions();  
  }, []); 
  
  const uniqueCities = [...new Set(regions.map((region) => region.name))];

  // Filter regions based on the query
  const filteredRegions = regions.filter((region) =>{

    const englishName = region.name?.en || ''; // Default to an empty string if undefined
    const arabicName = region.name?.ar || ''; // Default to an empty string if undefined

    return (
      englishName.toLowerCase().includes(query.toLowerCase()) ||
      arabicName.includes(query)
    );

  });
  // Show toast notification if no regions match
    useEffect(() => {
      if (filteredRegions.length === 0 && query && !noCityToastShown) {
        toast.info('The Region is not exist');
        setNoCityToastShown(true);
      } else if (filteredRegions.length > 0) {
        setNoCityToastShown(false); 
      }
    }, [filteredRegions, query]);

      // Pagination logic for tabel
      const pages = Math.ceil(filteredRegions.length / ITEMS_PER_PAGE);
      const startIndex = query ? 0 : (pageNumber - 1) * ITEMS_PER_PAGE;
      const currentPageRegions = query 
            ? filteredRegions // Show all filtered regions during search
            : filteredRegions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      
    const processedRegions = (currentPageRegions || []).map(region => {
      const { name, ...rest } = region;

      // Find the city name based on the cityID
      const city = cities.find(city => city.id === region.cityID);
      const cityName = city ? city.name.en : "Unknown City"; 

      return {
        ...rest,
        english_name: name.en,
        arabic_name: name.ar, 
        cityName
      };
      
    });

    const refrechRegions = async () => {
      try {
        const updatedRegions = await regionRepository.getAllRegions();
        setRegions(updatedRegions);
      } catch (error) {
        console.error('Error refetching regions:', error);
      }
    };
  return (
    <regionContext.Provider value={{
      processedRegions,
      currentPageRegions,
      RegionCount: filteredRegions.length,
      pages,
      pageNumber,
      setPageNumber,
      filteredRegions,
      loading, 
      refrechRegions,
      uniqueCities,
    }}>
      {children}
    </regionContext.Provider>
  );
};

export const useRegionGlobal = () => useContext(regionContext);
