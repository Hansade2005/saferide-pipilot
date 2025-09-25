import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ride } from '@/types';
import api from '@/services/api';
import RideHistoryList from '@/components/RideHistory/RideHistoryList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RideHistoryPage: React.FC = () => {
 const navigate = useNavigate();
 const [rides, setRides] = useState<Ride[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 const loadRides = async () => {
 try {
 // In a real app, this would use the current user ID
 const userRides = await api.rides.getRides('user1');
 setRides(userRides);
 } catch (err) {
 setError(err instanceof Error ? err.message : 'Failed to load ride history');
 } finally {
 setLoading(false);
 }
 };

 loadRides();
 }, []);

 const handleSelectRide = (ride: Ride) => {
 // In a real app, this would navigate to a ride details page
 console.log('Selected ride:', ride);
 };

 return (
 <div className="container mx-auto px-4 py-8">
 <Card>
 <CardHeader>
 <CardTitle>Ride History</CardTitle>
 </CardHeader>
 <CardContent>
 {loading ? (
 <div className="flex justify-center py-8">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
 </div>
 ) : error ? (
 <div className="text-red-500 text-center py-8">{error}</div>
 ) : (
 <RideHistoryList rides={rides} onSelectRide={handleSelectRide} />
 )}
 </CardContent>
 </Card>
 </div>
 );
};

export default RideHistoryPage;