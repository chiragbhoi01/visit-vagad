// src/components/cards/FoodCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils } from 'lucide-react';
import { Food } from '@/lib/types';
import { getAppwriteFilePreviewUrl } from '@/lib/storage';

interface FoodCardProps {
  foodItem: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ foodItem }) => {
  const imageUrl = foodItem.imageUrl
    ? getAppwriteFilePreviewUrl(foodItem.imageUrl, 400, 300).href // Assuming imageUrl here is actually a file ID
    : '/vercel.svg'; // Fallback

  return (
    <Link href={`/food/${foodItem.slug}`} className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={foodItem.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {foodItem.isFeatured && (
          <span className="absolute top-2 left-2 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-deepTeal-900 mb-2 group-hover:text-terracotta transition-colors duration-300">
          {foodItem.name}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Utensils size={16} className="mr-1 flex-shrink-0" />
          <span>{foodItem.type}</span>
        </div>
        <p className="text-gray-500 text-sm h-12 overflow-hidden">
          {foodItem.description.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
};

export default FoodCard;
