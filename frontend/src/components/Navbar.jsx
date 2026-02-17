import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, Home, LogIn } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine Navbar Styles based on Route and Scroll
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome
      ? scrolled
        ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10'
        : 'bg-transparent'
      : 'bg-gradient-to-r from-red-500 to-orange-500 shadow-xl'
    }`;

  const linkClasses = isHome && !scrolled ? 'text-white hover:text-orange-400' : 'text-white hover:opacity-80';

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Incr height slightly for premium feel */}
          <Link to="/" className="flex items-center gap-2 font-serif font-bold text-2xl group text-white">
            <div className="text-3xl group-hover:scale-110 transition-transform">👨‍🍳</div>
            <span className="tracking-tight">Chef<span className="text-orange-400">.</span></span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2 text-white/90">
                <span className="text-sm">👋 Welcome,</span>
                <span className="font-bold text-lg">{user.name}!</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-full transition font-bold border border-white/20 backdrop-blur-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}

          {!user && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-2.5 rounded-full transition font-bold"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-105 px-6 py-2.5 rounded-full transition font-bold shadow-md"
              >
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 bg-black/95 backdrop-blur-xl absolute top-full left-0 right-0 p-4 border-t border-white/10 shadow-2xl">
            {user && (
              <>
                <div className="text-white text-sm py-3 font-semibold text-center">👋 Welcome, {user.name}!</div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 px-4 py-3 rounded-xl transition font-bold"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/"
                  className="block text-center flex items-center justify-center gap-2 text-white hover:bg-white/10 px-4 py-3 rounded-xl transition font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <Home size={18} />
                  Home
                </Link>
                <Link
                  to="/login"
                  className="block text-center flex items-center justify-center gap-2 text-white hover:bg-white/10 px-4 py-3 rounded-xl transition font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl transition font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
