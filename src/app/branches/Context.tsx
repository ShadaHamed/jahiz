'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Branch } from '@/utils/types';
import branchRepository from '@/apiCalls/branchRepository';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE } from '@/utils/constant';

interface GlobalState {
  processedBranches: any[];
  currentPageBranches: any[];
  branchCount: number;
  pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredBranches: Branch[]; 
  setFilteredBranches: (branches: Branch[]) => void; 
  uniqueLocations: string[];
  selectedLocation: string;
  setSelectedLocation:(location: string) => void;
  refetchBranches: () => Promise<void>;
  loading: boolean;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const defaultState: GlobalState = {
  processedBranches: [],
  currentPageBranches: [],
  branchCount: 0,
  pages: 1,
  pageNumber: 1,
  setPageNumber: () => {[]},
  filteredBranches:[],
  setFilteredBranches: () => {},
  uniqueLocations: [],
  selectedLocation: "All Locations",
  setSelectedLocation:() => {},
  refetchBranches: async () => {},
  loading:true,
  setLoading: () => {}
};

const GlobalContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  // const [pageNumber, setPageNumber] =useState(1)
  const [branchCount, setBranchCount] = useState(0);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]); 
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  if (typeof window === 'undefined') {
    return null; // Render nothing during pre-rendering
}

const searchParams = useSearchParams();
  // Extract pageNumber from URL
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;

  // Function to update pageNumber in URL
  const setPageNumber = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('pageNumber', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };
  const [noBranchToastShown, setNoBranchToastShown] = useState(false); // Prevent repeated toasts

  useEffect(() => {
    // Fetch branches when the component mounts
    const fetchBranches = async () => {
      setLoading(true)
      try {
        const branches = await branchRepository.getAllBranches();  // Fetch branches from the repository
        setBranches(branches);  // Set the fetched branches as default value
        setBranchCount(branches.length)
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setLoading(false)
      }
      
    };

    fetchBranches(); 

  }, []);  

  const uniqueLocations = [...new Set(branches.map((branch) => branch.location))];

  // Initialize filteredBranches with all branches once fetched
  useEffect(() => {
    try {
      setFilteredBranches(branches);
      router.refresh();
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
    
  }, [branches]);

  useEffect(() => {
    const query = searchParams.get('query') || '';
    const locationFilter = selectedLocation; // Get the currently selected location filter

    // Combine search and filter logic
    const filtered = branches.filter((branch) => {
      const englishName = branch.branch_Name?.en || ''; 
      const arabicName = branch.branch_Name?.ar || ''; 
      const matchesSearch =
        englishName.toLowerCase().includes(query.toLowerCase()) ||
        arabicName.includes(query);
      const matchesLocation = locationFilter
        ? branch.location === locationFilter
        : true;
      
      return matchesSearch && matchesLocation;
    });
  
    setFilteredBranches(filtered);
  }, [branches, searchParams, selectedLocation]);
  
  const query = searchParams.get('query') || '';

    // // Show toast notification if no branches match
    // useEffect(() => {
    //   if (searchedBranches.length === 0 && query && !noBranchToastShown) {
    //     toast.info('The branch is not exist');
    //     setNoBranchToastShown(true);
    //   } else if (searchedBranches.length > 0) {
    //     setNoBranchToastShown(false); // Reset flag if branches are found
    //   }
    // }, [searchedBranches, query, noBranchToastShown]);
    const refetchBranches = async () => {
      setLoading(true)
      try {
        const updatedBranches = await branchRepository.getAllBranches();
        setBranches(updatedBranches);
        setFilteredBranches(updatedBranches);
      } catch (error) {
        console.error('Error refetching branches:', error);
      }
      finally{
        setLoading(false)
      }
    };
    
    // Pagination logic for tabel
    const pages = Math.ceil(filteredBranches.length / ITEMS_PER_PAGE);
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const currentPageBranches = query 
                     ? filteredBranches // Show all filtered users during search
                     : filteredBranches.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    

    
  const processedBranches = (currentPageBranches || []).map(branch => {
    return {
      ...branch,
      branch_Name: branch.branch_Name?.en && branch.branch_Name?.ar ? `${branch.branch_Name.en} (${branch.branch_Name.ar})` : 'N/A', // Combine English and Arabic
    };
  });


  return (
    <GlobalContext.Provider  value={{
      processedBranches,
      currentPageBranches,
      branchCount: filteredBranches.length,
      pages,
      pageNumber,
      setPageNumber,
      filteredBranches,
      setFilteredBranches,
      uniqueLocations,
      selectedLocation,
      setSelectedLocation,
      refetchBranches,
      loading,
      setLoading,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
