import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { Calendar, MapPin, Weight, DollarSign, Tag } from 'lucide-react';

const PickupHistory = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const { data } = await api.get('/pickup/my');
        if (data.success) setPickups(data.data);
      } catch (err) {
        setError('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };
    fetchPickups();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-dark mb-2">Pickup History</h1>
      <p className="text-gray-500 mb-8">All your past and upcoming schedules.</p>
      
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">{error}</div>}
      
      {pickups.length === 0 && !error ? (
        <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
             <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-500">No pickups scheduled yet.</h3>
          <p className="text-gray-400 mt-2">Book a pickup to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map(pickup => (
            <div key={pickup._id} className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center">
                  <Tag size={14} className="mr-1.5" /> {pickup.scrapType}
                </span>
                <span className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center ${pickup.status === 'completed' ? 'bg-green-100 text-green-700' : pickup.status === 'accepted' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                  {pickup.status}
                </span>
              </div>
              
              {pickup.image && (
                <div className="mb-6 rounded-xl overflow-hidden aspect-video border border-gray-100">
                  <img src={`http://localhost:5000${pickup.image}`} alt="Scrap" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <span className="bg-gray-50 p-1.5 rounded-md mr-3"><Calendar size={16} className="text-gray-500" /></span>
                  {new Date(pickup.scheduledDate).toLocaleString()}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <span className="bg-gray-50 p-1.5 rounded-md mr-3"><Weight size={16} className="text-gray-500" /></span>
                  <span className="font-semibold">{pickup.weight} kg</span>
                </div>
                <div className="flex items-start text-gray-600 text-sm">
                  <span className="bg-gray-50 p-1.5 rounded-md mr-3 mt-0.5"><MapPin size={16} className="text-gray-500" /></span>
                  <span className="line-clamp-2 leading-relaxed">{pickup.address}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Est. Value</span>
                <span className="text-2xl font-extrabold text-dark flex items-center">
                  ₹{pickup.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickupHistory;
