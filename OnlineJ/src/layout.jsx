import React from 'react';
import Navbar from './navbar';
import { Outlet } from 'react-router-dom';

const Layout = ({ handleLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar handleLogout={handleLogout} />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
