"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

interface Publication {
  _id: string;
  title: string;
  authors: string[];
  publishedIn: string;
  publicationType?: string;
  year: number;
  month?: number;
  abstract?: string;
  keywords?: string[];
  url?: string;
  pdfUrl?: string;
  doi?: string;
  citations?: number;
}

interface PublicationsProps {
  publications: Publication[];
}

export default function Publications({ publications }: PublicationsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAbstract = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Group publications by year
  const groupedPublications = publications.reduce((groups: Record<number, Publication[]>, pub) => {
    if (!groups[pub.year]) {
      groups[pub.year] = [];
    }
    groups[pub.year].push(pub);
    return groups;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedPublications)
    .map(Number)
    .sort((a, b) => b - a);

  const getPublicationLink = (pub: Publication) => {
    if (pub.url) return pub.url;
    if (pub.doi) return `https://doi.org/${pub.doi}`;
    if (pub.pdfUrl) return pub.pdfUrl;
    return null;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
      <SectionHeading>Publications</SectionHeading>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-12"
      >
        {!publications || publications.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No publications available at the moment.
          </p>
        ) : (
          <div>
            {sortedYears.map((year) => (
              <div key={year} className="mb-16">
                <div className="grid grid-cols-12 gap-8">
                  {/* Year column - left side */}
                  <div className="col-span-2 md:col-span-2">
                    <h2 className="text-2xl sticky top-24 font-bold text-gray-800 dark:text-gray-200">
                      {year}
                    </h2>
                  </div>
                  
                  {/* Content column - right side */}
                  <div className="col-span-10 md:col-span-10">
                    <div className="space-y-8">
                      {groupedPublications[year].map((pub) => {
                        const pubLink = getPublicationLink(pub);
                        
                        return (
                          <motion.div
                            key={pub._id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                          >
                            <div className={`${pub.abstract ? "cursor-pointer" : ""}`}>
                              <div 
                                className="publication-header" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (pub.abstract) toggleAbstract(pub._id);
                                }}
                              >
                                {pubLink ? (
                                  <a
                                    href={pubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-xl font-medium text-gray-900 dark:text-gray-100 
                                             hover:text-blue-600 dark:hover:text-blue-400 inline-block"
                                  >
                                    {pub.title}
                                  </a>
                                ) : (
                                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                                    {pub.title}
                                  </h3>
                                )}
                                
                                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
                                  <span>{pub.authors.join(", ")}</span>
                                  <span className="mx-2">—</span>
                                  <span>{pub.publishedIn}</span>
                                  {pub.publicationType && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span className="capitalize">{pub.publicationType}</span>
                                    </>
                                  )}
                                  {pub.citations && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>Citations: {pub.citations}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              {pub.abstract && (
                                <div className="mt-2">
                                  <p
                                    className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${
                                      expandedId === pub._id ? "" : "line-clamp-2"
                                    }`}
                                  >
                                    {pub.abstract}
                                  </p>
                                  {pub.abstract.length > 100 && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleAbstract(pub._id);
                                      }}
                                      className="mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                                    >
                                      {expandedId === pub._id ? "Show less" : "Show more"}
                                    </button>
                                  )}
                                </div>
                              )}
                              
                              <div className="mt-3 flex gap-4">
                                {pubLink && (
                                  <a
                                    href={pubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                  >
                                    Read paper
                                    <svg
                                      className="ml-1 w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      />
                                    </svg>
                                  </a>
                                )}
                                
                                {pub.pdfUrl && (!pub.url || pub.url !== pub.pdfUrl) && (
                                  <a
                                    href={pub.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                  >
                                    PDF
                                    <svg
                                      className="ml-1 w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      />
                                    </svg>
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
} 