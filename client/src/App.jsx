import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ChatBot from './components/ChatBot';

// Lazy load Pages or import them directly
import LandingPage from './pages/LandingPage';
import PriceList from './pages/PriceList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import BookPickup from './pages/BookPickup';
import PickupHistory from './pages/PickupHistory';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Loader />;
  if (!user || user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />
      <main className={`flex-grow w-full relative ${!isHomePage ? 'pt-24' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/prices" element={<PriceList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/book-pickup" element={<ProtectedRoute><BookPickup /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><PickupHistory /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
