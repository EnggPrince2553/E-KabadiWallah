import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/verify-email', { email });
      if (data.success) {
        setSuccess('Email verified. Please enter your new password.');
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { data } = await api.post('/auth/reset-password', { email, newPassword: password });
      if (data.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-dark mb-2">Forgot Password</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">
          {step === 1 ? 'Enter your registered email to reset your password.' : 'Create a new secure password.'}
        </p>
        
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-bold border border-red-100 text-center">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-sm font-bold border border-green-100 text-center">{success}</div>}
        
        {step === 1 ? (
          <form onSubmit={handleVerifyEmail} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm">Email Address</label>
              <input 
                type="email" 
                className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white font-medium" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                placeholder="you@example.com"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-lg font-bold shadow-xl shadow-primary/30 hover:bg-secondary transition-all disabled:opacity-70 mt-4"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm">New Password</label>
              <input 
                type="password" 
                className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white font-medium" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white font-medium" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-lg font-bold shadow-xl shadow-primary/30 hover:bg-secondary transition-all disabled:opacity-70 mt-4"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
        
        <p className="mt-8 text-center text-gray-600 text-sm">
          Remembered your password? <Link to="/login" className="text-primary font-bold hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
