
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ALUMNI_SETS } from '../mockData';

interface MembershipProps {
  onLogin: (user: User) => void;
  user: User | null;
}

const Membership: React.FC<MembershipProps> = ({ onLogin, user }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    year: '2005',
    phone: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of login/registration
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || (isLogin ? (formData.email.split('@')[0]) : 'New Alumnus'),
      email: formData.email,
      role: formData.email.includes('admin') ? UserRole.ADMIN : UserRole.MEMBER,
      graduatingYear: parseInt(formData.year),
      location: formData.location || 'Lagos, Nigeria',
    };
    onLogin(mockUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          {/* Dashboard Header */}
          <div className="bg-green-900 p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-green-800 rounded-full blur-3xl opacity-30"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <span className="inline-block px-4 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-[10px] font-black uppercase tracking-widest mb-4">
                  Verified Alumni Status
                </span>
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Welcome, {user.name.split(' ')[0]}!</h1>
                <p className="text-green-100 font-light text-lg">Class of {user.graduatingYear} • {user.location}</p>
              </div>
              <div className="bg-white/10 p-8 rounded-[32px] backdrop-blur-xl border border-white/20 text-center shadow-2xl min-w-[280px]">
                <p className="text-[10px] uppercase font-black text-green-300 tracking-[0.2em] mb-3">USSSOSA DIGITAL ID</p>
                <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                </div>
                <p className="text-2xl font-black font-mono tracking-widest text-white">ID-{user.graduatingYear}-{(user.id || 'NUL').slice(0, 4).toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16 grid lg:grid-cols-12 gap-12">
            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-8">
              <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                <h2 className="text-xl font-black mb-8 text-gray-900 uppercase tracking-tight flex items-center">
                  <span className="w-2 h-6 bg-green-600 rounded-full mr-3"></span>
                  Member Records
                </h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rank</span>
                    <span className="font-black text-gray-900 group-hover:text-green-700 transition-colors">#1,245 of 5,000+</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dues Status</span>
                    <span className="font-black text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs">Unpaid (2024)</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Voting Weight</span>
                    <span className="font-black text-gray-900">Standard</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Activity</span>
                    <span className="font-black text-gray-900">Today</span>
                  </div>
                </div>
                <button className="mt-10 w-full bg-green-700 text-white py-5 rounded-2xl font-black hover:bg-green-800 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                  Pay Annual Dues (₦5,000)
                </button>
              </section>

              <div className="bg-yellow-50 p-8 rounded-[32px] border border-yellow-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-20 h-20 text-yellow-900" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2 .712V17a1 1 0 001 1z"></path></svg>
                </div>
                <h3 className="text-lg font-black mb-4 text-yellow-900 tracking-tight">Class Legacy Pledge</h3>
                <p className="text-sm text-yellow-800/80 leading-relaxed font-medium mb-6 italic">
                  "I solemnly pledge to honor the traditions of Unity High, support my fellow alumni, and contribute to the elevation of our alma mater's standard."
                </p>
                <button className="text-yellow-900 text-xs font-black uppercase tracking-widest hover:underline decoration-2">
                  View Ethics Charter &rarr;
                </button>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="lg:col-span-8 space-y-12">
              <section>
                <h2 className="text-3xl font-black mb-10 text-gray-900 tracking-tight">Your Member Privileges</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Business Directory", icon: "🏢", desc: "List your company in the USSSOSA professional marketplace." },
                    { title: "Priority Voting", icon: "🗳️", desc: "Cast your vote in national executive and set leadership elections." },
                    { title: "Welfare Access", icon: "🤲", desc: "Apply for interest-free emergency loans and community support grants." },
                    { title: "Mentorship Circle", icon: "🎓", desc: "Access the global mentor network for career growth coaching." },
                  ].map((benefit, i) => (
                    <div key={i} className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all group">
                      <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{benefit.icon}</div>
                      <h4 className="text-lg font-black text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-green-50 p-10 rounded-[40px] border border-green-100 flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/3">
                  <img 
                    src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    className="w-full h-48 object-cover rounded-[32px] shadow-lg"
                    alt="Nigerian Professional"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-green-900 mb-4">Set Leadership Opportunities</h3>
                  <p className="text-green-800/70 font-medium mb-6 leading-relaxed text-sm">
                    As a verified member of the {user.graduatingYear} Set, you are eligible to run for local and national representative roles. 
                  </p>
                  <button className="bg-green-700 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-green-800 transition-all shadow-lg">
                    Browse Leadership Openings
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          className="w-full h-full object-cover"
          alt="Nigerian Alumni Networking"
        />
        <div className="absolute inset-0 bg-green-950/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-xl w-full z-10">
        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20">
          <div className="p-10 md:p-14">
            <div className="text-center mb-12">
               <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                Official USSSOSA Portal
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                {isLogin ? 'Welcome Back' : 'Create Legacy'}
              </h2>
              <p className="mt-4 text-gray-500 font-medium">
                {isLogin ? "Access your unified alumni dashboard" : "Register for global verified alumni status"}
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:outline-none transition-all font-semibold"
                      placeholder="e.g. Adebayo Tunde"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:outline-none transition-all font-semibold"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:outline-none transition-all font-semibold"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Graduating Set</label>
                        <select
                          name="year"
                          required
                          className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:outline-none transition-all font-semibold"
                          value={formData.year}
                          onChange={handleInputChange}
                        >
                          {ALUMNI_SETS.map(s => <option key={s.id} value={s.year}>{s.year}</option>)}
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone</label>
                        <input
                          name="phone"
                          type="tel"
                          className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:outline-none transition-all font-semibold"
                          placeholder="+234..."
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Current Location</label>
                      <input
                        name="location"
                        type="text"
                        required
                        className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:outline-none transition-all font-semibold"
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-5 px-4 border border-transparent text-sm font-black rounded-[20px] text-white bg-green-700 hover:bg-green-800 transition-all shadow-xl hover:-translate-y-1 transform active:scale-95 mt-10"
              >
                {isLogin ? 'Sign In to Dashboard' : 'Complete Registration'}
              </button>
            </form>

            <div className="text-center mt-10 pt-8 border-t border-gray-100">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-black text-green-700 hover:text-green-800 transition-colors uppercase tracking-widest"
              >
                {isLogin ? "Become a New Member" : "Already Registered? Login"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Help Link */}
        <p className="text-center text-green-200 mt-8 text-xs font-bold uppercase tracking-widest opacity-60">
          Need verification assistance? <a href="#/contact" className="underline hover:text-white transition-colors">Contact Registrar</a>
        </p>
      </div>
    </div>
  );
};

export default Membership;
