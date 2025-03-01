"use client";

import React from "react";
import { BsGithub, BsTwitterX, BsLinkedin, BsEnvelope } from "react-icons/bs";
import { SiGooglescholar } from "react-icons/si";
import { useTheme } from "@/context/theme-context";
import { BsSun, BsMoon } from "react-icons/bs";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  const socialLinks = [
    {
      icon: BsEnvelope,
      url: "mailto:ansul.scholar@gmail.com",
      label: "Email",
    },
    {
      icon: BsTwitterX,
      url: "https://x.com/singh_ansu2673",
      label: "Twitter",
    },
    {
      icon: BsLinkedin,
      url: "https://www.linkedin.com/in/ansulpundir",
      label: "LinkedIn",
    },
    {
      icon: BsGithub,
      url: "https://github.com/ansulx",
      label: "GitHub",
    },
    {
      icon: SiGooglescholar,
      url: "https://scholar.google.com/citations?user=LunfsKIAAAAJ&hl=en",
      label: "Google Scholar",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Ansul
          </span>
          <button
            onClick={toggleTheme}
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <BsSun className="text-gray-700" />
            ) : (
              <BsMoon className="text-gray-300" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label={link.label}
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
