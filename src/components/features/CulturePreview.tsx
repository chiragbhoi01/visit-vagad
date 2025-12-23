// file: src/components/features/CulturePreview.tsx
'use client';

import { useTranslations } from 'next-intl';
import { CUISINE, CULTURE } from '@/data';

export default function CulturePreview() {
    const t = useTranslations('home.culturePreview');
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-secondary">{t('title')}</h2>
                <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">{t('subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {CUISINE.map(item => (
                    <div key={item.name} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold font-serif text-secondary">{item.name}</h3>
                            <p className="mt-2 text-stone-600">{item.desc}</p>
                        </div>
                    </div>
                ))}
                 {CULTURE && CULTURE.arts && CULTURE.arts.map(item => (
                     <div key={item.name} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                        <img src={item.imagePath} alt={item.name} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold font-serif text-secondary">{item.name}</h3>
                            <p className="mt-2 text-stone-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};
