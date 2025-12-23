
// file: src/components/ui/EmptyState.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Compass } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export function EmptyState({ title, description, linkText, linkHref }: EmptyStateProps) {
  const t = useTranslations('EmptyState');

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <Compass className="w-24 h-24 text-stone-300 mb-4" strokeWidth={1} />
      <h2 className="text-2xl font-bold text-stone-700">{title}</h2>
      <p className="mt-2 max-w-md text-stone-500">{description}</p>
      <Link
        href={linkHref}
        className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        {linkText}
      </Link>
    </div>
  );
}
