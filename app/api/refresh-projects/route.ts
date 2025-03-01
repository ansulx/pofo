import { NextResponse } from 'next/server';
import { client } from '@/sanity/config';
import { urlFor } from '@/sanity/config';

export const dynamic = 'force-dynamic';

// Simple cache system
let projectsCache = {
  data: null,
  timestamp: 0
};

export async function GET() {
  try {
    const now = Date.now();
    
    // Only fetch new data if cache is older than 10 seconds
    if (projectsCache.data && now - projectsCache.timestamp < 10000) {
      console.log('Using cached projects, cache age:', (now - projectsCache.timestamp) / 1000, 'seconds');
      return NextResponse.json({ 
        projects: projectsCache.data,
        success: true,
        cached: true,
        timestamp: projectsCache.timestamp
      });
    }
    
    // Add a timestamp to bust cache
    const timestamp = now;
    
    // Enhanced query to get projects with image URLs
    const projects = await client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        description,
        tags,
        "image": {
          "asset": {
            "_ref": image.asset._ref,
            "url": image.asset->url
          }
        },
        url
      }
    `, { _: timestamp }, { cache: 'no-store' });
    
    // Update the cache
    if (projects) {
      projectsCache = {
        data: projects,
        timestamp: now
      };
    }
    
    // Log the response
    console.log('Projects query response:', projects?.length ? `Found ${projects.length} projects` : 'No projects found');
    
    // Process images if needed
    projects?.forEach((project: any) => {
      if (project.image && project.image.asset && project.image.asset._ref && !project.image.asset.url) {
        project.image.asset.url = urlFor(project.image).url();
      }
    });
    
    return NextResponse.json({ 
      projects: projects || [],
      success: !!projects,
      cached: false,
      timestamp
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects', message: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 