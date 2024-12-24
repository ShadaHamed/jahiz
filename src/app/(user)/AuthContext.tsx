'use client';

import { User } from '@/utils/types';
import { redirect } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://json-server-app-zwl3.onrender.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users: User[] = await response.json();
      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (matchedUser) {
        setUser(matchedUser);
        setIsAuthenticated(true);
        toast.success('Login successfuly')
        redirect('/admin/dashboard')
      } else {
        toast.warn('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{  
      isAuthenticated,
      user,
      login,
      logout, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
