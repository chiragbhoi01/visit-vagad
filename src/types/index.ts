export interface Destination {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
  $sequence: number; // Added missing property
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[]; // Array of image URLs
  category: 'Spiritual' | 'Nature' | 'Adventure';
  seoTitle: string;
  seoDescription: string;
}

export interface ArtisanProduct {
  $id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  artisan: {
    name: string;
    isGovtVerified: boolean;
  };
  category: 'Bamboo' | 'Stone' | 'Pottery';
}

export interface Homestay {
  $id:string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
  $sequence: number;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
  proximityToLandmark: string;
  isRips2024Certified: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
}
