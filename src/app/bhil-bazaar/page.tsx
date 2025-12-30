import { databases } from '@/lib/appwrite';
import { ArtisanProduct } from '@/types';
import { Metadata } from 'next';
import BhilBazaarProductCard from '@/components/BhilBazaarProductCard';
import BhilBazaarCardSkeleton from '@/components/BhilBazaarCardSkeleton';

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: 'Bhil Bazaar - Authentic Tribal Crafts of Vagad',
  description: 'Discover and purchase authentic tribal crafts directly from the artisans of Vagad. Empowering the local community by eliminating middlemen.',
};

// --- Data Fetching ---
async function getProducts(): Promise<ArtisanProduct[]> {
    const DATABASE_ID = '69540a3a001eb8d06e9f';
    const COLLECTION_ID = 'artisans'; // As defined in the seed script

    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        // The Appwrite SDK may not automatically cast to our type, so we do it here.
        return response.documents.map(doc => ({
            $id: doc.$id,
            name: (doc.name as string) || 'Unnamed Product',
            description: (doc.description as string) || 'No description provided.',
            price: (doc.price as number) || 0,
            imageUrl: (doc.imageUrl as string) || '/images/placeholder.jpg', // Provide a default placeholder
            artisan: {
              name: (doc.artisan?.name as string) || 'Unknown Artisan',
              isGovtVerified: (doc.artisan?.isGovtVerified as boolean) || false,
            },
            category: (doc.category as 'Bamboo' | 'Stone' | 'Pottery') || 'Bamboo', // Default category
        })) as ArtisanProduct[];
    } catch (error) {
        console.error('Failed to fetch products from Appwrite:', error);
        throw new Error('Could not fetch products.'); // Re-throw to be caught by the component
    }
}

// --- Page Component ---
export default async function BhilBazaarPage() {
    try {
        const products = await getProducts();

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-deepTeal-900">Bhil Bazaar</h1>
                    <p className="text-lg text-terracotta-700 mt-2">
                        Empowering Tribal Artisans by Connecting them Directly with You.
                    </p>
                </div>

                {products.length === 0 ? (
                    <p className="text-center text-gray-500">No products found at this time. Please check back later.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <BhilBazaarProductCard key={product.$id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Failed to Load Products</h1>
                <p className="text-gray-600 mt-2">There was an error fetching the products. Please try again later.</p>
            </div>
        );
    }
}

// --- Loading State ---
// Next.js will automatically use this component for the loading state.
export function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <BhilBazaarCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
