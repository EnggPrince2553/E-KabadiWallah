import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, DollarSign, Clock, Shield, ArrowRight, Star, CheckCircle2, Package, Truck, Recycle } from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featureCards = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Best Market Rates",
      desc: "Get instant, competitive, and transparent pricing for all your scrap materials.",
      color: "bg-emerald-500/10 text-emerald-600",
      delay: 0.1
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "On-Time Pickups",
      desc: "Schedule according to your convenience. Our certified collectors arrive as promised.",
      color: "bg-blue-500/10 text-blue-600",
      delay: 0.2
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Eco-Friendly Disposal",
      desc: "We ensure 100% of collected scrap goes to certified recycling centers.",
      color: "bg-green-500/10 text-green-600",
      delay: 0.3
    }
  ];

  const steps = [
    { id: 1, title: "Book Online", desc: "Schedule a pickup through our website or app in seconds.", icon: <CheckCircle2 /> },
    { id: 2, title: "Weight & Pay", desc: "Our collector arrives, weighs items transparently, and pays instantly.", icon: <Truck /> },
    { id: 3, title: "Eco-Friendly", desc: "Your scrap is sorted and sent to professional recycling plants.", icon: <Leaf /> }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.05),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center md:text-left"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>Trusted by 10,000+ Households</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-dark leading-[1.1] mb-8 tracking-tighter">
                Transform Your <span className="text-primary italic relative">Scrap
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6C50 1.5 150 1.5 199 6" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span> Into Impact & Cash.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl text-gray-500 mb-10 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                The most professional way to sell your household scrap. Get digital payments, transparent weighing, and free home pickup.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/register" className="group bg-primary text-white px-8 py-4 rounded-2xl flex items-center justify-center font-black shadow-2xl shadow-primary/30 hover:bg-secondary hover:shadow-secondary/40 transition-all duration-500 group">
                  Start Selling Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link to="/book-pickup" className="bg-white text-dark border-2 border-slate-100 px-8 py-4 rounded-2xl flex items-center justify-center font-black hover:border-primary/30 transition-all duration-300">
                  Quick Booking
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 flex items-center justify-center md:justify-start space-x-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-gray-400">
                  <div className="flex text-amber-500 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  4.9/5 stars from our community
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 -z-10 animate-pulse"></div>
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[3rem] shadow-2xl overflow-hidden group">
                <img 
                  src="/assets/images/hero.png" 
                  alt="Scrap Recycling" 
                  className="rounded-[2rem] w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-black text-primary uppercase tracking-widest">Latest Collection</span>
                       <span className="text-xs font-bold text-gray-400">2 mins ago</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary"><DollarSign size={24} /></div>
                      <div>
                        <p className="font-bold text-dark">₹1,240.00 Paid</p>
                        <p className="text-sm text-gray-500 font-medium">Household Newspaper & Plastic</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight"
            >
              The Smart Way to Sell Scrap
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              className="h-1.5 bg-primary mx-auto rounded-full"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay }}
                whileHover={{ y: -10 }}
                className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${card.color} group-hover:scale-110 transition-transform duration-500`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black text-dark mb-4">{card.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-dark mb-10 tracking-tight leading-tight"
              >
                Zero Effort, <br/>Maximum Value.
              </motion.h2>
              <div className="space-y-8">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0 shadow-lg shadow-primary/30">
                      {step.id}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-dark mb-1">{step.title}</h4>
                      <p className="text-gray-500 font-medium">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="grid grid-cols-2 gap-4"
               >
                 <div className="space-y-4 pt-12">
                   <img src="/assets/images/scrap-1.png" className="rounded-3xl shadow-xl w-full h-64 object-cover" alt="scrap item" />
                   <img src="/assets/images/scrap-2.png" className="rounded-3xl shadow-xl w-full h-48 object-cover" alt="scrap item" />
                 </div>
                 <div className="space-y-4">
                   <img src="/assets/images/scrap-3.png" className="rounded-3xl shadow-xl w-full h-48 object-cover" alt="scrap item" />
                   <img src="/assets/images/scrap-4.png" className="rounded-3xl shadow-xl w-full h-64 object-cover" alt="scrap item" />
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-white"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.1),transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Ready to clear the clutter?</h2>
              <p className="text-gray-400 text-lg mb-10 mx-auto max-w-2xl">Join thousands of households contributing to a greener planet while getting paid fairly.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="bg-primary text-white px-10 py-4 rounded-xl font-black shadow-xl shadow-primary/30 hover:bg-emerald-400 transition-all">Sign Up Now</Link>
                <Link to="/prices" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-black hover:bg-white/20 transition-all">Check Price List</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
