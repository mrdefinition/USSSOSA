
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Governance', path: '/governance' },
    { name: 'Programs', path: '/programs' },
    { name: 'Graduating Sets', path: '/community/sets' },
    { name: 'Transparency', path: '/transparency' },
    { name: 'Get Involved', path: '/get-involved' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-green-800 tracking-tight">USSSOSA</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-xs lg:text-sm font-semibold transition-colors ${
                    isActive ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {user ? (
              <div className="flex items-center space-x-3 ml-2 border-l pl-4">
                {user.role === UserRole.ADMIN && (
                  <Link to="/admin" className="text-sm text-green-700 font-bold border-r pr-3 border-gray-300">Admin</Link>
                )}
                <span className="text-sm font-medium text-gray-700 hidden lg:inline">Hi, {user.name.split(' ')[0]}</span>
                <button
                  onClick={onLogout}
                  className="bg-green-800 text-white px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium hover:bg-green-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/membership"
                className="bg-green-800 text-white px-4 py-2 rounded-md text-xs lg:text-sm font-medium hover:bg-green-900 transition-all shadow-md ml-4"
              >
                Join Now
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white pb-4 px-4 space-y-1 shadow-inner border-t">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50"
            >
              {link.name}
            </Link>
          ))}
          {!user ? (
            <Link
              to="/membership"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-green-800 text-white px-4 py-2 rounded-md text-base font-medium mt-4"
            >
              Join Association
            </Link>
          ) : (
             <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="block w-full text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-base font-medium mt-4"
              >
                Logout
              </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
