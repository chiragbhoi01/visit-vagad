
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FairCardProps {
  slug: string;
  title: string;
  label?: string;
  nextDate?: string;
  className?: string;
}

const FairCard = ({ slug, title, label, nextDate, className }: FairCardProps) => {
  const cardVariants = {
    initial: { scale: 1, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
    hover: { scale: 1.03, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <motion.article
      className={`relative rounded-lg overflow-hidden h-full ${className}`}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      {/* This would be the background image */}
      <div className="absolute inset-0 bg-secondary/80"></div>
      
      <div className="relative p-8 h-full flex flex-col justify-between text-white">
        <div>
          {label && <p className="text-sm font-semibold text-accent mb-2">{label}</p>}
          <h3 className="text-3xl font-serif font-bold">{title}</h3>
        </div>
        
        <div className="mt-8">
          {nextDate && <p className="text-lg font-semibold bg-accent text-secondary px-4 py-2 rounded-full inline-block">Next Date: {nextDate}</p>}
          
          <motion.div variants={buttonVariants} transition={{ duration: 0.2, delay: 0.1 }}>
             <Link href={`/fairs/${slug}`} className="mt-4 inline-block text-white font-bold hover:underline">
                View Rituals &rarr;
             </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default FairCard;
