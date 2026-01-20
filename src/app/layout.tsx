import './globals.css';
import { Outfit } from 'next/font/google';
import { getGlobalSettings } from '@/lib/queries';
import { getAppwriteImageSrc } from '@/lib/storage';
import { Navbar } from '@/components/layout/Navbar'; // Assuming Navbar is a named export
import Footer from '@/components/layout/Footer'; // Assuming Footer is default export

const outfit = Outfit({ subsets: ['latin'] });

// Dynamic metadata generation
export async function generateMetadata() {
  const globalSettings = await getGlobalSettings();

  const title = globalSettings?.siteTitle || 'VisitVagad - Discover the Tribal Circuit of Rajasthan';
  const description = globalSettings?.siteDescription || 'Explore Banswara and Dungarpur - The City of Hundred Islands and The City of Hills. Experience the rich culture and natural beauty of Vagad.';
  const ogImageUrl = globalSettings?.ogImageId
    ? getAppwriteImageSrc(process.env.APPWRITE_BUCKET_ID_GLOBAL_IMAGES!, globalSettings.ogImageId, 1200, 630) // Assuming a global images bucket
    : '/vercel.svg'; // Fallback to a static image (will be removed once Appwrite storage is fully implemented)

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [ogImageUrl],
      url: 'https://visitvagad.com', // Replace with actual site URL
      siteName: title,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
