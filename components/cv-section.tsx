import React from 'react';
import { motion } from 'framer-motion';

interface CVSectionProps {
  cv: {
    asset: {
      url: string;
    };
  };
  cvTitle?: string;
  name?: string;
}

export default function CVSection({ cv, cvTitle = 'Download CV', name = 'CV' }: CVSectionProps) {
  if (!cv?.asset?.url) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10 md:mt-16 p-6 bg-white dark:bg-gray-800/60 rounded-lg shadow-sm"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Curriculum Vitae
      </h3>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Download my full curriculum vitae to learn more about my education, research experience, and publications.
          </p>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            PDF format • Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div>
          <a
            href={cv.asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-md transition-colors shadow-sm"
            download={`${name}.pdf`}
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                clipRule="evenodd"
              />
            </svg>
            {cvTitle}
          </a>
        </div>
      </div>
    </motion.div>
  );
} 