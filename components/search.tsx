"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SearchResult {
  type: "blog" | "project" | "publication";
  title: string;
  description?: string;
  url: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    // You'll need to create an API route to handle the search
  };

  return (
    <section className="max-w-[50rem] mx-auto px-4 py-28 sm:py-36">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs, projects, and publications..."
            className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-700 text-white px-4 py-1 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 dark:bg-white/10 p-4 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
                {result.type}
              </span>
              <h3 className="text-lg font-medium">{result.title}</h3>
            </div>
            {result.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {result.description}
              </p>
            )}
            <a
              href={result.url}
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              View →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 