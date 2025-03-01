import imageUrlBuilder from '@sanity/image-url'
import { client } from './config'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
} 