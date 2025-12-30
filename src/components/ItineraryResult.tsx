import React from 'react';

interface ItineraryItem {
  time: string;
  activity: string;
  location_name: string;
  cultural_fact: string;
}

interface ItineraryResultProps {
  itinerary: ItineraryItem[];
}

const ItineraryResult: React.FC<ItineraryResultProps> = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return <p>No itinerary to display.</p>;
  }

  return (
    <div className="relative pl-8">
      {/* Vertical Timeline Track */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-[#004D40]"></div>

      {itinerary.map((item, index) => (
        <div key={index} className="relative mb-8">
          {/* Activity Marker */}
          <div className="absolute left-[-0.6rem] top-1 h-5 w-5 rounded-full bg-[#E2725B] border-4 border-white"></div>
          
          <div className="pl-4">
            <p className="text-sm font-semibold text-[#E2725B]">{item.time}</p>
            <h4 className="text-xl font-bold text-[#004D40]">{item.activity}</h4>
            <p className="text-md text-gray-600">at {item.location_name}</p>
            <p className="mt-2 text-sm text-gray-500 italic">
              <strong>Cultural Fact:</strong> {item.cultural_fact}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryResult;
