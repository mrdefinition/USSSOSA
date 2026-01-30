
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ALUMNI_SETS } from '../mockData';

interface MembershipProps {
  onLogin: (user: User) => void;
  user: User | null;
}

const Membership: React.FC<MembershipProps> = ({ onLogin, user }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [activeDashboardTab, setActiveDashboardTab] = useState<'profile' | 'privacy'>('profile');
  const [privacySettings, setPrivacySettings] = useState({
    showInDirectory: true,
    birthdayAlerts: true,
    achievementNotifications: true,
    newsletterOptIn: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    year: '2005',
    phone: '',
    location: '',
    role: UserRole.MEMBER
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating role-based logic for this demo
    let assignedRole = formData.role;
    if (formData.email.includes('superadmin')) assignedRole = UserRole.PLATFORM_ADMIN;
    else if (formData.email.includes('admin')) assignedRole = UserRole.ADMIN;

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || (isLogin ? (formData.email.split('@')[0]) : 'New Alumnus'),
      email: formData.email,
      role: assignedRole,
      graduatingYear: parseInt(formData.year),
      location: formData.location || 'Lagos, Nigeria',
    };
    onLogin(mockUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteRequest = () => {
    if (window.confirm("WARNING: Are you sure you want to request data deletion? Per our Privacy Charter, this will archieve your records for 12 months before permanent erasure.")) {
      alert("Request submitted. Our Data Protection Officer will contact you within 48 hours.");
    }
  };

  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-in fade-in duration-500">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-emerald-900 p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-800 rounded-full blur-3xl opacity-30"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-4">
                  Verified {user.role.replace('_', ' ')} Status
                </span>
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Welcome, {user.name.split(' ')[0]}!</h1>
                <p className="text-emerald-100 font-light text-lg italic">"Unity is our strength." — Class of {user.graduatingYear}</p>
              </div>
              <div className="bg-white/10 p-8 rounded-[32px] backdrop-blur-xl border border-white/20 text-center shadow-2xl min-w-[280px]">
                <p className="text-[10px] uppercase font-black text-emerald-300 tracking-[0.2em] mb-3">USSSOSA DIGITAL ID</p>
                <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1-1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                </div>
                <p className="text-2xl font-black font-mono tracking-widest text-white uppercase">ID-{user.graduatingYear}-{(user.id || 'NUL').slice(0, 4)}</p>
              </div>
            </div>
          </div>

          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button 
              onClick={() => setActiveDashboardTab('profile')}
              className={`px-10 py-5 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                activeDashboardTab === 'profile' ? 'text-emerald-700 border-emerald-700 bg-white' : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              Member Dashboard
            </button>
            <button 
              onClick={() => setActiveDashboardTab('privacy')}
              className={`px-10 py-5 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                activeDashboardTab === 'privacy' ? 'text-emerald-700 border-emerald-700 bg-white' : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              Privacy & Settings
            </button>
          </div>

          <div className="p-8 md:p-16">
            {activeDashboardTab === 'profile' ? (
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-8">
                  <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                    <h2 className="text-xl font-black mb-8 text-gray-900 uppercase tracking-tight flex items-center">
                      <span className="w-2 h-6 bg-emerald-600 rounded-full mr-3"></span>
                      Member Records
                    </h2>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rank</span>
                        <span className="font-black text-gray-900 group-hover:text-emerald-700 transition-colors">#1,245 of 5,000+</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dues Status</span>
                        <span className="font-black text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs">Unpaid (2024)</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Voting Power</span>
                        <span className="font-black text-gray-900">Standard</span>
                      </div>
                    </div>
                    <button className="mt-10 w-full bg-emerald-700 text-white py-5 rounded-2xl font-black hover:bg-emerald-800 transition-all shadow-xl hover:-translate-y-1">
                      Pay Annual Dues (₦5,000)
                    </button>
                  </section>

                  <div className="bg-amber-50 p-8 rounded-[32px] border border-amber-100">
                    <h3 className="text-lg font-black mb-4 text-amber-900 tracking-tight">Set Legacy Pledge</h3>
                    <p className="text-sm text-amber-800/80 leading-relaxed font-medium italic mb-6">
                      "I solemnly pledge to uphold the values of Unity High, to mentor the younger generation, and to serve my community with honor."
                    </p>
                    <button className="text-amber-900 text-xs font-black uppercase tracking-widest hover:underline">
                      View Ethics Charter &rarr;
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-12">
                  <section>
                    <h2 className="text-3xl font-black mb-10 text-gray-900 tracking-tight">Your Member Privileges</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: "Business Directory", icon: "🏢", desc: "Showcase your business to over 5,000 global verified alumni." },
                        { title: "Priority Elections", icon: "🗳️", desc: "Exercise your voting rights for both Set and National leadership." },
                        { title: "Welfare Grants", icon: "🤝", desc: "Access emergency relief funds and business development grants." },
                        { title: "Mentorship Circle", icon: "🎓", desc: "Connect with industry leaders within the USSSOSA professional network." },
                      ].map((benefit, i) => (
                        <div key={i} className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all group">
                          <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{benefit.icon}</div>
                          <h4 className="text-lg font-black text-gray-900 mb-2">{benefit.title}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed font-medium">{benefit.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-emerald-50 p-10 rounded-[40px] border border-emerald-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/3">
                      <img src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-48 object-cover rounded-[32px] shadow-lg" alt="Nigerian Professional" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-emerald-900 mb-4">Set Leadership Openings</h3>
                      <p className="text-emerald-800/70 font-medium mb-6 leading-relaxed text-sm">
                        Interested in leading your class? The {user.graduatingYear} Set is currently looking for a Welfare Officer and Project Coordinator.
                      </p>
                      <button className="bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-emerald-800 transition-all shadow-lg">
                        Apply for Role
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl animate-in slide-in-from-right-10 duration-500">
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Privacy Rights Management</h2>
                <p className="text-gray-500 font-medium mb-12 leading-relaxed">
                  Per our Privacy Charter, you have full control over your data. Adjust your visibility and 
                  communication preferences below. All changes are reflected across the global USSSOSA network in real-time.
                </p>

                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                    <div>
                      <h4 className="font-black text-gray-900 text-lg mb-1">Directory Visibility</h4>
                      <p className="text-sm text-gray-400 font-medium">Show my profile in the global alumni directory for networking.</p>
                    </div>
                    <button 
                      onClick={() => handleTogglePrivacy('showInDirectory')}
                      className={`w-14 h-8 rounded-full transition-all relative ${privacySettings.showInDirectory ? 'bg-emerald-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${privacySettings.showInDirectory ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>

                  <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                    <div>
                      <h4 className="font-black text-gray-900 text-lg mb-1">Birthday Alerts</h4>
                      <p className="text-sm text-gray-400 font-medium">Allow my graduating set to see and celebrate my birthday.</p>
                    </div>
                    <button 
                      onClick={() => handleTogglePrivacy('birthdayAlerts')}
                      className={`w-14 h-8 rounded-full transition-all relative ${privacySettings.birthdayAlerts ? 'bg-emerald-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${privacySettings.birthdayAlerts ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>

                  <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                    <div>
                      <h4 className="font-black text-gray-900 text-lg mb-1">Achievement Notifications</h4>
                      <p className="text-sm text-gray-400 font-medium">Auto-publish my reported career achievements to the global news feed.</p>
                    </div>
                    <button 
                      onClick={() => handleTogglePrivacy('achievementNotifications')}
                      className={`w-14 h-8 rounded-full transition-all relative ${privacySettings.achievementNotifications ? 'bg-emerald-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${privacySettings.achievementNotifications ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>

                  <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                    <div>
                      <h4 className="font-black text-gray-900 text-lg mb-1">Quarterly Bulletins</h4>
                      <p className="text-sm text-gray-400 font-medium">Receive newsletters, project updates, and governance reports via email.</p>
                    </div>
                    <button 
                      onClick={() => handleTogglePrivacy('newsletterOptIn')}
                      className={`w-14 h-8 rounded-full transition-all relative ${privacySettings.newsletterOptIn ? 'bg-emerald-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${privacySettings.newsletterOptIn ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="mt-16 pt-16 border-t border-gray-100">
                  <h3 className="text-xl font-black text-red-900 mb-4 tracking-tight">Account Deletion & Data Erasure</h3>
                  <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
                    Once requested, your account will be deactivated and your data moved to our secure archives for a 
                    12-month legal audit period before permanent deletion. This action is irreversible.
                  </p>
                  <button 
                    onClick={handleDeleteRequest}
                    className="bg-red-50 text-red-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
                  >
                    Request Account Erasure
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row bg-emerald-950 overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-20 text-white">
        <div className="absolute inset-0 z-0">
          <img src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1920" className="w-full h-full object-cover opacity-30" alt="Networking" />
          <div className="absolute inset-0 bg-emerald-950/60"></div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">Connect with 5,000+ Global Professionals.</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-2xl">01</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Verified Database</h4>
                <p className="text-emerald-100/60 leading-relaxed">Join our secure database of Unity Senior Secondary School graduates across the globe.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-2xl">02</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Social & Professional Ties</h4>
                <p className="text-emerald-100/60 leading-relaxed">Leverage the "Unity" bond for career growth and community support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center py-20 px-4 bg-gray-50 lg:rounded-l-[60px] relative z-10 shadow-[-40px_0_80px_rgba(0,0,0,0.5)]">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
             <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Official USSSOSA Portal
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join the Legacy'}
            </h2>
            <p className="mt-4 text-gray-500 font-medium">
              {isLogin ? "Access your unified alumni dashboard" : "Register for global verified alumni status"}
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isLogin && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Access Role</label>
                <select 
                  name="role" 
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value={UserRole.MEMBER}>Member</option>
                  <option value={UserRole.ADMIN}>Admin</option>
                  <option value={UserRole.PLATFORM_ADMIN}>Platform Admin</option>
                </select>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input name="name" type="text" required className="block w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold" placeholder="Adebayo Tunde" value={formData.name} onChange={handleInputChange} />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input name="email" type="email" required className="block w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input name="password" type="password" required className="block w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
            </div>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Graduating Set</label>
                  <select name="year" required className="block w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold" value={formData.year} onChange={handleInputChange}>
                    {ALUMNI_SETS.map(s => <option key={s.id} value={s.year}>{s.year}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
                  <input name="location" type="text" required className="block w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold" placeholder="Lagos, NG" value={formData.location} onChange={handleInputChange} />
                </div>
              </div>
            )}

            <button type="submit" className="w-full flex justify-center py-5 px-4 border border-transparent text-sm font-black rounded-[20px] text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-xl hover:-translate-y-1 transform active:scale-95 mt-10 uppercase tracking-widest">
              {isLogin ? 'Sign In to Portal' : 'Complete Registration'}
            </button>
          </form>

          <div className="text-center mt-10 pt-8 border-t border-gray-100">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-black text-emerald-700 hover:text-emerald-800 transition-colors uppercase tracking-widest">
              {isLogin ? "Become a New Member" : "Already Registered? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
