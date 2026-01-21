'use server';

import { z } from 'zod';
import { destinationSchema } from '@/lib/schemas';
import { serverDatabases } from '@/lib/appwrite';
import { serverEnv } from '@/lib/env';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getDestinationById } from '@/lib/queries';
import { uploadMedia, deleteMedia } from '@/lib/storage.server';

// Helper to extract data from FormData and validate
function validateFormData(formData: FormData) {
  const rawFormData = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    isFeatured: formData.get('isFeatured') === 'true',
    isNationalMonumnet: formData.get('isNationalMonumnet') === 'true',
    // coverImageId will be handled separately if a new image is uploaded
  };

  return destinationSchema.parse(rawFormData);
}

export async function createDestination(formData: FormData) {
  let newFileId: string | null = null;
  try {
    const validatedData = validateFormData(formData);
    const imageFile = formData.get('coverImage') as File;
    
    if (imageFile && imageFile.size > 0) {
      newFileId = await uploadMedia(imageFile, 'destinations');
      validatedData.coverImageId = newFileId;
    }

    await serverDatabases.createDocument(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID,
      ID.unique(),
      validatedData
    );

  } catch (error) {
    console.error('Error creating destination:', error);
    // If upload succeeded but db failed, try to clean up the orphaned file
    if (newFileId) {
      await deleteMedia(newFileId);
    }
    throw new Error('Failed to create destination. Please check the form data.');
  }

  revalidatePath('/admin/destinations');
  redirect('/admin/destinations');
}

export async function updateDestination(id: string, formData: FormData) {
  let newFileId: string | null = null;
  try {
    const validatedData = validateFormData(formData);
    const imageFile = formData.get('coverImage') as File;
    
    const existingDestination = await getDestinationById(id);
    if (!existingDestination) {
      throw new Error('Destination not found.');
    }
    
    // Handle image update
    if (imageFile && imageFile.size > 0) {
      // Upload new image first
      newFileId = await uploadMedia(imageFile, 'destinations');
      validatedData.coverImageId = newFileId;
      
      // If upload is successful and there was an old image, delete it
      if (existingDestination.coverImageId) {
        await deleteMedia(existingDestination.coverImageId);
      }
    } else {
      // If no new image, keep the old one
      validatedData.coverImageId = existingDestination.coverImageId;
    }

    await serverDatabases.updateDocument(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID,
      id,
      validatedData
    );

  } catch (error) {
    console.error('Error updating destination:', error);
    // If a new file was uploaded but the db update failed, try to clean it up
    if (newFileId) {
      await deleteMedia(newFileId);
    }
    throw new Error('Failed to update destination.');
  }

  revalidatePath('/admin/destinations');
  redirect('/admin/destinations');
}

export async function deleteDestination(id: string) {
  try {
    const destination = await getDestinationById(id);
    
    // Delete the document first
    await serverDatabases.deleteDocument(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID,
      id
    );

    // If document deletion is successful, delete the associated image
    if (destination && destination.coverImageId) {
      await deleteMedia(destination.coverImageId);
    }

  } catch (error) {
    console.error('Error deleting destination:', error);
    throw new Error('Failed to delete destination');
  }

  revalidatePath('/admin/destinations');
}