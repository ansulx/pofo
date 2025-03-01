import { fetchSanityData } from '@/lib/sanity-fetch';
import AboutPage from '@/components/about-page';
import { Metadata } from 'next';
import { urlFor } from '@/sanity/config';

export const metadata: Metadata = {
  title: 'About Me | Portfolio',
  description: 'Learn more about my background, skills and experience',
};

// Set it to revalidate more frequently
export const revalidate = 60; // Revalidate every minute

// Use dynamic rendering to ensure fresh content
export const dynamic = 'force-dynamic';

async function getAboutData() {
  try {
    const aboutData = await fetchSanityData(`
      *[_type == "about"][0] {
        name,
        title,
        profileImage,
        location,
        company,
        bio,
        linkedin,
        twitter,
        github,
        skills,
        experiences,
        resumeUrl
      }
    `);
    
    // Transform the image URL if needed
    if (aboutData?.profileImage && !aboutData.profileImage.asset.url) {
      aboutData.profileImage.asset.url = urlFor(aboutData.profileImage).url();
    }
    
    console.log('Fetched about data:', aboutData ? 'Success' : 'Not found');
    return aboutData;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

export default async function About() {
  const aboutData = await getAboutData();
  
  return (
    <div className="min-h-screen">
      <AboutPage data={aboutData} />
    </div>
  );
} 