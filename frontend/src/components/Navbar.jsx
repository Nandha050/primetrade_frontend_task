import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Home, LogIn } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 font-bold text-2xl hover:opacity-80 transition group">
            <div className="text-3xl group-hover:scale-110 transition">👨‍🍳</div>
            <span className="hidden sm:inline">Chef</span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-sm">👋 Welcome,</span>
                <span className="font-bold text-lg">{user.name}!</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 px-5 py-2 rounded-full transition font-bold shadow-lg hover:shadow-xl"
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
                className="flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 px-5 py-2 rounded-full transition font-bold shadow-lg hover:shadow-xl"
              >
                <LogIn size={18} />
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-red-600 px-5 py-2 rounded-full transition font-bold"
              >
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-red-600 rounded-lg transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-red-400">
            {user && (
              <>
                <div className="text-sm py-3 font-semibold">👋 Welcome, {user.name}!</div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl transition font-bold"
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
                  className="block text-center flex items-center justify-center gap-2 hover:bg-red-600 px-4 py-3 rounded-xl transition font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <Home size={18} />
                  Home
                </Link>
                <Link
                  to="/login"
                  className="block text-center flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl transition font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block text-center border-2 border-white text-white hover:bg-white hover:text-red-600 px-4 py-3 rounded-xl transition font-bold"
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
