'use client';

import React from 'react';
import { ArtisanProduct } from '@/lib/types'; // Corrected import
import { ShieldCheck, Sprout, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { getAppwriteFilePreviewUrl } from '@/lib/storage'; // New import

interface BhilBazaarCardProps {
  product: ArtisanProduct;
}

// --- Appwrite Interaction Logic ---
const handleReserveProduct = async (productId: string) => {
  console.log(`Reserving product ${productId}...`);
  // In a real implementation, you would call an Appwrite function
  // or create a 'reservation' document here.
  // e.g., await functions.createExecution('reserveProduct', JSON.stringify({ productId }));
  alert(`Product ${productId} reserved! You will be contacted for collection.`);
};

const BhilBazaarCard: React.FC<BhilBazaarCardProps> = ({ product }) => {
  const imageUrl = product.imageId
    ? getAppwriteFilePreviewUrl(product.imageId, 400, 300).href // Optimized for card display
    : '/vercel.svg'; // Fallback for missing image ID, replace with a proper placeholder if needed

  return (
    <div className="group relative max-w-sm rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl duration-300 ease-in-out">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-[#004D40] truncate" title={product.name}>
                {product.name}
            </h3>
            {product.artisan.isGovtVerified && (
                <div className="flex-shrink-0 flex items-center gap-1 text-green-700" title="Government Verified Artisan">
                    <ShieldCheck size={18} />
                    <span className="text-xs font-medium">Verified</span>
                </div>
            )}
        </div>

        <p className="text-gray-500 text-sm mb-4 h-10">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#004D40]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-full" title="Sustainable Product">
                <Sprout size={16} />
                <span className="text-xs font-medium">Sustainable</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleReserveProduct(product.$id)}
          className="w-full bg-[#E2725B] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E2725B] focus:ring-opacity-75 flex items-center justify-center gap-2"
          aria-label={`Click and Collect for ${product.name}`}
        >
          <ShoppingCart size={20} />
          Click & Collect
        </button>
      </div>
    </div>
  );
};

export default BhilBazaarCard;