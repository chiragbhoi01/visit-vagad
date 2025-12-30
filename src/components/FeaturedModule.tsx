import React from 'react';

interface FeaturedModuleProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bgColor?: string;
}

const FeaturedModule: React.FC<FeaturedModuleProps> = ({ title, subtitle, children, bgColor = 'bg-gray-50' }) => {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#004D40]">{title}</h2>
          <p className="text-lg text-gray-600 mt-2">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default FeaturedModule;
