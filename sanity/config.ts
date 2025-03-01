import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2023-05-03'

// Create a client with projectId, dataset and useCdn
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // These next two fields enable authenticated requests on the server
  // Important for proper Sanity Studio integration
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
  perspective: 'published'
})

// Client that also fetches draft content
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to set this in your .env file
  perspective: 'previewDrafts',
})

// Set up the image URL builder
const builder = imageUrlBuilder(client)

// Define the image URL function with proper typing
export function urlFor(source: any) {
  return builder.image(source)
}

// Test function to verify connection
export async function testSanityConnection() {
  try {
    const result = await client.fetch(`*[_type == "sanity.imageAsset"][0]`)
    console.log('Sanity connection successful:', result ? 'Data received' : 'No data')
    return true
  } catch (error) {
    console.error('Sanity connection failed:', error)
    return false
  }
}

export const config = {
  projectId: 'v4ipor4n',
  dataset: 'production',
  apiVersion: '2024-03-17',
}

// Add this after your client declarations
// This allows immediate updates across CORS boundaries
export const corsOrigins = [
  'http://localhost:3000',
  'http://localhost:3333',
  'https://your-vercel-app.vercel.app', // Add your Vercel URL
  'https://ansul.site' // If you have a custom domain
]

// Configure CORS for your Sanity project via the management API
// You can run this function once from a script
export async function configureSanityCors() {
  const projectUrl = `https://${projectId}.api.sanity.io/v${apiVersion.split('-')[0]}/data/mutate/${dataset}`
  
  try {
    const response = await fetch(projectUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: 'settings',
              set: {
                cors: {
                  allowOrigins: corsOrigins
                }
              }
            }
          }
        ]
      })
    })
    
    const result = await response.json()
    console.log('CORS settings updated:', result)
  } catch (error) {
    console.error('Failed to update CORS settings:', error)
  }
} 