import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Location, RideType, Ride, Driver } from '@/types';
import api from '@/services/api';
import LocationSelector from '@/components/RideBooking/LocationSelector';
import RideTypeSelector from '@/components/RideBooking/RideTypeSelector';
import MapView from '@/components/RideBooking/MapView';
import DriverTracker from '@/components/DriverTracking/DriverTracker';
import PaymentForm from '@/components/Payment/PaymentForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomePage: React.FC = () => {
 const navigate = useNavigate();
 const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
 const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
 const [rideTypes, setRideTypes] = useState<RideType[]>([]);
 const [selectedRideType, setSelectedRideType] = useState<RideType | null>(null);
 const [currentRide, setCurrentRide] = useState<Ride | null>(null);
 const [driver, setDriver] = useState<Driver | null>(null);
 const [showPayment, setShowPayment] = useState(false);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 // Load ride types
 const loadRideTypes = async () => {
 try {
 const types = await api.rides.getRideTypes();
 setRideTypes(types);
 if (types.length >0) {
 setSelectedRideType(types[0]);
 }
 } catch (err) {
 setError('Failed to load ride types');
 }
 };

 loadRideTypes();
 }, []);

 const handleSearchLocation = async (query: string): Promise<Location[]> => {
 // In a real app, this would call a geocoding API
 // For demo purposes, we'll return mock data
 return [
 {
 lat:37.7749 + Math.random() *0.1,
 lng: -122.4194 + Math.random() *0.1,
 address: `${query} Street, San Francisco, CA`
 },
 {
 lat:37.7749 + Math.random() *0.1,
 lng: -122.4194 + Math.random() *0.1,
 address: `${query} Avenue, San Francisco, CA`
 }
 ];
 };

 const handleRequestRide = async () => {
 if (!pickupLocation || !dropoffLocation || !selectedRideType) {
 setError('Please select pickup, dropoff locations and ride type');
 return;
 }

 setLoading(true);
 setError(null);

 try {
 // Request ride
 const ride = await api.rides.requestRide(
 'user1', // In a real app, this would be the current user ID
 pickupLocation,
 dropoffLocation,
 selectedRideType.id
      );

 // Get available driver
 const drivers = await api.drivers.getAvailableDrivers(pickupLocation);
 if (drivers.length >0) {
 setDriver(drivers[0]);
 }

 setCurrentRide(ride);
 setShowPayment(true);
 } catch (err) {
 setError(err instanceof Error ? err.message : 'Failed to request ride');
 } finally {
 setLoading(false);
 }
 };

 const handlePaymentSuccess = (payment: any) => {
 if (currentRide) {
 // Update ride status
 setCurrentRide(prev => prev ? {...prev, status: 'accepted'} : null);
 // In a real app, you would update the ride status on the server
 }
 setShowPayment(false);
 };

 const handlePaymentError = (error: Error) => {
 setError(error.message);
 };

 return (
 <div className="container mx-auto px-4 py-8">
 <Tabs defaultValue="book" className="w-full">
 <TabsList className="grid w-full grid-cols-2">
 <TabsTrigger value="book">Book a Ride</TabsTrigger>
 <TabsTrigger value="track">Track Ride</TabsTrigger>
 </TabsList>

 <TabsContent value="book">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div className="space-y-6">
 <Card>
 <CardContent className="p-4">
 <LocationSelector
 label="Pickup Location"
 value={pickupLocation}
 onChange={setPickupLocation}
 onSearch={handleSearchLocation}
                  />
 </CardContent>
 </Card>

 <Card>
 <CardContent className="p-4">
 <LocationSelector
 label="Dropoff Location"
 value={dropoffLocation}
 onChange={setDropoffLocation}
 onSearch={handleSearchLocation}
 />
 </CardContent>
 </Card>

 <Card>
 <CardContent className="p-4">
 <RideTypeSelector
 rideTypes={rideTypes}
 selectedRideType={selectedRideType}
 onSelect={setSelectedRideType}
 />
 </CardContent>
 </Card>

 <Button
 onClick={handleRequestRide}
 className="w-full py-6 text-lg"
 disabled={loading || !pickupLocation || !dropoffLocation || !selectedRideType}
 >
 {loading ? 'Requesting Ride...' : 'Request Ride'}
 </Button>

 {error && (
 <div className="text-red-500 text-center">{error}</div>
 )}
 </div>

 <div>
 <MapView
 pickupLocation={pickupLocation}
 dropoffLocation={dropoffLocation}
 />
 </div>
 </div>
 </TabsContent>

 <TabsContent value="track">
 {currentRide && driver ? (
 <div className="space-y-6">
 <DriverTracker
 driver={driver}
 pickupLocation={currentRide.pickupLocation}
 dropoffLocation={currentRide.dropoffLocation}
 rideStatus={currentRide.status}
 />

 <Card>
 <CardContent className="p-4">
 <div className="flex justify-between items-center">
 <div>
 <h3 className="font-semibold">Ride Details</h3>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {currentRide.pickupLocation.address} → {currentRide.dropoffLocation.address}
 </p>
 </div>
 <div className="text-right">
 <p className="font-medium">
 ${currentRide.price.toFixed(2)}
 </p>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {currentRide.distance.toFixed1)} km • {currentRide.duration.toFixed(0)} min
 </p>
 </div>
 </div>
 </CardContent>
 </Card>
 </div>
 ) : (
 <div className="text-center py-8 text-gray-500 dark:text-gray-400">
 No active ride to track
 </div>
 )}
 </TabsContent>
 </Tabs>

 {showPayment && currentRide && (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
 <PaymentForm
 amount={currentRide.price}
 onPaymentSuccess={handlePaymentSuccess}
 onPaymentError={handlePaymentError}
 />
 <Button
 variant="outline"
 className="mt-4 w-full"
 onClick={() => setShowPayment(false)}
 >
 Cancel
 </Button>
 </div>
 </div>
 )}
 </div>
 );
};

export default HomePage;