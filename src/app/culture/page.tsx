// src/app/culture/page.tsx
import { Query } from 'node-appwrite';
import { getDestinations } from '@/lib/queries';
import { Destination } from '@/lib/types';
import DestinationCard from '@/components/cards/DestinationCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vagad Culture - Discover Rich Heritage & Traditions',
  description: 'Explore the vibrant cultural heritage, traditions, and historical sites of the Vagad region, including Banswara and Dungarpur.',
};

export default async function CulturePage() {
  const culturalDestinations: Destination[] = await getDestinations([
    Query.equal('category', 'Heritage'),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Cultural Experiences in Vagad</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
        Immerse yourself in the rich history, vibrant traditions, and unique cultural tapestry of the Vagad region.
        From ancient sites to living heritage, explore the soul of our land.
      </p>

      {culturalDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {culturalDestinations.map((destination) => (
            <DestinationCard key={destination.$id} destination={destination} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">No cultural destinations found at the moment. Please check back later!</p>
      )}
    </div>
  );
}