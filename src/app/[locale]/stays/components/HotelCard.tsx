
'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star, Wifi, Utensils, ParkingCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    category: string;
    priceRange: string;
    rating: number;
    imageUrl: string;
  };
}

export function HotelCard({ hotel }: HotelCardProps) {
  const t = useTranslations("StaysPage.card");

  const categories: { [key: string]: string } = {
    luxury: t("category.luxury"),
    heritage: t("category.heritage"),
    budget: t("category.budget"),
    homestay: t("category.homestay"),
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl">
      <div className="relative h-56">
        <Image
          src={hotel.imageUrl}
          alt={hotel.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-stone-800 leading-tight">{hotel.name}</h3>
          <span
            className={cn(
              "text-xs font-bold px-2 py-1 rounded-full text-white",
              {
                "bg-amber-500": hotel.category === "luxury",
                "bg-teal-600": hotel.category === "heritage",
                "bg-stone-500": hotel.category === "budget",
                "bg-green-600": hotel.category === "homestay",
              }
            )}
          >
            {categories[hotel.category]}
          </span>
        </div>
        <p className="text-stone-600 text-sm mt-1">{hotel.priceRange}</p>
        <div className="flex items-center mt-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("h-5 w-5", i < hotel.rating ? "fill-current" : "stroke-current")} />
            ))}
          </div>
          <span className="ml-2 text-sm text-stone-600">{hotel.rating.toFixed(1)}</span>
        </div>
        <div className="flex space-x-4 mt-4 text-stone-500">
          <Wifi className="h-5 w-5" />
          <Utensils className="h-5 w-5" />
          <ParkingCircle className="h-5 w-5" />
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <button className="w-full px-4 py-2 text-sm font-semibold text-teal-700 bg-white border border-teal-600 rounded-md hover:bg-teal-50 transition-colors">
            {t("viewDetails")}
          </button>
          <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors">
            {t("bookNow")}
          </button>
        </div>
      </div>
    </div>
  );
}
