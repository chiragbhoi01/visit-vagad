// file: src/components/ui/DestinationCard.tsx
'use client';

import React from 'react';
import type { Destination } from '@/types';
import { Link } from '@/navigation'; // Use local Link for localized routing
import { motion, easeOut } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DestinationCardProps {
  destination: Destination;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut }
  },
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const t = useTranslations();

  return (
    <motion.div variants={cardVariants} className="bg-white dark:bg-stone-800 rounded-lg shadow-md overflow-hidden group">
      <Link href={`/destinations/${destination.slug}`}>
        <div className="relative">
          <img
            src={destination.images[0] || '/placeholder-image.jpg'} // Use first image or a placeholder
            alt={`View of ${t(destination.name)}`}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold text-primary dark:text-dark-primary">{destination.type}</p>
          <h3 className="text-2xl font-serif font-bold text-secondary dark:text-dark-secondary mt-1">{t(destination.name)}</h3>
          <div className="flex items-center gap-2 mt-2 text-stone-500 dark:text-stone-400">
            <MapPin size={16} />
            <span>{t(destination.district)}</span>
          </div>
          <p className="mt-4 text-stone-600 dark:text-stone-300 text-sm line-clamp-3">
            {t(destination.shortDescription)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;