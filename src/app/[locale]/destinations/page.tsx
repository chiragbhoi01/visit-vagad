
import React from 'react';
import { destinations } from '@/data/destinations';
import DestinationCard from '@/components/ui/DestinationCard';
import { getTranslations } from 'next-intl/server';
import { motion } from 'framer-motion'; // For server components, we can't use hooks, but can use for initial animations if needed.

// This is a Server Component, so we can fetch translations directly.
export default async function DestinationsPage() {
  const t = await getTranslations('DestinationsPage'); // Assuming a namespace in your translation files

  return (
    <div className="bg-background dark:bg-dark-background">
      <header className="py-16 text-center">
        <h1 className="text-5xl font-serif font-bold text-secondary dark:text-dark-secondary">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </main>
    </div>
  );
}

// We also need to add these translations to en.json and hi.json
/* 
// messages/en.json
"DestinationsPage": {
    "title": "Explore the Destinations",
    "subtitle": "From sacred rivers and ancient temples to lush landscapes and royal palaces, discover the hidden gems of the Vagad region."
}

// messages/hi.json
"DestinationsPage": {
    "title": "गंतव्यों का अन्वेषण करें",
    "subtitle": "पवित्र नदियों और प्राचीन मंदिरों से लेकर हरे-भरे परिदृश्यों और शाही महलों तक, वागड़ क्षेत्र के छिपे हुए रत्नों की खोज करें।"
}
*/
