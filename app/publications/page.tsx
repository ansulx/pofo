import { fetchSanityData } from '@/lib/sanity-fetch'
import Publications from '@/components/publications'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ansul\'s Publications',
  description: 'Academic publications and research work',
}

// Use only one caching strategy
export const dynamic = 'force-dynamic'

async function getPublications() {
  const publications = await fetchSanityData(`
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
  `)
  
  return publications || []
}

export default async function PublicationsPage() {
  const publications = await getPublications()
  
  return (
    <div className="min-h-screen">
      <Publications publications={publications} />
    </div>
  )
} 