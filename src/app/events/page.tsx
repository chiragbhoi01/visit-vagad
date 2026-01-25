// src/app/events/page.tsx
import { Query } from 'node-appwrite';
import { getEvents } from '@/lib/queries';
import { Metadata } from 'next';
import EventsList from './EventsList';

export const metadata: Metadata = {
  title: 'Vagad Events - Festivals, Fairs & Local Happenings',
  description: 'Discover upcoming events, traditional festivals, local fairs, and cultural happenings in the Vagad region of Rajasthan.',
};

const PAGE_SIZE = 10;

export default async function EventsPage() {
  const initialEvents = await getEvents({
    queries: [
        Query.orderAsc('date'), // Order by date, ascending
        Query.greaterThanEqual('date', new Date().toISOString()), // Only future events
    ],
    limit: PAGE_SIZE,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events in Vagad</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
        Experience the vibrant life of Vagad through its diverse calendar of festivals, fairs, and local gatherings.
      </p>

      {initialEvents.length > 0 ? (
        <EventsList initialEvents={initialEvents} />
      ) : (
        <p className="text-center text-gray-600 text-xl">No upcoming events found at the moment. Check back soon!</p>
      )}
    </div>
  );
}