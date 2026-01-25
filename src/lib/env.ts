import { z } from 'zod';

const envSchema = z.object({
  // Appwrite
  APPWRITE_ENDPOINT: z.string().url(),
  APPWRITE_PROJECT_ID: z.string().min(1),
  APPWRITE_API_KEY: z.string().min(1),
  APPWRITE_DATABASE_ID: z.string().min(1),

  // Collections
  APPWRITE_COLLECTION_DESTINATIONS_ID: z.string().min(1),
  APPWRITE_COLLECTION_EVENTS_ID: z.string().min(1),
  APPWRITE_COLLECTION_FOOD_ID: z.string().min(1),
  APPWRITE_COLLECTION_HOTELS_ID: z.string().min(1),
  APPWRITE_COLLECTION_SETTINGS_ID: z.string().min(1),
  APPWRITE_COLLECTION_ARTISANS_ID: z.string().min(1),
  APPWRITE_COLLECTION_HERO_ID: z.string().min(1),
  APPWRITE_COLLECTION_PAGES_ID: z.string().min(1),

  // Buckets
  APPWRITE_BUCKET_ID_MEDIA: z.string().min(1),

  // Auth
  APPWRITE_ADMIN_TEAM_ID: z.string().min(1),

  // Public variables
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(
      parsedEnv.error.flatten().fieldErrors,
      null,
      2
    )}`
  );
}

export const serverEnv = parsedEnv.data;

// Separate client-side schema to ensure only public variables are exposed
const clientSchema = envSchema.pick({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: true,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: true,
});

export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: serverEnv.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: serverEnv.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
});

