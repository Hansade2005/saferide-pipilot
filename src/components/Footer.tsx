import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = [
 {
 title: 'Company',
 links: [
 { name: 'About Us', path: '/about' },
 { name: 'Careers', path: '/careers' },
 { name: 'Blog', path: '/blog' },
 { name: 'Press', path: '/press' }
 ]
 },
 {
 title: 'Resources',
 links: [
 { name: 'Help Center', path: '/help' },
 { name: 'Privacy Policy', path: '/privacy' },
 { name: 'Terms of Service', path: '/terms' },
 { name: 'Contact Us', path: '/contact' }
 ]
 },
 {
 title: 'Properties',
 links: [
 { name: 'For Sale', path: '/properties/for-sale' },
 { name: 'For Rent', path: '/properties/for-rent' },
 { name: 'New Listings', path: '/properties/new' },
 { name: 'Open Houses', path: '/properties/open-houses' }
 ]
 }
];

export function Footer() {
 return (
 <footer className="bg-gray-100">
 <div className="container mx-auto px-4 py-12">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
 <div className="md:col-span-1">
 <div className="flex items-center space-x-2 mb-4">
 <Building2 className="h-8 w-8 text-primary" />
 <span className="text-xl font-bold text-primary">DreamHome</span>
 </div>
 <p className="text-gray-600 mb-4">
 Your trusted partner in finding the perfect home.
 </p>
 <div className="flex space-x-4">
 <a href="#" className="text-gray-400 hover:text-primary">
 <Facebook className="h-5 w-5" />
 </a>
 <a href="#" className="text-gray-400 hover:text-primary">
 <Twitter className="h-5 w-5" />
 </a>
 <a href="#" className="text-gray-400 hover:text-primary">
 <Instagram className="h-5 w-5" />
 </a>
 <a href="#" className="text-gray-400 hover:text-primary">
 <Linkedin className="h-5 w-5" />
 </a>
 </div>
 </div>

 {footerLinks.map((section) => (
 <div key={section.title}> <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
 <ul className="space-y-2">
 {section.links.map((link) => (
 <li key={link.name}>
 <Link
 to={link.path}
 className="text-gray-600 hover:text-primary transition-colors"
 >
 {link.name}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>

 <div className="border-t border-gray-200 pt-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div>
 <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
 <p className="text-gray-600 mb-4">Stay updated with the latest properties and market trends.</p>
 <div className="flex space-x-2">
 <Input
 type="email"
 placeholder="Enter your email"
 className="flex-grow"
 />
 <Button>Subscribe</Button>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
 <div className="flex items-center text-gray-600 mb-2">
 <Phone className="h-4 w-4 mr-2" />
 <span>(123)456-7890</span>
 </div>
 <div className="flex items-center text-gray-600">
 <Mail className="h-4 w-4 mr-2" />
 <span>info@dreamhome.com</span>
 </div>
 </div>

 <div>
 <h3 className="text-lg font-semibold mb-4">Office Location</h3>
 <div className="flex items-start text-gray-600">
 <MapPin className="h-4 w-4 mr-2 mt-1" />
 <span>123 Main Street, Anytown, USA12345</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
 <p>&copy; {new Date().getFullYear()} DreamHome. All rights reserved.</p>
 </div>
 </div>
 </footer>
 );
}