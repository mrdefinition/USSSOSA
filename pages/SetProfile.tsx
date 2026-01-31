
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ALUMNI_SETS, EVENTS as INITIAL_EVENTS, PROJECTS } from '../mockData';
import { AlumniEvent, UserRole, User, SetExecutive, AlumniSet } from '../types';

const SetProfile: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const [currentSet, setCurrentSet] = useState<AlumniSet | undefined>(ALUMNI_SETS.find((s) => s.id === setId));
  const [user, setUser] = useState<User | null>(null);
  const [setEvents, setSetEvents] = useState<AlumniEvent[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const [isManagingRoles, setIsManagingRoles] = useState(false);
  
  const [roleForm, setRoleForm] = useState({
    name: '',
    role: 'Secretary',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: 'Social' as any
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('usssosa_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const relevantEvents = INITIAL_EVENTS.filter(e => e.setId === setId);
    setSetEvents(relevantEvents);
  }, [setId]);

  if (!currentSet) {
    return <Navigate to="/community/sets" />;
  }

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventToAdd: AlumniEvent = {
      ...newEvent,
      id: `se-${Date.now()}`,
      setId: setId,
      rsvps: []
    };
    setSetEvents(prev => [eventToAdd, ...prev]);
    setIsAddingEvent(false);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '', category: 'Social' });
  };

  const handleRSVP = (eventId: string) => {
    if (!user) {
      alert('Please log in to RSVP.');
      return;
    }
    setSetEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const hasRSVPed = e.rsvps.includes(user.id);
        const newRsvps = hasRSVPed 
          ? e.rsvps.filter(id => id !== user.id) 
          : [...e.rsvps, user.id];
        return { ...e, rsvps: newRsvps };
      }
      return e;
    }));
  };

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    const newExec: SetExecutive = { ...roleForm };
    const updatedExecs = [...(currentSet.executives || []), newExec];
    setCurrentSet({ ...currentSet, executives: updatedExecs });
    setRoleForm({ name: '', role: 'Secretary', image: roleForm.image });
  };

  const handleRemoveRole = (idx: number) => {
    const updatedExecs = currentSet.executives?.filter((_, i) => i !== idx);
    setCurrentSet({ ...currentSet, executives: updatedExecs });
  };

  const isAdmin = user?.role === UserRole.ADMIN || user?.role === UserRole.PLATFORM_ADMIN;
  
  // Compute executives list, ensuring Chairperson (leader) is always present if nothing else exists
  const executives = currentSet.executives && currentSet.executives.length > 0 
    ? currentSet.executives 
    : [{ name: currentSet.leader, role: 'Chairperson', image: currentSet.image }];

  const availableRoles = [
    'Vice Chairperson', 
    'Secretary', 
    'Treasurer', 
    'Welfare Officer', 
    'Public Relations Officer', 
    'Project Coordinator',
    'Auditor',
    'Provost'
  ];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[450px]">
        <img src={currentSet.image} alt={`Set of ${currentSet.year}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
        <div className="absolute bottom-16 left-0 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="text-white">
              <Link to="/community/sets" className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center hover:text-white transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                Sets Directory
              </Link>
              <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">Class of {currentSet.year}</h1>
              <div className="flex items-center gap-6">
                <span className="flex items-center bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20 text-xs font-bold">
                  <svg className="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                  {currentSet.memberCount} Verified Alumni
                </span>
                <span className="flex items-center bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20 text-xs font-bold">
                  <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  Set ID: {currentSet.id.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-950/50 transition-all active:scale-95">Join Set Group</button>
              <button onClick={() => setIsDonating(true)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Support Initiative</button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Leadership Council Section */}
            <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Leadership Council</h2>
                  <p className="text-gray-500 font-medium text-sm">Dedicated alumni steering the Class of {currentSet.year} towards global excellence.</p>
                </div>
                {isAdmin && (
                  <button 
                    onClick={() => setIsManagingRoles(true)} 
                    className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Designate Roles
                  </button>
                )}
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {executives.map((exec, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center group hover:shadow-2xl hover:border-emerald-100 transition-all relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative mb-6 inline-block">
                      <div className="w-24 h-24 rounded-[30px] overflow-hidden mx-auto border-4 border-emerald-50 group-hover:border-emerald-100 transition-colors">
                        <img src={exec.image} className="w-full h-full object-cover" alt={exec.name} />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-50">
                        <svg className="w-5 h-5 text-emerald-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"></path></svg>
                      </div>
                    </div>
                    <h3 className="font-black text-gray-900 text-lg mb-1">{exec.name}</h3>
                    <p className="text-[10px] text-emerald-700 font-black uppercase tracking-[0.2em] bg-emerald-50 px-4 py-2 rounded-xl mt-3 inline-block border border-emerald-100">
                      {exec.role}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Set Events Timeline */}
            <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Set Activity Hub</h2>
                {isAdmin && <button onClick={() => setIsAddingEvent(true)} className="bg-emerald-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-xl">+ Launch Event</button>}
              </div>
              {setEvents.length > 0 ? (
                <div className="space-y-8 relative before:absolute before:left-8 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                  {setEvents.map(event => (
                    <div key={event.id} className="relative pl-20 group">
                      <div className="absolute left-0 top-1 w-16 h-16 bg-white rounded-[20px] shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-transform group-hover:scale-110">
                        <p className="text-[10px] font-black text-emerald-700 uppercase">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</p>
                        <p className="text-2xl font-black text-gray-900">{new Date(event.date).getDate()}</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-[28px] border border-transparent group-hover:border-emerald-100 group-hover:bg-white transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1">
                          <span className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-600 mb-1 block">{event.category}</span>
                          <h4 className="text-lg font-black text-gray-900 mb-2">{event.title}</h4>
                          <div className="flex gap-4 text-xs font-medium text-gray-400">
                             <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>{event.time}</span>
                             <span className="flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>{event.location.split(',')[0]}</span>
                          </div>
                        </div>
                        <button onClick={() => handleRSVP(event.id)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${event.rsvps.includes(user?.id || '') ? 'bg-emerald-100 text-emerald-700 shadow-inner' : 'bg-white text-gray-700 border shadow-sm hover:border-emerald-500 hover:text-emerald-700'}`}>
                          {event.rsvps.includes(user?.id || '') ? 'RSVP Confirmed' : 'Count Me In'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">📅</div>
                  <p className="text-gray-500 font-medium">No set-specific events scheduled for this quarter.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            <section className="bg-emerald-900 text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-800 rounded-full blur-2xl opacity-50"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-8">Set Vitality Index</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-bold text-emerald-100">Registry Verification</span>
                    <span className="text-xl font-black text-white">88%</span>
                  </div>
                  <div className="w-full bg-emerald-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-emerald-400 h-full w-[88%] rounded-full shadow-[0_0_10px_#10b981]"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-emerald-800">
                  <div>
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-1">Active Projects</p>
                    <p className="text-2xl font-black text-white">{PROJECTS.filter(p => p.setId === setId).length}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-1">Council Seats</p>
                    <p className="text-2xl font-black text-white">{executives.length} / 8</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-10 py-4 bg-white text-emerald-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all">Download Set Report</button>
            </section>

            {/* Set Projects Integration */}
            <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Ongoing Legacies</h3>
               <div className="space-y-6">
                 {PROJECTS.filter(p => p.setId === setId).map(p => (
                   <div key={p.id} className="group cursor-pointer">
                      <div className="h-40 rounded-3xl overflow-hidden mb-4 relative">
                        <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={p.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <p className="absolute bottom-4 left-4 text-white font-black text-sm">{p.name}</p>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-700">
                        <span>Impact Driven</span>
                        <Link to="/programs" className="hover:underline">Track &rarr;</Link>
                      </div>
                   </div>
                 ))}
                 {PROJECTS.filter(p => p.setId === setId).length === 0 && (
                   <div className="p-6 bg-gray-50 rounded-3xl text-center">
                      <p className="text-xs text-gray-500 font-medium">No active set-sponsored projects.</p>
                      <button className="text-emerald-700 text-[10px] font-black uppercase tracking-widest mt-2 hover:underline">Launch Initiative</button>
                   </div>
                 )}
               </div>
            </section>
          </div>
        </div>
      </div>

      {/* Role Management Modal */}
      {isManagingRoles && (
        <div className="fixed inset-0 bg-emerald-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 md:p-14 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Council Governance</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">Authorized personnel only: Assigning roles for Class of {currentSet.year}</p>
              </div>
              <button onClick={() => setIsManagingRoles(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all shadow-sm">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="space-y-12">
              {/* Existing roles list */}
              <div>
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Active Council Registry</h4>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{executives.length} Seats Filled</span>
                </div>
                <div className="grid gap-4">
                  {executives.map((exec, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-5 rounded-[24px] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                           <img src={exec.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">{exec.name}</p>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{exec.role}</p>
                        </div>
                      </div>
                      {exec.role !== 'Chairperson' ? (
                        <button onClick={() => handleRemoveRole(idx)} className="text-red-400 hover:text-red-600 p-3 bg-red-50/50 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      ) : (
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">Permanent Seat</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add new role form */}
              <div className="pt-10 border-t border-gray-100">
                <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-8">Designate New Official</h4>
                <form onSubmit={handleAddRole} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Member Identity</label>
                      <input 
                        type="text" required
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="e.g., Tunde Adebayo"
                        value={roleForm.name}
                        onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assigned Designation</label>
                      <select 
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold shadow-inner"
                        value={roleForm.role}
                        onChange={(e) => setRoleForm({...roleForm, role: e.target.value})}
                      >
                        {availableRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-emerald-700 text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all hover:-translate-y-1 transform active:scale-95">
                    Ratify Council Seat
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {isDonating && (
        <div className="fixed inset-0 bg-emerald-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 md:p-14 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Support Class Legacy</h2>
              <button onClick={() => setIsDonating(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all">
                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Set Project Contribution (₦)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-300 text-2xl">₦</span>
                  <input type="number" required className="w-full pl-14 pr-6 py-6 bg-gray-50 border-none rounded-[24px] focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-black text-3xl shadow-inner" placeholder="5,000" />
                </div>
              </div>
              <button type="submit" onClick={(e) => { e.preventDefault(); alert('Success! Transaction processed.'); setIsDonating(false); }} className="w-full py-6 bg-emerald-700 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all hover:-translate-y-1">Confirm & Proceed</button>
            </form>
          </div>
        </div>
      )}

      {/* Adding Event Modal */}
      {isAddingEvent && (
        <div className="fixed inset-0 bg-emerald-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 md:p-14 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Schedule New Event</h2>
              <button onClick={() => setIsAddingEvent(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all shadow-sm">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="space-y-8">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Event Title</label>
                    <input type="text" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold border-none" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                    <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold border-none" value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value as any})}>
                      <option>Social</option>
                      <option>Meeting</option>
                      <option>Impact</option>
                      <option>Reunion</option>
                    </select>
                  </div>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date</label>
                    <input type="date" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold border-none" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Time</label>
                    <input type="text" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold border-none" placeholder="e.g. 7:00 PM" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                  <input type="text" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold border-none" placeholder="Venue or Virtual Link" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
               </div>
               <div className="pt-6 border-t border-gray-100 flex gap-4">
                  <button type="button" onClick={() => setIsAddingEvent(false)} className="flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-emerald-700 text-white shadow-xl hover:bg-emerald-800">Publish Event</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetProfile;
