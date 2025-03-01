import { client } from '@/sanity/config'

// Cache for storing previous results with expiration times
const cache = new Map();
const CACHE_DURATION = 60 * 1000; // 1 minute cache

export async function fetchSanityData(query: string, params = {}, cacheKey = '') {
  try {
    // Use the provided cache key or generate one from query and params
    const key = cacheKey || JSON.stringify({ query, params });
    
    // Check if we have a valid cached result
    const now = Date.now();
    const cached = cache.get(key);
    
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      console.log(`Using cached data for "${key.slice(0, 40)}..." (${Math.round((now - cached.timestamp)/1000)}s old)`);
      return cached.data;
    }
    
    // Add a timestamp to bust Sanity CDN cache
    const timestamp = now;
    const queryParams = { ...params, _: timestamp };
    
    // Log more specific information about the query being executed
    console.log(`Fetching data for ${cacheKey || query.slice(0, 40)}`);
    
    // Better sanity client options
    const result = await client.fetch(query, queryParams, {
      cache: 'no-store',
    });
    
    // Update cache with timestamp
    if (result) {
      cache.set(key, {
        data: result,
        timestamp: now
      });
    } else if (cached?.data) {
      // If query returned no results but we have cached data, return it
      console.log(`No data from query, using cached data for "${key.slice(0, 40)}..."`);
      return cached.data;
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    
    // Try to return cached data on error
    const key = cacheKey || JSON.stringify({ query, params });
    const cached = cache.get(key);
    if (cached?.data) {
      console.log(`Error fetching data, using cached data for "${key.slice(0, 40)}..."`);
      return cached.data;
    }
    
    return null;
  }
} 