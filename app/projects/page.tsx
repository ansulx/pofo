import { Metadata } from 'next'
import ProjectsList from '@/components/projects-list'
import { fetchSanityData } from '@/lib/sanity-fetch'

export const metadata: Metadata = {
  title: 'Research Projects',
  description: 'Explore my research projects and academic contributions',
}

// Moderate revalidation time
export const revalidate = 300 // 5 minutes

// For consistent data handling
export const dynamic = 'force-dynamic'

// Use a consistent cache key
const PROJECTS_CACHE_KEY = 'projects-list'

async function getProjects() {
  try {
    const projects = await fetchSanityData(`
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
    `, {}, PROJECTS_CACHE_KEY)
    
    console.log('Server fetched projects:', projects?.length ? `${projects.length} projects` : 'None found')
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div className="min-h-screen">
      <ProjectsList initialProjects={projects} />
    </div>
  )
} 