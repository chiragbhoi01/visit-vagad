// To resolve the Node.js ESM warning, add "type": "module" to your package.json
import 'dotenv/config';
import { Client, Databases, ID, Permission, Role } from 'node-appwrite';

// --- Configuration ---
const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT as string;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID as string;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY as string;
const DATABASE_ID = '69540a3a001eb8d06e9f';

// --- Initialize Appwrite Client ---
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

const databases = new Databases(client);

// --- Seeding Function ---
const seedCollection = async (collectionId: string, data: any[], idKey: string) => {
    console.log(`\n--- Seeding '${collectionId}' Collection ---`);
    for (const item of data) {
        try {
            const uniqueId = item[idKey].toLowerCase().replace(/\s+/g, '-').slice(0, 36);
            await databases.createDocument(DATABASE_ID, collectionId, uniqueId, item);
            console.log(`✓ Created: ${item[idKey]}`);
        } catch (error: any) {
            if (error.code === 409) { // 409: Document already exists
                console.log(`- Skipping (already exists): ${item[idKey]}`);
            } else {
                console.error(`✗ Error creating '${item[idKey]}':`, error.message);
            }
        }
    }
    console.log(`--- Seeding for '${collectionId}' Complete ---`);
};

// --- Data Generation ---
const getDestinations = () => [
    { name: "Mahi Bajaj Sagar Dam", description: "A breathtaking canvas of scattered islands...", location: "Banswara, Rajasthan", seo_keywords: ["Mahi Dam", "Banswara"], latitude: 23.63, longitude: 74.55 },
    { name: "Mangarh Dham", description: "A National Monument revered as a solemn memorial...", location: "Anandpuri, Banswara", seo_keywords: ["Mangarh Dham", "Tribal History"], latitude: 23.39, longitude: 74.07 },
];

const getArtisans = () => [
    { name: "Ramesh Bhil", craft_type: "Bamboo Craft", village: "Talwara", is_verified: true },
    { name: "Sita Kumari", craft_type: "Pottery", village: "Ghatol", is_verified: true },
];

const getStays = () => [
    { property_name: "Vagad Farm Retreat", price: 3200, rips_certified: true, landmark: "10km from Gagron Fort", investment_value: 1500000 },
    { property_name: "Mahi Riverside Homestay", price: 2500, rips_certified: true, landmark: "5km from Mahi Dam", investment_value: 1200000 },
];

// --- Main Execution ---
const run = async () => {
    if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
        console.error('Missing environment variables. Please create a .env file and set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY.');
        return;
    }

    console.log("Starting database seeding process...");
    
    await seedCollection('destinations', getDestinations(), 'name');
    await seedCollection('artisans', getArtisans(), 'name');
    await seedCollection('stays', getStays(), 'property_name');

    console.log("\n✅ Database seeding process completed successfully.");
};

run();