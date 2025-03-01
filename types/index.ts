// Create a new file for shared type definitions

// Blog post type
export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  mainImageUrl?: string;
  estimatedReadingTime?: number;
  featured?: boolean;
  categories?: Array<{
    title: string;
    slug: {
      current: string;
    };
    color?: string;
  }>;
  body?: any;
}

// Project type
export interface Project {
  _id: string;
  title: string;
  description?: string;
  tags?: string[];
  image?: {
    asset: {
      _ref?: string;
      url?: string;
    }
  };
  url?: string;
}

// About/Profile type
export interface Profile {
  _id: string;
  name: string;
  title?: string;
  bio?: string[];
  profileImage?: any;
  skills?: string[];
  location?: string;
  company?: string;
}

// Type for web vitals metrics
export interface WebVitalsMetric {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}

export interface Category {
  title: string;
  slug: {
    current: string;
  };
  color?: string;
}

// Add typing for the mutation event in SanityListener
export interface SanityMutationEvent {
  type: string;
  documentId: string;
  transition: 'update' | 'publish' | 'unpublish' | 'delete';
  identity: string;
  mutations: any[];
  result: any;
  previousRev?: string;
  resultRev: string;
  timestamp: string;
}

// Ensure ProjectRefresh API response is typed
export interface ProjectRefreshResponse {
  projects: Project[];
  updatedAt: string;
}

// Properly type the fetchLatestProjects function
export type RefreshProjectsFunction = (forceRefresh?: boolean) => Promise<void>; 