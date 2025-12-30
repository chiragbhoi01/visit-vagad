import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedModule from '@/components/FeaturedModule';
import Footer from '@/components/Footer';
import BhilBazaarProductCard from '@/components/BhilBazaarProductCard';
import VagadStayCard from '@/components/VagadStayCard';
import { databases } from '@/lib/appwrite';
import { ArtisanProduct, Homestay } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: 'VisitVagad - Discover the Tribal Circuit of Rajasthan',
  description: 'Explore the untouched beauty of Banswara and Dungarpur. Your official guide to the Vagad region, featuring authentic tribal crafts, rural homestays, and serene natural landscapes.',
};

// --- Data Fetching ---
async function getFeaturedProducts(): Promise<ArtisanProduct[]> {
    try {
        // Fetch top 3 products, perhaps sorted by creation date or a 'featured' flag
        const response = await databases.listDocuments('69540a3a001eb8d06e9f', 'artisans', [
            // Assuming Appwrite's API supports limit
            // Query.limit(3) 
        ]);
        return response.documents.slice(0, 3).map(doc => ({
            $id: doc.$id,
            name: (doc.name as string) || 'Unnamed Product',
            description: (doc.description as string) || 'No description provided.',
            price: (doc.price as number) || 0,
            imageUrl: (doc.imageUrl as string) || '/images/placeholder.jpg',
            artisan: {
              name: (doc.artisan?.name as string) || 'Unknown Artisan',
              isGovtVerified: (doc.artisan?.isGovtVerified as boolean) || false,
            },
            category: (doc.category as 'Bamboo' | 'Stone' | 'Pottery') || 'Bamboo',
            $createdAt: (doc.$createdAt as string) || '',
            $updatedAt: (doc.$updatedAt as string) || '',
            $permissions: (doc.$permissions as string[]) || [],
            $collectionId: (doc.$collectionId as string) || '',
            $databaseId: (doc.$databaseId as string) || '',
            $sequence: (doc.$sequence as number) || 0,
        })) as ArtisanProduct[];
    } catch (error) {
        console.error("Failed to fetch featured products:", error);
        return [];
    }
}

async function getFeaturedStays(): Promise<Homestay[]> {
    try {
        // Fetch top 3 RIPS-certified stays
        const response = await databases.listDocuments('69540a3a001eb8d06e9f', 'stays', [
            // Query.equal('rips_certified', true),
            // Query.limit(3)
        ]);
        return response.documents.filter(d => (d as any).rips_certified).slice(0, 3).map(doc => ({
            $id: doc.$id,
            name: (doc.name as string) || 'Unnamed Homestay',
            description: (doc.description as string) || 'No description provided.',
            pricePerNight: (doc.price as number) || 0, // Using 'price' from Appwrite, mapping to 'pricePerNight'
            imageUrl: (doc.imageUrl as string) || '/images/placeholder.jpg',
            proximityToLandmark: (doc.landmark as string) || 'Unknown', // Mapping 'landmark' from Appwrite
            isRips2024Certified: (doc.rips_certified as boolean) || false, // Mapping 'rips_certified' from Appwrite
            location: (doc.location as { latitude: number; longitude: number }) || { latitude: 0, longitude: 0 },
            $createdAt: (doc.$createdAt as string) || '',
            $updatedAt: (doc.$updatedAt as string) || '',
            $permissions: (doc.$permissions as string[]) || [],
            $collectionId: (doc.$collectionId as string) || '',
            $databaseId: (doc.$databaseId as string) || '',
            $sequence: (doc.$sequence as number) || 0,
        })) as Homestay[];
    } catch (error) {
        console.error("Failed to fetch featured stays:", error);
        return [];
    }
}

// --- Home Page Component ---
export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const featuredStays = await getFeaturedStays();

  return (
    <>
      <HeroSection />

      <main>
        {/* Bhil Bazaar Preview */}
        <FeaturedModule 
          title="From the Heart of the Tribe"
          subtitle="Discover authentic crafts from government-verified artisans in our Bhil Bazaar."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredProducts.length > 0 ? (
                featuredProducts.map(product => <BhilBazaarProductCard key={product.$id} product={product} />)
            ) : (
                <p className="col-span-3 text-center">Featured products coming soon.</p>
            )}
          </div>
        </FeaturedModule>

        {/* Vagad Stays Preview */}
        <FeaturedModule 
          title="Stay with the Locals"
          subtitle="Experience true hospitality in RIPS 2024 certified homestays and support the local economy."
          bgColor="bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredStays.length > 0 ? (
                featuredStays.map(stay => <VagadStayCard key={stay.$id} stay={stay} />)
            ) : (
                <p className="col-span-3 text-center">Featured homestays coming soon.</p>
            )}
          </div>
           <p className="text-center mt-8 text-sm text-gray-500">
                Local investors benefit from a <strong>23% Capital Subsidy</strong> under the RIPS 2024 scheme.
            </p>
        </FeaturedModule>

        {/* National Monument Focus */}
        <FeaturedModule
            title="A Tribute to Valor"
            subtitle="Mangarh Dham, a National Monument, stands as a testament to the heroic spirit of the tribal community."
        >
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image src="/images/mangarh-dham.jpg" alt="Mangarh Dham" layout="fill" objectFit="cover" />
                </div>
                <div className="text-left">
                    <h3 className="text-2xl font-bold text-[#004D40] mb-4">Mangarh Dham: A Sacred Hilltop</h3>
                    <p className="text-gray-600">
                        Holding immense historical and spiritual significance, Mangarh Dham is a memorial to the tribal freedom fighters.
                        It offers panoramic views and a serene atmosphere for reflection and learning.
                    </p>
                </div>
            </div>
        </FeaturedModule>
      </main>

      <Footer />
    </>
  );
}