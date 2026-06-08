import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const BookPickup = () => {
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    scrapType: '',
    weight: '',
    address: '',
    scheduledDate: ''
  });
  const [image, setImage] = useState(null);

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await api.get('/scrap/prices');
        if (data.success) {
          setPrices(data.data);
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, scrapType: data.data[0].type }));
          }
        }
      } catch (err) {
        setError('Failed to load scrap prices.');
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    if (formData.scrapType && formData.weight) {
      const selectedScrap = prices.find(p => p.type === formData.scrapType);
      if (selectedScrap) {
        setEstimatedPrice(selectedScrap.pricePerKg * Number(formData.weight));
      }
    } else {
      setEstimatedPrice(0);
    }
  }, [formData.scrapType, formData.weight, prices]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('scrapType', formData.scrapType);
      dataToSubmit.append('weight', formData.weight);
      dataToSubmit.append('address', formData.address);
      dataToSubmit.append('scheduledDate', formData.scheduledDate);
      dataToSubmit.append('price', estimatedPrice);
      if (image) {
        dataToSubmit.append('image', image);
      }

      const { data } = await api.post('/pickup/create', dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (data.success) {
        navigate('/history');
      }
    } catch (err) {
      setError(err.message || 'Failed to book pickup');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl transition duration-500">
        <h1 className="text-3xl font-extrabold text-dark mb-2">Schedule a Pickup</h1>
        <p className="text-gray-500 mb-8">Enter details to schedule a verified scrap collector to arrive.</p>
        
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Scrap Category</label>
              <div className="relative">
                <select 
                  name="scrapType" 
                  value={formData.scrapType} 
                  onChange={handleChange} 
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white"
                  required
                >
                  {prices.map(p => (
                    <option key={p._id} value={p.type}>{p.type} (₹{p.pricePerKg}/kg)</option>
                  ))}
                  {prices.length === 0 && <option value="">No prices available</option>}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Estimated Weight (kg)</label>
              <input 
                type="number" 
                name="weight" 
                min="1" 
                value={formData.weight} 
                onChange={handleChange} 
                className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white"
                placeholder="e.g. 10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Pickup Address</label>
            <textarea 
              name="address" 
              rows="3" 
              value={formData.address} 
              onChange={handleChange} 
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white resize-none"
              placeholder="Enter complete address including landmarks"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Preferred Date & Time</label>
            <input 
              type="datetime-local" 
              name="scheduledDate" 
              value={formData.scheduledDate} 
              onChange={handleChange} 
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Scrap Image (Optional)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange} 
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white"
            />
          </div>

          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col sm:flex-row justify-between items-center sm:items-end mt-8">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Estimated Earnings</p>
              <p className="text-4xl font-extrabold text-primary mt-1 shadow-sm">₹{estimatedPrice.toFixed(2)}</p>
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-primary/30 hover:bg-secondary transition disabled:opacity-70"
            >
              {submitting ? 'Booking...' : 'Confirm Pickup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookPickup;
