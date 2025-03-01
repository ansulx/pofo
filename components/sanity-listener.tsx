'use client';

import { useRouter } from 'next/navigation';
import { useSanityListener } from '@/lib/hooks/useSanityListener';

export default function SanityListener({ documentTypes = ['post', 'about', 'project', 'publication', 'category'] }) {
  const router = useRouter();
  
  // Use environment variables for project config
  const isListening = useSanityListener(documentTypes, async () => {
    console.log('Content updated, refreshing page...');
    router.refresh();
    
    // For complete refresh in case of deep nested content changes
    setTimeout(() => {
      router.refresh();
    }, 2000);
  });
  
  return null;
} 