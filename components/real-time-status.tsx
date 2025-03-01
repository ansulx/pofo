"use client";

import React, { useState, useEffect } from 'react';
import { useRealTimeData } from '@/context/real-time-data-context';

export default function RealTimeStatus() {
  const { latestUpdates } = useRealTimeData();
  const [showStatus, setShowStatus] = useState(false);
  const [message, setMessage] = useState('');
  
  // Show a status message when updates are detected
  useEffect(() => {
    // Determine what was updated most recently
    const sections = Object.entries(latestUpdates);
    const mostRecent = sections.reduce((latest, current) => {
      return current[1] > latest[1] ? current : latest;
    }, ['none', 0]);
    
    // Only show message if update was within last 5 seconds
    const isRecent = Date.now() - mostRecent[1] < 5000;
    
    if (isRecent) {
      const sectionName = mostRecent[0].charAt(0).toUpperCase() + mostRecent[0].slice(1);
      setMessage(`${sectionName} content updated`);
      setShowStatus(true);
      
      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [latestUpdates]);
  
  if (!showStatus) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center">
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
} 