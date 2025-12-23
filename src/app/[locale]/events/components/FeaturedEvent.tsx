
'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";

export function FeaturedEvent() {
  const t = useTranslations("EventsPage.featured");

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src="/placeholder.svg"
            alt={t("name")}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-teal-800">{t("name")}</h2>
          <p className="mt-4 text-stone-600">{t("description")}</p>
          <button className="mt-6 px-6 py-3 font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors">
            {t("cta")}
          </button>
        </div>
      </div>
    </div>
  );
}
