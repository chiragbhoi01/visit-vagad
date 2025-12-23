
'use client';

import { HotelCard } from "./HotelCard";
import { stays } from "@/data/stays";

export function HotelGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {stays.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
