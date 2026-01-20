// src/lib/storage.ts
// Utility functions for handling Appwrite Storage images.

import { serverStorage } from './appwrite';

/**
 * Generates an Appwrite Storage image URL.
 * @param bucketId The ID of the storage bucket.
 * @param fileId The ID of the file.
 * @param width Optional. Desired width of the image.
 * @param height Optional. Desired height of the image.
 * @param quality Optional. Image quality (0-100).
 * @returns The URL string for the Appwrite Storage image.
 */
export function getAppwriteImageSrc(
  bucketId: string,
  fileId: string,
  width?: number,
  height?: number,
  quality?: number
): string {
  // Appwrite's getFilePreview method parameters
  const params = {
    width,
    height,
    quality,
    // Add more parameters like gravity, crop, etc., if needed
  };

  // Filter out undefined parameters
  const validParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  // Appwrite SDK's getFilePreview returns a URL
  // This is a simplified approach, typically you'd generate the URL manually
  // or use the SDK's getFileView/getFileDownload directly if not using file preview features.
  // For previews, we construct the URL.
  // Example: http://[HOSTNAME]/v1/storage/buckets/[BUCKET_ID]/files/[FILE_ID]/preview?width=100&height=100&quality=100
  // Note: For server-side rendering, using serverStorage.getFilePreview() might be better,
  // but it returns a Blob, which is not directly usable as an img src in HTML.
  // So, constructing the URL directly for <img> src is common.

  const baseUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/preview`;
  const queryString = Object.entries(validParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Gets a file view URL from Appwrite Storage.
 * Useful for direct file access without transformation.
 * @param bucketId The ID of the storage bucket.
 * @param fileId The ID of the file.
 * @returns The URL string for the Appwrite Storage file view.
 */
export function getAppwriteFileViewSrc(bucketId: string, fileId: string): string {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view`;
}
