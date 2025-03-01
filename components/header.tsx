"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { usePathname, useRouter } from "next/navigation";
import { Profile } from "@/types";
import ThemeSwitch from './theme-switch';

interface HeaderProps {
  about?: Profile | null;
}

export default function Header({ about }: HeaderProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (link: typeof links[number]) => {
    const isHash = link.hash.startsWith('#');
    
    if (isHash) {
      if (pathname !== '/') {
        router.push('/');
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setActiveSection(link.name);
          setTimeOfLastClick(Date.now());
        }, 100);
      } else {
        setActiveSection(link.name);
        setTimeOfLastClick(Date.now());
      }
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="z-[999] fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 sm:px-6">
        <Link 
          href="/" 
          className="font-bold text-xl text-gray-900 dark:text-gray-100"
        >
          {about?.name || 'Ansul Porwal'}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map(link => (
            <Link
              key={link.hash}
              href={link.hash}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.hash
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
              onClick={() => handleClick(link)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Navigation Button - Theme button removed */}
        <div className="flex items-center md:hidden">
          <button 
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg"
        >
          <nav className="flex flex-col p-4">
            {links.map(link => (
              <Link
                key={link.hash}
                href={link.hash}
                className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  pathname === link.hash
                    ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
                onClick={() => {
                  setMenuOpen(false);
                  handleClick(link);
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
