import type { Metadata } from 'next';
import { portfolioData, culturalData } from '@/constants/data';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  type?: 'website' | 'article';
}

export function generateMetadata({
  title,
  description,
  keywords,
  ogImage,
  type = 'website',
}: GenerateMetadataProps): Metadata {
  const defaultTitle = `${portfolioData.name} - MERN Stack Developer & Senior Research Analyst`;
  const defaultDescription = `Professional portfolio of ${portfolioData.name}, a MERN Stack Developer and Senior Research Analyst, alongside "Echoes of Vagad," a cultural blog focusing on Southern Rajasthan.`;
  const defaultKeywords = [
    "MERN Developer Udaipur",
    "Banswara Tourism Guide",
    "Baneshwar Mela History",
    "Chirag Bhoi",
    "Full-Stack Developer",
    "Next.js Developer",
    "Southern Rajasthan Culture",
    "Vagad",
    "Tribal Festivals Rajasthan",
  ];
  const defaultOgImage = '/og-image.jpg'; // A default OG image in the public folder

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: keywords ? [...defaultKeywords, ...keywords] : defaultKeywords,
    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: `${portfolioData.name}'s Portfolio & Echoes of Vagad`,
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: title || defaultTitle,
        },
      ],
      locale: 'en_US',
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [ogImage || defaultOgImage],
    },
  };
}
