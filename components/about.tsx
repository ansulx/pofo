"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { Profile } from "@/types";

interface AboutProps {
  content: string;
  about?: Profile | null;
}

export default function About({ content, about }: AboutProps) {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About me</SectionHeading>
      {about?.profileImage?.asset?.url && (
        <div className="relative w-full max-w-[350px] h-[350px] rounded-xl overflow-hidden mx-auto mb-8 md:mb-0">
          <Image
            src={about.profileImage.asset.url}
            alt={about?.name || "Profile picture"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 350px"
            priority
            style={{ objectPosition: 'center top' }}
          />
        </div>
      )}
      <p className="mb-3">{content}</p>
      {about?.cv?.asset?.url && (
        <div className="mt-6 md:mt-8 text-center">
          <a
            href={about.cv.asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-md transition-colors shadow-sm"
            download={`${about.name || 'CV'}.pdf`}
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
            {about.cvTitle || 'Download CV'}
          </a>
        </div>
      )}
    </motion.section>
  );
}
