import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const { login, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@kabadiwala.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // If already logged in as admin, redirect to dashboard
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      if (data && data.data && data.data.role !== 'admin') {
        logout(); // Force logout if a normal user tries to login here
        setError('Access Denied: You do not have administrator privileges.');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-900">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border-t-8 border-primary w-full max-w-md">
        <div className="flex justify-center mb-4">
            <ShieldAlert size={48} className="text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-dark mb-2">Admin Portal</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">Restricted System Access</p>
        
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-bold border border-red-100 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wider">Admin Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white font-medium" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wider">Security Key (Password)</label>
            <input 
              type="password" 
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white font-medium" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-dark text-white py-3.5 rounded-lg font-bold shadow-xl hover:bg-gray-800 transition-all disabled:opacity-70 mt-6 tracking-widest uppercase"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
