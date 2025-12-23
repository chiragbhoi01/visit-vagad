// file: src/components/features/WhyVagad.tsx
'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Feather, Mountain, Zap } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const WhyVagad = () => {
  const t = useTranslations('WhyVagad');

  const featureData = [
    {
      icon: <Feather size={32} className="text-accent" />,
      title: t('feature1_title'),
      description: t('feature1_desc'),
    },
    {
      icon: <Mountain size={32} className="text-accent" />,
      title: t('feature2_title'),
      description: t('feature2_desc'),
    },
    {
      icon: <Zap size={32} className="text-accent" />,
      title: t('feature3_title'),
      description: t('feature3_desc'),
    },
  ];

  return (
    <section className="py-24 bg-background dark:bg-dark-background">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-serif font-bold text-secondary dark:text-dark-secondary mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-stone-600 dark:text-stone-300 max-w-3xl mx-auto mb-16"
        >
          {t('subtitle')}
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {featureData.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
              <div className="bg-amber-100/50 dark:bg-amber-900/20 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-secondary dark:text-dark-secondary mb-2">{feature.title}</h3>
              <p className="text-stone-600 dark:text-stone-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyVagad;
