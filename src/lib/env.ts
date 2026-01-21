import { z } from 'zod';

/**
 * Server-side environment variables schema.
 * Includes secrets and config values needed for the backend.
 * Using distinct server-side variables for endpoint and project ID for clarity and security.
 */
const serverSchema = z.object({
  APPWRITE_ENDPOINT: z.string().url(),
  APPWRITE_PROJECT_ID: z.string(),
  APPWRITE_API_KEY: z.string().min(1, 'APPWRITE_API_KEY is required'),
  APPWRITE_DATABASE_ID: z.string(),
  
  APPWRITE_COLLECTION_DESTINATIONS_ID: z.string(),
  APPWRITE_COLLECTION_EVENTS_ID: z.string(),
  APPWRITE_COLLECTION_FOOD_ID: z.string(),
  APPWRITE_COLLECTION_HOTELS_ID: z.string(),
  APPWRITE_COLLECTION_SETTINGS_ID: z.string(),
  APPWRITE_COLLECTION_ARTISANS_ID: z.string(),

  APPWRITE_BUCKET_ID_MEDIA: z.string(),

  APPWRITE_ADMIN_TEAM_ID: z.string(),
});

/**
 * Client-side environment variables schema.
 * Only includes variables prefixed with NEXT_PUBLIC_ that are safe to expose to the browser.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
});

// Parse and validate server-side environment variables
const _serverEnv = serverSchema.safeParse(process.env);
if (!_serverEnv.success) {
  console.error(
    '❌ Invalid server-side environment variables:',
    _serverEnv.error.flatten().fieldErrors
  );
  throw new Error('Invalid server-side environment variables. Please check your .env file.');
}
export const serverEnv = _serverEnv.data;

// Manually build client-side env object to ensure no server-side variables are exposed
const clientEnvObject = {
  NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
};

// Parse and validate client-side environment variables
const _clientEnv = clientSchema.safeParse(clientEnvObject);
if (!_clientEnv.success) {
  console.error(
    '❌ Invalid client-side environment variables:',
    _clientEnv.error.flatten().fieldErrors
  );
  throw new Error('Invalid client-side environment variables. Please check your .env file.');
}
export const clientEnv = _clientEnv.data;

