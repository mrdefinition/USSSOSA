
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import About from './pages/About';
import Governance from './pages/Governance';
import Programs from './pages/Programs';
import Community from './pages/Community';
import GraduatingSets from './pages/GraduatingSets';
import SetProfile from './pages/SetProfile';
import Membership from './pages/Membership';
import MemberEvents from './pages/MemberEvents';
import Contact from './pages/Contact';
import News from './pages/News';
import Transparency from './pages/Transparency';
import EthicsPolicy from './pages/EthicsPolicy';
import PrivacyCharter from './pages/PrivacyCharter';
import AdminDashboard from './pages/AdminDashboard';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import GetInvolved from './pages/GetInvolved';
import WhatsAppChat from './pages/WhatsAppChat';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication check
    const savedUser = localStorage.getItem('usssosa_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('usssosa_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('usssosa_user');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-900">
        <div className="text-white text-xl animate-pulse">USSSOSA Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/sets" element={<GraduatingSets />} />
            <Route path="/community/sets/:setId" element={<SetProfile />} />
            <Route path="/community/chat" element={user ? <WhatsAppChat user={user} /> : <Navigate to="/membership" />} />
            <Route path="/news" element={<News />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/transparency/ethics" element={<EthicsPolicy />} />
            <Route path="/transparency/privacy" element={<PrivacyCharter />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/membership" element={<Membership onLogin={handleLogin} user={user} />} />
            <Route path="/member-events" element={<MemberEvents user={user} />} />
            
            {/* Role Based Redirects / Dashboards */}
            <Route 
              path="/admin/*" 
              element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/membership" />} 
            />
            <Route 
              path="/platform-admin/*" 
              element={user?.role === UserRole.PLATFORM_ADMIN ? <PlatformAdminDashboard /> : <Navigate to="/membership" />} 
            />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
};

export default App;
