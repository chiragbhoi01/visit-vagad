
/**
 * Represents a tourist destination in the Vagad region.
 */
export interface Destination {
  id: string;
  slug: string; // For URL (e.g., 'mahi-dam')
  name: string;
  district: 'Banswara' | 'Dungarpur';
  type: 'Nature' | 'Heritage' | 'Spiritual' | 'Adventure' | 'Infrastructure' | 'Leisure/Park';
  description: string; // Detailed description for the detail page
  shortDescription: string; // For display on cards
  images: string[]; // List of online image URLs
  highlights: string[]; // Bullet points of key attractions
  bestTime: string;
  location?: {
    lat?: number;
    lng?: number;
    googleMapLink?: string;
  };
  visualSuggestion: 'Hero Video' | 'Carousel' | 'Activity Card' | 'Virtual Tour' | 'Story Section' | 'Gallery';
}

/**
 * Represents a fair or festival (Event).
 */
export interface Event {
  id: string;
  slug: string;
  name: string;
  date: string; // e.g., "Magh Purnima (Feb)"
  location: string;
  description: string;
  culturalSignificance: string;
  imageUrl: string;
}

/**
 * Represents a hotel or accommodation.
 */
export interface Hotel {
  id: string;
  name: string;
  district: 'Banswara' | 'Dungarpur';
  category: 'Luxury' | 'Budget' | 'Resort' | 'Heritage' | 'Homestay';
  priceRange: string; // e.g., "₹2000 - ₹5000"
  usp: string; // Unique Selling Proposition
  imageUrl: string;
  bookingLink?: string;
  rating?: number; // e.g., 4.5
}

/**
 * Represents a dish from the culinary heritage.
 */
export interface Dish {
    name: string;
    category: 'Main Course' | 'Beverage/Snack' | 'Vegetarian' | 'Non-vegetarian' | 'Sweet';
    description: string;
    imageUrl: string;
}