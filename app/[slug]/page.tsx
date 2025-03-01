import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/config';
import { urlFor } from '@/sanity/config';
import { PortableText } from '@portabletext/react';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

// Ensure content is fresh
export const dynamic = 'force-dynamic';

// Types
interface BlogPostParams {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    };
  }
  
  return {
    title: `${post.title} | Ansul Porwal`,
    description: post.excerpt || 'Read this insightful blog post',
    openGraph: post.mainImage ? {
      images: [{ url: urlFor(post.mainImage).width(1200).url() }]
    } : undefined
  };
}

// Fetch single blog post
async function getPost(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        body,
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
        "categories": categories[]->{ title, slug, color }
      }
    `, { slug });
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Define custom components for the PortableText renderer
const components = {
  types: {
    image: ({ value }) => (
      <div className="my-8 aspect-[16/9] relative rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).width(1200).quality(90).url()}
          alt={value.alt || ''}
          fill
          className="object-cover"
        />
        {value.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
            {value.caption}
          </div>
        )}
      </div>
    ),
    code: ({ value }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
        <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
          {value.code}
        </code>
      </pre>
    )
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value.href.startsWith('/') ? undefined : 'noreferrer noopener';
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {children}
        </a>
      );
    }
  }
};

export default async function BlogPostPage({ params }: BlogPostParams) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const formattedDate = post.publishedAt
    ? format(parseISO(post.publishedAt), 'MMMM d, yyyy')
    : 'Publication date unknown';
  
  return (
    <article className="max-w-3xl mx-auto px-4">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-3 mb-4 sm:mb-6">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          
          {post.estimatedReadingTime && (
            <div className="flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600 mr-2 sm:mr-3"></span>
              <span>{post.estimatedReadingTime} min read</span>
            </div>
          )}
        </div>
        
        {post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {post.categories.map(category => (
              <span
                key={category.slug.current}
                className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full"
                style={{
                  backgroundColor: `${category.color}15` || '#3b82f615',
                  color: category.color || '#3b82f6'
                }}
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
        
        {post.mainImage && (
          <div className="aspect-[4/3] sm:aspect-[16/9] relative rounded-lg sm:rounded-xl overflow-hidden mb-8 sm:mb-12">
            <Image
              src={urlFor(post.mainImage).width(1200).quality(90).url()}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </header>
      
      <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
        <PortableText value={post.body} components={components} />
      </div>
      
      <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link href="/" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all posts
        </Link>
      </div>
    </article>
  );
} 