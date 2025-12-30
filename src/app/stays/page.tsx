import React from 'react';
import VagadStayCard from '@/components/VagadStayCard';

const dummyStays = [
  {
    $id: '1',
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'stays',
    $databaseId: 'visit_vagad_db',
    $sequence: 0,
    name: 'Mahi Riverside Homestay',
    imageUrl: '/images/stay-mahi-riverside.jpg', // Placeholder image
    pricePerNight: 2500,
    proximityToLandmark: '5km from Mahi Dam', // Renamed to match Homestay interface
    isRips2024Certified: true,
    description: 'A serene homestay by the Mahi river, perfect for nature lovers.',
    location: { latitude: 0, longitude: 0 }, // Added missing property
  },
  {
    $id: '2',
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'stays',
    $databaseId: 'visit_vagad_db',
    $sequence: 0,
    name: 'Bhil Heritage Home',
    imageUrl: '/images/stay-bhil-heritage.jpg', // Placeholder image
    pricePerNight: 1800,
    proximityToLandmark: '2km from local Bhil market', // Renamed
    isRips2024Certified: false,
    description: 'Experience authentic tribal culture in this cozy heritage home.',
    location: { latitude: 0, longitude: 0 }, // Added missing property
  },
  {
    $id: '3',
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'stays',
    $databaseId: 'visit_vagad_db',
    $sequence: 0,
    name: 'Vagad Farm Retreat',
    imageUrl: '/images/stay-vagad-farm.jpg', // Placeholder image
    pricePerNight: 3200,
    proximityToLandmark: '10km from Gagron Fort', // Renamed
    isRips2024Certified: true,
    description: 'Relax in a spacious farm retreat with organic produce and fresh air.',
    location: { latitude: 0, longitude: 0 }, // Added missing property
  },
  {
    $id: '4',
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $permissions: [],
    $collectionId: 'stays',
    $databaseId: 'visit_vagad_db',
    $sequence: 0,
    name: 'Lake View Homestay',
    imageUrl: '/images/stay-lake-view.jpg', // Placeholder image
    pricePerNight: 2000,
    proximityToLandmark: 'Overlooking Anas Sagar Lake', // Renamed
    isRips2024Certified: true,
    description: 'Enjoy breathtaking lake views from this peaceful homestay.',
    location: { latitude: 0, longitude: 0 }, // Added missing property
  },
];

const StaysPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-deepTeal-900 mb-8 text-center">Vagad Stays - Rural Homestays</h1>
      <p className="text-center text-lg text-terracotta-700 mb-12">Discover authentic rural experiences certified under RIPS 2024!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyStays.map((stay) => (
          <VagadStayCard key={stay.$id} stay={stay} />
        ))}
      </div>
    </div>
  );
};

export default StaysPage;
