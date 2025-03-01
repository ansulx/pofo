"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our global data store
interface DataContextType {
  blogPosts: any[];
  projects: any[];
  about: any;
  loading: boolean;
  refreshData: (type: 'blog' | 'projects' | 'about') => Promise<void>;
}

// Create the context with default values
const DataContext = createContext<DataContextType>({
  blogPosts: [],
  projects: [],
  about: null,
  loading: false,
  refreshData: async () => {}
});

// Create a provider component
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Function to refresh specific data types
  const refreshData = async (type: 'blog' | 'projects' | 'about') => {
    setLoading(true);
    
    try {
      if (type === 'blog') {
        const response = await fetch(`/api/refresh-blog?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.posts) setBlogPosts(data.posts);
        }
      } else if (type === 'projects') {
        const response = await fetch(`/api/refresh-projects?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.projects) setProjects(data.projects);
        }
      } else if (type === 'about') {
        const response = await fetch(`/api/refresh-profile?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.profile) setAbout(data.profile);
        }
      }
    } catch (error) {
      console.error(`Error refreshing ${type} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Register to Sanity webhook events
  useEffect(() => {
    // The rest of this can be implemented if you want to set up
    // a more advanced real-time update system with webhooks
  }, []);

  return (
    <DataContext.Provider value={{ blogPosts, projects, about, loading, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook to use the context
export function useData() {
  return useContext(DataContext);
} 