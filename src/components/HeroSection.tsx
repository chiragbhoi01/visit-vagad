import React from 'react';
import { Search } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center text-white">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {/* Placeholder for a high-res image or video */}
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('/images/hero-mahi-islands.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
          Discover the Untouched Beauty of Vagad
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Immerse yourself in the serene waters of Mahi and explore ancient tribal heritage.
        </p>

        {/* Smart Search Bar */}
        <div className="mt-8 max-w-4xl mx-auto p-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1">
              <select className="w-full p-3 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E2725B]">
                <option>Banswara</option>
                <option>Dungarpur</option>
              </select>
            </div>
            <div className="md:col-span-1">
              <select className="w-full p-3 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E2725B]">
                <option>Kayaking</option>
                <option>Tribal Craft</option>
                <option>Spiritual</option>
              </select>
            </div>
            <div className="md:col-span-1">
              <input 
                type="date" 
                className="w-full p-3 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
              />
            </div>
            <div className="md:col-span-1">
              <button className="w-full bg-[#E2725B] text-white p-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors">
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
