
'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: number;
    name: string;
    date: string;
    location: string;
    description: string;
    category: string;
    imageUrl: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  const t = useTranslations("EventsPage.card");

  const categories: { [key: string]: string } = {
    religious: t("category.religious"),
    tribal: t("category.tribal"),
    cultural: t("category.cultural"),
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl">
      <div className="relative h-48">
        <Image
          src={event.imageUrl}
          alt={event.name}
          layout="fill"
          objectFit="cover"
        />
        <span
          className={cn(
            "absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full text-white",
            {
              "bg-amber-500": event.category === "religious",
              "bg-teal-600": event.category === "tribal",
              "bg-stone-500": event.category === "cultural",
            }
          )}
        >
          {categories[event.category]}
        </span>
      </div>
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-xl font-bold text-stone-800 leading-tight">{event.name}</h3>
        <div className="flex items-center mt-2 text-sm text-stone-600">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center mt-1 text-sm text-stone-600">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <p className="mt-3 text-stone-700 text-sm flex-grow">{event.description}</p>
        <div className="mt-4">
          <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors">
            {t("viewDetails")}
          </button>
        </div>
      </div>
    </div>
  );
}
