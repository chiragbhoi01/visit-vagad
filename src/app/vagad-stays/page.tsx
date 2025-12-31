import { databases } from '@/lib/appwrite';
import { Homestay } from '@/types';
import { Metadata } from 'next';
import VagadStayCard from '@/components/VagadStayCard';
import VagadStayCardSkeleton from '@/components/VagadStayCardSkeleton';
import SubsidyCalculator from '@/components/SubsidyCalculator';

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: 'Vagad Stays - Authentic Rural Homestays in Rajasthan',
  description: 'Book certified rural homestays in the Vagad region. Experience local culture and enjoy the benefits of RIPS 2024 certified properties.',
};

// --- Data Fetching ---
async function getStays(): Promise<Homestay[]> {
    const DATABASE_ID = '69540a3a001eb8d06e9f';
    const COLLECTION_ID = 'stays'; // As defined in the seed script

    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        // Placeholder for Gemini AI Content Integration
        const staysWithAiContent = response.documents.map(doc => {
            const homestay: Homestay = {
                $id: doc.$id,
                $createdAt: doc.$createdAt,
                $updatedAt: doc.$updatedAt,
                $permissions: doc.$permissions,
                $collectionId: doc.$collectionId,
                $databaseId: doc.$databaseId,
                $sequence: doc.$sequence,
                name: (doc.property_name as string) || 'Unnamed Homestay',
                description: (doc.description as string) || 'No description provided.',
                pricePerNight: (doc.price as number) || 0,
                imageUrl: (doc.imageUrl as string) || '/images/placeholder.jpg',
                proximityToLandmark: (doc.landmark as string) || 'Unknown',
                isRips2024Certified: (doc.rips_certified as boolean) || false,
                location: (doc.location as { latitude: number; longitude: number }) || { latitude: 0, longitude: 0 },
            };

            const dynamicProps = {
                paryatanMitraRating: Math.floor(Math.random() * 3) + 3,
                uniqueExperienceStory: `An organic farming experience near the beautiful ${homestay.proximityToLandmark || 'Mahi backwaters'}.`,
                investmentAmount: Math.floor(Math.random() * 1000000) + 500000,
            };

            return { ...homestay, ...dynamicProps };
        });
        return staysWithAiContent as Homestay[];
    } catch (error) {
        console.error('Failed to fetch stays from Appwrite:', error);
        throw new Error('Could not fetch stays.');
    }
}

// --- Page Component ---
export default async function VagadStaysPage() {
    try {
        const stays = await getStays();

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-deepTeal-900">Vagad Stays</h1>
                    <p className="text-lg text-terracotta-700 mt-2">
                        Your home in the heart of the Tribal Circuit.
                    </p>
                </div>

                <SubsidyCalculator />

                {stays.length === 0 ? (
                    <p className="text-center text-gray-500">No homestays found. Please check back later.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stays.map((stay) => (
                            <VagadStayCard key={stay.$id} stay={stay} />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-deepTeal-900">Vagad Stays</h1>
                    <p className="text-lg text-terracotta-700 mt-2">
                        Your home in the heart of the Tribal Circuit.
                    </p>
                </div>
                
                <SubsidyCalculator />
                
                <h2 className="text-2xl font-bold text-red-600 mt-12">Failed to Load Homestays</h2>
                <p className="text-gray-600 mt-2">There was an error fetching the homestays. Please try again later.</p>
            </div>
        );
    }
}

// --- Loading State ---
export function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
            
            {/* You can add a skeleton for the calculator here if you want */}
            <div className="w-full max-w-lg mx-auto my-12 h-64 bg-gray-200 rounded-lg animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <VagadStayCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
