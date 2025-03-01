import { Metadata } from 'next'
import { client } from '@/sanity/config'
import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { urlFor } from '@/sanity/config'
import { BlogPost } from '@/types'
import CategoryList from '@/components/category-list'

export const metadata: Metadata = {
  title: "Ansul Porwal | Blog & Portfolio",
  description: "Thoughts on technology, AI, and software development",
}

// Ensure fresh content every time
export const dynamic = 'force-dynamic'

// Fetch blog posts directly from Sanity
async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        estimatedReadingTime,
        featured,
        "categories": categories[]->{ title, slug, color }
      }
    `)
    console.log(`Found ${posts?.length || 0} blog posts for homepage`)
    return posts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Group posts by year and month
function groupPostsByDate(posts: BlogPost[]) {
  const grouped = posts.reduce((acc, post) => {
    if (!post.publishedAt) return acc
    
    const date = parseISO(post.publishedAt)
    const year = format(date, 'yyyy')
    const month = format(date, 'MMMM')
    
    if (!acc[year]) {
      acc[year] = {}
    }
    
    if (!acc[year][month]) {
      acc[year][month] = []
    }
    
    acc[year][month].push(post)
    return acc
  }, {} as Record<string, Record<string, BlogPost[]>>)
  
  return grouped
}

export default async function HomePage() {
  const allPosts = await fetchBlogPosts()
  const featuredPost = allPosts.find(post => post.featured)
  const posts = allPosts.filter(post => !post.featured)
  const groupedPosts = groupPostsByDate(posts)
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Blog Header */}
      <div className="mb-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          Index
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Existence precedes essence, but it's the questions we dare to ask that give meaning to the void
        </p>
      </div>
      
      {/* Featured Post (if any) */}
      {featuredPost && (
        <div className="mb-16 sm:mb-24">
          <Link href={`/${featuredPost.slug.current}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
              {featuredPost.mainImage && (
                <div className="lg:col-span-7 aspect-[16/9] sm:aspect-[16/9] overflow-hidden rounded-lg sm:rounded-xl">
                  <Image
                    src={urlFor(featuredPost.mainImage).width(1000).height(563).url()}
                    alt={featuredPost.title}
                    width={1000}
                    height={563}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              )}
              
              <div className="lg:col-span-5 flex flex-col justify-center mt-4 lg:mt-0">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {featuredPost.publishedAt && format(parseISO(featuredPost.publishedAt), 'MMMM d, yyyy')}
                  {featuredPost.estimatedReadingTime && (
                    <span className="ml-3">· {featuredPost.estimatedReadingTime} min read</span>
                  )}
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-4">
                  {featuredPost.title}
                </h2>
                
                {featuredPost.excerpt && (
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    {featuredPost.excerpt}
                  </p>
                )}
                
                {featuredPost.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.categories.map(category => (
                      <span
                        key={category.slug.current}
                        className="inline-block text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${category.color || '#3b82f6'}15`,
                          color: category.color || '#3b82f6'
                        }}
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}
                
                <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline inline-flex items-center mt-auto">
                  Read featured post
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}
      
      {/* Timeline Posts */}
      <div>
        {Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
          <div key={year} className="mb-12 sm:mb-16">
            {Object.keys(groupedPosts[year]).map(month => (
              <div key={`${year}-${month}`} className="mb-8 sm:mb-12">
                <div className="grid grid-cols-12 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-10">
                  {/* Left side: Year and Month */}
                  <div className="col-span-4 sm:col-span-3 lg:col-span-2 sticky top-28 self-start">
                    <div className="text-right pr-4 sm:pr-8 border-r-2 border-gray-200 dark:border-gray-800 h-full">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-300 dark:text-gray-700">
                        {year}
                      </div>
                      <div className="text-base sm:text-xl text-gray-500 dark:text-gray-500">
                        {month}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side: Posts */}
                  <div className="col-span-8 sm:col-span-9 lg:col-span-10 space-y-8 sm:space-y-12">
                    {groupedPosts[year][month].map(post => (
                      <article key={post._id} className="group relative pl-4 sm:pl-6">
                        {/* Timeline connector */}
                        <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-1.5"></div>
                        
                        <Link href={`/${post.slug.current}`}>
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                            {/* Post details */}
                            <div className="lg:col-span-8 xl:col-span-9">
                              <div className="mb-2 flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <time dateTime={post.publishedAt}>
                                  {post.publishedAt && format(parseISO(post.publishedAt), 'd MMM')}
                                </time>
                                {post.estimatedReadingTime && (
                                  <span className="ml-2 sm:ml-3">· {post.estimatedReadingTime} min read</span>
                                )}
                              </div>
                              
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1 sm:mb-2">
                                {post.title}
                              </h3>
                              
                              {post.excerpt && (
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 line-clamp-2">
                                  {post.excerpt}
                                </p>
                              )}
                              
                              {post.categories?.length > 0 && (
                                <CategoryList categories={post.categories} />
                              )}
                            </div>
                            
                            {/* Post image */}
                            {post.mainImage && (
                              <div className="hidden sm:block lg:col-span-4 xl:col-span-3">
                                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                                  <Image
                                    src={urlFor(post.mainImage).width(400).height(300).url()}
                                    alt={post.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {Object.keys(groupedPosts).length === 0 && (
          <div className="text-center py-12 border border-gray-200 dark:border-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
