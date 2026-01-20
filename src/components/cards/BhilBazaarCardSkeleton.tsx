import React from 'react';

const BhilBazaarCardSkeleton: React.FC = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-200 animate-pulse">
      <div className="relative w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded-full w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default BhilBazaarCardSkeleton;
