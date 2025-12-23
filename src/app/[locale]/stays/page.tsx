// file: src/app/[locale]/stays/page.tsx
import { getTranslations } from "next-intl/server";
import { FilterSidebar } from "./components/FilterSidebar";
import { HotelGrid } from "./components/HotelGrid";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "StaysPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function StaysPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "StaysPage" });

  return (
    <main className="container mx-auto px-4 py-8 mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-teal-800 tracking-tight">{t("title")}</h1>
        <p className="text-lg text-stone-600 mt-2 max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <FilterSidebar />
        </aside>

        <section className="lg:col-span-3">
          <HotelGrid />
        </section>
      </div>
    </main>
  );
}
