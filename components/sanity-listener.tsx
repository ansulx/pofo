'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSanityListener } from '@/lib/hooks/useSanityListener';

export default function SanityListener({ documentTypes = ['post', 'about', 'project', 'publication', 'category'] }) {
  const router = useRouter();
  
  // Listen for changes to any of the document types
  const isListening = useSanityListener(documentTypes, async () => {
    // Use Next.js router refresh() for client-side revalidation
    router.refresh();
    
    // For complete refresh in case of deep nested content changes
    setTimeout(() => {
      router.refresh();
    }, 2000);
  });
  
  return null; // This component doesn't render anything
} 