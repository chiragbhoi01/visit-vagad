// src/lib/queries.ts
// This file will contain all server-side data fetching functions using Appwrite SDK.
// These functions are designed to be used in Server Components, Server Actions, or API Routes.

import { Query } from 'node-appwrite';
import { serverEnv } from '@/lib/env';
import { serverDatabases } from './appwrite';
import {
  Destination,
  DestinationSchema,
  DestinationListSchema,
  Event,
  EventListSchema,
  EventSchema,
  Food,
  FoodListSchema,
  Hotel,
  HotelListSchema,
  GlobalSettings,
  GlobalSettingsSchema,
  ArtisanProduct,
  ArtisanProductListSchema,
  Hero,
  HeroSchema,
  Page,
  PageSchema,
  PageListSchema,
} from './schemas';

// These should ideally come from environment variables.
const DATABASE_ID = serverEnv.APPWRITE_DATABASE_ID;
const COLLECTION_DESTINATIONS_ID = serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID;
const COLLECTION_EVENTS_ID = serverEnv.APPWRITE_COLLECTION_EVENTS_ID;
const COLLECTION_FOOD_ID = serverEnv.APPWRITE_COLLECTION_FOOD_ID;
const COLLECTION_HOTELS_ID = serverEnv.APPWRITE_COLLECTION_HOTELS_ID;
const COLLECTION_SETTINGS_ID = serverEnv.APPWRITE_COLLECTION_SETTINGS_ID;
const COLLECTION_ARTISANS_ID = serverEnv.APPWRITE_COLLECTION_ARTISANS_ID;

/**
 * Helper function to safely parse data with a Zod schema.
 * @param schema The Zod schema to use for parsing.
 * @param data The data to parse.
 * @param context A string describing the context for error logging.
 * @returns The parsed data or null if validation fails.
 */
function safeParse<T>(schema: Zod.Schema<T>, data: unknown, context: string): T | null {
  const result = schema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  console.error(`[Zod Validation Error] in ${context}:`, result.error.flatten());
  return null;
}

/**
 * Fetches the total number of documents in a collection.
 * @param collectionId The ID of the collection.
 * @returns A promise that resolves to the total count of documents.
 */
export async function getCollectionTotal(collectionId: string): Promise<number> {
    try {
        const response = await serverDatabases.listDocuments(DATABASE_ID, collectionId, [Query.limit(1)]);
        return response.total;
    } catch (error) {
        console.error(`Error fetching total for collection ${collectionId}:`, error);
        return 0;
    }
}


/**
 * Fetches global settings for the website.
 * @returns A promise that resolves to a GlobalSettings object or null if not found.
 */
export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTION_SETTINGS_ID,
      [Query.limit(1)]
    );
    if (response.documents.length > 0) {
      return safeParse(GlobalSettingsSchema, response.documents[0], 'getGlobalSettings');
    }
    return null;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}

/**
 * Fetches destinations from the Appwrite database with pagination.
 * @param queries Optional array of Appwrite Query objects for filtering.
 * @param limit The maximum number of documents to return.
 * @param offset The offset from which to start fetching documents.
 * @returns A promise that resolves to an array of Destination objects.
 */
export async function getDestinations({ queries = [], limit = 10, offset = 0 }: { queries?: any[], limit?: number, offset?: number } = {}): Promise<Destination[]> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTION_DESTINATIONS_ID,
      [...queries.map(q => q.toString()), Query.limit(limit), Query.offset(offset)]
    );
    const parsed = safeParse(DestinationListSchema, response.documents, 'getDestinations');
    return parsed || [];
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

/**
 * Fetches a single destination by its slug.
 * @param slug The slug of the destination to fetch.
 * @returns A promise that resolves to a Destination object or null if not found.
 */
export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTION_DESTINATIONS_ID,
      [Query.equal('slug', slug), Query.limit(1)]
    );
    if (response.documents.length > 0) {
      return safeParse(DestinationSchema, response.documents[0], `getDestinationBySlug (slug: ${slug})`);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching destination with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches a single destination by its Appwrite document ID.
 * @param id The document ID of the destination to fetch.
 * @returns A promise that resolves to a Destination object or null if not found.
 */
export async function getDestinationById(id: string): Promise<Destination | null> {
  try {
    const response = await serverDatabases.getDocument(
      DATABASE_ID,
      COLLECTION_DESTINATIONS_ID,
      id
    );
    return safeParse(DestinationSchema, response, `getDestinationById (id: ${id})`);
  } catch (error) {
    console.error(`Error fetching destination with ID "${id}":`, error);
    return null;
  }
}

/**
 * Fetches events from the Appwrite database with pagination.
 * @param queries Optional array of Appwrite Query objects for filtering.
 * @param limit The maximum number of documents to return.
 * @param offset The offset from which to start fetching documents.
 * @returns A promise that resolves to an array of Event objects.
 */
export async function getEvents({ queries = [], limit = 10, offset = 0 }: { queries?: any[], limit?: number, offset?: number } = {}): Promise<Event[]> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTION_EVENTS_ID,
      [...queries.map(q => q.toString()), Query.limit(limit), Query.offset(offset), Query.orderDesc('date')]
    );
    const parsed = safeParse(EventListSchema, response.documents, 'getEvents');
    return parsed || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

/**
 * Fetches food items from the Appwrite database with pagination.
 * @param queries Optional array of Appwrite Query objects for filtering.
 * @param limit The maximum number of documents to return.
 * @param offset The offset from which to start fetching documents.
 * @returns A promise that resolves to an array of Food objects.
 */
export async function getFoodItems({ queries = [], limit = 10, offset = 0 }: { queries?: any[], limit?: number, offset?: number } = {}): Promise<Food[]> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTION_FOOD_ID,
      [...queries.map(q => q.toString()), Query.limit(limit), Query.offset(offset)]
    );
    const parsed = safeParse(FoodListSchema, response.documents, 'getFoodItems');
    return parsed || [];
  } catch (error) {
    console.error('Error fetching food items:', error);
    return [];
  }
}

/**
 * Fetches hotels from the Appwrite database with pagination.
 * @param queries Optional array of Appwrite Query objects for filtering.
 * @param limit The maximum number of documents to return.
 * @param offset The offset from which to start fetching documents.
 * @returns A promise that resolves to an array of Hotel objects.
 */
export async function getHotels({ queries = [], limit = 10, offset = 0 }: { queries?: any[], limit?: number, offset?: number } = {}): Promise<Hotel[]> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTION_HOTELS_ID,
      [...queries.map(q => q.toString()), Query.limit(limit), Query.offset(offset)]
    );
    const parsed = safeParse(HotelListSchema, response.documents, 'getHotels');
    return parsed || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
}

/**
 * Fetches artisan products from the Appwrite database with pagination.
 * @param queries Optional array of Appwrite Query objects for filtering.
 * @param limit The maximum number of documents to return.
 * @param offset The offset from which to start fetching documents.
 * @returns A promise that resolves to an array of ArtisanProduct objects.
 */
export async function getArtisanProducts({ queries = [], limit = 10, offset = 0 }: { queries?: any[], limit?: number, offset?: number } = {}): Promise<ArtisanProduct[]> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTION_ARTISANS_ID,
      [...queries.map(q => q.toString()), Query.limit(limit), Query.offset(offset)]
    );
    const parsed = safeParse(ArtisanProductListSchema, response.documents, 'getArtisanProducts');
    return parsed || [];
  } catch (error) {
    console.error('Error fetching artisan products:', error);
    return [];
  }
}

/**
 * Fetches the hero data from the 'hero' collection.
 * @returns A promise that resolves to a Hero object or null if not found.
 */
export async function getHeroData(): Promise<Hero | null> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_HERO_ID,
      [Query.limit(1)]
    );
    if (response.documents.length > 0) {
      return safeParse(HeroSchema, response.documents[0], 'getHeroData');
    }
    return null;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

/**
 * Fetches content for a specific page from the 'pages' collection.
 * @param pageSlug The slug of the page to fetch.
 * @returns A promise that resolves to a Page object or null if not found.
 */
export async function getPageContent(pageSlug: string): Promise<Page | null> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_PAGES_ID,
      [Query.equal('slug', pageSlug), Query.limit(1)]
    );
    if (response.documents.length > 0) {
        return safeParse(PageSchema, response.documents[0], `getPageContent (slug: ${pageSlug})`);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching page content for "${pageSlug}":`, error);
    return null;
  }
}

/**
 * Fetches all page content documents and maps them by slug.
 * @returns A promise that resolves to a dictionary of page content.
 */
export async function getPagesContent(): Promise<{ [slug: string]: Page }> {
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_PAGES_ID
    );
    const pages = safeParse(PageListSchema, response.documents, 'getPagesContent');
    if (!pages) {
        return {};
    }
    const pagesContent: { [slug: string]: Page } = {};
    for (const doc of pages) {
      if(doc.slug) {
        pagesContent[doc.slug] = doc;
      }
    }
    return pagesContent;
  } catch (error) {
    console.error('Error fetching pages content:', error);
    return {};
  }
}

