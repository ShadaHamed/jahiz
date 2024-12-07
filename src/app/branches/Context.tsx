import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Branch } from '@/utils/types';
import branchRepository from '@/apiCalls/branchRepository';

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Initial state for filtered branches is an empty array or null
  const [filterdBranches, setFilterdBranches] = useState<Branch[]>([]);

  useEffect(() => {
    // Fetch branches when the component mounts
    const fetchBranches = async () => {
      try {
        const branches = await branchRepository.getAllBranches();  // Fetch branches from the repository
        setFilterdBranches(branches);  // Set the fetched branches as default value
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();  // Call the function to fetch branches
  }, []);  // Empty dependency array ensures this runs only once on component mount

  return (
    <GlobalContext.Provider value={{ filterdBranches, setFilterdBranches }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
