import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { Tag, ArrowRight, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '../context/ChatContext';

const PriceList = () => {
  const { openChat } = useChat();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await api.get('/scrap/prices');
        if (data.success) {
          setPrices(data.data);
        }
      } catch (err) {
        setError('Failed to load scrap prices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20"
          >
            <TrendingUp size={14} />
            <span>Live Market Rates</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-dark mb-6 tracking-tight"
          >
            Daily Scrap <span className="text-primary italic">Price List</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto font-medium"
          >
            We offer the most transparent and competitive rates in the market. Prices are updated daily based on global recycling trends.
          </motion.p>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center font-bold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prices.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                    <Tag className="text-primary" size={28} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Rate per Kg</span>
                    <span className="text-3xl font-black text-primary">₹{item.pricePerKg}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-dark mb-3 capitalize">{item.type}</h3>
                <p className="text-gray-500 font-medium mb-8 text-sm leading-relaxed">
                  Best quality collection for {item.type}. Includes free doorstep pickup and instant digital payment.
                </p>

                <Link 
                  to="/book-pickup" 
                  className="flex items-center justify-center w-full bg-dark text-white py-4 rounded-2xl font-black hover:bg-primary transition-all duration-300 group/btn"
                >
                  Sell This Now
                  <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 bg-primary/5 rounded-[3rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="flex items-center gap-6">
            <div className="bg-primary text-white p-4 rounded-2xl shadow-lg shadow-primary/30">
              <Info size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black text-dark mb-1">Bulk Quantities?</h4>
              <p className="text-gray-500 font-medium text-sm">Contact us for special rates on bulk corporate waste collection.</p>
            </div>
          </div>
          <button 
            onClick={openChat}
            className="whitespace-nowrap bg-white text-dark border-2 border-slate-100 px-8 py-4 rounded-2xl font-black hover:border-primary/30 transition-all"
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PriceList;
