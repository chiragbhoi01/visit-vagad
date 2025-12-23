
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';

export default function Footer() {
    const t = useTranslations('Footer');

    const socialLinks = [
        { Icon: Twitter, href: '#' },
        { Icon: Instagram, href: '#' },
        { Icon: Facebook, href: '#' },
    ];

    const footerLinks = [
        { href: '/destinations', label: t('links.explore') },
        { href: '/culture', label: t('links.experiences') },
        { href: '/stays', label: t('links.stays') },
        { href: '/about-us', label: t('links.about') },
    ];

    return (
        <footer className="bg-stone-800 text-stone-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-serif font-bold text-white">Visit Vagad</h3>
                        <p className="mt-2 text-stone-400">{t('tagline')}</p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">{t('explore')}</h4>
                        <ul className="space-y-2">
                            {footerLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-teal-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Section */}
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">{t('followUs')}</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {socialLinks.map(({ Icon, href }, index) => (
                                <Link key={index} href={href} className="hover:text-teal-400 transition-colors">
                                    <Icon size={24} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Language Switcher */}
                    <div>
                        <h4 className="font-bold text-lg text-white mb-4">{t('language')}</h4>
                        <LocaleSwitcher />
                    </div>
                </div>
                <div className="mt-12 border-t border-stone-700 pt-8 text-center text-stone-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Visit Vagad. {t('rights')}</p>
                </div>
            </div>
        </footer>
    );
};
