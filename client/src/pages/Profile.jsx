import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, Award, Edit2, Check, X, Camera, XCircle } from 'lucide-react';
import api from '../services/api';

const Profile = () => {
  const { user, setUser, refreshUser } = useContext(AuthContext);
  const [stats, setStats] = useState({ earnings: 0 });

  useEffect(() => {
    refreshUser();
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/pickup/my');
        if (data.success) {
          const earnings = data.data
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + (p.price || 0), 0);
          setStats({ earnings });
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage ? `http://localhost:5000${user.profileImage}` : null);

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      if (formData.password) data.append('password', formData.password);
      if (profileImage) data.append('profileImage', profileImage);

      const response = await api.put('/user/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem('userInfo', JSON.stringify(response.data.data));
        setIsEditing(false);
        setFormData({ ...formData, password: '' });
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-dark tracking-tight">Profile Settings</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your account details and preferences.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="group flex items-center bg-white border-2 border-primary text-primary px-6 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-bold shadow-sm"
          >
            <Edit2 size={18} className="mr-2 group-hover:rotate-12 transition-transform" /> Edit Profile
          </button>
        ) : (
          <button 
            onClick={() => { setIsEditing(false); setError(null); }} 
            className="flex items-center text-gray-500 bg-gray-100 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all font-bold"
          >
            <X size={18} className="mr-2" /> Cancel Changes
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 flex items-center shadow-sm animate-shake">
          <XCircle size={20} className="mr-3 shrink-0" />
          <span className="font-semibold text-sm">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
        {/* Profile Banner */}
        <div className="relative h-48 bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.5),transparent)]"></div>
          <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 md:px-12 pb-12 -mt-20 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">
            {/* Avatar Section */}
            <div className="relative group">
              <div className={`w-40 h-40 bg-white rounded-3xl flex items-center justify-center shadow-2xl border-[8px] border-white overflow-hidden transition-transform duration-500 ${isEditing ? 'ring-4 ring-primary/20 scale-105' : ''}`}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <User size={64} />
                  </div>
                )}
                
                {isEditing && (
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Camera size={32} className="text-white mb-2" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Change Photo</span>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
            </div>

            <div className="flex-1 text-center md:text-left pb-2">
              {!isEditing && (
                <>
                  <h2 className="text-4xl font-black text-dark tracking-tighter">{user.name}</h2>
                  <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                    <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center">
                      <Shield size={14} className="mr-2" /> {user.role} Member
                    </span>
                    {user.role === 'admin' && (
                      <span className="bg-amber-100 text-amber-600 p-1.5 rounded-full shadow-sm">
                        <Award size={16} />
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {isEditing ? (
                <div className="space-y-6 bg-slate-50/50 p-8 rounded-[2rem] border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-slate-600 font-bold text-sm ml-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all font-medium" 
                        required 
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-slate-600 font-bold text-sm ml-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all font-medium" 
                        required 
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-slate-600 font-bold text-sm ml-1">New Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all font-medium" 
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-xl font-black shadow-xl shadow-primary/30 hover:bg-secondary hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
                    >
                      {loading ? 'Processing...' : <><Check size={20} className="mr-2" /> Save Profile Changes</>}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50/70 p-6 rounded-[1.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500">
                      <div className="flex items-center mb-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"><Mail size={20} /></div>
                        <h4 className="ml-4 font-black text-dark text-sm uppercase tracking-widest">Email Address</h4>
                      </div>
                      <p className="text-xl font-bold text-gray-700 break-all">{user.email}</p>
                    </div>
                    
                    <div className="bg-slate-50/70 p-6 rounded-[1.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500">
                      <div className="flex items-center mb-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"><Shield size={20} /></div>
                        <h4 className="ml-4 font-black text-dark text-sm uppercase tracking-widest">Access Level</h4>
                      </div>
                      <p className="text-xl font-bold text-gray-700 capitalize">{user.role} Status</p>
                    </div>

                    <div className="bg-green-50/50 p-6 rounded-[1.5rem] border border-green-100/50 group hover:bg-white hover:shadow-xl hover:shadow-green-200/40 transition-all duration-500 md:col-span-2 lg:col-span-1">
                      <div className="flex items-center mb-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300"><Award size={20} /></div>
                        <h4 className="ml-4 font-black text-dark text-sm uppercase tracking-widest">Total Earnings</h4>
                      </div>
                      <p className="text-3xl font-black text-green-600">₹{user.totalEarnings || stats.earnings || 0}</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 text-primary/10 group-hover:scale-110 transition-transform duration-700"><Award size={140} /></div>
                    <h3 className="text-2xl font-black text-primary mb-2 relative z-10">Premium Member Benefits</h3>
                    <p className="text-primary/70 font-medium leading-relaxed relative z-10">As a verified {user.role}, you have access to prioritized scrap pickups and specialized collection rates across the platform.</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-50 shadow-sm">
                <h3 className="font-black text-dark text-lg mb-6 flex items-center">
                  <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span> Account Activity
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-4 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</p>
                      <p className="text-sm font-bold text-gray-700">Online & Active</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 mr-4"></div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Joined</p>
                      <p className="text-sm font-bold text-gray-700">Member since 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
