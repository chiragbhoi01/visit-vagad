
'use server';

import { z } from 'zod';
import { destinationSchema } from '@/lib/schemas';
import { serverDatabases, serverStorage } from '@/lib/appwrite';
import { env } from '@/lib/env';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getDestinationById } from '@/lib/queries';

export async function createDestination(values: z.infer<typeof destinationSchema>) {
  try {
    const validatedData = destinationSchema.parse(values);
    
    await serverDatabases.createDocument(
      env.APPWRITE_DATABASE_ID,
      env.APPWRITE_COLLECTION_DESTINATIONS_ID,
      ID.unique(),
      validatedData
    );

  } catch (error) {
    console.error('Error creating destination:', error);
    // In a real app, you'd want to return a more user-friendly error
    throw new Error('Failed to create destination');
  }

  revalidatePath('/admin/destinations');
  redirect('/admin/destinations');
}

export async function updateDestination(id: string, values: z.infer<typeof destinationSchema>) {
  try {
    const validatedData = destinationSchema.parse(values);
    
    await serverDatabases.updateDocument(
      env.APPWRITE_DATABASE_ID,
      env.APPWRITE_COLLECTION_DESTINATIONS_ID,
      id,
      validatedData
    );

  } catch (error) {
    console.error('Error updating destination:', error);
    // In a real app, you'd want to return a more user-friendly error
    throw new Error('Failed to update destination');
  }

  revalidatePath('/admin/destinations');
  redirect('/admin/destinations');
}

export async function deleteDestination(id: string) {
  try {
    // First, get the destination to check for an associated image
    const destination = await getDestinationById(id);
    if (destination && destination.coverImageId) {
      await serverStorage.deleteFile(env.APPWRITE_BUCKET_ID_DESTINATIONS, destination.coverImageId);
    }
    
    await serverDatabases.deleteDocument(
      env.APPWRITE_DATABASE_ID,
      env.APPWRITE_COLLECTION_DESTINATIONS_ID,
      id
    );

  } catch (error) {
    console.error('Error deleting destination:', error);
    throw new Error('Failed to delete destination');
  }

  revalidatePath('/admin/destinations');
}
