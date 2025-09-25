import React, { useState } from 'react';
import { Payment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (payment: Payment) => void;
  onPaymentError: (error: Error) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'cash'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const payment: Payment = {
        id: `payment-${Date.now()}`,
        rideId: '', // This would be set when creating the ride
        amount,
        status: 'completed',
        method: paymentMethod,
        createdAt: new Date()
      };

      onPaymentSuccess(payment);
    } catch (error) {
      onPaymentError(error instanceof Error ? error : new Error('Payment failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-2xl font-bold">
            ${amount.toFixed(2)}
          </div>

          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as 'card' | 'wallet' | 'cash')}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M310h18M715h1m40h1m-74h12a330003-3V8a33000-3-3H6a33000-33v8a3300033z"
 />
 </svg>
 <span className="mt-2 text-sm">Card</span>
 </Label>
 </div>
 <div>
 <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
 <Label
 htmlFor="wallet"
 className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
 >
 <svg
 xmlns="http://www.w3.org/2000/svg"
 className="h-6 w-6"
 fill="none"
 viewBox="002424"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M179V7a22000-2-2H5a22000-22v6a2200022h2m24h10a220002-2v-6a22000-2-2H9a22000-22v6a2200022zm7-5a22011-402200140z"
 />
 </svg>
 <span className="mt-2 text-sm">Wallet</span>
 </Label>
 </div>
 <div>
 <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
 <Label
 htmlFor="cash"
 className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
 >
 <svg
 xmlns="http://www.w3.org/2000/svg"
 className="h-6 w-6"
 fill="none"
 viewBox="002424"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M128c-1.6570-3 .895-32s1.3432323 .89532-1.3432-32m0-8c1.1102.08.4022.5991M128V7m01v8m00v1m0-1c-1.110-2.08-.402-2.599-1M2112a99011-18099001180z"
 />
 </svg>
 <span className="mt-2 text-sm">Cash</span>
 </Label>
 </div>
 </RadioGroup>

 {paymentMethod === 'card' && (
 <div className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="cardNumber">Card Number</Label>
 <Input
 id="cardNumber"
 placeholder="1234123412341234"
 value={cardDetails.number}
 onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label htmlFor="expiry">Expiry Date</Label>
 <Input
 id="expiry"
 placeholder="MM/YY"
 value={cardDetails.expiry}
 onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="cvv">CVV</Label>
 <Input
 id="cvv"
 placeholder="123"
 value={cardDetails.cvv}
 onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
 />
 </div>
 </div>
 <div className="space-y-2">
 <Label htmlFor="name">Name on Card</Label>
 <Input
 id="name"
 placeholder="John Doe"
 value={cardDetails.name}
 onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
 />
 </div>
 </div>
 )}

 <Button type="submit" className="w-full" disabled={loading}>
 {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
 </Button>
 </form>
 </CardContent>
 </Card>
 );
};

export default PaymentForm;