import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
 const navigate = useNavigate();
 const { login, loading, error } = useAuth();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 try {
 await login(email, password);
 navigate('/');
 } catch (err) {
 // Error is already handled by the useAuth hook
 }
 };

 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
 <Card className="w-full max-w-md">
 <CardHeader>
 <CardTitle className="text-2xl font-bold text-center">Login to SafeRide Plus</CardTitle>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleSubmit} className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="email">Email</Label>
 <Input
 id="email"
 type="email"
 placeholder="your@email.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="password">Password</Label>
 <Input
 id="password"
 type="password"
 placeholder="••••••••"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 />
 </div>

 {error && (
 <div className="text-red-500 text-sm">{error.message}</div>
 )}

 <Button type="submit" className="w-full" disabled={loading}>
 {loading ? 'Logging in...' : 'Login'}
 </Button>

 <div className="text-center text-sm text-gray-500 dark:text-gray-400">
 Don't have an account?{' '}
 <Button
 variant="link"
 className="p-0 h-auto font-normal"
 onClick={() => navigate('/signup')}
 >
 Sign up
 </Button>
 </div>
 </form>
 </CardContent>
 </Card>
 </div>
 );
};

export default LoginPage;