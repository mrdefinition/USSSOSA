
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ALUMNI_SETS, EVENTS as INITIAL_EVENTS, PROJECTS } from '../mockData';
import { AlumniEvent, UserRole, User, Project } from '../types';

const SetProfile: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const set = ALUMNI_SETS.find((s) => s.id === setId);
  const [user, setUser] = useState<User | null>(null);
  const [setEvents, setSetEvents] = useState<AlumniEvent[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  
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
    
    // Filter events for this specific set
    const relevantEvents = INITIAL_EVENTS.filter(e => e.setId === setId);
    setSetEvents(relevantEvents);
  }, [setId]);

  if (!set) {
    return <Navigate to="/community/sets" />;
  }

  // Filter projects associated with this set
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

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(donationData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    // Simulate successful donation
    alert(`Thank you for your donation of ₦${amount.toLocaleString()} to ${donationData.projectId ? 'the selected project' : 'the Set General Fund'}!`);
    setIsDonating(false);
    setDonationData({ amount: '', projectId: '', message: '', anonymous: false });
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  // Use real executives from data, or fallback to default if not present
  const executives = set.executives || [
    { name: set.leader, role: 'Chairperson', image: set.image },
    { name: 'TBD', role: 'Secretary', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const spotlights = [
    { name: 'Bayo Tunde', achievement: 'Recently appointed CEO of a top Fintech firm in Lagos.', year: 2024 },
    { name: 'Ngozi Eze', achievement: 'Published a groundbreaking research paper on sustainable energy.', year: 2023 },
  ];

  const gallery = [
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative h-96">
        <img 
          src={set.image} 
          alt={`Set of ${set.year}`} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-12 left-0 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="text-white">
              <Link to="/community/sets" className="text-green-400 font-bold text-sm mb-4 flex items-center hover:underline">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                Back to Directory
              </Link>
              <h1 className="text-5xl font-black mb-2 leading-none">Class of {set.year}</h1>
              <div className="flex items-center gap-4 text-gray-300">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                  {set.memberCount} Verified Members
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                <span>Active Engagement</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-xl transition-all">
                Join Set Group
              </button>
              <button 
                onClick={() => setIsDonating(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-xl font-bold transition-all"
              >
                Donate to Set Project
              </button>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </span>
                Set Leadership Team
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {executives.map((exec, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center group hover:shadow-md transition-shadow">
                    <img src={exec.image} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-green-50 group-hover:border-green-200 transition-colors" />
                    <h3 className="font-bold text-gray-900">{exec.name}</h3>
                    <p className="text-sm text-green-700 font-medium">{exec.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Set-Specific Events Section */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                   <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </span>
                  Set-Specific Events
                </h2>
                {isAdmin && (
                  <button 
                    onClick={() => setIsAddingEvent(true)}
                    className="bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-800 transition-all shadow-md"
                  >
                    + Add Event
                  </button>
                )}
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
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-blue-100 text-blue-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">{event.category}</span>
                          <span className="text-xs text-gray-400 font-medium">{event.time}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                          {event.location}
                        </p>
                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{event.description}</p>
                      </div>
                      <button 
                        onClick={() => handleRSVP(event.id)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                          event.rsvps.includes(user?.id || '') 
                            ? 'bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100' 
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {event.rsvps.includes(user?.id || '') ? 'RSVPed ✓' : 'RSVP Now'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">No set-specific events scheduled yet.</p>
                </div>
              )}
            </section>

            {/* Gallery Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Activities Gallery</h2>
                <button className="text-sm font-bold text-green-700 hover:underline">Upload Photo</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((img, i) => (
                  <div key={i} className="h-40 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>

            {/* Alumni Spotlights */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Alumni Spotlights</h2>
              <div className="space-y-6">
                {spotlights.map((spot, i) => (
                  <div key={i} className="flex gap-6 items-start pb-6 border-b border-gray-50 last:border-0">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {spot.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{spot.name} <span className="text-xs text-gray-400 ml-2">{spot.year}</span></h4>
                      <p className="text-gray-600 text-sm mt-1">{spot.achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Quick Stats Sidebar Card */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 text-sm uppercase tracking-widest text-gray-400">Set Health Index</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Dues Compliance</span>
                  <span className="text-sm font-bold text-green-600">82%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-600 h-full w-[82%]"></div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-500">Total Projects Funded</span>
                  <span className="text-sm font-bold text-gray-900">4 Projects</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Average Activity Level</span>
                  <span className="text-sm font-bold text-gray-900">Very High</span>
                </div>
              </div>
            </section>

            {/* Contact Support */}
            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">Need Set Assistance?</h4>
              <p className="text-xs text-blue-700 leading-relaxed mb-4">Contact your set leadership or the national welfare committee for any support or verification issues.</p>
              <button className="text-blue-800 text-xs font-bold hover:underline">Contact Support &rarr;</button>
            </div>

          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddingEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">New Set Event</h2>
              <button onClick={() => setIsAddingEvent(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form className="space-y-5" onSubmit={handleSaveEvent}>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Title</label>
                <input 
                  type="text" required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                  placeholder="Set Reunion 2024"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Date</label>
                  <input 
                    type="date" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Time</label>
                  <input 
                    type="time" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value as any})}
                  >
                    <option>Social</option>
                    <option>Meeting</option>
                    <option>Impact</option>
                    <option>Reunion</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Location</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Venue Name"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Description</label>
                <textarea 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
                  rows={3} 
                  placeholder="Tell the class about the event..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                ></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsAddingEvent(false)} className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-6 py-4 bg-blue-700 text-white rounded-2xl font-black shadow-lg hover:bg-blue-800 transition-all">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {isDonating && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">Support Your Class</h2>
              <button onClick={() => setIsDonating(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <form className="space-y-6" onSubmit={handleDonationSubmit}>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-3 block">Choose a Project (Optional)</label>
                <div className="grid grid-cols-1 gap-2">
                  <button 
                    type="button"
                    onClick={() => setDonationData({...donationData, projectId: ''})}
                    className={`text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                      donationData.projectId === '' ? 'bg-green-50 border-green-500 text-green-900' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Set General Endowment Fund
                  </button>
                  {setProjects.map(project => (
                    <button 
                      key={project.id}
                      type="button"
                      onClick={() => setDonationData({...donationData, projectId: project.id})}
                      className={`text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                        donationData.projectId === project.id ? 'bg-green-50 border-green-500 text-green-900' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Donation Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₦</span>
                  <input 
                    type="number" required
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:outline-none font-black text-xl" 
                    placeholder="5,000"
                    value={donationData.amount}
                    onChange={(e) => setDonationData({...donationData, amount: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {['1000', '5000', '10000'].map(val => (
                    <button 
                      key={val}
                      type="button"
                      onClick={() => setDonationData({...donationData, amount: val})}
                      className="py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-bold transition-colors"
                    >
                      ₦{parseInt(val).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Message to Class (Optional)</label>
                <textarea 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none text-sm" 
                  rows={2} 
                  placeholder="Leave a short note..."
                  value={donationData.message}
                  onChange={(e) => setDonationData({...donationData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  id="anonymous"
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  checked={donationData.anonymous}
                  onChange={(e) => setDonationData({...donationData, anonymous: e.target.checked})}
                />
                <label htmlFor="anonymous" className="text-sm text-gray-600 font-medium cursor-pointer select-none">Make this donation anonymous</label>
              </div>

              <button type="submit" className="w-full py-4 bg-green-700 text-white rounded-2xl font-black shadow-lg hover:bg-green-800 transition-all hover:-translate-y-1 active:translate-y-0">
                Proceed to Secure Payment
              </button>
              <p className="text-[10px] text-center text-gray-400 font-medium">Your payment is encrypted and secured by Flutterwave/Paystack.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetProfile;
