import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-dark mb-2">Join Kabadiwala</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">Create your account to start selling scrap.</p>
        
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-bold border border-red-100 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm">Full Name</label>
            <input 
              type="text" 
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white font-medium" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              placeholder="John Doe"
            />
          </div>
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
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm">Password</label>
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
            <label className="block text-gray-700 font-bold mb-2 text-sm">Confirm Password</label>
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
            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold shadow-xl shadow-primary/30 hover:bg-secondary transition-all disabled:opacity-70 mt-6"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
