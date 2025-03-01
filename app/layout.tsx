import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import { RealTimeDataProvider } from '@/context/real-time-data-context';
import RealTimeStatus from '@/components/real-time-status';
import { fetchSanityData } from '@/lib/sanity-fetch';
import type { Metadata } from "next";
import SanityListener from '@/components/sanity-listener';

// Fix incorrect import - proper typing for web vitals
type NextWebVitalsMetric = {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ansul Porwal | Portfolio",
  description: "Ansul is a data scientist and machine learning engineer with expertise in neural architectures and natural language processing.",
};

// Fetch about data at the layout level
async function getAboutData() {
  const about = await fetchSanityData(`
    *[_type == "about"][0] {
      _id,
      name,
      title,
      "profileImage": {
        "asset": {
          "_ref": profileImage.asset._ref,
          "url": profileImage.asset->url
        }
      },
      bio,
      email,
      location,
      phone,
      socialLinks,
      skills,
      "cv": {
        "asset": {
          "_ref": cv.asset._ref,
          "url": cv.asset->url
        }
      },
      cvTitle
    }
  `);
  
  return about;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const about = await getAboutData();
  
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-950 relative dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}>
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <RealTimeDataProvider>
              <Header about={about} />
              <main className="pt-28 sm:pt-36 pb-20">
                {children}
              </main>
              <Footer />
              <Toaster position="top-right" />
              <RealTimeStatus />
              <SanityListener />
            </RealTimeDataProvider>
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Log performance metrics in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // In production, you could send to an analytics endpoint
}
