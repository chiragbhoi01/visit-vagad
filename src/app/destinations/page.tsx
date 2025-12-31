// src/app/destinations/page.tsx
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

const DATABASE_ID = '69540a3a001eb8d06e9f';
const COLLECTION_ID = 'destinations';

async function getDestinations() {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc('createdAt')]
        );
        return response.documents;
    } catch (error) {
        console.error('Failed to fetch destinations:', error);
        return [];
    }
}

export default async function DestinationsPage() {
    const destinations = await getDestinations();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center bg-red-500">Explore Vagad's Destinations</h1>
                {destinations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((destination) => (
                            <Card key={destination.$id}>
                                <CardHeader>
                                    <CardTitle>{destination.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{destination.description}</p>
                                    <p className="text-sm text-gray-500 mt-4">{destination.location}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">No Destinations Found</h2>
                        <p className="text-muted-foreground mt-2">
                            It looks like we're still getting things ready. Please check back later.
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

// Add revalidation to ensure data is fresh
export const revalidate = 60; // Revalidate every 60 seconds
