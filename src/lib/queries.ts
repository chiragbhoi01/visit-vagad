// src/lib/queries.ts
// This file will contain all server-side data fetching functions using Appwrite SDK.
// These functions are designed to be used in Server Components, Server Actions, or API Routes.

import { Query } from 'node-appwrite';

import { serverDatabases } from './appwrite';

import { Destination, Event, Food, Hotel, GlobalSettings, ArtisanProduct } from './types'; // Added ArtisanProduct



// IMPORTANT: Replace with your actual Appwrite Database and Collection IDs

// These should ideally come from environment variables.

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID as string;

const COLLECTION_DESTINATIONS_ID = process.env.APPWRITE_COLLECTION_DESTINATIONS_ID as string;

const COLLECTION_EVENTS_ID = process.env.APPWRITE_COLLECTION_EVENTS_ID as string;

const COLLECTION_FOOD_ID = process.env.APPWRITE_COLLECTION_FOOD_ID as string;

const COLLECTION_HOTELS_ID = process.env.APPWRITE_COLLECTION_HOTELS_ID as string;

const COLLECTION_SETTINGS_ID = process.env.APPWRITE_COLLECTION_SETTINGS_ID as string; // New: Settings Collection ID

const COLLECTION_ARTISANS_ID = process.env.APPWRITE_COLLECTION_ARTISANS_ID as string; // New: Artisans Collection ID



/**

 * Fetches global settings for the website.

 * Assumes there's a single settings document in the settings collection.

 * @returns A promise that resolves to a GlobalSettings object or null if not found.

 */

export async function getGlobalSettings(queries: Query[] = []): Promise<GlobalSettings | null> {

  try {

    const response = await serverDatabases.listDocuments(

      DATABASE_ID,

      COLLECTION_SETTINGS_ID,

      [...queries.map(q => q.toString()), Query.limit(1).toString()].join('&')

    );

    if (response.documents.length > 0) {

      return response.documents[0] as unknown as GlobalSettings;

    }

    return null;

  } catch (error) {

    console.error('Error fetching global settings:', error);

    return null;

  }

}



/**

 * Fetches all destinations from the Appwrite database.

 * @param queries Optional array of Appwrite Query objects for filtering and pagination.

 * @returns A promise that resolves to an array of Destination objects.

 */

export async function getDestinations(queries: Query[] = []): Promise<Destination[]> {

  try {

    const response = await serverDatabases.listDocuments(

      DATABASE_ID,

[...queries.map(q => q.toString()), Query.limit(100).toString()].join('&') // Adjust limit as needed, consider pagination for large datasets

    );

    return response.documents as unknown as Destination[];

  } catch (error) {

    console.error('Error fetching destinations:', error);

    // In a real application, you might want to throw the error or return a more sophisticated error object

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

      [Query.equal('slug', slug).toString(), Query.limit(1).toString()].join('&')

    );

    if (response.documents.length > 0) {

      return response.documents[0] as unknown as Destination;

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



    return response as unknown as Destination;



  } catch (error) {



    console.error(`Error fetching destination with ID "${id}":`, error);



    return null;



  }



}







/**



 * Fetches all events from the Appwrite database.



 * @param queries Optional array of Appwrite Query objects for filtering and pagination.



 * @returns A promise that resolves to an array of Event objects.



 */

export async function getEvents(queries: Query[] = []): Promise<Event[]> {

  try {

    const response = await serverDatabases.listDocuments(

      DATABASE_ID,

      COLLECTION_EVENTS_ID,

      [...queries.map(q => q.toString()), Query.limit(100).toString(), Query.orderDesc('date').toString()].join('&')

    );

    return response.documents as unknown as Event[];

  } catch (error) {

    console.error('Error fetching events:', error);

    return [];

  }

}



/**

 * Fetches all food items from the Appwrite database.

 * @param queries Optional array of Appwrite Query objects for filtering and pagination.

 * @returns A promise that resolves to an array of Food objects.

 */

export async function getFoodItems(queries: Query[] = []): Promise<Food[]> {

  try {

    const response = await serverDatabases.listDocuments(

      DATABASE_ID,

      [...queries.map(q => q.toString()), Query.limit(100).toString()]

    );

    return response.documents as unknown as Food[];

  } catch (error) {

    console.error('Error fetching food items:', error);

    return [];

  }

}



/**

 * Fetches all hotels from the Appwrite database.

 * @param queries Optional array of Appwrite Query objects for filtering and pagination.

 * @returns A promise that resolves to an array of Hotel objects.

 */

export async function getHotels(queries: Query[] = []): Promise<Hotel[]> {

  try {

    const response = await serverDatabases.listDocuments(

      DATABASE_ID,

      [...queries.map(q => q.toString()), Query.limit(100).toString()]

    );

    return response.documents as unknown as Hotel[];

  } catch (error) {

    console.error('Error fetching hotels:', error);

    return [];

  }

}



/**

 * Fetches artisan products from the Appwrite database.

 * @param queries Optional array of Appwrite Query objects for filtering and pagination.

 * @returns A promise that resolves to an array of ArtisanProduct objects.

 */

export async function getArtisanProducts(queries: Query[] = []): Promise<ArtisanProduct[]> {

  try {

    const response = await serverDatabases.listDocuments(

      DATABASE_ID,

      [...queries.map(q => q.toString()), Query.limit(100).toString()]

    );

    return response.documents as unknown as ArtisanProduct[];

  } catch (error) {

    console.error('Error fetching artisan products:', error);

    return [];

  }

}
