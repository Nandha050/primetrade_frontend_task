import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
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
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="text-2xl">👨‍🍳</div>
            Chef
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-6">
              <span className="text-sm">Welcome, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
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
                className="hover:bg-white hover:text-primary px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-secondary hover:bg-opacity-90 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {user && (
              <>
                <div className="text-sm py-2">Welcome, {user.name}!</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block hover:bg-white hover:text-primary px-4 py-2 rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-secondary hover:bg-opacity-90 px-4 py-2 rounded-lg transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
