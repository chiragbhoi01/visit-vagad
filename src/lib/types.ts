// src/lib/types.ts
// Centralized type definitions for Appwrite collections and other entities.

/**
 * Appwrite Document interface, common for all collection documents.
 * Includes system attributes provided by Appwrite.
 */
export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
  $tenant?: string; // Optional, depending on Appwrite setup
}

export interface Destination extends AppwriteDocument {
  name: string;
  slug: string; // unique, indexed
  district: 'Banswara' | 'Dungarpur';
  category: 'Nature' | 'Heritage' | 'Spiritual' | 'Adventure';
  shortDescription: string;
  description: string; // rich text
  bestTime: string;
  latitude: number;
  longitude: number;
  coverImageId: string; // ID from Appwrite Storage
  galleryImageIds: string[]; // Array of IDs from Appwrite Storage
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Event extends AppwriteDocument {
  title: string;
  slug: string;
  description: string;
  date: string; // ISO string
  location: string;
  coverImageId?: string;
  galleryImageIds?: string[];
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Food extends AppwriteDocument {
  name: string;
  slug: string;
  description: string;
  type: string; // e.g., "Cuisine", "Dish"
  imageUrl?: string; // Assuming a single image for now
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Hotel extends AppwriteDocument {
  name: string;
  slug: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  amenities: string[]; // Re-added
  coverImageId?: string; // ID from Appwrite Storage
  imageBucketId?: string; // Bucket ID for the image
  galleryImageIds?: string[];
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  proximityToLandmark?: string;
  isRips2024Certified?: boolean;
  location: { // Re-added and made mandatory
    latitude: number;
    longitude: number;
  };
}


export interface GlobalSettings extends AppwriteDocument {
  siteTitle: string;
  siteDescription: string;
  ogImageId?: string; // Appwrite File ID for Open Graph image
  // Add other global settings as needed
}

export interface Image {
  fileId: string;
  bucketId: string;
  url: string; // Dynamic URL from Appwrite Storage
  alt?: string;
}

export interface ArtisanProduct extends AppwriteDocument {
  name: string;
  description: string;
  price: number;
  imageId: string; // ID from Appwrite Storage
  imageBucketId: string; // Bucket ID for the image
  artisan: {
    name: string;
    isGovtVerified: boolean;
  };
  category: 'Bamboo' | 'Stone' | 'Pottery' | 'Other'; // Added 'Other' for flexibility
  isFeatured?: boolean; // Added for filtering in home page
}
