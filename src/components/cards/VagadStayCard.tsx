'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Hotel } from '@/lib/types'; // Corrected import
import { calculateIncentives, RipsIncentives } from '@/lib/rips';
import { Star, MapPin } from 'lucide-react';
import { getAppwriteFilePreviewUrl } from '@/lib/storage'; // New import

interface VagadStayCardProps {
  stay: Hotel & { paryatanMitraRating?: number; uniqueExperienceStory?: string; investmentAmount?: number };
}

const VagadStayCard: React.FC<VagadStayCardProps> = ({ stay }) => {
  const [incentives, setIncentives] = useState<RipsIncentives | null>(null);

  const handleIncentiveCalculation = () => {
    if (stay.investmentAmount) {
      setIncentives(calculateIncentives(stay.investmentAmount));
    }
  };

  const imageUrl = stay.coverImageId
    ? getAppwriteFilePreviewUrl(stay.coverImageId, 400, 300).href // Optimized for card display
    : '/vercel.svg'; // Fallback for missing image ID, replace with a proper placeholder if needed

  return (
    <div className="group relative max-w-sm rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl duration-300 ease-in-out">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={stay.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {stay.isRips2024Certified && (
          <span className="absolute top-2 right-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-md">
            RIPS 2024 Certified
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-deepTeal-900 truncate" title={stay.name}>
          {stay.name}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 my-2">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span>{stay.proximityToLandmark}</span>
        </div>
        
        {stay.paryatanMitraRating && (
            <div className="flex items-center mb-2" title={`Paryatan Mitra Rating: ${stay.paryatanMitraRating} out of 5`}>
                <span className="text-sm font-medium mr-2 text-deepTeal-800">Paryatan Mitra:</span>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className={i < stay.paryatanMitraRating! ? 'text-amber-500 fill-current' : 'text-gray-300'} />
                    ))}
                </div>
            </div>
        )}

        <p className="text-gray-600 text-sm mb-4 h-12">
            <strong>Unique Experience:</strong> {stay.uniqueExperienceStory || stay.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-deepTeal-800">
            ₹{stay.pricePerNight.toLocaleString('en-IN')}
            <span className="text-sm font-normal text-gray-500"> / night</span>
          </span>
        </div>

        {stay.isRips2024Certified && (
            <div className="mb-4">
                <button 
                    onClick={handleIncentiveCalculation} 
                    className="text-sm text-blue-600 hover:underline"
                >
                    Calculate RIPS 2024 Incentives
                </button>
                {incentives && (
                    <div className="mt-2 p-2 border rounded-lg bg-blue-50 text-xs">
                        <p><strong>Capital Subsidy:</strong> ₹{incentives.capitalSubsidy.toLocaleString('en-IN')}</p>
                        <p><strong>Note:</strong> {incentives.notes.stampDuty}</p>
                        <p><strong>Note:</strong> {incentives.notes.sgstReimbursement}</p>
                    </div>
                )}
            </div>
        )}
        
        <button
          className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VagadStayCard;