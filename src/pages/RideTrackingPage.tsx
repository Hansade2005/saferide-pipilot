import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ride, Driver } from '@/types';
import api from '@/services/api';
import DriverTracker from '@/components/DriverTracking/DriverTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RideTrackingPage: React.FC = () => {
 const { rideId } = useParams<{ rideId: string }>();
 const navigate = useNavigate();
 const [ride, setRide] = useState<Ride | null>(null);
 const [driver, setDriver] = useState<Driver | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 if (!rideId) {
 setError('Ride ID is required');
 setLoading(false);
 return;
 }

 const loadRideDetails = async () => {
 try {
 // Load ride details
 const rideData = await api.rides.getRide(rideId);
 setRide(rideData);

 // Load driver details
 const driverData = await api.drivers.trackDriver(rideData.driverId);
 setDriver(driverData);
 } catch (err) {
 setError(err instanceof Error ? err.message : 'Failed to load ride details');
 } finally {
 setLoading(false);
 }
 };

 loadRideDetails();
 }, [rideId]);

 if (loading) {
 return (
 <div className="min-h-screen flex items-center justify-center">
 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
 </div>
 );
 }

 if (error) {
 return (
 <div className="min-h-screen flex items-center justify-center">
 <div className="text-red-500 text-center">
 <p className="mb-4">{error}</p>
 <Button onClick={() => navigate('/')}>Back to Home</Button>
 </div>
 </div>
 );
 }

 if (!ride || !driver) {
 return (
 <div className="min-h-screen flex items-center justify-center">
 <div className="text-center">
 <p className="mb-4">Ride not found</p>
 <Button onClick={() => navigate('/')}>Back to Home</Button>
 </div>
 </div>
 );
 }

 return (
 <div className="container mx-auto px-4 py-8">
 <Card>
 <CardHeader>
 <CardTitle>Track Your Ride</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <DriverTracker
 driver={driver}
 pickupLocation={ride.pickupLocation}
 dropoffLocation={ride.dropoffLocation}
 rideStatus={ride.status}
 />

 <Card>
 <CardContent className="p-4">
 <div className="flex justify-between items-center">
 <div>
 <h3 className="font-semibold">Ride Details</h3>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {ride.pickupLocation.address} → {ride.dropoffLocation.address}
 </p>
 </div>
 <div className="text-right">
 <p className="font-medium">
 ${ride.price.toFixed(2)}
 </p>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {ride.distance.toFixed(1)} km • {ride.duration.toFixed(0)} min
 </p>
 </div>
 </div>
 </CardContent>
 </Card>

 <div className="flex justify-end">
 <Button onClick={() => navigate('/')}>Back to Home</Button>
 </div>
 </CardContent>
 </Card>
 </div>
 );
};

export default RideTrackingPage;