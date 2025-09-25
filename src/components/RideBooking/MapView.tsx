import React from 'react';
import { Location } from '@/types';

interface MapViewProps {
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
}

const MapView: React.FC<MapViewProps> = ({ pickupLocation, dropoffLocation }) => {
  // In a real app, this would integrate with Google Maps or Mapbox
  return (
    <div className="relative h-64 w-full rounded-lg overflow-hidden">
      {/* Mock map with SVG */}
      <svg
        className="w-full h-full"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
 >
        <rect width="100%" height="100%" fill="#e5e7eb" />
        <circle cx="100" cy="150" r="8" fill="#3b82f6" />
        <circle cx="300" cy="150" r="8" fill="#ef4444" />
        <line
          x1="100"
          y1="150"
          x2="300"
          y2="150"
          stroke="#3b82f6"
          strokeWidth="2"
 strokeDasharray="5,5"
        />
        {pickupLocation && (
          <text x="100" y="130" fontSize="12" textAnchor="middle" fill="#1f2937">
            {pickupLocation.address}
          </text>
        )}
        {dropoffLocation && (
          <text x="300" y="130" fontSize="12" textAnchor="middle" fill="#1f2937">
            {dropoffLocation.address}
          </text>
        )}
      </svg>
      <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow">
        Mock Map
      </div>
    </div>
  );
};

export default MapView;