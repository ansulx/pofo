"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({ isLoading, message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-10 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce" />
            <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
            <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            <span className="ml-2 text-gray-700 dark:text-gray-300">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 