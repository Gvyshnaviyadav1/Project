import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Online Judge</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/submissions" className="text-gray-700 hover:text-blue-500">Submissions</Link>
        <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
