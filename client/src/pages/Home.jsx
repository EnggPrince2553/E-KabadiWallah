import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, DollarSign, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary/5 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark tracking-tight mb-6">
            Turn Your Scrap Into <span className="text-primary drop-shadow-sm">Cash</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The smartest, easiest, and most eco-friendly way to dispose of your household scrap. Get instant prices and schedule free pick-ups.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-primary text-white px-8 py-3.5 rounded-lg shadow-xl shadow-primary/30 hover:bg-secondary hover:-translate-y-1 transition duration-300 text-lg font-bold">Get Started</Link>
            <Link to="/book-pickup" className="bg-white text-primary border border-gray-200 px-8 py-3.5 rounded-lg shadow-md hover:bg-gray-50 hover:-translate-y-1 transition duration-300 text-lg font-bold">Book Pickup</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark">Why Choose Kabadiwala?</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100 group hover:-translate-y-2 transition-all duration-300">
              <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                <DollarSign size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">Best Prices</h3>
              <p className="text-gray-600 leading-relaxed">We offer highly competitive and transparent prices for all categories of scrap materials directly into your wallet.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100 group hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <Clock size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">Schedule Anytime</h3>
              <p className="text-gray-600 leading-relaxed">Book a pickup at your convenience. Our certified collectors will arrive exactly at your specified time.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100 group hover:-translate-y-2 transition-all duration-300">
              <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600 group-hover:scale-110 transition-transform">
                <Leaf size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-dark">Eco Friendly</h3>
              <p className="text-gray-600 leading-relaxed">100% of the collected scrap goes to certified recycling centers to reduce carbon footprints and protect our environment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
