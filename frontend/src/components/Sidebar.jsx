import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, User, Users, Globe, LogOut, PlusCircle, Edit2 } from 'lucide-react';
import UserProfileModal from './UserProfileModal';

export default function Sidebar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { icon: BookOpen, label: 'Recipes', path: '/dashboard' },
        { icon: User, label: 'Favorites', path: '/favorites' }, // Placeholder path
        { icon: Users, label: 'Community', path: '/community' }, // Placeholder path
    ];

    return (
        <>
            <div className="bg-white h-screen w-64 fixed left-0 top-0 border-r border-gray-100 flex flex-col items-center py-8 z-50">
                {/* Brand */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                        Foodoo
                    </h1>
                </div>

                {/* User Profile Summary */}
                <div className="flex flex-col items-center mb-12 w-full px-6 group relative">
                    <div className="relative mb-4 cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 transition-transform group-hover:scale-105">
                            <img
                                src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Ring */}
                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full border-t-4 border-r-4 border-primary-500 rotate-45 transform scale-110 opacity-50 group-hover:rotate-90 transition-transform duration-500"></div>

                        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit2 size={14} />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1 font-serif text-center break-words w-full">
                        {user?.name || 'Guest Chef'}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">{user?.bio ? user.bio.substring(0, 20) + (user.bio.length > 20 ? '...' : '') : 'Chef de Partie'}</p>

                    {/* Helper/Stats (Example) */}
                    <div className="flex gap-4 mt-6 w-full justify-center">
                        <div className="text-center">
                            <span className="block text-lg font-bold text-gray-800">12</span>
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Recipes</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-lg font-bold text-gray-800">48</span>
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Followers</span>
                        </div>
                    </div>
                </div>



                {/* Bottom Actions */}
                <div className="w-full px-6 pb-4 border-t border-gray-100 pt-6 ">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors w-full px-4 py-2 rounded-lg hover:bg-red-50 font-medium"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>

            <UserProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </>
    );
}
