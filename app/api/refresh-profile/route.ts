import { NextResponse } from 'next/server';
import { client } from '@/sanity/config';
import { urlFor } from '@/sanity/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Add a timestamp to bust cache
    const timestamp = new Date().getTime();
    
    // Enhanced query to get the complete about data with proper image URL
    const about = await client.fetch(`
      *[_type == "about"][0] {
        name,
        title,
        "profileImage": {
          "asset": {
            "_ref": profileImage.asset._ref,
            "url": profileImage.asset->url
          }
        },
        location,
        company,
        bio,
        linkedin,
        twitter,
        github,
        skills,
        experiences[] {
          title,
          company,
          startDate,
          endDate,
          description
        },
        resumeUrl
      }
    `, { _: timestamp }, { cache: 'no-store' });
    
    // Log the response for debugging
    console.log('About data query response:', about ? 'Found data' : 'No data found');
    
    if (about?.profileImage?.asset?._ref && !about.profileImage.asset.url) {
      // Generate URL for the image if it's not already included
      about.profileImage.asset.url = urlFor(about.profileImage).url();
    }
    
    return NextResponse.json({ 
      profile: about || null,
      success: !!about,
      timestamp
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data', message: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 