// src/components/cards/DestinationCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Destination } from '@/lib/types';
import { getAppwriteImageSrc } from '@/lib/storage';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const imageUrl = destination.coverImageId
    ? getAppwriteImageSrc(process.env.APPWRITE_BUCKET_ID_DESTINATIONS!, destination.coverImageId, 400, 300)
    : '/vercel.svg'; // Fallback

  return (
    <Link href={`/destinations/${destination.slug}`} className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={destination.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {destination.isFeatured && (
          <span className="absolute top-2 left-2 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-deepTeal-900 mb-2 group-hover:text-terracotta transition-colors duration-300">
          {destination.name}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span>{destination.district}</span>
        </div>
        <p className="text-gray-500 text-sm h-12 overflow-hidden">
          {destination.shortDescription}
        </p>
        <div className="mt-4 flex justify-between items-center text-xs font-medium text-gray-500">
          <span>Category: {destination.category}</span>
          <span>Best Time: {destination.bestTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
