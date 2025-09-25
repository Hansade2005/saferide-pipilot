import { useState, useEffect } from 'react';
import { Driver, Location, ApiError } from '../types';

interface DriversContextType {
  drivers: Driver[];
  loading: boolean;
  error: ApiError | null;
  getAvailableDrivers: (location: Location) => Promise<Driver[]>;
 trackDriver: (driverId: string) => Promise<Driver>;
}

export const useDrivers = (): DriversContextType => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const getAvailableDrivers = async (location: Location): Promise<Driver[]> => {
    try {
      setLoading(true);
      // Mock API call
      const mockDrivers: Driver[] = [
        {
          id: 'driver-1',
          name: 'John Smith',
          vehicle: 'Toyota Camry',
          licensePlate: 'ABC123',
          rating: 4.8,
          location: {
            latitude: location.latitude + 0.01,
            longitude: location.longitude + 0.01,
            address: 'Nearby Location'
          },
          isAvailable: true
        },
        {
          id: 'driver-2',
          name: 'Sarah Johnson',
          vehicle: 'Honda Accord',
          licensePlate: 'XYZ789',
          rating: 4.5,
          location: {
            latitude: location.latitude - 0.01,
            longitude: location.longitude - 0.01,
            address: 'Nearby Location'
          },
          isAvailable: true
        },
        {
          id: 'driver-3',
          name: 'Michael Brown',
          vehicle: 'Ford Fusion',
          licensePlate: 'DEF456',
          rating: 4.2,
          location: {
            latitude: location.latitude + 0.02,
            longitude: location.longitude + 0.02,
            address: 'Nearby Location'
          },
          isAvailable: true
        }
      ];
      
      setDrivers(mockDrivers);
      setError(null);
      return mockDrivers;
    } catch (err) {
      setError({
        status: 500,
        message: 'Failed to fetch available drivers',
        errorCode: 'DRIVER_FETCH_ERROR',
        details: err instanceof Error ? { error: err.message } : undefined
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const trackDriver = async (driverId: string): Promise<Driver> => {
    try {
      setLoading(true);
      // Mock API call
      const mockDriver: Driver = {
        id: driverId,
        name: 'John Smith',
        vehicle: 'Toyota Camry',
        licensePlate: 'ABC123',
        rating: 4.8,
        location: {
          latitude: 37.7749 + Math.random() * 0.01,
          longitude: -122.4194 + Math.random() * 0.01,
          address: 'Current Location'
        },
        isAvailable: true
      };
      
      setDrivers(prev => prev.map(driver => driver.id === driverId ? mockDriver : driver));
      setError(null);
      return mockDriver;
    } catch (err) {
      setError({
        status: 500,
        message: 'Failed to track driver',
        errorCode: 'DRIVER_TRACKING_ERROR',
        details: err instanceof Error ? { error: err.message } : undefined
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    drivers,
    loading,
    error,
    getAvailableDrivers,
    trackDriver
  };
};
