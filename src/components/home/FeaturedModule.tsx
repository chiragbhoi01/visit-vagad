import React from 'react';
import Link from 'next/link';

interface FeaturedModuleProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bgColor?: string;
  linkText?: string; // New prop for link text
  linkHref?: string; // New prop for link destination
}

const FeaturedModule: React.FC<FeaturedModuleProps> = ({ title, subtitle, children, bgColor = 'bg-gray-50', linkText, linkHref }) => {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#004D40]">{title}</h2>
          <p className="text-lg text-gray-600 mt-2">{subtitle}</p>
        </div>
        {children}
        {linkText && linkHref && (
          <div className="text-center mt-8">
            <Link href={linkHref} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#E2725B] hover:bg-[#c9604a] transition-colors">
              {linkText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedModule;
