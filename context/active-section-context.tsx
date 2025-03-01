"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import type { SectionName } from "@/lib/types";
import { usePathname } from "next/navigation";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null
);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Home");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);
  const pathname = usePathname();

  // Reset active section when navigating back to home
  useEffect(() => {
    if (pathname === "/") {
      const section = window.location.hash.slice(1);
      const sectionName = section ? 
        (section.charAt(0).toUpperCase() + section.slice(1)) as SectionName : 
        "Home";
      setActiveSection(sectionName);
    }
  }, [pathname]);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
}
