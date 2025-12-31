"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Interest = 'religious' | 'nature';

interface ItineraryDay {
    day: number;
    title: string;
    activities: {
        time: string;
        description: string;
    }[];
}

const itineraries: Record<Interest, ItineraryDay[]> = {
    religious: [
        {
            day: 1,
            title: "Spiritual Awakening & Local Culture",
            activities: [
                { time: "9:00 AM", description: "Start your journey to Mangarh Dham, the sacred hillock. Feel the spiritual energy as you ascend." },
                { time: "12:00 PM", description: "At the peak, pay homage at the memorial and spend time in quiet reflection. The panoramic views are breathtaking." },
                { time: "2:00 PM", description: "Descend and have a traditional lunch at a local eatery in Anandpuri." },
                { time: "4:00 PM", description: "Visit the nearby Tripura Sundari Temple, a beautiful and ancient Shakti Peeth." },
            ],
        },
        {
            day: 2,
            title: "Historical Roots & Departure",
            activities: [
                { time: "10:00 AM", description: "Visit the ruins of Arthuna, a complex of 11th-century temples, showcasing exquisite architecture." },
                { time: "1:00 PM", description: "Enjoy a final local meal and shop for some tribal handicrafts as souvenirs." },
                { time: "3:00 PM", description: "Depart from Banswara with a sense of peace and a deeper connection to the region's history." },
            ],
        },
    ],
    nature: [
        {
            day: 1,
            title: "Water Worlds & Sunset Views",
            activities: [
                { time: "10:00 AM", description: "Arrive at the magnificent Mahi Bajaj Sagar Dam. Walk along the dam and marvel at the vast expanse of water." },
                { time: "1:00 PM", description: "Enjoy a picnic lunch by the reservoir. You can find many serene spots." },
                { time: "3:00 PM", description: "Take a boat ride to see the scattered islands within the reservoir." },
                { time: "5:00 PM", description: "Find a vantage point to watch a spectacular sunset over the water." },
            ],
        },
        {
            day: 2,
            title: "Waterfalls & Green Escapes",
            activities: [
                { time: "9:00 AM", description: "Drive to the nearby Kagdi Pick Up Weir, a beautiful spot for birdwatching." },
                { time: "12:00 PM", description: "Visit the seasonal waterfalls near Banswara (best during monsoon)." },
                { time: "2:00 PM", description: "Have lunch at a restaurant with a view of the surrounding hills." },
                { time: "4:00 PM", description: "Depart from Banswara, refreshed by the natural beauty of the region." },
            ],
        },
    ],
};

export default function SmartItineraryPlanner() {
    const [interest, setInterest] = useState<Interest | null>(null);
    const [generatedPlan, setGeneratedPlan] = useState<ItineraryDay[] | null>(null);

    const handleGeneratePlan = () => {
        if (interest) {
            setGeneratedPlan(itineraries[interest]);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto my-12 shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-deepTeal-900">Personalized Guide: Your 2-Day Vagad Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center mb-6">
                    <p className="text-lg text-muted-foreground">Select your interest and let our AI craft a plan for you.</p>
                    <div className="flex justify-center gap-4 my-4">
                        <Button onClick={() => setInterest('religious')} variant={interest === 'religious' ? 'default' : 'outline'} className={interest === 'religious' ? 'bg-deepTeal-900' : ''}>
                            Religious (Mangarh Dham)
                        </Button>
                        <Button onClick={() => setInterest('nature')} variant={interest === 'nature' ? 'default' : 'outline'} className={interest === 'nature' ? 'bg-deepTeal-900' : ''}>
                            Nature (Mahi Dam)
                        </Button>
                    </div>
                    <Button onClick={handleGeneratePlan} disabled={!interest} className="bg-terracotta-700 text-white hover:bg-terracotta-700/90">
                        ✨ Generate with Gemini
                    </Button>
                </div>

                {generatedPlan && (
                    <div className="mt-8 border-t pt-6 space-y-6">
                        {generatedPlan.map((day) => (
                            <div key={day.day}>
                                <h3 className="text-2xl font-bold text-deepTeal-900">Day {day.day}: {day.title}</h3>
                                <ul className="mt-2 space-y-2 list-disc list-inside">
                                    {day.activities.map((activity) => (
                                        <li key={activity.time}>
                                            <span className="font-semibold">{activity.time}:</span> {activity.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
