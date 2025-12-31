// To resolve the Node.js ESM warning, add "type": "module" to your package.json
import 'dotenv/config';
import { Client, Databases, ID } from 'node-appwrite';

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
const seedCollection = async (collectionId: string, data: any[]) => {
    console.log(`\n--- Seeding '${collectionId}' Collection ---`);
    try {
        const { documents } = await databases.listDocuments(DATABASE_ID, collectionId);
        for (const doc of documents) {
            await databases.deleteDocument(DATABASE_ID, collectionId, doc.$id);
        }
        console.log(`✓ Cleared existing documents in '${collectionId}'.`);

        for (const item of data) {
            await databases.createDocument(DATABASE_ID, collectionId, ID.unique(), item);
            console.log(`✓ Created new document for: ${item.name || item.title}`);
        }
    } catch (error: any) {
        console.error(`✗ Error seeding '${collectionId}':`, error.message);
    }
    console.log(`--- Seeding for '${collectionId}' Complete ---`);
};

// --- Data Generation ---
const seedDestinations = () => [
    {
        name: "Mahi Bajaj Sagar Dam",
        description: "Escape to the serene expanse of the Mahi Bajaj Sagar Dam, an engineering marvel and a tranquil oasis in the heart of Rajasthan's Vagad region. Located in Banswara district, this colossal dam is the second largest in the state, creating a breathtaking canvas of scattered islands and an immense reservoir that stretches to the horizon. Named after the freedom fighter Shri Jamnalal Bajaj, the dam is a testament to human ingenuity, playing a crucial role in providing water and generating hydroelectric power for the region. For travelers, it offers a peaceful retreat from the hustle and bustle of city life. The panoramic views from the top of the dam are simply spectacular, especially during the monsoon season when the gates are opened and the Mahi River flows in its full glory. The vast body of water creates a unique microclimate, and the surrounding landscape is a haven for nature lovers. The numerous islands, some of which are accessible by boat, add to the charm of the place. A boat ride on the reservoir is a must-do activity, offering a different perspective of the dam and the surrounding hills. It's a perfect spot for a day trip, a family picnic, or for photographers looking to capture stunning landscapes. The sunset over the reservoir is a particularly magical experience, painting the sky with hues of orange and pink. The dam is not just a source of water and power; it's a symbol of progress and a source of pride for the people of Rajasthan. It represents the harmonious blend of nature and technology, and its tranquil beauty leaves a lasting impression on every visitor. A visit to the Mahi Bajaj Sagar Dam is a journey into the heart of modern Rajasthan, where development and nature coexist in a beautiful symbiosis.",
        location: "Banswara, Rajasthan",
        latitude: 23.63,
        longitude: 74.55,
        createdAt: new Date().toISOString()
    },
    {
        name: "Mangarh Dham",
        description: "Mangarh Dham, a site of profound historical and spiritual significance, stands as a solemn memorial to a forgotten chapter of India's freedom struggle. Located on a hillock in the Anandpuri block of Banswara district, on the border of Rajasthan and Gujarat, this sacred place is revered as the 'Jallianwala Bagh of the Vagad region.' It was here on November 17, 1913, that hundreds of Bhil tribals, led by the social reformer Govind Guru, were martyred by the British forces. Govind Guru had initiated a powerful socio-religious movement, the 'Bhagat Movement,' to unite the tribal community and fight against social evils, forced labor, and the oppressive policies of the British and the princely states. The tribals had gathered on Mangarh hill for a peaceful congregation when they were surrounded and fired upon. Today, Mangarh Dham is a National Monument, a testament to the valor and sacrifice of the Bhil community. A memorial has been built on the hill, and a grand fair is held every year on Margshirsha Purnima to pay homage to the martyrs. The site attracts thousands of devotees and tourists, not just from Rajasthan and Gujarat, but from all over the country. The atmosphere at Mangarh is one of reverence and patriotism. The panoramic view from the top of the hill is also breathtaking, offering a glimpse of the rugged beauty of the Aravalli range. A visit to Mangarh Dham is a journey back in time, a chance to connect with the heroic tales of the tribal freedom fighters. It is a place that inspires a sense of pride and reminds us of the invaluable contribution of the tribal communities to India's freedom. For anyone interested in history, culture, or the untold stories of the freedom struggle, Mangarh Dham is an essential pilgrimage.",
        location: "Anandpuri, Banswara",
        latitude: 23.39,
        longitude: 74.07,
        createdAt: new Date().toISOString()
    },
    {
        name: "Beneshwar Dham",
        description: "Discover the spiritual heart of Rajasthan's tribal belt at Beneshwar Dham, a sacred pilgrimage site revered as the 'Kumbh of the tribals.' Located at the holy confluence of the Som, Mahi, and Jakham rivers in the Dungarpur district, this dham holds profound cultural and religious significance for the Bhil community and other indigenous tribes. The annual Beneshwar Fair, held in January or February (on Magh Shukla Purnima), transforms this serene landscape into a vibrant spectacle of faith and tradition. Thousands of tribals from Rajasthan, Gujarat, and Madhya Pradesh gather here to offer prayers at the Shiva temple, which houses a unique five-foot-high Shiva Linga that is believed to be self-created. The fair is a time for performing ancestral rites, and a dip in the holy confluence is considered as sacred as a dip in the Ganges. The ashes of the departed are immersed in the waters for 'moksha' (salvation). But Beneshwar Dham is more than just a religious site; it's a living museum of tribal culture. The air resonates with the sounds of folk songs, traditional dances like the Ghoomar and Raas, and the bustling energy of a vibrant market where tribals trade their agricultural produce, handicrafts, and silverware. The fair is also a time for a unique tribal tradition where young men and women choose their life partners. For travelers seeking an authentic cultural immersion, Beneshwar Dham offers an unparalleled opportunity to witness ancient rituals, explore unique local crafts, and understand the deep-rooted heritage of Rajasthan's tribal communities. A visit to Beneshwar Dham is a journey into the soul of indigenous India, making it an essential destination for cultural enthusiasts, spiritual seekers, and anyone looking for a truly unique and unforgettable experience.",
        location: "Dungarpur, Rajasthan",
        latitude: 23.8,
        longitude: 73.8,
        createdAt: new Date().toISOString()
    }
];

const seedArtisans = () => [
    { name: "Ramesh Bhil", craft_type: "Bamboo Craft", village: "Talwara", is_verified: true, whatsapp_number: "911234567890" },
    { name: "Sita Kumari", craft_type: "Pottery", village: "Ghatol", is_verified: true, whatsapp_number: "911234567891" },
];

const seedStays = () => [
    { title: "Vagad Farm Retreat", createdAt: new Date().toISOString() },
    { title: "Mahi Riverside Homestay", createdAt: new Date().toISOString() },
];

// --- Main Execution ---
const run = async () => {
    if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
        console.error('Missing environment variables. Please create a .env file and set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY.');
        return;
    }

    console.log("Starting database seeding process...");
    
    await seedCollection('destinations', seedDestinations());
    await seedCollection('artisans', seedArtisans());
    // await seedCollection('stays', seedStays()); // Disabled until schema is confirmed.

    console.log("\n✅ Database seeding process completed for destinations and artisans.");
};

run();
