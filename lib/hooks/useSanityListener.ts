import { useEffect, useState } from 'react';

// Define our listener types for different document types
type DocumentType = 'post' | 'project' | 'category' | 'publication' | 'about';

export function useSanityListener(
  documentTypes: DocumentType[],
  onUpdate: () => Promise<void>
) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Safety check for required env vars
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
      return;
    }
    
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const types = documentTypes.map(type => `type == "${type}"`).join(' || ');
    const query = `*[${types}]`;
    const url = `https://${projectId}.api.sanity.io/v2021-06-07/data/listen/${dataset}?query=${encodeURIComponent(query)}`;
    
    let eventSource: EventSource;
    
    try {
      eventSource = new EventSource(url);
      
      eventSource.onopen = () => {
        console.log('Connected to Sanity real-time updates');
        setIsListening(true);
      };
      
      eventSource.onerror = (error) => {
        console.error('Sanity real-time error:', error);
        setIsListening(false);
        
        // Attempt to reconnect after a timeout
        setTimeout(() => {
          if (eventSource) {
            eventSource.close();
            setupListener();
          }
        }, 5000);
      };
      
      eventSource.addEventListener('mutation', async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Sanity content updated:', data);
          await onUpdate();
        } catch (error) {
          console.error('Error handling Sanity update:', error);
        }
      });
      
      const setupListener = () => {
        try {
          eventSource = new EventSource(url);
        } catch (err) {
          console.error('Failed to create EventSource:', err);
        }
      };
      
      return () => {
        eventSource.close();
        setIsListening(false);
      };
    } catch (error) {
      console.error('Failed to setup Sanity listener:', error);
      return () => {};
    }
  }, [documentTypes, onUpdate]);
  
  return isListening;
} 