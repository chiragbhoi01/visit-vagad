'use server';

import { z } from 'zod';
import { DestinationFormSchema } from '@/lib/schemas';
import { serverDatabases } from '@/lib/appwrite';
import { serverEnv } from '@/lib/env';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getDestinationById } from '@/lib/queries';
import { uploadMedia, deleteMedia } from '@/lib/storage.server';
import { getAdminDocumentPermissions } from '@/lib/auth';

// Helper to extract data from FormData and validate using Zod
function validateFormData(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    district: formData.get('district'),
    category: formData.get('category'),
    shortDescription: formData.get('shortDescription'),
    description: formData.get('description'),
    bestTime: formData.get('bestTime'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    isFeatured: formData.get('isFeatured') === 'true',
    isNationalMonumnet: formData.get('isNationalMonumnet') === 'true',
  };

  return DestinationFormSchema.parse(rawFormData);
}

export async function createDestination(prevState: any, formData: FormData) {
  let newFileId: string | null = null;
  try {
    const validatedData = validateFormData(formData);
    const imageFile = formData.get('coverImage') as File;
    
    let coverImageId: string | undefined = undefined;
    if (imageFile && imageFile.size > 0) {
      newFileId = await uploadMedia(imageFile, 'destinations');
      coverImageId = newFileId;
    }

    const dataToSave = {
        ...validatedData,
        galleryImageIds: [], // Initialize as empty array
        ...(coverImageId && { coverImageId }),
    };

    await serverDatabases.createDocument(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID,
      ID.unique(),
      dataToSave,
      getAdminDocumentPermissions() // Apply permissions
    );

  } catch (error) {
    console.error('Error creating destination:', error);
    if (newFileId) {
      await deleteMedia(newFileId);
    }
    if (error instanceof z.ZodError) {
        return { message: 'Validation failed', errors: error.flatten().fieldErrors };
    }
    return { message: 'Failed to create destination.', errors: null };
  }

  revalidatePath('/admin/destinations');
  revalidatePath('/');
  redirect('/admin/destinations');
}

export async function updateDestination(id: string, prevState: any, formData: FormData) {
  let newFileId: string | null = null;
  try {
    const validatedData = validateFormData(formData);
    const imageFile = formData.get('coverImage') as File;
    
    const existingDestination = await getDestinationById(id);
    if (!existingDestination) {
      throw new Error('Destination not found.');
    }
    
    let coverImageId = existingDestination.coverImageId;
    if (imageFile && imageFile.size > 0) {
      newFileId = await uploadMedia(imageFile, 'destinations');
      coverImageId = newFileId;
      if (existingDestination.coverImageId) {
        await deleteMedia(existingDestination.coverImageId);
      }
    }

    const dataToSave = {
        ...validatedData,
        coverImageId,
    };

    await serverDatabases.updateDocument(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID,
      id,
      dataToSave,
      getAdminDocumentPermissions() // Re-apply permissions on update
    );

  } catch (error) {
    console.error('Error updating destination:', error);
    if (newFileId) {
      await deleteMedia(newFileId);
    }
    if (error instanceof z.ZodError) {
        return { message: 'Validation failed', errors: error.flatten().fieldErrors };
    }
    return { message: 'Failed to update destination.', errors: null };
  }

  revalidatePath('/admin/destinations');
  revalidatePath(`/admin/destinations/${id}/edit`);
  revalidatePath('/');
  redirect('/admin/destinations');
}

export async function deleteDestination(id: string) {
  try {
    const destination = await getDestinationById(id);
    
    await serverDatabases.deleteDocument(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_COLLECTION_DESTINATIONS_ID,
      id
    );

    if (destination && destination.coverImageId) {
      await deleteMedia(destination.coverImageId);
    }

  } catch (error) {
    console.error('Error deleting destination:', error);
    throw new Error('Failed to delete destination');
  }

  revalidatePath('/admin/destinations');
  revalidatePath('/');
}