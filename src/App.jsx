import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import AuditPage from './pages/AuditPage';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/audit';

  return (
    <div className="relative min-h-screen flex flex-col z-10 w-full overflow-x-hidden">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/audit" element={<AuditPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ReactLenis root>
      <Router>
        <AppContent />
      </Router>
    </ReactLenis>
  );
}

export default App;
