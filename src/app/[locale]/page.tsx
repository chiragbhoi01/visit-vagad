// file: src/app/[locale]/page.tsx
import React from 'react';
import Hero from '@/components/ui/Hero';
import FairGrid from '@/components/features/FairGrid';
import EventSchema from '@/components/seo/EventSchema';
import WhyVagad from '@/components/features/WhyVagad';
import { FAIRS } from '@/data';
import { getTranslations } from 'next-intl/server';
import CulturePreview from '@/components/features/CulturePreview';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Hero' });

  return (
    <>
      {/* SEO Structured Data Injection */}
      {FAIRS.map(fair => (
        <EventSchema key={fair.slug} fair={fair} />
      ))}
      
      <main className="bg-background">
        <Hero title={t('title')} subtitle={t('subtitle')} cta={t('cta')} />

        <WhyVagad />

        <section id="fairs" className="py-24 bg-amber-50/40">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-secondary">Explore the Celebrations</h2>
                <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">Step into a world of vibrant traditions and sacred gatherings.</p>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FairGrid />
            </div>
        </section>

        <section id="culture" className="py-24">
            <CulturePreview />
        </section>
      </main>
    </>
  );
}
