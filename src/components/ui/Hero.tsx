// file: src/components/ui/Hero.tsx
'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HERO_VIDEO_URL = "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4";

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

const Hero = ({ title, subtitle, cta }: HeroProps) => {

  const scrollToFairs = () => {
    const fairsSection = document.getElementById('fairs');
    if (fairsSection) {
      fairsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <motion.div
        className="relative z-10 text-center flex flex-col items-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants} 
          className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-extrabold" 
          style={{ textShadow: '3px 3px 15px rgba(0,0,0,0.6)' }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="mt-4 max-w-3xl text-stone-200 text-lg sm:text-xl md:text-2xl font-light"
        >
          {subtitle}
        </motion.p>
        
        <motion.button
          variants={itemVariants}
          onClick={scrollToFairs}
          className="mt-10 px-10 py-4 bg-accent text-secondary text-lg font-bold font-sans rounded-full shadow-2xl hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          {cta}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 z-10"
      >
        <ArrowDown className="text-white/70 animate-bounce" size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;