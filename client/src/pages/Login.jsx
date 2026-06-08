import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await login(email, password);
      if (result && result.data && result.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-dark mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">Please enter your details to sign in.</p>
        
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-bold border border-red-100 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
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
          
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm font-bold text-primary hover:text-secondary transition-colors">Forgot Password?</Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold shadow-xl shadow-primary/30 hover:bg-secondary transition-all disabled:opacity-70 mt-4"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-600 text-sm">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
