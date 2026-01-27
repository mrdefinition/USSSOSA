
import React, { useState, useEffect } from 'react';
import { NEWS, EVENTS as INITIAL_EVENTS } from '../mockData';
import { AlumniEvent, UserRole } from '../types';

const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<AlumniEvent | null>(null);
  const [events, setEvents] = useState<AlumniEvent[]>(INITIAL_EVENTS);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('usssosa_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Simple calendar logic
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const handleRSVP = (eventId: string) => {
    if (!user) {
      alert('Please log in to RSVP for events.');
      return;
    }

    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const hasRSVPed = e.rsvps.includes(user.id);
        const newRsvps = hasRSVPed 
          ? e.rsvps.filter(id => id !== user.id) 
          : [...e.rsvps, user.id];
        
        const updatedEvent = { ...e, rsvps: newRsvps };
        if (selectedEvent?.id === eventId) setSelectedEvent(updatedEvent);
        return updatedEvent;
      }
      return e;
    }));
  };

  return (
    <div className="pb-20">
      <section className="bg-green-900 py-16 text-white px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 uppercase tracking-wider">News & Events</h1>
            <p className="text-green-100 max-w-xl">Stay updated with our global impact and upcoming opportunities to connect.</p>
          </div>
          <div className="flex bg-green-800/50 p-1 rounded-xl border border-green-700">
            <button 
              onClick={() => setActiveTab('news')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'news' ? 'bg-white text-green-900' : 'text-green-100 hover:bg-green-700'}`}
            >
              Latest News
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-white text-green-900' : 'text-green-100 hover:bg-green-700'}`}
            >
              Event Calendar
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === 'news' ? (
          <div className="grid gap-12">
            {NEWS.map((item, index) => (
              <div key={item.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 p-4 md:p-8`}>
                <div className="w-full md:w-1/2">
                  <img src={item.image} alt={item.title} className="w-full h-80 object-cover rounded-2xl shadow-inner" />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase">{item.category}</span>
                    <span className="text-gray-400 text-sm">{item.date}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight">{item.title}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.summary}</p>
                  <div className="pt-6">
                    <button className="text-green-700 font-bold flex items-center group">
                      Read Full Article 
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Calendar Grid */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-2xl font-bold text-gray-900">{monthNames[month]} {year}</h2>
                  <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-green-100 text-green-700 rounded-lg transition-colors border border-transparent hover:border-green-200">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-green-100 text-green-700 rounded-lg transition-colors border border-transparent hover:border-green-200">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 border-b text-center py-3 bg-gray-50/30">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="text-xs font-bold text-gray-400 uppercase tracking-widest">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {Array.from({ length: startDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-28 md:h-36 border-b border-r border-gray-50 bg-gray-50/20"></div>
                  ))}
                  {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
                    return (
                      <div key={day} className={`h-28 md:h-36 border-b border-r border-gray-50 p-2 relative group hover:bg-green-50/40 transition-colors ${isToday ? 'bg-green-50/10' : ''}`}>
                        <span className={`text-sm font-bold ${isToday ? 'text-green-700 ring-2 ring-green-100 px-1 rounded' : 'text-gray-400'} group-hover:text-green-700`}>{day}</span>
                        <div className="mt-1 space-y-1 overflow-y-auto max-h-[80%]">
                          {dayEvents.map(e => (
                            <button 
                              key={e.id}
                              onClick={() => setSelectedEvent(e)}
                              className="w-full text-left p-1.5 bg-green-700 text-white text-[9px] md:text-[10px] font-bold rounded shadow-sm truncate hover:bg-green-800 transition-all border border-green-800"
                            >
                              {e.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar / Event Detail */}
            <div className="space-y-8">
              {selectedEvent ? (
                <div className="bg-white rounded-3xl p-8 border border-green-200 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{selectedEvent.category}</span>
                    <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{selectedEvent.title}</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-sm text-gray-600 font-medium">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      {new Date(selectedEvent.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at {selectedEvent.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 font-medium">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                      </div>
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 font-medium">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      </div>
                      {selectedEvent.rsvps.length} Attendees RSVPed
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">{selectedEvent.description}</p>
                  
                  {user ? (
                    <button 
                      onClick={() => handleRSVP(selectedEvent.id)}
                      className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${
                        selectedEvent.rsvps.includes(user.id) 
                          ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' 
                          : 'bg-green-700 text-white hover:bg-green-800'
                      }`}
                    >
                      {selectedEvent.rsvps.includes(user.id) ? 'Cancel RSVP' : 'RSVP to Attend'}
                    </button>
                  ) : (
                    <div className="text-center p-4 bg-yellow-50 rounded-2xl border border-yellow-100 text-xs font-bold text-yellow-800">
                      Login to RSVP for this event
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-3xl p-12 border-2 border-dashed border-gray-200 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">No Event Selected</h4>
                  <p className="text-gray-500 text-sm">Tap on an event in the calendar to see full details and RSVP.</p>
                </div>
              )}

              {/* Summary List */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Coming Soon
                </h4>
                <div className="space-y-4">
                  {events.slice(0, 4).map(e => (
                    <button 
                      key={e.id}
                      onClick={() => setSelectedEvent(e)}
                      className="w-full text-left group p-4 rounded-2xl hover:bg-green-50/50 transition-colors border border-transparent hover:border-green-100 flex items-center justify-between"
                    >
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-0.5">{e.date}</p>
                        <p className="font-bold text-gray-900 group-hover:text-green-800 transition-colors truncate">{e.title}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
