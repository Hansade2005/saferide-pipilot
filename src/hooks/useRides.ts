import { useState, useEffect } from 'react';
import { Ride, Location, ApiError } from '../types';

interface RidesContextType {
  rides: Ride[];
  loading: boolean;
  error: ApiError | null;
  createRide: (pickup: Location, dropoff: Location, rideType: 'ECONOMY' | 'PREMIUM' | 'XL') => Promise<Ride>;
  getRideHistory: () => Promise<Ride[]>;
  trackRide: (rideId: string) => Promise<Ride>;
}

export const useRides = (): RidesContextType => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createRide = async (pickup: Location, dropoff: Location, rideType: 'ECONOMY' | 'PREMIUM' | 'XL'): Promise<Ride> => {
    try {
      setLoading(true);
      // Mock API call
      const mockRide: Ride = {
        id: 'ride-' + Math.floor(Math.random() * 1000),
        userId: 'user-123',
        driverId: 'driver-' + Math.floor(Math.random() * 100),
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        rideType,
        status: 'REQUESTED',
        fare: Math.floor(Math.random() * 50) + 10,
        distance: Math.floor(Math.random() * 20) + 5,
        duration: Math.floor(Math.random() * 30) + 10,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setRides(prev => [...prev, mockRide]);
      setError(null);
      return mockRide;
    } catch (err) {
      setError({
        status: 500,
        message: 'Failed to create ride',
        errorCode: 'RIDE_CREATION_ERROR',
        details: err instanceof Error ? { error: err.message } : undefined
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRideHistory = async (): Promise<Ride[]> => {
    try {
      setLoading(true);
      // Mock API call
      const mockRides: Ride[] = [
        {
          id: 'ride-1',
          userId: 'user-123',
          driverId: 'driver-1',
          pickupLocation: {
            latitude: 37.7749,
            longitude: -122.4194,
            address: 'San Francisco, CA'
          },
          dropoffLocation: {
            latitude: 34.0522,
            longitude: -118.2437,
            address: 'Los Angeles, CA'
          },
          rideType: 'ECONOMY',
          status: 'COMPLETED',
          fare: 35.50,
          distance: 347,
          duration: 45,
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2023-01-15')
        },
        {
          id: 'ride-2',
          userId: 'user-123',
          driverId: 'driver-2',
          pickupLocation: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: 'New York, NY'
          },
          dropoffLocation: {
            latitude: 37.3382,
            longitude: -121.8863,
            address: 'San Jose, CA'
          },
          rideType: 'PREMIUM',
          status: 'COMPLETED',
          fare: 120.75,
          distance: 2921,
          duration: 270,
          createdAt: new Date('2023-02-20'),
          updatedAt: new Date('2023-02-20')
        }
      ];
      
      setRides(mockRides);
      setError(null);
      return mockRides;
    } catch (err) {
      setError({
        status: 500,
        message: 'Failed to fetch ride history',
        errorCode: 'RIDE_HISTORY_ERROR',
        details: err instanceof Error ? { error: err.message } : undefined
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const trackRide = async (rideId: string): Promise<Ride> => {
    try {
      setLoading(true);
      // Mock API call
      const mockRide: Ride = {
        id: rideId,
        userId: 'user-123',
        driverId: 'driver-' + Math.floor(Math.random() * 100),
        pickupLocation: {
          latitude: 37.7749,
          longitude: -122.4194,
          address: 'San Francisco, CA'
        },
        dropoffLocation: {
          latitude: 34.0522,
          longitude: -118.2437,
          address: 'Los Angeles, CA'
        },
        rideType: 'ECONOMY',
        status: 'IN_PROGRESS',
        fare: Math.floor(Math.random() * 50) + 10,
        distance: Math.floor(Math.random() * 20) + 5,
        duration: Math.floor(Math.random() * 30) + 10,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setRides(prev => prev.map(ride => ride.id === rideId ? mockRide : ride));
      setError(null);
      return mockRide;
    } catch (err) {
      setError({
        status: 500,
        message: 'Failed to track ride',
        errorCode: 'RIDE_TRACKING_ERROR',
        details: err instanceof Error ? { error: err.message } : undefined
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    rides,
    loading,
    error,
    createRide,
    getRideHistory,
    trackRide
  };
};
