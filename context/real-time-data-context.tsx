"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSanityListener } from '@/lib/hooks/useSanityListener';

// Define the context shape
interface RealTimeDataContextType {
  latestUpdates: {
    blog: number;
    projects: number;
    publications: number;
    about: number;
  };
  refreshSection: (section: 'blog' | 'projects' | 'publications' | 'about') => void;
}

// Create the context
const RealTimeDataContext = createContext<RealTimeDataContextType | null>(null);

// Provider component
export function RealTimeDataProvider({ children }: { children: React.ReactNode }) {
  const [latestUpdates, setLatestUpdates] = useState({
    blog: Date.now(),
    projects: Date.now(),
    publications: Date.now(),
    about: Date.now()
  });
  
  // Set up listener for all content types
  useSanityListener(['post', 'project', 'publication', 'about'], (update) => {
    // Handle the update based on document type
    if (update.transition === 'publish') {
      const type = update.documentId.split('.')[0];
      
      console.log(`Real-time update detected for ${type}`);
      
      // Update the timestamp for the relevant section
      setLatestUpdates(prev => {
        switch(type) {
          case 'post':
            return { ...prev, blog: Date.now() };
          case 'project':
            return { ...prev, projects: Date.now() };
          case 'publication':
            return { ...prev, publications: Date.now() };
          case 'about':
            return { ...prev, about: Date.now() };
          default:
            return prev;
        }
      });
    }
  });
  
  // Function to manually refresh a section
  const refreshSection = (section: 'blog' | 'projects' | 'publications' | 'about') => {
    setLatestUpdates(prev => ({
      ...prev,
      [section]: Date.now()
    }));
  };
  
  // Value to provide to consumers
  const value = {
    latestUpdates,
    refreshSection
  };
  
  return (
    <RealTimeDataContext.Provider value={value}>
      {children}
    </RealTimeDataContext.Provider>
  );
}

// Custom hook to use the context
export function useRealTimeData() {
  const context = useContext(RealTimeDataContext);
  
  if (!context) {
    throw new Error('useRealTimeData must be used within a RealTimeDataProvider');
  }
  
  return context;
} 