import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, Clock, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, pending: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshUser();
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/pickup/my');
        if (data.success) {
          const pickups = data.data;
          const pendingCount = pickups.filter(p => p.status === 'pending').length;
          const totalEarnings = pickups
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.price, 0);

          setStats({
            total: pickups.length,
            pending: pendingCount,
            earnings: totalEarnings
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-dark tracking-tight">Welcome back, {user?.name}!</h1>
        <p className="text-gray-500 mt-2 text-lg">Here's an overview of your scrap recycling journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-50 flex items-center hover:-translate-y-1 transition duration-300">
          <div className="bg-primary/10 p-5 rounded-2xl mr-5 text-primary">
            <Package size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Pickups</p>
            <p className="text-3xl font-extrabold text-dark mt-1">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-50 flex items-center hover:-translate-y-1 transition duration-300">
          <div className="bg-amber-100 p-5 rounded-2xl mr-5 text-amber-600">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Pending Requests</p>
            <p className="text-3xl font-extrabold text-dark mt-1">{stats.pending}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-50 flex items-center hover:-translate-y-1 transition duration-300">
          <div className="bg-green-100 p-5 rounded-2xl mr-5 text-green-600">
            <ShieldCheck size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Earnings</p>
            <p className="text-3xl font-extrabold text-dark mt-1">₹{user?.totalEarnings || stats.earnings}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-50 p-10 text-center max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/10 rounded-full"></div>
        <h2 className="text-3xl font-bold mb-4 text-dark relative z-10">Ready to declutter?</h2>
        <p className="text-gray-600 mb-10 text-lg relative z-10">Schedule a pickup at your convenience, get paid the best market rates, and help save the environment.</p>
        <Link to="/book-pickup" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/40 hover:bg-secondary hover:shadow-xl transition relative z-10">
          Book New Pickup
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
