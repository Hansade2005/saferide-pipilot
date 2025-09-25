import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Car, History, LogOut, User } from 'lucide-react';

interface NavbarProps {
 onNavigate: (path: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
 const { user, signOut } = useAuth();

 const handleSignOut = async () => {
 await signOut();
 onNavigate('/login');
 };

 return (
 <nav className="bg-white shadow-sm">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between h-16">
 <div className="flex items-center">
 <div className="flex-shrink-0 flex items-center">
 <Car className="h-8 w-8 text-blue-600" />
 <span className="ml-2 text-xl font-bold text-gray-900">SafeRide Plus</span>
 </div>
 </div>
 
 <div className="flex items-center space-x-4">
 {user ? (
 <>
 <Button variant="ghost" onClick={() => onNavigate('/')} className="flex items-center">
 <Car className="h-4 w-4 mr-2" />
 <span>Book Ride</span>
 </Button>
 <Button variant="ghost" onClick={() => onNavigate('/history')} className="flex items-center">
 <History className="h-4 w-4 mr-2" />
 <span>History</span>
 </Button>
 <Button variant="ghost" onClick={() => onNavigate('/profile')} className="flex items-center">
 <User className="h-4 w-4 mr-2" />
 <span>Profile</span>
 </Button>
 <Button variant="ghost" onClick={handleSignOut} className="flex items-center">
 <LogOut className="h-4 w-4 mr-2" />
 <span>Sign Out</span>
 </Button>
 <Avatar className="h-8 w-8">
 <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
 <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
 </Avatar>
 </>
 ) : (
 <>
 <Button variant="ghost" onClick={() => onNavigate('/login')}>Sign In</Button>
 <Button onClick={() => onNavigate('/signup')}>Sign Up</Button>
 </>
 )}
 </div>
 </div>
 </div>
 </nav>
 );
};
