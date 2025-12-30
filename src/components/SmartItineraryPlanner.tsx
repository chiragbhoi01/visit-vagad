'use client';

import React, { useState, useTransition } from 'react';
import ItineraryResult from './ItineraryResult';

type TripType = 'spiritual' | 'nature' | 'adventure';

interface ItineraryItem {
  time: string;
  activity: string;
  location_name: string;
  cultural_fact: string;
}

const SmartItineraryPlanner: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<TripType>('spiritual');
  const [duration, setDuration] = useState<number>(3); // Add duration state
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = async () => {
    startTransition(async () => {
      try {
        setError(null);
        setItinerary([]);
        
        const response = await fetch('/api/itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preferences: selectedTrip, duration }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate itinerary. Please try again.');
        }

        const data = await response.json();
        setItinerary(data);
      } catch (err: any) {
        setError(err.message);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
      <h2 className="text-4xl font-bold text-[#004D40] mb-4">Smart Itinerary Planner</h2>
      <p className="text-lg text-[#E2725B] mb-8">Let Gemini AI curate your perfect trip to Vagad.</p>

      {/* Inputs */}
      <div className="mb-8 space-y-4">
        <div>
            <h3 className="text-xl font-semibold text-[#004D40] mb-2">Choose Your Adventure</h3>
            <div className="flex justify-center space-x-4">
                {/* Radio buttons for trip type */}
                {(['spiritual', 'nature', 'adventure'] as TripType[]).map(type => (
                    <label key={type} className="cursor-pointer">
                        <input type="radio" name="tripType" value={type} checked={selectedTrip === type} onChange={(e) => setSelectedTrip(e.target.value as TripType)} className="sr-only" />
                        <div className={`px-6 py-2 rounded-lg border-2 transition-all ${selectedTrip === type ? 'bg-[#E2725B] text-white border-[#E2725B]' : 'bg-white text-[#004D40] border-gray-300 hover:border-[#E2725B]'}`}>
                            <span className="text-lg font-medium capitalize">{type}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-[#004D40] mb-2">Select Duration (in days)</h3>
            <input type="number" min="1" max="7" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="p-2 border rounded-md w-32 text-center"/>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isPending}
        className="bg-[#004D40] hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#004D40] focus:ring-opacity-75 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Generate itinerary with Gemini AI"
      >
        {isPending ? '✨ Generating...' : '✨ Generate with Gemini AI'}
      </button>

      {/* Results Section */}
      <div className="mt-8 text-left">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {isPending && <p className="text-center">Curating your personalized journey...</p>}
        {itinerary.length > 0 && <ItineraryResult itinerary={itinerary} />}
      </div>
    </div>
  );
};

export default SmartItineraryPlanner;