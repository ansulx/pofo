"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBriefcase, FaLinkedin, FaTwitter, FaGithub, FaDownload } from "react-icons/fa";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

// Updated interface to match our schema
interface Experience {
  title?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface AboutData {
  name?: string;
  title?: string;
  profileImage?: {
    asset?: {
      _ref?: string;
      url?: string;
    };
  };
  location?: string;
  company?: string;
  bio?: string[];
  linkedin?: string;
  twitter?: string;
  github?: string;
  skills?: string[];
  experiences?: Experience[];
  resumeUrl?: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

export default function AboutPage({ data: initialData }: { data: AboutData }) {
  const [data, setData] = useState<AboutData | null>(initialData || null);
  const [errorMessage, setErrorMessage] = useState("");

  // Set up polling for automatic content refreshing
  useEffect(() => {
    // Function to fetch updated data
    const fetchLatestData = async () => {
      try {
        const response = await fetch(`/api/refresh-profile?t=${Date.now()}`);
        if (response.ok) {
          const result = await response.json();
          if (result.profile) {
            console.log("About data auto-refreshed");
            setData(result.profile);
          }
        }
      } catch (error) {
        console.error("Auto-refresh error:", error);
      }
    };

    // Poll for updates every 30 seconds
    const intervalId = setInterval(fetchLatestData, 30000);
    
    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fallback data for when no content exists
  const fallbackData: AboutData = {
    name: "Your Name",
    title: "Professional Title",
    location: "City, Country",
    company: "Your Company",
    bio: ["Welcome to my portfolio! I'm a developer with a passion for creating meaningful digital experiences."],
    skills: ["Web Development", "React", "Next.js", "UI/UX Design"],
    experiences: [
      {
        title: "Developer",
        company: "Example Company",
        startDate: "2020-01",
        endDate: "Present",
        description: "Working on exciting projects and technologies."
      }
    ]
  };

  // Use actual data or fallback
  const displayData = data || fallbackData;
  
  // Get the image URL, handling both formats
  const getImageUrl = () => {
    if (!displayData.profileImage) return null;
    
    // Direct URL from API
    if (displayData.profileImage.asset?.url) {
      return displayData.profileImage.asset.url;
    }
    
    // If we need to construct the URL (may need adjustment based on your setup)
    if (displayData.profileImage.asset?._ref) {
      const ref = displayData.profileImage.asset._ref;
      return `https://cdn.sanity.io/images/v4ipor4n/production/${ref.replace('image-', '').replace('-jpg', '.jpg')}`;
    }
    
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0' stop-color='%23f0f0f0'/%3E%3Cstop offset='1' stop-color='%23e0e0e0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23a)'/%3E%3Cpath d='M150 120 C177 120 200 100 200 75 C200 50 177 30 150 30 C123 30 100 50 100 75 C100 100 123 120 150 120 Z M190 190 C190 170 172 150 150 150 C128 150 110 170 110 190' stroke='%23bbbbbb' stroke-width='8' fill='none'/%3E%3Ccircle cx='150' cy='75' r='45' fill='%23d9d9d9'/%3E%3Ccircle cx='150' cy='220' r='70' fill='%23d9d9d9'/%3E%3C/svg%3E";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with name - removed refresh button */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
            {displayData.name || "About Me"}
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left column - Profile info */}
          <div className="md:w-1/3 md:sticky md:top-24 self-start">
            <div className="space-y-8">
              {/* Profile image */}
              <div className="mb-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Image
                    src={getImageUrl() || ""}
                    width={300}
                    height={300}
                    alt={displayData.name || "Profile"}
                    className="rounded-full"
                    priority
                  />
                </motion.div>
              </div>

              {/* Professional title */}
              <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {displayData.title}
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                {/* Location */}
                {displayData.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500" />
                    <span>{displayData.location}</span>
                  </div>
                )}
                
                {/* Company */}
                {displayData.company && (
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-gray-400 dark:text-gray-500" />
                    <span>{displayData.company}</span>
                  </div>
                )}
              </div>

              {/* Social links */}
              <div className="flex space-x-4">
                {displayData.linkedin && (
                  <Link 
                    href={displayData.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    <FaLinkedin size={24} />
                  </Link>
                )}
                
                {displayData.twitter && (
                  <Link 
                    href={displayData.twitter} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-100"
                  >
                    <FaTwitter size={24} />
                  </Link>
                )}
                
                {displayData.github && (
                  <Link 
                    href={displayData.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <FaGithub size={24} />
                  </Link>
                )}
              </div>

              {/* Resume link */}
              {displayData.resumeUrl && (
                <div className="mt-8">
                  <Link 
                    href={displayData.resumeUrl}
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <FaDownload />
                    Download Resume
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Bio & Experience */}
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* Bio */}
              {displayData.bio && 
                displayData.bio.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
              {(!displayData.bio || displayData.bio.length === 0) && (
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  No bio information available.
                </p>
              )}
            </motion.div>

            {/* Skills */}
            {displayData.skills && displayData.skills.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {displayData.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experiences */}
            {displayData.experiences && displayData.experiences.length > 0 && (
              <div className="mt-16">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                  Experience
                </h3>
                <div className="space-y-10">
                  {displayData.experiences.map((exp, index) => (
                    <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-5">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {exp.title}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-gray-600 dark:text-gray-400 mt-1">
                        <span className="font-medium">{exp.company}</span>
                        <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
                        <span>
                          {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </span>
                      </div>
                      
                      {exp.description && (
                        <div className="mt-3 text-gray-700 dark:text-gray-300 prose dark:prose-invert">
                          {typeof exp.description === 'string' ? (
                            <p>{exp.description}</p>
                          ) : (
                            <PortableText value={exp.description} />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Guide for setting up content if in development mode */}
        {process.env.NODE_ENV === 'development' && (!data || Object.keys(data).length === 0) && (
          <div className="mt-16 p-6 border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Developer Guide</h3>
            <p className="text-yellow-700 dark:text-yellow-400 mb-4">
              This page is using fallback content. To set up real content:
            </p>
            <ol className="list-decimal pl-5 text-yellow-700 dark:text-yellow-400 space-y-2">
              <li>Open your Sanity Studio</li>
              <li>Create a document of type "about"</li>
              <li>Fill in all the profile fields</li>
              <li>Publish the document</li>
              <li>The page will automatically refresh with your content</li>
            </ol>
          </div>
        )}
      </motion.div>
    </div>
  );
} 