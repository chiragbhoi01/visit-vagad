// src/lib/storage.server.ts
'use server'; // This directive must be at the very top of the file for Server Actions

import { serverEnv } from './env';
import { serverStorage } from './appwrite';
import { ID, InputFile } from 'node-appwrite';

/**
 * A set of allowed prefixes for media uploads, corresponding to different modules.
 */
export const MEDIA_PREFIXES = [
  'destinations', 
  'events', 
  'food', 
  'artisans', 
  'hotels', 
  'global'
] as const;

export type MediaPrefix = typeof MEDIA_PREFIXES[number];

/**
 * Uploads a file to the Appwrite media bucket with a logical prefix.
 * This function is a Server Action.
 * @param file The file to upload, as a File object.
 * @param prefix A prefix to categorize the file (e.g., 'destinations').
 * @returns The new Appwrite file ID.
 */
export async function uploadMedia(
  file: File, 
  prefix: MediaPrefix
): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  // Create a unique file ID to avoid name collisions and keep a stable reference.
  const fileId = ID.unique();
  
  try {
    const inputFile = InputFile.fromBlob(file, file.name);

    await serverStorage.createFile(
      serverEnv.APPWRITE_BUCKET_ID_MEDIA,
      fileId,
      inputFile
    );
    
    // The file object in Appwrite will have a name like `destinations_image.jpg`,
    // but the important part is the unique fileId which we store in our database.
    // For logical separation inside the Appwrite console, we can tag the file.
    // Appwrite doesn't have folder prefixes, so tagging is a good alternative.
    // Or, we can choose to manage this entirely based on our database records.
    // For now, we will rely on the database relationship.

    return fileId;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload media.');
  }
}

/**
 * Deletes a file from the Appwrite media bucket.
 * This function is a Server Action.
 * @param fileId The ID of the file to delete.
 */
export async function deleteMedia(fileId: string): Promise<void> {
  if (!fileId) return;

  try {
    await serverStorage.deleteFile(serverEnv.APPWRITE_BUCKET_ID_MEDIA, fileId);
  } catch (error) {
    console.error(`Error deleting file ${fileId}:`, error);
    // Don't throw an error if the file is already deleted or doesn't exist.
    // Log it and continue.
  }
}
