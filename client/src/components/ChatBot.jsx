import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MessageSquare, Headset } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const ChatBot = () => {
  const { isChatOpen, closeChat } = useChat();

  const contactInfo = {
    phone: "+91 8303572574",
    email: "prince24080@gmail.com"
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeChat}
            className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-[60] md:hidden"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-[2.5rem] shadow-2xl shadow-primary/20 border border-primary/10 overflow-hidden z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white relative">
              <button
                onClick={closeChat}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-xl transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <Headset size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">Support Chat</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">We're Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-dark font-black text-lg">Hello there! 👋</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  How can we help you today? Our support team is available 24/7 to assist you.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 rounded-2xl transition-all group"
                >
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Call Us</p>
                    <p className="text-dark font-bold">{contactInfo.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 rounded-2xl transition-all group"
                >
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-dark font-bold break-all">{contactInfo.email}</p>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                  Typical response time: under 5 minutes
                </p>
              </div>
            </div>

            {/* Footer decoration */}
            <div className="h-2 bg-primary/10 w-full" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
