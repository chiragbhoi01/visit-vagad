
'use client';

import { useTranslations } from "next-intl";
import { ListFilter, X } from "lucide-react";

export function FilterSidebar() {
  const t = useTranslations("StaysPage.filters");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <ListFilter className="mr-2" />
        {t("title")}
      </h3>

      {/* District Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">{t("district.title")}</h4>
        <div className="space-y-2">
          <div>
            <input type="checkbox" id="banswara" className="form-checkbox" />
            <label htmlFor="banswara" className="ml-2 text-stone-700">{t("district.banswara")}</label>
          </div>
          <div>
            <input type="checkbox" id="dungarpur" className="form-checkbox" />
            <label htmlFor="dungarpur" className="ml-2 text-stone-700">{t("district.dungarpur")}</label>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">{t("category.title")}</h4>
        <div className="space-y-2">
          <div>
            <input type="checkbox" id="luxury" className="form-checkbox" />
            <label htmlFor="luxury" className="ml-2 text-stone-700">{t("category.luxury")}</label>
          </div>
          <div>
            <input type="checkbox" id="heritage" className="form-checkbox" />
            <label htmlFor="heritage" className="ml-2 text-stone-700">{t("category.heritage")}</label>
          </div>
          <div>
            <input type="checkbox" id="budget" className="form-checkbox" />
            <label htmlFor="budget" className="ml-2 text-stone-700">{t("category.budget")}</label>
          </div>
          <div>
            <input type="checkbox" id="homestay" className="form-checkbox" />
            <label htmlFor="homestay" className="ml-2 text-stone-700">{t("category.homestay")}</label>
          </div>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">{t("price.title")}</h4>
        <input type="range" min="500" max="15000" className="w-full" />
        <div className="flex justify-between text-sm text-stone-600 mt-1">
          <span>₹500</span>
          <span>₹15000+</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center px-4 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-100 transition-colors">
        <X className="mr-2 h-4 w-4" />
        {t("clear")}
      </button>
    </div>
  );
}
