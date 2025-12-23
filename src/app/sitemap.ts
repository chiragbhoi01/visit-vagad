
import { MetadataRoute } from 'next';
// Assume FESTIVALS will be populated from the 'Echoes of Vagad' doc
// and exported from the constants file.
// import { FESTIVALS } from '@/constants/data';

// Placeholder data until constants are populated
const FESTIVALS = [
  { slug: 'baneshwar-fair', lastModified: new Date() },
  { slug: 'mangarh-dham', lastModified: new Date() },
  { slug: 'ghotia-amba', lastModified: new Date() },
];

const productionUrl = 'https://chiragbhoi.dev'; // As specified

export default function sitemap(): MetadataRoute.Sitemap {
  const festivalRoutes = FESTIVALS.map(festival => ({
    url: `${productionUrl}/culture/${festival.slug}`,
    lastModified: festival.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    {
      url: productionUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${productionUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${productionUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${productionUrl}/culture`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  return [...staticRoutes, ...festivalRoutes];
}
