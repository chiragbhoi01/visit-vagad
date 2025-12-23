// file: src/app/[locale]/events/page.tsx
import { getTranslations } from "next-intl/server";
import { EventGrid } from "./components/EventGrid";
import { FeaturedEvent } from "./components/FeaturedEvent";
import { FilterBar } from "./components/FilterBar";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "EventsPage" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function EventsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "EventsPage" });

  return (
    <>
      <header className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg')" }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">{t("title")}</h1>
            <p className="text-lg mt-2 max-w-2xl mx-auto">{t("subtitle")}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FilterBar />

        <div className="mt-8">
          <EventGrid />
        </div>

        <div className="mt-16">
          <FeaturedEvent />
        </div>
      </main>
    </>
  );
}