
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
    { name: 'Sets', path: '/community/sets' },
    { name: 'Transparency', path: '/transparency' },
    { name: 'News', path: '/news' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center font-black text-white text-xl">U</div>
              <span className="text-2xl font-black text-emerald-900 tracking-tighter">USSSOSA</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs lg:text-sm font-black uppercase tracking-widest transition-all ${
                    isActive ? 'text-emerald-700 bg-emerald-50' : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <Link to="/community/chat" className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-emerald-100 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 2c-5.506 0-9.969 4.463-9.969 9.969 0 1.763.456 3.419 1.256 4.856l-1.331 4.863 4.981-1.306c1.375.75 2.95 1.175 4.625 1.175 5.506 0 10.031-4.463 10.031-9.969s-4.525-9.969-10.094-9.969zm5.531 14.188c-.231.65-.813 1.194-1.463 1.456-.638.25-1.431.431-4.088-.65-3.181-1.3-5.238-4.525-5.394-4.738-.156-.213-1.269-1.688-1.269-3.225 0-1.538.806-2.294 1.094-2.6.288-.306.631-.381.844-.381h.563c.188 0 .375-.025.544.381.169.406.581 1.419.631 1.519.05.1.081.213.019.338-.063.125-.094.2-.188.306-.094.106-.194.244-.275.331-.094.1-.188.2-.081.381.106.181.469.775.981 1.25.663.606 1.219.794 1.4.888.181.094.288.081.394-.044.106-.125.469-.544.594-.731.125-.188.25-.156.419-.094.169.063 1.069.506 1.256.6.188.094.313.138.356.213.044.075.044.431-.188 1.081z"/></svg>
                  Chat
                </Link>
                {user.role === UserRole.PLATFORM_ADMIN ? (
                  <Link to="/platform-admin" className="text-xs font-black text-white bg-slate-900 px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-black">Platform Root</Link>
                ) : user.role === UserRole.ADMIN ? (
                  <Link to="/admin" className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-amber-100">Admin</Link>
                ) : null}
                <Link to="/membership" className="text-sm font-bold text-gray-700 hover:text-emerald-700 transition-colors">
                  {user.name.split(' ')[0]}
                </Link>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </button>
              </div>
            ) : (
              <Link to="/membership" className="bg-emerald-800 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/20 ml-6">
                Join Portal
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl text-gray-500 hover:bg-gray-100">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-gray-700 hover:bg-emerald-50 hover:text-emerald-800">
              {link.name}
            </Link>
          ))}
          {user && (
            <>
              <Link to="/community/chat" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-emerald-700 hover:bg-emerald-50">
                WhatsApp Chat
              </Link>
              <Link to="/member-events" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-emerald-700 hover:bg-emerald-50">
                Report Event
              </Link>
            </>
          )}
          {!user ? (
            <Link to="/membership" onClick={() => setIsOpen(false)} className="block w-full text-center bg-emerald-800 text-white px-4 py-4 rounded-xl font-black uppercase tracking-widest mt-6">
              Access Portal
            </Link>
          ) : (
             <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-2">
                {user.role === UserRole.PLATFORM_ADMIN && (
                   <Link to="/platform-admin" onClick={() => setIsOpen(false)} className="text-center bg-slate-900 text-white px-4 py-3 rounded-xl font-black text-xs uppercase">Platform Root</Link>
                )}
                {user.role === UserRole.ADMIN && (
                   <Link to="/admin" onClick={() => setIsOpen(false)} className="text-center bg-amber-50 text-amber-700 px-4 py-3 rounded-xl font-black text-xs uppercase">Admin Dashboard</Link>
                )}
                <div className="flex gap-2">
                   <Link to="/membership" onClick={() => setIsOpen(false)} className="flex-1 text-center bg-gray-100 text-gray-900 px-4 py-3 rounded-xl font-black text-xs uppercase">Profile</Link>
                   <button onClick={() => { onLogout(); setIsOpen(false); }} className="flex-1 text-center bg-red-50 text-red-600 px-4 py-3 rounded-xl font-black text-xs uppercase">Logout</button>
                </div>
             </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
