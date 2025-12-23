
'use client';

import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";

export function FilterBar() {
  const t = useTranslations("EventsPage.filters");

  return (
    <div className="sticky top-16 z-30 bg-stone-50/90 backdrop-blur-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-shrink-0 font-semibold text-lg flex items-center">
            <SlidersHorizontal className="mr-2" />
            {t("title")}
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="form-select rounded-md border-stone-300">
              <option>{t("month.title")}</option>
            </select>
            <select className="form-select rounded-md border-stone-300">
              <option>{t("district.title")}</option>
              <option>{t("district.banswara")}</option>
              <option>{t("district.dungarpur")}</option>
            </select>
            <select className="form-select rounded-md border-stone-300">
              <option>{t("type.title")}</option>
              <option>{t("type.religious")}</option>
              <option>{t("type.tribal")}</option>
              <option>{t("type.cultural")}</option>
            </select>
          </div>
          <button className="ml-auto flex items-center justify-center px-4 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-100 transition-colors">
            <X className="mr-2 h-4 w-4" />
            {t("clear")}
          </button>
        </div>
      </div>
    </div>
  );
}
