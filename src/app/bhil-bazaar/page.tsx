import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: 'Bhil Bazaar - Authentic Tribal Crafts of Vagad',
  description: 'Discover and purchase authentic tribal crafts directly from the artisans of Vagad. Empowering the local community by eliminating middlemen.',
};

// --- Data Types ---
interface Artisan {
    $id: string;
    name: string;
    craft_type: string;
    village: string;
    is_verified: boolean;
    whatsapp_number?: string;
}

// --- Data Fetching ---
async function getArtisans(): Promise<Artisan[]> {
    const DATABASE_ID = '69540a3a001eb8d06e9f';
    const COLLECTION_ID = 'artisans';

    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('$createdAt')
        ]);
        return response.documents as unknown as Artisan[];
    } catch (error) {
        console.error('Failed to fetch artisans from Appwrite:', error);
        return [];
    }
}

// --- Page Component (Next.js Server Component) ---
export default async function BhilBazaarPage() {
    const artisans = await getArtisans();

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-deepTeal-900">भील बाज़ार (Bhil Bazaar)</h1>
                    <p className="text-lg text-terracotta-700 mt-2">
                        Empowering Tribal Artisans by Connecting Them Directly with You.
                    </p>
                </div>

                {artisans.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {artisans.map((artisan) => (
                            <Card key={artisan.$id} className="bg-card text-foreground border-border flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="text-deepTeal-900">{artisan.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-between">
                                    <div className="mb-4">
                                        <p className="text-muted-foreground font-medium">{artisan.craft_type}</p>
                                        <p className="text-sm text-muted-foreground">{artisan.village}</p>
                                        {artisan.is_verified && (
                                            <Badge variant="secondary" className="mt-2 border-terracotta-700/50">
                                                Govt. Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <a 
                                      href={`https://wa.me/${artisan.whatsapp_number || ''}`}
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="mt-auto"
                                    >
                                        <Button className="w-full bg-terracotta-700 hover:bg-terracotta-700/90 text-white font-bold">
                                            WhatsApp Contact
                                        </Button>
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-deepTeal-900">Coming Soon</h2>
                        <p className="text-muted-foreground mt-2">
                            Our artisans are preparing to showcase their authentic crafts. Please check back soon!
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

// --- Loading State with Skeleton Loaders ---
export function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <Skeleton className="h-10 w-1/3 mx-auto mb-2" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <Card key={i} className="bg-card text-foreground border-border flex flex-col overflow-hidden">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                            <div className="mb-4 space-y-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-5 w-1/4" />
                            </div>
                            <Skeleton className="h-10 w-full mt-auto" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
