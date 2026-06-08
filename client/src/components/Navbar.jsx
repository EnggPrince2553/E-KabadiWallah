import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Recycle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Recycle className="text-white" size={24} />
              </div>
              <span className={`ml-3 text-2xl font-black tracking-tighter transition-colors duration-300 ${isScrolled ? 'text-dark' : 'text-dark'}`}>E-Kabadi<span className="text-primary">wala</span></span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.role !== 'admin' && (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium">Dashboard</Link>
                    <Link to="/book-pickup" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium">Book Pickup</Link>
                    <Link to="/history" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium">History</Link>
                  </>
                )}
                <Link to="/profile" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium">Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-primary bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-md font-bold border border-primary/20">Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md font-medium">Login</Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md shadow-md shadow-primary/30 hover:bg-secondary hover:-translate-y-0.5 transition-all font-medium">Register</Link>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 z-40 border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                {user.role !== 'admin' && (
                  <>
                    <Link onClick={() => setIsOpen(false)} to="/dashboard" className="block text-gray-800 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md font-medium">Dashboard</Link>
                    <Link onClick={() => setIsOpen(false)} to="/book-pickup" className="block text-gray-800 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md font-medium">Book Pickup</Link>
                    <Link onClick={() => setIsOpen(false)} to="/history" className="block text-gray-800 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md font-medium">History</Link>
                  </>
                )}
                <Link onClick={() => setIsOpen(false)} to="/profile" className="block text-gray-800 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md font-medium">Profile</Link>
                {user.role === 'admin' && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard" className="block text-primary bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-md font-bold border border-primary/20">Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-md">Logout</button>
              </>
            ) : (
              <>
                <Link onClick={() => setIsOpen(false)} to="/login" className="block text-gray-800 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md font-medium">Login</Link>
                <Link onClick={() => setIsOpen(false)} to="/register" className="block bg-primary text-white text-center shadow-md hover:bg-secondary px-3 py-2 rounded-md mt-2 font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
