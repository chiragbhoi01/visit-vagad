import { z } from 'zod';

const serverSchema = z.object({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
  
  APPWRITE_API_KEY: z.string(),
  APPWRITE_DATABASE_ID: z.string(),
  
  APPWRITE_COLLECTION_DESTINATIONS_ID: z.string(),
  APPWRITE_COLLECTION_EVENTS_ID: z.string(),
  APPWRITE_COLLECTION_FOOD_ID: z.string(),
  APPWRITE_COLLECTION_HOTELS_ID: z.string(),
  APPWRITE_COLLECTION_SETTINGS_ID: z.string(),
  APPWRITE_COLLECTION_ARTISANS_ID: z.string(),

  APPWRITE_BUCKET_ID_GLOBAL_IMAGES: z.string(),
  APPWRITE_BUCKET_ID_DESTINATIONS: z.string(),
  APPWRITE_BUCKET_ID_ARTISAN_PRODUCTS: z.string(),
  APPWRITE_BUCKET_ID_HOTELS: z.string(),
  APPWRITE_BUCKET_ID_EVENTS: z.string(),
  APPWRITE_BUCKET_ID_FOOD: z.string(),

  APPWRITE_ADMIN_TEAM_ID: z.string(), // New: Admin Team ID
});

const clientSchema = z.object({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
});

// Validate server-side environment variables
const serverEnv = serverSchema.safeParse(process.env);

if (!serverEnv.success) {
  console.error(
    '❌ Invalid server-side environment variables:',
    serverEnv.error.flatten().fieldErrors
  );
  throw new Error('Invalid server-side environment variables');
}

// Validate client-side environment variables
const clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
});

if (!clientEnv.success) {
  console.error(
    '❌ Invalid client-side environment variables:',
    clientEnv.error.flatten().fieldErrors
  );
  throw new Error('Invalid client-side environment variables');
}

export const env = { ...serverEnv.data, ...clientEnv.data };

