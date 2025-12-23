// file: src/components/ui/JsonLdSchema.tsx
import Script from 'next/script';
import { portfolioData, culturalData } from '@/constants/data';

interface JsonLdSchemaProps {
  type: 'Person' | 'Article';
  data: any; // The specific data for the schema
}

const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ type, data }) => {
  return (
    <Script
      id={`json-ld-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const PersonSchema = ({ githubUrl, linkedinUrl }: { githubUrl?: string; linkedinUrl?: string }) => {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": portfolioData.name,
    "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    "sameAs": [] as string[],
    "jobTitle": portfolioData.roles[0].title, // Assuming the first role is the primary
    "worksFor": {
      "@type": "Organization",
      "name": portfolioData.roles[0].company,
    },
  };

  if (githubUrl) {
    personData.sameAs.push(githubUrl);
  }
  if (linkedinUrl) {
    personData.sameAs.push(linkedinUrl);
  }

  return <JsonLdSchema type="Person" data={personData} />;
};

export const ArticleSchema = ({ headline, datePublished, authorName, imageUrl, url }: { headline: string; datePublished: string; authorName: string; imageUrl?: string; url: string }) => {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "image": imageUrl || (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg` : 'http://localhost:3000/og-image.jpg'),
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": authorName,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Echoes of Vagad", // This could be dynamic or static
      "logo": {
        "@type": "ImageObject",
        "url": process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png` : 'http://localhost:3000/logo.png', // Assuming a logo exists
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
  };
  return <JsonLdSchema type="Article" data={articleData} />;
};

export default JsonLdSchema;