// file: src/app/[locale]/destinations/[slug]/page.tsx
import { destinations } from '@/data/destinations';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { MapPin, Clock, ListChecks } from 'lucide-react';

type Props = {
  params: { slug: string; locale: string };
};

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Destinations' });
  const destination = destinations.find((d) => d.slug === params.slug);

  if (!destination) {
    return {
      title: t('notFound.title'),
    };
  }

  return {
    title: t(destination.name),
    description: t(destination.shortDescription),
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Destinations' });
  const destination = destinations.find((d) => d.slug === params.slug);

  if (!destination) {
    return (
        <main className="container mx-auto px-4 py-8">
            <EmptyState
                title={t('notFound.title')}
                description={t('notFound.description')}
                linkText={t('notFound.linkText')}
                linkHref="/destinations"
            />
        </main>
    );
  }

  return (
    <main>
        {/* Hero Section */}
        <section className="relative h-96">
            <Image
            src={destination.images[0]}
            alt={t(destination.name)}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            priority
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
            <div className="container mx-auto px-4 pb-8 text-white">
                <Badge className="mb-2">{t(`categories.${destination.type}`)}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold">{t(destination.name)}</h1>
                <p className="text-lg mt-1">{destination.district}</p>
            </div>
            </div>
        </section>

        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
                <section>
                <h2 className="text-3xl font-semibold text-stone-800 mb-4">{t('detailPage.aboutTitle')}</h2>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">
                    {t(destination.description)}
                </p>
                </section>

                <section className="mt-12">
                <h2 className="text-3xl font-semibold text-stone-800 mb-4">{t('detailPage.highlightsTitle')}</h2>
                <ul className="space-y-3">
                    {destination.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                        <ListChecks className="h-6 w-6 text-teal-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-stone-700">{t(highlight)}</span>
                    </li>
                    ))}
                </ul>
                </section>
            </div>

            {/* Info Sidebar */}
            <aside>
                <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-stone-800 mb-4">{t('detailPage.infoTitle')}</h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                    <Clock className="h-6 w-6 text-teal-500 mr-3 mt-1" />
                    <div>
                        <h4 className="font-semibold">{t('detailPage.bestTimeTitle')}</h4>
                        <p className="text-stone-600">{t(destination.bestTime)}</p>
                    </div>
                    </div>
                    <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-teal-500 mr-3 mt-1" />
                    <div>
                        <h4 className="font-semibold">{t('detailPage.locationTitle')}</h4>
                        <a
                        href={destination.location?.googleMapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline"
                        >
                        {t('detailPage.viewOnMap')}
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </aside>
            </div>

            {/* Image Gallery */}
            <section className="mt-16">
            <h2 className="text-3xl font-semibold text-stone-800 mb-6">{t('detailPage.galleryTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {destination.images.map((image: string, index: number) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                    <Image
                    src={image}
                    alt={`${t(destination.name)} gallery image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300"
                    />
                </div>
                ))}
            </div>
            </section>
        </div>
    </main>
  );
}