// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ handleLogout }) => {
//   return (
//     <div className="bg-white shadow p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold text-blue-600">Online Judge</h1>
//       <div className="space-x-4">
//         <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
//         <Link to="/home" className="text-gray-700 hover:text-blue-500">Problems</Link>

//         <Link to="/submissions" className="text-gray-700 hover:text-blue-500">Submissions</Link>
//         <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ handleLogout }) => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
   const navigate = useNavigate();
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/home', label: 'Problems' },
    { to: '/submissions', label: 'Submissions' },
    { to: '/leaderboard', label: 'Leaderboard' },
  ];

  const isActive = (path) => location.pathname === path;

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link to="/" className="text-xl font-semibold text-white tracking-tight hover:text-blue-200">
            Online Judge
          </Link>

          {/* Links & Profile */}
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive(link.to)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                <User className="text-white text-2xl hover:text-blue-300 transition duration-150" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                  <button
                          onClick={() => {
                                navigate('/profile');
                                setDropdownOpen(false);
                                }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                  Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

