import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const Footer = () => {
  const { openChat } = useChat();
  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Recycle className="text-white" size={24} />
              </div>
              <span className="ml-3 text-2xl font-black tracking-tighter text-white">E-Kabadi<span className="text-primary">wala</span></span>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed">
              Making professional scrap collection accessible to everyone while contributing to a greener, more sustainable planet.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-xl hover:bg-primary transition-colors duration-300"><Facebook size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-xl hover:bg-primary transition-colors duration-300"><Twitter size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-xl hover:bg-primary transition-colors duration-300"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary">Quick Links</h4>
            <ul className="space-y-4 font-medium text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home Page</Link></li>
              <li><Link to="/book-pickup" className="hover:text-primary transition-colors">Book a Pickup</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">User Dashboard</Link></li>
              <li><button onClick={openChat} className="hover:text-primary transition-colors text-left">Support Chat</button></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">SignIn / Login</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Join as Member</Link></li>
              <li><Link to="/admin/login" className="text-gray-500 hover:text-white transition-colors pt-2 block border-t border-white/5 mt-2">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary">Our Services</h4>
            <ul className="space-y-4 font-medium text-gray-400 text-sm">
              <li className="flex items-center hover:text-primary transition-colors cursor-pointer text-gray-400 group">
                <Link to="/book-pickup" className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:scale-150 transition-transform"></span> Household Scrap</Link>
              </li>
              <li className="flex items-center hover:text-primary transition-colors cursor-pointer text-gray-400 group">
                <Link to="/book-pickup" className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:scale-150 transition-transform"></span> E-Waste Disposal</Link>
              </li>
              <li className="flex items-center hover:text-primary transition-colors cursor-pointer text-gray-400 group">
                <Link to="/book-pickup" className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:scale-150 transition-transform"></span> Office Paper Pickup</Link>
              </li>
              <li className="flex items-center hover:text-primary transition-colors cursor-pointer text-gray-400 group">
                <Link to="/book-pickup" className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:scale-150 transition-transform"></span> Metal & Plastic</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary">Get in Touch</h4>
            <ul className="space-y-4 font-medium text-gray-400 text-sm">
              <li className="flex items-center hover:text-white transition-colors cursor-pointer" onClick={openChat}>
                <Mail size={18} className="mr-4 text-primary" /> surajpandit8112004@gmail.com
              </li>
              <li className="flex items-center hover:text-white transition-colors cursor-pointer" onClick={openChat}>
                <Phone size={18} className="mr-4 text-primary" /> +91 7080393974
              </li>
              <li className="flex items-start hover:text-white transition-colors cursor-pointer">
                <MapPin size={18} className="mr-4 text-primary mt-1" /> Bakshi ka Talab, Lucknow, Uttar Pradesh - 226201
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()}   E-Kabadiwala. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
