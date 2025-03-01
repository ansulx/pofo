'use client';

import { useState, useEffect } from 'react';

// Define proper type for category
interface Category {
  title: string;
  slug: {
    current: string;
  };
  color?: string;
}

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const displayCount = isMobile ? 2 : 3;
  
  return (
    <div className="flex flex-wrap gap-1 sm:gap-2">
      {categories.slice(0, displayCount).map(category => (
        <span
          key={category.slug.current}
          className="inline-block text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${category.color || '#3b82f6'}15`,
            color: category.color || '#3b82f6'
          }}
        >
          {category.title}
        </span>
      ))}
      {categories.length > displayCount && (
        <span className="inline-block text-xs text-gray-500 dark:text-gray-400">
          +{categories.length - displayCount}
        </span>
      )}
    </div>
  );
} 