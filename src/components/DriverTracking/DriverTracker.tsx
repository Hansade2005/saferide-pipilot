import React, { useState, useEffect } from 'react';
import { Driver, Location } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DriverTrackerProps {
  driver: Driver;
  pickupLocation: Location;
  dropoffLocation: Location;
  rideStatus: 'requested' | 'accepted' | 'in_progress' | 'completed';
}

const DriverTracker: React.FC<DriverTrackerProps> = ({
  driver,
  pickupLocation,
  dropoffLocation,
  rideStatus
}) => {
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState('Calculating...');

  useEffect(() => {
    if (rideStatus === 'in_progress') {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      // Simulate ETA
      const etaInterval = setInterval(() => {
        const minutes = Math.floor(Math.random() * 10) + 1;
        setEta(`${minutes} min`);
      }, 2000);

      return () => {
        clearInterval(interval);
        clearInterval(etaInterval);
      };
    }
  }, [rideStatus]);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l92-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{driver.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {driver.vehicle} • {driver.rating} ★
            </p>
          </div>
        </div>

        {rideStatus === 'in_progress' && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm mt-2">
              <span>Estimated Time</span>
              <span>{eta}</span>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">{pickupLocation.address}</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">{dropoffLocation.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverTracker;