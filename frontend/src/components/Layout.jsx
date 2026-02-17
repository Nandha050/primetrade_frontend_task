import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-dvh overflow-hidden bg-[var(--color-background)]">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed lg:static inset-y-0 left-0 z-40 transform w-64 transition-transform duration-300 ease-in-out lg:transform-none ${isSidebarOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-[120%] pointer-events-none'} lg:pointer-events-auto`}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex min-h-dvh flex-col overflow-hidden w-full lg:ml-0">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between z-20 sticky top-0">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="min-h-11 min-w-11 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu size={24} className="text-gray-700" />
                    </button>
                    <span className="font-serif font-bold text-xl text-[var(--color-primary)]">Foodoo</span>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>

                <main className="flex-1 overflow-y-auto p-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
