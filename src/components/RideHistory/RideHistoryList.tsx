import React from 'react';
import { Ride } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RideHistoryListProps {
 rides: Ride[];
 onSelectRide: (ride: Ride) => void;
}

const RideHistoryList: React.FC<RideHistoryListProps> = ({ rides, onSelectRide }) => {
 const getStatusColor = (status: Ride['status']) => {
 switch (status) {
 case 'completed':
 return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
 case 'cancelled':
 return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
 case 'in_progress':
 return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
 case 'accepted':
 return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
 default:
 return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
 }
 };

 return (
 <div className="space-y-4">
 {rides.length ===0 ? (
 <div className="text-center py-8 text-gray-500 dark:text-gray-400">
 No ride history yet
 </div>
 ) : (
 rides.map((ride) => (
 <Card
 key={ride.id}
 className="cursor-pointer hover:shadow-md transition-shadow"
 onClick={() => onSelectRide(ride)}
 >
 <CardContent className="p-4">
 <div className="flex justify-between items-start">
 <div>
 <div className="flex items-center space-x-2">
 <div className="text-xl">{ride.rideType.icon}</div>
 <h3 className="font-semibold">{ride.rideType.name}</h3>
 </div>
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
 {ride.pickupLocation.address} → {ride.dropoffLocation.address}
 </p>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {new Date(ride.createdAt).toLocaleString()}
 </p>
 </div>
 <div className="flex flex-col items-end">
 <Badge className={getStatusColor(ride.status)}>
 {ride.status.replace('_', ' ')}
 </Badge>
 <p className="font-medium mt-1">
 ${ride.price.toFixed(2)}
 </p>
 </div>
 </div>
 </CardContent>
 </Card>
 ))
 )}
 </div>
 );
};

export default RideHistoryList;