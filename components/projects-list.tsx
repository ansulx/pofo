"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { useSanityListener } from '@/lib/hooks/useSanityListener';
import { urlFor } from '@/sanity/config';

interface ProjectsListProps {
  initialProjects: Project[];
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Set up auto-refresh for projects with better caching
  useEffect(() => {
    let isMounted = true;
    
    // Function to fetch updated projects
    const fetchLatestProjects = async (forceRefresh = false) => {
      // Skip cache check if force refreshing
      if (!forceRefresh && Date.now() - mountTimestamp < 60000 && initialProjects?.length > 0) {
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/refresh-projects?t=${Date.now()}`);
        
        if (!isMounted) return;
        
        if (response.ok) {
          const result = await response.json();
          if (result.projects && isMounted) {
            // Only update if data actually changed
            const currentJson = JSON.stringify(projects);
            const newJson = JSON.stringify(result.projects);
            
            if (currentJson !== newJson) {
              console.log("Projects refreshed with new data");
              setProjects(result.projects);
            }
          }
        }
      } catch (err) {
        console.error("Error refreshing projects:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Store the initial mount timestamp
    const mountTimestamp = Date.now();
    
    // Initial set from props
    if (initialProjects?.length > 0) {
      setProjects(initialProjects);
    } else {
      // Only fetch if we don't have data
      fetchLatestProjects();
    }

    // Less frequent polling: every 2 minutes
    const intervalId = setInterval(fetchLatestProjects, 120000);
    
    // Clean up
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [initialProjects]);

  // Extract all unique tags
  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags || []))];

  // Filter projects by tag
  const filteredProjects = activeTag === 'All' 
    ? projects 
    : projects.filter(project => project.tags?.includes(activeTag));

  // Add similar real-time update functionality to the projects list
  const isListening = useSanityListener(['project'], (update) => {
    if (update.transition === 'publish') {
      console.log('Project published, refreshing data...');
      fetchLatestProjects(true);
    }
  });

  // Fix dependency array warning by including 'projects'
  useEffect(() => {
    // Only run client-side
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle initial active project
    if (projects.length > 0 && activeProject === null) {
      setActiveProject(0);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [projects, activeProject]); // Include projects in dependency array

  const isMobile = windowWidth < 768;

  // Disable parallax on mobile
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, 100]
  );

  return (
    <div 
      ref={containerRef}
      className="relative py-12 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Projects
          </h1>
          <div className="w-14 h-1 bg-indigo-500 rounded mb-4"></div>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Selected works and contributions to the academic community
          </p>
        </div>

        {/* Tags filter - more compact styling */}
        {allTags.length > 1 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    activeTag === tag 
                      ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-medium' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Projects grid - Two column on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectItem key={project._id} project={project} index={index} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectItem({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-white dark:bg-gray-800/40 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {project.image && (
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={project.image.asset.url || '/placeholder-project.jpg'}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="flex-grow p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        
        {project.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
        )}
        
        <div className="mt-auto pt-3">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {project.url && (
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center mt-2"
            >
              View project
              <svg className="w-3.5 h-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
} 