export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
 createdAt: Date;
}

export interface Location {
  lat: number;
  lng: number;
 address: string;
 label?: string;
}

export interface RideType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  icon: string;
}

export interface Ride {
  id: string;
  userId: string;
  driverId: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: RideType;
  status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  price: number;
 distance: number;
 duration: number;
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  location: Location;
 isAvailable: boolean;
}

export interface Payment {
  id: string;
  rideId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'card' | 'wallet' | 'cash';
 createdAt: Date;
}

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiError {
  status: number;
  message: string;
  code: string;
  details?: any;
}