import React from 'react';
import { Query } from 'node-appwrite';
import { HeroSection } from '@/components/home/HeroSection';
import FeaturedModule from '@/components/home/FeaturedModule';
import BhilBazaarProductCard from '@/components/cards/BhilBazaarProductCard';
import VagadStayCard from '@/components/cards/VagadStayCard';
import DestinationCard from '@/components/cards/DestinationCard';
import EventCard from '@/components/cards/EventCard';
import FoodCard from '@/components/cards/FoodCard';
import NationalMonumentFocus from '@/components/home/NationalMonumentFocus';
import {
  getArtisanProducts,
  getHotels,
  getDestinations,
  getEvents,
  getFoodItems,
  getHeroData,
  getPageContent,
} from '@/lib/queries';
import { getAppwriteFilePreviewUrl } from '@/lib/storage';

export default async function HomePage() {
  const [
    featuredArtisanProducts,
    featuredHotels,
    featuredDestinations,
    featuredEvents,
    featuredFoodItems,
    heroData,
    monumentData,
  ] = await Promise.all([
    getArtisanProducts({ queries: [Query.equal('isFeatured', true)], limit: 3 }),
    getHotels({ queries: [Query.equal('isFeatured', true)], limit: 3 }),
    getDestinations({ queries: [Query.equal('isFeatured', true)], limit: 3 }),
    getEvents({ queries: [Query.equal('isFeatured', true)], limit: 3 }),
    getFoodItems({ queries: [Query.equal('isFeatured', true)], limit: 3 }),
    getHeroData(),
    getPageContent('national-monument-focus'),
  ]);

  return (
    <>
      {heroData && (
        <HeroSection
          title={heroData.title}
          description={heroData.description}
          backgroundImageId={heroData.backgroundImageId}
        />
      )}

      <main className="container mx-auto px-4 py-8">
        {featuredDestinations.length > 0 && (
          <FeaturedModule
            title="Explore Vagad's Wonders"
            subtitle="Discover breathtaking places and unique cultural experiences."
            linkText="View All Destinations"
            linkHref="/destinations"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((destination) => (
                <DestinationCard key={destination.$id} destination={destination} />
              ))}
            </div>
          </FeaturedModule>
        )}

        {featuredEvents.length > 0 && (
          <FeaturedModule
            title="Upcoming Events & Festivals"
            subtitle="Immerse yourself in the vibrant culture of Vagad."
            bgColor="bg-gray-100"
            linkText="View All Events"
            linkHref="/events"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.$id} event={event} />
              ))}
            </div>
          </FeaturedModule>
        )}

        {featuredFoodItems.length > 0 && (
          <FeaturedModule
            title="Taste the Flavors of Vagad"
            subtitle="Indulge in authentic local cuisines and culinary delights."
            linkText="View All Food"
            linkHref="/food"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFoodItems.map((foodItem) => (
                <FoodCard key={foodItem.$id} foodItem={foodItem} />
              ))}
            </div>
          </FeaturedModule>
        )}

        {featuredArtisanProducts.length > 0 && (
          <FeaturedModule
            title="From the Heart of the Tribe"
            subtitle="Discover authentic crafts from government-verified artisans in our Bhil Bazaar."
            bgColor="bg-gray-100"
            linkText="Visit Bhil Bazaar"
            linkHref="/bhil-bazaar"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtisanProducts.map((product) => (
                <BhilBazaarProductCard key={product.$id} product={product} />
              ))}
            </div>
          </FeaturedModule>
        )}

        {featuredHotels.length > 0 && (
          <FeaturedModule
            title="Stay with the Locals"
            subtitle="Experience true hospitality in RIPS 2024 certified homestays and support the local economy."
            linkText="Find Your Stay"
            linkHref="/stays"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHotels.map((hotel) => (
                <VagadStayCard key={hotel.$id} stay={hotel} />
              ))}
            </div>
          </FeaturedModule>
        )}
        
        {monumentData && (
          <NationalMonumentFocus
            title={monumentData.title}
            subtitle={monumentData.subtitle}
            imageUrl={getAppwriteFilePreviewUrl(monumentData.imageId).href}
            imageAlt={monumentData.imageAlt}
            content={{
              title: monumentData.contentTitle,
              description: monumentData.contentDescription,
            }}
          />
        )}

      </main>
    </>
  );
}
