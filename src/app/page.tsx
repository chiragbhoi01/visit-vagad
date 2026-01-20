import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import FeaturedModule from '@/components/home/FeaturedModule';
import BhilBazaarProductCard from '@/components/cards/BhilBazaarProductCard';
import VagadStayCard from '@/components/cards/VagadStayCard';
import DestinationCard from '@/components/cards/DestinationCard'; // Assuming a new card for destinations
import EventCard from '@/components/cards/EventCard'; // Assuming a new card for events
import FoodCard from '@/components/cards/FoodCard'; // Assuming a new card for food

import { getArtisanProducts, getHotels, getDestinations, getEvents, getFoodItems } from '@/lib/queries';
import { Destination, Hotel, ArtisanProduct, Event, Food } from '@/lib/types';
import Image from 'next/image';
import { getAppwriteImageSrc } from '@/lib/storage';
import { Query } from 'node-appwrite'; // For using Appwrite Query.equal etc.

// --- Home Page Component ---
export default async function HomePage() {
  const featuredArtisanProducts = await getArtisanProducts([Query.equal('isFeatured', true), Query.limit(3)]);
  const featuredHotels = await getHotels([Query.equal('isFeatured', true), Query.limit(3)]);
  const featuredDestinations = await getDestinations([Query.equal('isFeatured', true), Query.limit(3)]);
  const featuredEvents = await getEvents([Query.equal('isFeatured', true), Query.limit(3)]);
  const featuredFoodItems = await getFoodItems([Query.equal('isFeatured', true), Query.limit(3)]);

  // Placeholder for HeroSection dynamic data - will need a dedicated featured content collection
  const heroData = {
    title: "Discover the Untouched Beauty of Vagad",
    description: "Immerse yourself in the serene waters of Mahi and explore ancient tribal heritage.",
    backgroundImageId: "YOUR_APPWRITE_HERO_IMAGE_FILE_ID", // Placeholder
    backgroundImageBucketId: process.env.APPWRITE_BUCKET_ID_GLOBAL_IMAGES!, // Placeholder
  };

  return (
    <>
      <HeroSection 
        title={heroData.title}
        description={heroData.description}
        backgroundImageId={heroData.backgroundImageId}
        backgroundImageBucketId={heroData.backgroundImageBucketId}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Featured Destinations */}
        {featuredDestinations.length > 0 && (
          <FeaturedModule
            title="Explore Vagad's Wonders"
            subtitle="Discover breathtaking places and unique cultural experiences."
            linkText="View All Destinations"
            linkHref="/destinations"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map(destination => (
                <DestinationCard key={destination.$id} destination={destination} />
              ))}
            </div>
          </FeaturedModule>
        )}

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <FeaturedModule
            title="Upcoming Events & Festivals"
            subtitle="Immerse yourself in the vibrant culture of Vagad."
            bgColor="bg-gray-100"
            linkText="View All Events"
            linkHref="/events"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map(event => (
                <EventCard key={event.$id} event={event} />
              ))}
            </div>
          </FeaturedModule>
        )}

        {/* Featured Food */}
        {featuredFoodItems.length > 0 && (
          <FeaturedModule
            title="Taste the Flavors of Vagad"
            subtitle="Indulge in authentic local cuisines and culinary delights."
            linkText="View All Food"
            linkHref="/food"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFoodItems.map(foodItem => (
                <FoodCard key={foodItem.$id} foodItem={foodItem} />
              ))}
            </div>
          </FeaturedModule>
        )}

        {/* Bhil Bazaar Preview */}
        {featuredArtisanProducts.length > 0 && (
          <FeaturedModule 
            title="From the Heart of the Tribe"
            subtitle="Discover authentic crafts from government-verified artisans in our Bhil Bazaar."
            bgColor="bg-gray-100"
            linkText="Visit Bhil Bazaar"
            linkHref="/bhil-bazaar" // Assuming a /bhil-bazaar route
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtisanProducts.map(product => <BhilBazaarProductCard key={product.$id} product={product} />)}
            </div>
          </FeaturedModule>
        )}

        {/* Vagad Stays Preview */}
        {featuredHotels.length > 0 && (
          <FeaturedModule 
            title="Stay with the Locals"
            subtitle="Experience true hospitality in RIPS 2024 certified homestays and support the local economy."
            linkText="Find Your Stay"
            linkHref="/stays" // Assuming a /stays route
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHotels.map(hotel => <VagadStayCard key={hotel.$id} stay={hotel} />)}
            </div>
          </FeaturedModule>
        )}

        {/* National Monument Focus */}
        <FeaturedModule
            title="A Tribute to Valor"
            subtitle="Mangarh Dham, a National Monument, stands as a testament to the heroic spirit of the tribal community."
            bgColor="bg-gray-100"
        >
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image 
                      src={getAppwriteImageSrc(
                        process.env.APPWRITE_BUCKET_ID_GLOBAL_IMAGES!, // Assuming global images bucket for this static content image
                        "YOUR_MANGARH_DHAM_IMAGE_FILE_ID", // Placeholder for specific image file ID
                        800, 600
                      )} 
                      alt="Mangarh Dham" 
                      layout="fill" 
                      objectFit="cover" 
                    />
                </div>
                <div className="text-left">
                    <h3 className="text-2xl font-bold text-[#004D40] mb-4">Mangarh Dham: A Sacred Hilltop</h3>
                    <p className="text-gray-600">
                        Holding immense historical and spiritual significance, Mangarh Dham is a memorial to the tribal freedom fighters.
                        It offers panoramic views and a serene atmosphere for reflection and learning.
                    </p>
                </div>
            </div>
        </FeaturedModule>
      </main>
    </>
  );
}
