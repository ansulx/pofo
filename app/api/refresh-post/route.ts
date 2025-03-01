import { NextResponse } from 'next/server';
import { client } from '@/sanity/config';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter is required' }, 
      { status: 400 }
    );
  }
  
  try {
    // Add a timestamp to bust cache
    const timestamp = new Date().getTime();
    
    // Fetch the post by slug
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        body,
        mainImage,
        publishedAt,
        updatedAt,
        excerpt,
        estimatedReadingTime,
        "categories": categories[]->{ title, slug, color },
        tags,
        "author": author->{name, profileImage}
      }
    `, { slug, _: timestamp }, { cache: 'no-store' });
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found', slug }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      post,
      success: true,
      timestamp
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post', message: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
} 