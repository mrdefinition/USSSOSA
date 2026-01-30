
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('usssosa_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('usssosa_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-emerald-100 shadow-2xl rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Privacy Preference</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
              We use cookies to enhance your alumni experience. By using our portal, you agree to our 
              <Link to="/transparency/privacy" className="text-emerald-700 hover:underline font-bold ml-1">Privacy Charter</Link>.
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg"
          >
            Accept All
          </button>
          <Link 
            to="/transparency/privacy"
            className="flex-1 md:flex-none bg-gray-100 text-gray-500 px-8 py-3 rounded-2xl font-black text-[10px] text-center uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
