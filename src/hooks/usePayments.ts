import { useState } from 'react';
import { Payment, ApiError } from '../types';

interface PaymentsContextType {
  payments: Payment[];
  loading: boolean;
  error: ApiError | null;
  processPayment: (rideId: string, amount: number, paymentMethod: 'CARD' | 'WALLET') => Promise<Payment>;
 getPaymentHistory: () => Promise<Payment[]>;
}

export const usePayments = (): PaymentsContextType => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const processPayment = async (rideId: string, amount: number, paymentMethod: 'CARD' | 'WALLET'): Promise<Payment> => {
    try {
      setLoading(true);
      // Mock API call
      const mockPayment: Payment = {
        id: 'payment-' + Math.floor(Math.random() * 1000),
        userId: 'user-123',
        rideId,
        amount,
        status: 'COMPLETED',
        paymentMethod,
        createdAt: new Date()
      };
      
      setPayments(prev => [...prev, mockPayment]);
      setError(null);
      return mockPayment;
    } catch (err) {
      setError({
        status: 500,
        message: 'Failed to process payment',
        errorCode: 'PAYMENT_ERROR',
        details: err instanceof Error ? { error: err.message } : undefined
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPaymentHistory = async (): Promise<Payment[]> => {
    try {
      setLoading(true);
      // Mock API call
      const mockPayments: Payment[] = [
        {
          id: 'payment-1',
          userId: 'user-123',
          rideId: 'ride-1',
          amount: 35.50,
          status: 'COMPLETED',
          paymentMethod: 'CARD',
          createdAt: new Date('2023-01-15')
        },
        {
          id: 'payment-2',
          userId: 'user-123',
          rideId: 'ride-2',
          amount: 120.75,
          status: 'COMPLETED',
          paymentMethod: 'WALLET',
          createdAt: new Date('2023-02-20')
        }
      ];
      
      setPayments(mockPayments);
      setError(null);
      return mockPayments;
    } catch (err) {
      setError({
        status: 500,
        message: 'Failed to fetch payment history',
        errorCode: 'PAYMENT_HISTORY_ERROR',
        details: err instanceof Error ? { error: err.message } : undefined
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    payments,
    loading,
    error,
    processPayment,
    getPaymentHistory
  };
};
