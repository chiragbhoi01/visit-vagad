import { Client, Account, Databases, Storage } from 'appwrite';
import { Client as ServerClient, Account as ServerAccount, Databases as ServerDatabases, Storage as ServerStorage, Users as ServerUsers } from 'node-appwrite';
import { clientEnv, serverEnv } from '@/lib/env';

// Client-side Appwrite SDK (publicly exposed, no secrets)
// Uses validated client-safe environment variables.
const client = new Client()
    .setEndpoint(clientEnv.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(clientEnv.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client); // Used for client-side user authentication
const databases = new Databases(client); // Public read access
const storage = new Storage(client); // Public file access

// Server-side Appwrite SDK (uses API Key for privileged operations)
// Uses validated server-only environment variables.
const serverClient = new ServerClient()
    .setEndpoint(serverEnv.APPWRITE_ENDPOINT)
    .setProject(serverEnv.APPWRITE_PROJECT_ID)
    .setKey(serverEnv.APPWRITE_API_KEY);

const serverAccount = new ServerAccount(serverClient);
const serverDatabases = new ServerDatabases(serverClient);
const serverStorage = new ServerStorage(serverClient);
const serverUsers = new ServerUsers(serverClient);

export { 
  client, 
  account, 
  databases, 
  storage, 
  serverClient, 
  serverAccount, 
  serverDatabases, 
  serverStorage,
  serverUsers
};
