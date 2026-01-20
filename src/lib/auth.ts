// src/lib/auth.ts
// Server-side authentication and authorization utilities using Appwrite.

// src/lib/auth.ts
// Server-side authentication and authorization utilities using Appwrite.

import { serverAccount, serverUsers } from './appwrite';
import { Permission, Role } from 'node-appwrite';
import { env } from './env'; // Use the centralized env access
import { NextRequest } from 'next/server';
import { Client as ServerClient, Account as ServerAccount, Users as ServerUsers } from 'node-appwrite';

/**
 * Checks if the current session is authenticated and belongs to the admin team.
 * This function is intended for server-side use only.
 * @returns {Promise<boolean>} True if authenticated as admin, false otherwise.
 */
export async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const session = request.cookies.get('a_session_' + env.NEXT_PUBLIC_APPWRITE_PROJECT_ID.toLowerCase())?.value;

    if (!session) {
      return false;
    }
    
    const serverClient = new ServerClient()
      .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(env.APPWRITE_API_KEY);
      
    const serverAccount = new ServerAccount(serverClient);
    const account = await serverAccount.get();


    if (!account || !account.$id) {
      return false; // No authenticated user
    }

    // Now, check if the user belongs to the admin team
    const serverUsers = new ServerUsers(serverClient);
    const userMemberships = await serverUsers.listMemberships(account.$id);
    const isAdmin = userMemberships.memberships.some(membership => membership.teamId === env.APPWRITE_ADMIN_TEAM_ID);
    
    return isAdmin;

  } catch (error) {
    // It's common for this to throw if the session is invalid.
    return false;
  }
}

/**
 * Gets a set of permissions for admin users (read, create, update, delete for team 'admin')
 * and public read for others.
 * Used when creating/updating documents.
 */
export function getAdminDocumentPermissions(): string[] {
  return [
    Permission.read(Role.any()), // Public read access
    Permission.create(Role.team(env.APPWRITE_ADMIN_TEAM_ID)), // Only admin team can create
    Permission.update(Role.team(env.APPWRITE_ADMIN_TEAM_ID)), // Only admin team can update
    Permission.delete(Role.team(env.APPWRITE_ADMIN_TEAM_ID)), // Only admin team can delete
  ];
}

/**
 * Gets a set of permissions for authenticated admin users, specific for collections.
 * Use for `Permissions` property of a collection.
 */
export function getCollectionAdminPermissions(): string[] {
  return [
    Permission.read(Role.any()), // Anyone can read documents
    Permission.create(Role.team(env.APPWRITE_ADMIN_TEAM_ID)), // Only admin team can create documents
    Permission.update(Role.team(env.APPWRITE_ADMIN_TEAM_ID)), // Only admin team can update documents
    Permission.delete(Role.team(env.APPWRITE_ADMIN_TEAM_ID)), // Only admin team can delete documents
  ];
}
