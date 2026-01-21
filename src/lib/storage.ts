// src/lib/storage.ts

import { clientEnv, serverEnv } from './env'; // Import both for endpoint and bucket ID

/**
 * Generates a public URL to view a file from Appwrite Storage.
 * @param fileId The ID of the file in Appwrite Storage.
 * @returns The full URL to view the file.
 */
export function getAppwriteFileViewUrl(fileId: string): URL {
  return new URL(
    `${clientEnv.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${serverEnv.APPWRITE_BUCKET_ID_MEDIA}/files/${fileId}/view`
  );
}

/**
 * Generates a public URL for a transformed image preview.
 * @param fileId The ID of the file in Appwrite Storage.
 * @param width Optional width for the transformation.
 * @param height Optional height for the transformation.
 * @returns The full URL for the image preview.
 */
export function getAppwriteFilePreviewUrl(
  fileId: string, 
  width?: number, 
  height?: number
): URL {
  const params = new URLSearchParams();
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());

  const queryString = params.toString();
  const baseUrl = `${clientEnv.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${serverEnv.APPWRITE_BUCKET_ID_MEDIA}/files/${fileId}/preview`;

  return new URL(queryString ? `${baseUrl}?${queryString}` : baseUrl);
}
