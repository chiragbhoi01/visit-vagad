'use client';

import { useEffect } from 'react';
import { client } from '@/lib/appwrite';

export function AppwriteProvider() {
    useEffect(() => {
        const pingAppwrite = async () => {
            try {
                await client.ping();
                console.log("Successfully pinged Appwrite server!");
            } catch (error) {
                console.error("Failed to ping Appwrite server:", error);
            }
        };
        pingAppwrite();
    }, []);

    return null;
}
