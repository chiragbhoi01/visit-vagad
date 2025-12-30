import { databases } from '@/lib/appwrite';
import { Destination } from '@/types';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';

type Props = {
  params: { id: string };
};

// This function fetches data from Appwrite.
// In a real app, you would replace this with your actual Appwrite database and collection IDs.
async function getDestination(id: string): Promise<Destination | null> {
  try {
    // Replace with your actual database and collection IDs
    const DATABASE_ID = '69540a3a001eb8d06e9f';
    const COLLECTION_ID = 'destinations';
    
    const destination = await databases.getDocument<Destination>(
      DATABASE_ID,
      COLLECTION_ID,
      id
    );
    return destination;
  } catch (error) {
    console.error('Failed to fetch destination from Appwrite:', error);
    return null; // Handle not found or other errors
  }
}

// This function generates the metadata for the page.
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const destination = await getDestination(id);

  if (!destination) {
    return {
      title: 'Destination Not Found - Visit Vagad',
      description: 'The requested destination in the Tribal Circuit of Rajasthan could not be found.',
    };
  }

  // Constructing a high-performance SEO title and description
  const title = `${destination.name} - A Gem in the Tribal Circuit Rajasthan | Visit Vagad`;
  const description = `Discover ${destination.name}, a premier tourist spot in the 'City of Hundred Islands'. Explore the rich culture of the Tribal Circuit of Rajasthan with Visit Vagad. ${destination.seoDescription}`;

  // Fetching previous keywords and adding new ones
  const previousImages = (await parent).openGraph?.images || [];
  const previousKeywords = (await parent).keywords || [];
  const keywords = [
    'Tribal Circuit Rajasthan',
    'City of Hundred Islands',
    destination.name,
    'Vagad Tourism',
    'Rajasthan Tourism',
    'Banswara',
    'Dungarpur',
    ...previousKeywords,
  ];
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: destination.images[0], // Use the first image for Open Graph
          width: 800,
          height: 600,
          alt: `Image of ${destination.name}`,
        },
        ...previousImages,
      ],
    },
  };
}

// This is the page component.
export default async function DestinationPage({ params }: Props) {
  const destination = await getDestination(params.id);

  if (!destination) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Destination not found</h1>
        <p>The destination you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-deepTeal-900 mb-4">{destination.name}</h1>
      <div className="relative w-full h-96 mb-8">
        <Image
          src={destination.images[0]}
          alt={destination.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <p className="text-lg text-terracotta-700">{destination.description}</p>
    </div>
  );
}
