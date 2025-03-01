import { client } from '@/sanity/config'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const results = await client.fetch(`
    {
      "blogs": *[_type == "post" && (title match $query || excerpt match $query)],
      "publications": *[_type == "publication" && (title match $query || abstract match $query)],
      "projects": *[_type == "project" && (title match $query || description match $query)]
    }
  `, { query: `*${query}*` })

  return NextResponse.json({ results })
} 