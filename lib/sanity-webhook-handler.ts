// Create this file to handle incoming webhook events from Sanity

import { revalidatePath, revalidateTag } from 'next/cache';

// Map of document types to their respective paths/tags
const documentTypeToRevalidation = {
  'post': {
    paths: ['/blog', '/'],
    tags: ['posts', 'blog-content']
  },
  'project': {
    paths: ['/projects'],
    tags: ['projects']
  },
  'publication': {
    paths: ['/publications'],
    tags: ['publications']
  },
  'about': {
    paths: ['/'],
    tags: ['profile', 'about']
  }
};

export async function handleSanityWebhook(req) {
  try {
    // Parse the webhook payload
    const body = await req.json();
    const { _type, _id } = body;
    
    console.log(`Received webhook for ${_type} document: ${_id}`);
    
    // Find what needs to be revalidated for this document type
    const revalidationTargets = documentTypeToRevalidation[_type];
    
    if (revalidationTargets) {
      // Revalidate all affected paths
      revalidationTargets.paths.forEach(path => {
        console.log(`Revalidating path: ${path}`);
        revalidatePath(path);
      });
      
      // Revalidate all affected cache tags
      revalidationTargets.tags.forEach(tag => {
        console.log(`Revalidating tag: ${tag}`);
        revalidateTag(tag);
      });
      
      return { success: true, revalidated: true };
    }
    
    return { success: true, revalidated: false };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return { success: false, error: error.message };
  }
} 