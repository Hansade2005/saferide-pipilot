import { User, Ride, Driver, Payment, RideType, Location, AuthError, ApiError } from '@/types';

// Mock data storage
const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'user@example.com',
    name: 'John Doe',
    phone: '+1234567890',
    createdAt: new Date()
  }
];

const mockRideTypes: RideType[] = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Affordable rides',
    basePrice: 5,
    pricePerKm: 1.5,
    icon: '🚖'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Comfortable rides',
    basePrice: 10,
    pricePerKm: 2.5,
    icon: '🚕'
  },
  {
    id: 'xl',
    name: 'XL',
    description: 'Spacious rides',
    basePrice: 15,
    pricePerKm: 3.5,
    icon: '🚙'
  }
];

const mockDrivers: Driver[] = [
  {
    id: 'driver1',
    name: 'Jane Smith',
    vehicle: 'Toyota Camry',
    rating: 4.8,
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'San Francisco, CA'
    },
    isAvailable: true
  }
];

const mockRides: Ride[] = [];

const mockPayments: Payment[] = [];

// Mock API service
const api = {
  auth: {
    async login(email: string, password: string): Promise<User> {
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return user;
    },
    
    async signup(email: string, password: string, name: string, phone: string): Promise<User> {
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        email,
        name,
        phone,
        createdAt: new Date()
      };
      
      mockUsers.push(newUser);
      return newUser;
    }
  },
  
  rides: {
    async getRideTypes(): Promise<RideType[]> {
      return mockRideTypes;
    },
    
    async requestRide(
      userId: string,
      pickupLocation: Location,
      dropoffLocation: Location,
      rideTypeId: string
    ): Promise<Ride> {
      const rideType = mockRideTypes.find(rt => rt.id === rideTypeId);
      if (!rideType) {
        throw new Error('Invalid ride type');
      }
      
      // Calculate distance (mock)
      const distance = Math.sqrt(
        Math.pow(pickupLocation.lat - dropoffLocation.lat, 2) +
        Math.pow(pickupLocation.lng - dropoffLocation.lng, 2)
      ) * 100;
      
      const newRide: Ride = {
        id: `ride${mockRides.length + 1}`,
        userId,
        driverId: 'driver1', // Assign a driver
        pickupLocation,
        dropoffLocation,
        rideType,
        status: 'requested',
        createdAt: new Date(),
        updatedAt: new Date(),
        price: rideType.basePrice + (distance * rideType.pricePerKm),
        distance,
        duration: distance * 2 // Mock duration
      };
      
      mockRides.push(newRide);
      return newRide;
    },
    
    async getRides(userId: string): Promise<Ride[]> {
      return mockRides.filter(ride => ride.userId === userId);
    },
    
    async getRide(rideId: string): Promise<Ride> {
      const ride = mockRides.find(r => r.id === rideId);
      if (!ride) {
        throw new Error('Ride not found');
      }
      return ride;
    }
  },
  
  drivers: {
    async getAvailableDrivers(location: Location): Promise<Driver[]> {
      // In a real app, this would filter based on actual location
      return mockDrivers.filter(driver => driver.isAvailable);
    },
    
    async trackDriver(driverId: string): Promise<Driver> {
      const driver = mockDrivers.find(d => d.id === driverId);
      if (!driver) {
        throw new Error('Driver not found');
      }
      return driver;
    }
  },
  
  payments: {
    async createPayment(rideId: string, amount: number, method: 'card' | 'wallet' | 'cash'): Promise<Payment> {
      const newPayment: Payment = {
        id: `payment${mockPayments.length + 1}`,
        rideId,
        amount,
        status: 'completed',
        method,
        createdAt: new Date()
      };
      
      mockPayments.push(newPayment);
      return newPayment;
    }
  }
};

export default api;