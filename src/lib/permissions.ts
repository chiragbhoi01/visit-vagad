// src/lib/permissions.ts
// This file contains functions and constants related to Appwrite permissions.

import { Permission, Role } from 'node-appwrite';

/**
 * Permissions for documents that allow public read access but restrict
 * create, update, and delete operations to a specific 'admin' team.
 * This is suitable for content collections like Destinations, Events, Food, Hotels.
 */
export const ADMIN_CRUD_PUBLIC_READ = [
  Permission.read(Role.any()), // Anyone can read
  Permission.create(Role.team('admin')), // Only 'admin' team can create
  Permission.update(Role.team('admin')), // Only 'admin' team can update
  Permission.delete(Role.team('admin')), // Only 'admin' team can delete
];

/**
 * Permissions for documents that allow only public read access.
 * No create, update, or delete access is granted.
 */
export const PUBLIC_READ_ONLY = [
  Permission.read(Role.any()), // Anyone can read
];

/**
 * Permissions for documents that allow authenticated users to read,
 * but restrict create, update, and delete operations to a specific 'admin' team.
 */
export const AUTHENTICATED_READ_ADMIN_CRUD = [
  Permission.read(Role.users()), // Authenticated users can read
  Permission.create(Role.team('admin')),
  Permission.update(Role.team('admin')),
  Permission.delete(Role.team('admin')),
];

/**
 * Generates an array of permissions for a new document based on its intended access level.
 * @param accessType The desired access type ('adminCrudPublicRead', 'publicReadOnly', 'authenticatedReadAdminCrud').
 * @returns An array of Appwrite Permission objects.
 */
export function getDocumentPermissions(accessType: 'adminCrudPublicRead' | 'publicReadOnly' | 'authenticatedReadAdminCrud'): string[] {
  switch (accessType) {
    case 'adminCrudPublicRead':
      return ADMIN_CRUD_PUBLIC_READ;
    case 'publicReadOnly':
      return PUBLIC_READ_ONLY;
    case 'authenticatedReadAdminCrud':
      return AUTHENTICATED_READ_ADMIN_CRUD;
    default:
      console.warn(`Unknown access type: ${accessType}. Defaulting to PUBLIC_READ_ONLY.`);
      return PUBLIC_READ_ONLY;
  }
}