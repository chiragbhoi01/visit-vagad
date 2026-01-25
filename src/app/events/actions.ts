"use server";

import { Query } from 'node-appwrite';
import { getEvents } from '@/lib/queries';

export async function getMoreEvents(offset: number) {
    const events = await getEvents({
        queries: [
            Query.orderAsc('date'),
            Query.greaterThanEqual('date', new Date().toISOString()),
        ],
        offset: offset,
    });

    return events;
}
