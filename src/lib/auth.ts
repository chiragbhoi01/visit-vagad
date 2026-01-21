// src/lib/auth.ts
// Server-side authentication and authorization utilities using Appwrite.

import { Permission, Role, Users as ServerUsers } from 'node-appwrite';
import { serverEnv, clientEnv } from './env'; // Use the new separated env variables
import { NextRequest } from 'next/server';
import { serverAccount, serverUsers } from './appwrite'; // Import both serverAccount and serverUsers

/**
 * Checks if the current session is authenticated and belongs to the admin team.
 * This function is intended for server-side use only.
 * It safely verifies a user's session from a request cookie.
 * @returns {Promise<boolean>} True if authenticated as admin, false otherwise.
 */
export async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    // 1. Get the session cookie. The project ID is public and used to name the cookie.
    const sessionCookie = request.cookies.get('a_session_' + clientEnv.NEXT_PUBLIC_APPWRITE_PROJECT_ID.toLowerCase());
    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }

    // 2. Verify the session using the serverAccount (configured with API Key)
    // This explicitly tells Appwrite to get account details for the given session.
    const session = await serverAccount.getSession(sessionCookie.value);

    // 3. Get the user account based on the userId from the session.
    const account = await serverUsers.get(session.userId);

    if (!account || !account.$id) {
      return false;
    }

    // 4. Use the global, privileged server client to check for admin team membership.
    // This is required because checking team memberships requires admin-level permissions.
    const userMemberships = await serverUsers.listMemberships(account.$id);
    const isAdmin = userMemberships.memberships.some(membership => membership.teamId === serverEnv.APPWRITE_ADMIN_TEAM_ID);
    
    return isAdmin;

  } catch (error) {
    // It's common for get() or getSession() to throw if the session is invalid or expired.
    // Log for debugging, but return false for security.
    console.debug('Admin authentication check failed:', error);
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
    Permission.create(Role.team(serverEnv.APPWRITE_ADMIN_TEAM_ID)),
    Permission.update(Role.team(serverEnv.APPWRITE_ADMIN_TEAM_ID)),
    Permission.delete(Role.team(serverEnv.APPWRITE_ADMIN_TEAM_ID)),
  ];
}

/**
 * Gets a set of permissions for authenticated admin users, specific for collections.
 * Use for `Permissions` property of a collection.
 */
export function getCollectionAdminPermissions(): string[] {
  return [
    Permission.read(Role.any()), // Anyone can read documents
    Permission.create(Role.team(serverEnv.APPWRITE_ADMIN_TEAM_ID)),
    Permission.update(Role.team(serverEnv.APPWRITE_ADMIN_TEAM_ID)),
    Permission.delete(Role.team(serverEnv.APPWRITE_ADMIN_TEAM_ID)),
  ];
}
