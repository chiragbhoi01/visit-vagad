"use client";

import { useState } from 'react';
import { Event } from '@/lib/schemas';
import EventCard from '@/components/cards/EventCard';
import { getMoreEvents } from './actions';
import { Button } from '@/components/ui/button';

const PAGE_SIZE = 10;

export default function EventsList({ initialEvents }: { initialEvents: Event[] }) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [offset, setOffset] = useState(PAGE_SIZE);
    const [hasMore, setHasMore] = useState(initialEvents.length === PAGE_SIZE);

    const loadMore = async () => {
        const moreEvents = await getMoreEvents(offset);
        if (moreEvents.length > 0) {
            setEvents(prev => [...prev, ...moreEvents]);
            setOffset(prev => prev + PAGE_SIZE);
        }
        if (moreEvents.length < PAGE_SIZE) {
            setHasMore(false);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <EventCard key={event.$id} event={event} />
                ))}
            </div>
            {hasMore && (
                <div className="text-center mt-12">
                    <Button onClick={loadMore} size="lg">Load More</Button>
                </div>
            )}
        </div>
    );
}
