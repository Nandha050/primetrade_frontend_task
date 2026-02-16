import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-[#FFF5F5]">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <Outlet />
            </div>
        </div>
    );
}
