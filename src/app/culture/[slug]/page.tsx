import React from 'react';
import { culturalData } from '@/constants/data';

interface CulturePageProps {
  params: {
    slug: string;
  };
}

const CulturalMapPage: React.FC<CulturePageProps> = ({ params }) => {
  const { slug } = params;
  const { festivals, wagdiDialectDescription } = culturalData;

  // Placeholder for content based on slug
  const pageContent = festivals.find(f => f.name.toLowerCase().replace(/\s/g, '-') === slug) || {
    name: 'Cultural Information',
    description: 'Explore the rich culture of Vagad.',
  };

  const culturalCategories = [
    { name: "Tribes", items: ["Bhil", "Damor"] },
    { name: "Festivals", items: festivals.map(f => f.name) },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-100 p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Cultural Categories</h2>
        <nav>
          {culturalCategories.map((category, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <ul>
                {category.items.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    <a href={`/culture/${item.toLowerCase().replace(/\s/g, '-')}`} className="text-blue-600 hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6">{pageContent.name}</h1>
        <p className="text-lg text-gray-700 mb-8">{pageContent.description}</p>

        {/* Sticky 'Did You Know' Widget */}
        <div className="sticky top-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
          <p className="font-bold">Did You Know?</p>
          <p>{wagdiDialectDescription}</p>
        </div>

        {/* More detailed content will go here based on the slug */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Further Details</h2>
          <p>Detailed information about {pageContent.name} will be displayed here.</p>
          {/* This section would be expanded with actual content from a CMS or more detailed data based on the slug */}
        </div>
      </main>
    </div>
  );
};

export default CulturalMapPage;
