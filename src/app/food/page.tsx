// src/app/food/page.tsx
import { Query } from 'node-appwrite';
import { getFoodItems } from '@/lib/queries';
import { Food } from '@/lib/types';
import FoodCard from '@/components/cards/FoodCard'; // Assuming FoodCard component
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vagad Cuisine - Taste the Authentic Flavors',
  description: 'Explore the traditional and authentic culinary delights of the Vagad region, featuring local recipes, ingredients, and dining experiences.',
};

export default async function FoodPage() {
  const foodItems: Food[] = await getFoodItems([
    Query.orderAsc('name'), // Order by name, ascending
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Authentic Vagad Cuisine</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
        Savor the unique tastes and traditional recipes that define the rich culinary heritage of the Vagad region.
      </p>

      {foodItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((foodItem) => (
            <FoodCard key={foodItem.$id} foodItem={foodItem} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">No food items found at the moment. Explore other sections!</p>
      )}
    </div>
  );
}