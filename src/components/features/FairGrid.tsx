// file: src/components/features/FairGrid.tsx
'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { Link } from '@/navigation';
import { FAIRS } from '@/data';
import { ArrowRight } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut }
  },
};

const FairCard = ({ fair, className }: { fair: (typeof FAIRS)[0]; className?: string }) => {
  return (
    <motion.article
      variants={cardVariants}
      className={`group relative h-full min-h-[450px] w-full rounded-2xl overflow-hidden shadow-lg ${className}`}
    >
      <img
        src={fair.imageUrl}
        alt={`Vibrant scene from ${fair.title}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
        <h3 className="text-3xl lg:text-4xl font-serif font-bold" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>{fair.title}</h3>
        <p className="mt-2 text-amber-300 font-sans font-semibold">{fair.date}</p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          className="mt-4"
        >
          <Link href={`/fairs/${fair.slug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-accent/80 text-secondary font-bold rounded-full backdrop-blur-sm hover:bg-accent transition-colors">
            Read More
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
};


const FairGrid = () => {
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={gridContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {FAIRS.map((fair, index) => (
        <FairCard
          key={fair.slug}
          fair={fair}
          className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''} // Making the bento grid more explicit
        />
      ))}
    </motion.div>
  );
};

export default FairGrid;
