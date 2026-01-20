import { Client, Account, Databases, Storage } from 'appwrite';
import { Client as ServerClient, Account as ServerAccount, Databases as ServerDatabases, Storage as ServerStorage, Users as ServerUsers } from 'node-appwrite';

// Client-side Appwrite SDK (publicly exposed, no secrets)
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const account = new Account(client); // Used for client-side user authentication
const databases = new Databases(client); // Public read access
const storage = new Storage(client); // Public file access

// Server-side Appwrite SDK (uses API Key for privileged operations)
const serverClient = new ServerClient()
    .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
    .setProject(process.env.APPWRITE_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_API_KEY as string); // API Key for server-side operations

const serverAccount = new ServerAccount(serverClient); // Server-side account management (e.g., creating users)
const serverDatabases = new ServerDatabases(serverClient); // Admin database access
const serverStorage = new ServerStorage(serverClient); // Admin storage access
const serverUsers = new ServerUsers(serverClient); // Admin users access

export { 
  client, 
  account, 
  databases, 
  storage, 
  serverClient, 
  serverAccount, 
  serverDatabases, 
  serverStorage,
  serverUsers // Exporting serverUsers
};
