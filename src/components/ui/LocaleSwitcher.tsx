// file: src/components/ui/LocaleSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, locales } from '@/navigation';
import { useState, useTransition } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const onSelectChange = (nextLocale: (typeof locales)[number]) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 font-semibold text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-dark-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
      >
        <span>{locale === 'en' ? 'EN' : 'HI'}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-stone-800 rounded-md shadow-lg border dark:border-stone-700">
          <button
            onClick={() => onSelectChange('en')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-stone-700"
            disabled={locale === 'en' || isPending}
          >
            English
          </button>
          <button
            onClick={() => onSelectChange('hi')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-stone-700"
            disabled={locale === 'hi' || isPending}
          >
            हिंदी
          </button>
        </div>
      )}
    </div>
  );
}