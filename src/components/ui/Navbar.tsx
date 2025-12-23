'use client';

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Navbar');

    const navLinks = [
        { href: '/destinations', label: 'Explore' },
        { href: '/culture', label: 'Experiences' },
        { href: '/stays', label: 'Stays' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-teal-700 dark:text-teal-500 font-serif">
                    Visit Vagad
                </Link>

                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="font-sans text-stone-600 dark:text-stone-300 hover:text-teal-700 dark:hover:text-teal-500 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                    <div className="w-px h-6 bg-stone-300 dark:bg-stone-700"></div>
                    <ThemeToggleButton />
                    <LocaleSwitcher />
                    <Link href="/plan-trip" className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors">
                        {t('planTrip')}
                    </Link>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggleButton />
                    <LocaleSwitcher />
                    <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="p-2">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg"
                    >
                        <div className="flex flex-col items-center space-y-6 py-8">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="font-sans text-xl text-stone-700 dark:text-stone-200 hover:text-teal-700 dark:hover:text-teal-500" onClick={() => setIsOpen(false)}>
                                    {link.label}
                                </Link>
                            ))}
                            <Link href="/plan-trip" className="mt-4 px-6 py-3 text-lg font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors" onClick={() => setIsOpen(false)}>
                                {t('planTrip')}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};