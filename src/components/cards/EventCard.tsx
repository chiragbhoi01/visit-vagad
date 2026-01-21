// src/components/cards/EventCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '@/lib/types';
import { getAppwriteFilePreviewUrl } from '@/lib/storage';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const imageUrl = event.coverImageId
    ? getAppwriteFilePreviewUrl(event.coverImageId, 400, 300).href
    : '/vercel.svg'; // Fallback

  const eventDate = new Date(event.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/events/${event.slug}`} className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {event.isFeatured && (
          <span className="absolute top-2 left-2 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-deepTeal-900 mb-2 group-hover:text-terracotta transition-colors duration-300">
          {event.title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar size={16} className="mr-1 flex-shrink-0" />
          <span>{eventDate}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        <p className="text-gray-500 text-sm h-12 overflow-hidden">
          {event.description.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
