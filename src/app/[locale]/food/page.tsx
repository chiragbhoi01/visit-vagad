
import React from 'react';
import { CUISINE } from '@/data';

export default function FoodPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          The Taste of Vagad
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Experience the simple, rustic, and delicious cuisine of the tribal heartland.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {CUISINE.map((item) => (
          <div key={item.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center mb-8">
            <img src={item.image} alt={item.name} className="w-full md:w-1/2 h-64 object-cover" />
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{item.name}</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
        {/* A placeholder for the 'Mahua' tradition mentioned in the prompt, as it wasn't in the CUISINE array */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
            <div className="p-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Mahua Spirit</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                The traditional spirit distilled from the flowers of the Mahua tree is a vital part of social and religious ceremonies in Vagad.
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}
