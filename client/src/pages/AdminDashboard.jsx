import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { CheckCircle, XCircle, Check, Clock, Package, X } from 'lucide-react';

const AdminDashboard = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingPickup, setEditingPickup] = useState(null);
  const [editData, setEditData] = useState({ weight: '', price: '' });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const { data } = await api.get('/admin/pickups');
      if (data.success) setPickups(data.data);
    } catch (err) {
      setError('Failed to fetch pickups');
    } finally {
      setLoading(false);
    }
  };

  const startCompletion = (pickup) => {
    setEditingPickup(pickup._id);
    setEditData({ weight: pickup.weight, price: pickup.price });
  };

  const cancelCompletion = () => {
    setEditingPickup(null);
    setEditData({ weight: '', price: '' });
  };

  const handleUpdateStatus = async (id, status, extraData = {}) => {
    try {
      const { data } = await api.put(`/admin/pickups/${id}/status`, { status, ...extraData });
      if (data.success) {
        setPickups(pickups.map(p => p._id === id ? { ...p, status, ...extraData } : p));
        setEditingPickup(null);
      }
    } catch (err) {
      alert(err.message || 'Error updating status');
    }
  };

  if (loading) return <Loader />;

  const pendingCount = pickups.filter(p => p.status === 'pending').length;
  const confirmedCount = pickups.filter(p => p.status === 'confirmed').length;
  const completedCount = pickups.filter(p => p.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-dark mb-2">Admin Hub</h1>
          <p className="text-gray-500">Manage scrap collection requests and verify completions.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold flex items-center">
          <CheckCircle size={18} className="mr-2" />
          Active Session: Admin
        </div>
      </div>
      
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">{error}</div>}
      
      {/* Admin Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-amber-50 flex items-center group hover:border-amber-200 transition-all">
          <div className="bg-amber-100 p-5 rounded-2xl mr-6 text-amber-600 group-hover:scale-110 transition-transform"><Clock size={32} /></div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Pending</p>
            <p className="text-4xl font-black text-dark mt-1">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-blue-50 flex items-center group hover:border-blue-200 transition-all">
          <div className="bg-blue-100 p-5 rounded-2xl mr-6 text-blue-600 group-hover:scale-110 transition-transform"><CheckCircle size={32} /></div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active/Confirmed</p>
            <p className="text-4xl font-black text-dark mt-1">{confirmedCount}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-green-50 flex items-center group hover:border-green-200 transition-all">
          <div className="bg-green-100 p-5 rounded-2xl mr-6 text-green-600 group-hover:scale-110 transition-transform"><Package size={32} /></div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Successfully Completed</p>
            <p className="text-4xl font-black text-dark mt-1">{completedCount}</p>
          </div>
        </div>
      </div>
      
      {/* Pickups Table */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-black text-xl text-dark uppercase tracking-tighter">Pickup requests</h3>
          <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{pickups.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">User Details</th>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Material</th>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Logistics</th>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {pickups.map(pickup => (
                <tr key={pickup._id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mr-4 text-slate-400 overflow-hidden border border-slate-200 cursor-zoom-in group-hover:scale-110 transition-transform"
                        onClick={() => pickup.image && setSelectedImage(`http://localhost:5000${pickup.image}`)}
                      >
                        {pickup.image ? (
                          <img src={`http://localhost:5000${pickup.image}`} alt="" className="w-full h-full object-cover" />
                        ) : <Package size={20} />}
                      </div>
                      <div>
                        <div className="text-sm font-black text-dark">{pickup.userId?.name}</div>
                        <div className="text-xs font-medium text-gray-400">{pickup.userId?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-primary capitalize">{pickup.scrapType}</div>
                    <div className="text-xs font-bold text-gray-400">{pickup.weight} kg · ₹{pickup.price}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-dark truncate max-w-[200px]">{pickup.address}</div>
                    <div className="text-xs font-bold text-gray-400 tracking-tight">{new Date(pickup.scheduledDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest
                      ${pickup.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      pickup.status === 'confirmed' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      pickup.status === 'rejected' ? 'bg-red-50 text-red-500' :
                      'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                      {pickup.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {editingPickup === pickup._id ? (
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex space-x-2">
                          <input 
                            type="number" 
                            value={editData.weight} 
                            onChange={(e) => setEditData({...editData, weight: e.target.value})}
                            className="w-20 border border-primary/30 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Kg"
                          />
                          <input 
                            type="number" 
                            value={editData.price} 
                            onChange={(e) => setEditData({...editData, price: e.target.value})}
                            className="w-24 border border-primary/30 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Price"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleUpdateStatus(pickup._id, 'completed', editData)}
                            className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors uppercase"
                          >
                            Finalize
                          </button>
                          <button 
                            onClick={cancelCompletion}
                            className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors uppercase"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end items-center space-x-3">
                        {pickup.status === 'pending' && (
                          <>
                            <button onClick={() => handleUpdateStatus(pickup._id, 'confirmed')} className="text-blue-500 hover:text-blue-700 bg-blue-50 w-9 h-9 flex items-center justify-center rounded-xl transition-colors" title="Confirm"><CheckCircle size={18}/></button>
                            <button onClick={() => handleUpdateStatus(pickup._id, 'rejected', { status: 'rejected' })} className="text-red-400 hover:text-red-600 bg-red-50 w-9 h-9 flex items-center justify-center rounded-xl transition-colors" title="Reject"><XCircle size={18}/></button>
                          </>
                        )}
                        {pickup.status === 'confirmed' && (
                          <button onClick={() => startCompletion(pickup)} className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-xl flex items-center font-black text-xs transition-all shadow-lg shadow-primary/20" title="Complete Pickup">
                            Complete <Check size={14} className="ml-2"/>
                          </button>
                        )}
                        {pickup.status === 'completed' && (
                          <div className="text-green-500 bg-green-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Archived</div>
                        )}
                        {pickup.status === 'rejected' && (
                          <div className="text-gray-400 bg-gray-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Rejected</div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {pickups.length === 0 && (
                <tr><td colSpan="5" className="px-8 py-20 text-center font-bold text-gray-400 uppercase tracking-widest">No active pickup requests.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white hover:text-primary transition-colors bg-white/10 p-3 rounded-full border border-white/20 hover:scale-110"
          >
            <X size={32} />
          </button>
          <div className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center p-2 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <img 
              src={selectedImage} 
              alt="Pickup Preview" 
              className="max-w-full max-h-[80vh] rounded-[2rem] object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
