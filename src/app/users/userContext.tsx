'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Role, User } from '@/utils/types';
import userRepository from '@/apiCalls/userRepository';
import { useRouter, useSearchParams } from 'next/navigation';
import roleRepository from '@/apiCalls/roleRepository';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE, KANBAN_ITEMS_PER_PAGE } from '@/utils/constant';

interface GlobalState {
  processedUsers: any[];
  currentPageUsers: any[];
  userCount: number;
  pages: number;
  k_pages: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  filteredUsers: User[]; 
  kanbanProcessedUsers: any[];
  setFilteredUsers: (users: User[]) => void; 
  loading: boolean;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
  refrechUsers: () => Promise<void>;
}

const defaultState: GlobalState = {
  processedUsers: [],
  currentPageUsers: [],
  userCount: 0,
  pages: 1,
  k_pages:1,
  pageNumber: 1,
  setPageNumber: () => {[]},
  filteredUsers:[],
  kanbanProcessedUsers:[],
  setFilteredUsers: () => {},
  loading:true,
  setLoading: () => {},
  refrechUsers: async () => {},

};

const userContext = createContext<GlobalState>(defaultState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Initial state for filtered branches is an empty array or null
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [roles, setRoles] = useState([] as Role[])
  const searchParams = useSearchParams(); // Access search params
  const query = searchParams.get('query') || ''; // Get the 'query' parameter
  const [noUserToastShown, setNoUserToastShown] = useState(false); // Prevent repeated toasts
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
// Fetch users & roles when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const users = await userRepository.getAllUsers();  
        const roles = await roleRepository.getAllRoles();
        setUsers(users);
        setUserCount(users.length);
        setLoading(false);
        setRoles(roles);

      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchUsers();  
  }, []);  

  // Filter users based on the query
  const filterUsers = users.filter((user) =>{
    const englishName = user.name?.en || ''; // Default to an empty string if undefined
    const arabicName = user.name?.ar || ''; // Default to an empty string if undefined

    return (
      englishName.toLowerCase().includes(query.toLowerCase()) ||
      arabicName.includes(query)
    );

  });

  // Show toast notification if no users match
    useEffect(() => {
      if (filterUsers.length === 0 && query && !noUserToastShown) {
        toast.info('The user is not exist');
        setNoUserToastShown(true);
      } else if (filterUsers.length > 0) {
        setNoUserToastShown(false); // Reset flag if branches are found
      }
    }, [filterUsers, query]);

      // Pagination logic for tabel
           const pages = Math.ceil(filterUsers.length / ITEMS_PER_PAGE);
           const startIndex = query ? 0 : (pageNumber - 1) * ITEMS_PER_PAGE;
           const currentPageUsers = query 
                 ? filterUsers // Show all filtered users during search
                 : filterUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      // Pagination logic for kanban
      const k_pages = Math.ceil(filterUsers.length / KANBAN_ITEMS_PER_PAGE);
      const k_startIndex = query ? 0 : (pageNumber - 1) * KANBAN_ITEMS_PER_PAGE;
      const k_currentPageUsers = query 
                ? filterUsers // Show all filtered users during search
                : filterUsers.slice(k_startIndex, k_startIndex + KANBAN_ITEMS_PER_PAGE);
                
    const processedUsers = (currentPageUsers || []).map(user => {
      const roleName = roles.find(role => role.id === user.role)?.name || 'N/A'; // Get role name by matching role ID
      
      return {
        ...user,
        name: user.name?.en && user.name?.ar ? `${user.name.en} (${user.name.ar})` : 'N/A', // Combine English and Arabic
        role: roleName, // Replace role ID with role name
  
      };
    });

    const kanbanProcessedUsers = (k_currentPageUsers || []).map(user => {
      const roleName = roles.find(role => role.id === user.role)?.name || 'N/A'; // Get role name by matching role ID
      
      return {
        ...user,
        name: user.name?.en && user.name?.ar ? `${user.name.en} (${user.name.ar})` : 'N/A', // Combine English and Arabic
        role: roleName, // Replace role ID with role name
  
      };
    });

    const refrechUsers = async () => {
      setLoading(true)
      try {
        const updatedUsers = await userRepository.getAllUsers();
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error refetching users:', error);
      } finally {
        setLoading(false)
      }
    };
    
  return (
    <userContext.Provider value={{
      processedUsers,
      currentPageUsers,
      userCount: filterUsers.length,
      pages,
      k_pages,
      pageNumber,
      setPageNumber,
      filteredUsers,
      kanbanProcessedUsers,
      setFilteredUsers,
      loading,
      setLoading,
      refrechUsers
    }}>
      {children}
    </userContext.Provider>
  );
};

export const useGlobal = () => useContext(userContext);
