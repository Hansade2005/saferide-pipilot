import React from 'react';
import { RideType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface RideTypeSelectorProps {
  rideTypes: RideType[];
  selectedRideType: RideType | null;
  onSelect: (rideType: RideType) => void;
}

const RideTypeSelector: React.FC<RideTypeSelectorProps> = ({ rideTypes, selectedRideType, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {rideTypes.map((rideType) => (
        <Card
          key={rideType.id}
          className={`cursor-pointer transition-all ${
            selectedRideType?.id === rideType.id
              ? 'border-2 border-blue-500 shadow-lg'
              : 'hover:shadow-md'
          }`}
          onClick={() => onSelect(rideType)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{rideType.icon}</div>
              <div>
                <h3 className="font-semibold">{rideType.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{rideType.description}</p>
                <p className="text-sm font-medium mt-1">
                  From ${rideType.basePrice.toFixed(2)} + ${rideType.pricePerKm.toFixed(2)}/km
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RideTypeSelector;