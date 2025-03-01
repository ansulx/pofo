import { NextResponse } from 'next/server';
import { client } from '@/sanity/config';

export async function GET() {
  try {
    const publications = await client.fetch(`
      *[_type == "publication"] | order(year desc, month desc) {
        _id,
        title,
        authors,
        publishedIn,
        publicationType,
        year,
        month,
        abstract,
        keywords,
        url,
        pdfUrl,
        doi,
        citations
      }
    `, {}, { cache: 'no-store' });
    
    return NextResponse.json({ publications });
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json({ error: 'Failed to fetch publications' }, { status: 500 });
  }
} 