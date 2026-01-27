
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">USSSOSA</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unity Senior Secondary School Old Students Association. 
              Connecting past students, building future leaders, and 
              giving back to our alma mater.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/governance" className="hover:text-white">Governance</Link></li>
              <li><Link to="/programs" className="hover:text-white">Programs</Link></li>
              <li><Link to="/transparency" className="hover:text-white">Transparency</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/membership" className="hover:text-white">Membership</Link></li>
              <li><Link to="/programs" className="hover:text-white">Scholarships</Link></li>
              <li><Link to="/contact" className="hover:text-white">Donations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Stay updated with our latest news and events.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-r-md transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} USSSOSA. All Rights Reserved. Built for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
