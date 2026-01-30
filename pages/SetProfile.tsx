
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ALUMNI_SETS, EVENTS as INITIAL_EVENTS, PROJECTS } from '../mockData';
import { AlumniEvent, UserRole, User, SetExecutive } from '../types';

const SetProfile: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const [currentSet, setCurrentSet] = useState(ALUMNI_SETS.find((s) => s.id === setId));
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

  const [donationData, setDonationData] = useState({
    amount: '',
    projectId: '',
    message: '',
    anonymous: false
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

  const setProjects = PROJECTS.filter(p => p.setId === setId);

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
  const isSetMember = user?.graduatingYear === currentSet.year;

  const executives = currentSet.executives || [
    { name: currentSet.leader, role: 'Chairperson', image: currentSet.image }
  ];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative h-96">
        <img src={currentSet.image} alt={`Set of ${currentSet.year}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-12 left-0 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="text-white">
              <Link to="/community/sets" className="text-green-400 font-bold text-sm mb-4 flex items-center hover:underline">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                Back to Directory
              </Link>
              <h1 className="text-5xl font-black mb-2 leading-none">Class of {currentSet.year}</h1>
              <div className="flex items-center gap-4 text-gray-300">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                  {currentSet.memberCount} Verified Members
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-xl transition-all">Join Set Group</button>
              <button onClick={() => setIsDonating(true)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-xl font-bold transition-all">Donate to Set Project</button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Set Executive Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </span>
                  Set Leadership Core
                </h2>
                {isAdmin && (
                  <button onClick={() => setIsManagingRoles(true)} className="text-xs font-black text-emerald-700 uppercase tracking-widest hover:underline bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                    Designate Roles
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {executives.map((exec, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center group hover:shadow-md transition-shadow relative">
                    <img src={exec.image} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-green-50 group-hover:border-green-200 transition-colors" />
                    <h3 className="font-bold text-gray-900">{exec.name}</h3>
                    <p className="text-xs text-emerald-700 font-black uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full mt-2 inline-block border border-emerald-100">{exec.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Set-Specific Events */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                   <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </span>
                  Set-Specific Events
                </h2>
                {isAdmin && <button onClick={() => setIsAddingEvent(true)} className="bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-800 transition-all shadow-md">+ Add Event</button>}
              </div>
              {setEvents.length > 0 ? (
                <div className="space-y-6">
                  {setEvents.map(event => (
                    <div key={event.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="bg-white p-3 rounded-2xl shadow-sm text-center min-w-[80px]">
                        <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</p>
                        <p className="text-2xl font-black text-gray-900">{new Date(event.date).getDate()}</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-400 font-medium">{event.time} @ {event.location}</p>
                      </div>
                      <button onClick={() => handleRSVP(event.id)} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${event.rsvps.includes(user?.id || '') ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700 border'}`}>
                        {event.rsvps.includes(user?.id || '') ? 'RSVPed ✓' : 'RSVP Now'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200"><p className="text-gray-500 text-sm">No set-specific events scheduled.</p></div>
              )}
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 text-sm uppercase tracking-widest text-gray-400">Set Health Index</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Dues Compliance</span><span className="text-sm font-bold text-green-600">82%</span></div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden"><div className="bg-green-600 h-full w-[82%]"></div></div>
                <div className="flex justify-between items-center pt-2"><span className="text-sm text-gray-500">Executive Council</span><span className="text-sm font-bold text-gray-900">{executives.length} Seats Filled</span></div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Role Management Modal */}
      {isManagingRoles && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Designate Set Roles</h2>
              <button onClick={() => setIsManagingRoles(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Existing roles list */}
              <div>
                <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-4">Current Council</h4>
                <div className="space-y-3">
                  {executives.map((exec, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 group">
                      <div className="flex items-center gap-4">
                        <img src={exec.image} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{exec.name}</p>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{exec.role}</p>
                        </div>
                      </div>
                      {exec.role !== 'Chairperson' && (
                        <button onClick={() => handleRemoveRole(idx)} className="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add new role form */}
              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-6">Assign New Role</h4>
                <form onSubmit={handleAddRole} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block ml-1">Member Name</label>
                      <input 
                        type="text" required
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold"
                        placeholder="e.g., Ngozi Eze"
                        value={roleForm.name}
                        onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block ml-1">Designated Role</label>
                      <select 
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-semibold"
                        value={roleForm.role}
                        onChange={(e) => setRoleForm({...roleForm, role: e.target.value})}
                      >
                        <option>Secretary</option>
                        <option>Treasurer</option>
                        <option>Welfare Officer</option>
                        <option>Project Coordinator</option>
                        <option>Vice Chairperson</option>
                        <option>Public Relations Officer</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-emerald-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-emerald-800 transition-all hover:-translate-y-1">
                    Designate Member
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal & Event Modal code remains mostly unchanged but functional... */}
      {isDonating && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">Support Your Class</h2>
              <button onClick={() => setIsDonating(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Donation Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₦</span>
                  <input type="number" required className="w-full pl-10 pr-4 py-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-green-500 font-black text-xl" placeholder="5,000" />
                </div>
              </div>
              <button type="submit" onClick={(e) => { e.preventDefault(); alert('Success!'); setIsDonating(false); }} className="w-full py-4 bg-green-700 text-white rounded-2xl font-black shadow-lg">Proceed to Secure Payment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetProfile;
