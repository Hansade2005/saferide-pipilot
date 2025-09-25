import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ThemeProvider } from '@/hooks/useTheme';

function App() {
 return (
 <ThemeProvider>
 <Router>
 <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
 <Header />
 <main className="flex-grow">
 <Routes>
 <Route path="/" element={<HomePage />} />
 <Route path="/login" element={<LoginPage />} />
 <Route path="/signup" element={<SignupPage />} />
 <Route path="/ride-history" element={<RideHistoryPage />} />
 <Route path="/track-ride/:rideId" element={<RideTrackingPage />} />
 <Route path="/login" element={<LoginPage />} />
 <Route path="/signup" element={<SignupPage />} />
 <Route path="/ride-history" element={<RideHistoryPage />} />
 <Route path="/track-ride/:rideId" element={<RideTrackingPage />} />
 {/* Add more routes here as needed */}
 </Routes>
 </main>
 <Footer />
 </div>
 </Router>
 </ThemeProvider>
 );
}

export default App;