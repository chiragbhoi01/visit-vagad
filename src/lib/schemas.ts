// src/lib/schemas.ts
import { z } from 'zod';

// Base schema for all Appwrite documents
const AppwriteDocumentSchema = z.object({
  $id: z.string(),
  $createdAt: z.string(),
  $updatedAt: z.string(),
  $permissions: z.array(z.string()),
  $collectionId: z.string(),
  $databaseId: z.string(),
  $tenant: z.string().optional(),
});

export const DestinationSchema = AppwriteDocumentSchema.extend({
  name: z.string(),
  slug: z.string(),
  district: z.enum(['Banswara', 'Dungarpur']),
  category: z.enum(['Nature', 'Heritage', 'Spiritual', 'Adventure']),
  shortDescription: z.string(),
  description: z.string(),
  bestTime: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  coverImageId: z.string(),
  galleryImageIds: z.array(z.string()),
  isFeatured: z.boolean(),
  isNationalMonumnet: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export const DestinationListSchema = z.array(DestinationSchema);

// Schema for validating destination form data from the client
export const DestinationFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    district: z.enum(['Banswara', 'Dungarpur']),
    category: z.enum(['Nature', 'Heritage', 'Spiritual', 'Adventure']),
    shortDescription: z.string().min(1, 'Short description is required'),
    description: z.string().min(1, 'Description is required'),
    bestTime: z.string().min(1, 'Best time to visit is required'),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    isFeatured: z.boolean().default(false),
    isNationalMonumnet: z.boolean().default(false),
    // coverImageId is handled separately
  });


export const EventSchema = AppwriteDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(), // ISO string
  location: z.string(),
  coverImageId: z.string().optional(),
  galleryImageIds: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export const EventListSchema = z.array(EventSchema);

export const FoodSchema = AppwriteDocumentSchema.extend({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  type: z.string(),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export const FoodListSchema = z.array(FoodSchema);

export const HotelSchema = AppwriteDocumentSchema.extend({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  pricePerNight: z.number(),
  amenities: z.array(z.string()),
  coverImageId: z.string().optional(),
  imageBucketId: z.string().optional(),
  galleryImageIds: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  proximityToLandmark: z.string().optional(),
  isRips2024Certified: z.boolean().optional(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
export const HotelListSchema = z.array(HotelSchema);

export const GlobalSettingsSchema = AppwriteDocumentSchema.extend({
  siteTitle: z.string(),
  siteDescription: z.string(),
  ogImageId: z.string().optional(),
});

export const ArtisanProductSchema = AppwriteDocumentSchema.extend({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    imageId: z.string(),
    imageBucketId: z.string(),
    artisan: z.object({
        name: z.string(),
        isGovtVerified: z.boolean(),
    }),
    category: z.enum(['Bamboo', 'Stone', 'Pottery', 'Other']),
    isFeatured: z.boolean().optional(),
});
export const ArtisanProductListSchema = z.array(ArtisanProductSchema);

// Inferred Schemas from usage
export const HeroSchema = AppwriteDocumentSchema.extend({
    title: z.string(),
    description: z.string(),
    backgroundImageId: z.string(),
});

export const PageSchema = AppwriteDocumentSchema.extend({
    slug: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    imageId: z.string().optional(),
    imageAlt: z.string().optional(),
    contentTitle: z.string().optional(),
    contentDescription: z.string().optional(),
});
export const PageListSchema = z.array(PageSchema);

// Exporting types for convenience
export type Destination = z.infer<typeof DestinationSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Food = z.infer<typeof FoodSchema>;
export type Hotel = z.infer<typeof HotelSchema>;
export type GlobalSettings = z.infer<typeof GlobalSettingsSchema>;
export type ArtisanProduct = z.infer<typeof ArtisanProductSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type Page = z.infer<typeof PageSchema>;
