import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Edit2, ChefHat, User, X, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar({ recipeCount, onCreateRecipe, onClose }) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate('/profile');
        if (onClose) onClose();
    };

    const handleDashboardClick = () => {
        navigate('/dashboard');
        if (onClose) onClose();
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 h-full w-[17rem] sm:w-64 border-r border-gray-200/80 flex flex-col items-center py-6 sm:py-8 shadow-2xl lg:shadow-none overflow-y-auto relative">

            {/* Close Button for Mobile */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 min-h-11 min-w-11 p-2 rounded-full hover:bg-gray-100 lg:hidden text-gray-500"
                aria-label="Close menu"
            >
                <X size={20} />
            </button>

            {/* Logo Section */}
            <div className="mb-8 px-6 w-full cursor-pointer group" onClick={handleDashboardClick}>
                <div className="flex items-center gap-3 justify-center">
                    <div className="p-2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-xl shadow-md group-hover:scale-110 transition-transform">
                        <ChefHat size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        chef
                    </h1>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="w-full px-4 mb-6">
                <button
                    onClick={handleDashboardClick}
                    className={`w-full min-h-11 flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${location.pathname === '/dashboard'
                        ? 'bg-orange-50 text-[var(--color-primary)] shadow-sm border border-orange-100'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8 w-full px-6">
                <div className="relative group mb-4">
                    <div
                        className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer transition-transform hover:scale-105"
                        onClick={handleProfileClick}
                    >
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                                <User size={32} className="text-white" />
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleProfileClick}
                        className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200 hover:bg-[var(--color-primary-light)] hover:border-[var(--color-primary)] transition-all opacity-0 group-hover:opacity-100"
                        title="Edit Profile"
                        aria-label="Edit profile"
                    >
                        <Edit2 size={12} className="text-[var(--color-primary)]" />
                    </button>
                </div>

                <h3
                    className={`text-lg font-bold mb-1 text-center break-words w-full cursor-pointer transition-colors ${location.pathname === '/profile' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary)]'}`}
                    onClick={handleProfileClick}
                >
                    {user?.name || 'Guest Chef'}
                </h3>

                {user?.bio && (
                    <p className="text-xs text-[var(--color-text-secondary)] text-center line-clamp-2 px-2">
                        {user.bio}
                    </p>
                )}
            </div>



            {/* Spacer to push logout to bottom */}
            <div className="flex-1"></div>

            {/* Logout Button - At Bottom */}
            <div className="w-full px-6 pb-4 border-t border-gray-200/80 pt-6">
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 text-[var(--color-text-primary)] hover:text-white bg-white hover:bg-[var(--color-danger)] transition-all duration-200 w-full min-h-11 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-[var(--color-danger)] font-semibold shadow-sm hover:shadow-md active:scale-95 group"
                >
                    <LogOut size={20} className="transition-transform group-hover:translate-x-1" />
                    <span>Logout</span>
                </button>

                {/* App Version */}
                <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-4">
                    v1.0.0 • Production
                </p>
            </div>
        </div>
    );
}
