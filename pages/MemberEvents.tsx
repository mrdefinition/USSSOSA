
import React, { useState, useEffect } from 'react';
import { User, MemberEvent, EventType } from '../types';

interface MemberEventsProps {
  user: User | null;
}

const MemberEvents: React.FC<MemberEventsProps> = ({ user }) => {
  const [events, setEvents] = useState<MemberEvent[]>([]);
  const [formData, setFormData] = useState({
    eventType: EventType.BIRTHDAY,
    eventDate: '',
    description: '',
    isPublic: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Load existing events from local storage or mock
    const saved = localStorage.getItem(`usssosa_events_${user?.id}`);
    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      // Mock initial data
      const mockEvents: MemberEvent[] = [
        {
          id: '1',
          memberId: user?.id || '1',
          eventType: EventType.ACHIEVEMENT,
          description: 'Promoted to Senior Consultant at KPMG Nigeria.',
          eventDate: '2024-03-15',
          isPublic: true,
          createdAt: new Date().toISOString(),
        }
      ];
      setEvents(mockEvents);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    const newEvent: MemberEvent = {
      id: Math.random().toString(36).substr(2, 9),
      memberId: user.id,
      eventType: formData.eventType,
      description: formData.description,
      eventDate: formData.eventDate,
      isPublic: formData.isPublic,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      const updatedEvents = [newEvent, ...events];
      setEvents(updatedEvents);
      localStorage.setItem(`usssosa_events_${user.id}`, JSON.stringify(updatedEvents));
      setIsSubmitting(false);
      setSuccessMsg('Your event has been reported successfully!');
      setFormData({
        eventType: EventType.BIRTHDAY,
        eventDate: '',
        description: '',
        isPublic: true,
      });
      setTimeout(() => setSuccessMsg(''), 5000);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-12 rounded-[40px] shadow-xl border border-gray-100 max-w-md">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Portal Access Required</h2>
          <p className="text-gray-500 mb-8">Please login to report milestones and view your event history.</p>
          <a href="#/membership" className="inline-block bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-800 transition-all">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-emerald-900 py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-800 rounded-full blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Report a Milestone</h1>
          <p className="text-xl text-emerald-100 max-w-2xl font-light">
            Share your personal and professional highlights with the USSSOSA community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Form Section */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                <span className="w-2 h-6 bg-emerald-600 rounded-full mr-3"></span>
                Event Details
              </h2>

              {successMsg && (
                <div className="mb-8 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-sm font-bold flex items-center animate-in slide-in-from-top-4 duration-300">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {successMsg}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Type</label>
                  <select 
                    name="eventType" 
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold"
                    value={formData.eventType}
                    onChange={handleInputChange}
                  >
                    {Object.values(EventType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Event Date</label>
                  <input 
                    name="eventDate"
                    type="date" 
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Short Description</label>
                  <textarea 
                    name="description"
                    rows={4}
                    required
                    maxLength={200}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold"
                    placeholder="e.g., Just completed my Ph.D. or Welcomed a new addition to the family!"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                   <div>
                      <span className="block text-xs font-black text-gray-900 mb-1">Public Visibility</span>
                      <p className="text-[10px] text-gray-400 font-medium">Allow other alumni to see this milestone.</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="isPublic"
                      className="sr-only peer"
                      checked={formData.isPublic}
                      onChange={handleInputChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-700 text-white py-5 rounded-[20px] font-black uppercase tracking-widest shadow-xl shadow-emerald-900/10 hover:bg-emerald-800 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0"
                >
                  {isSubmitting ? 'Processing...' : 'Report Event'}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Event History</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{events.length} Records</span>
            </div>

            {events.length > 0 ? (
              <div className="space-y-6">
                {events.map(event => (
                  <div key={event.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-start gap-6">
                      <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-110 ${
                        event.eventType === EventType.BIRTHDAY ? 'bg-amber-100 text-amber-600' :
                        event.eventType === EventType.DEATH ? 'bg-gray-100 text-gray-600' :
                        event.eventType === EventType.ACHIEVEMENT ? 'bg-emerald-100 text-emerald-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {event.eventType === EventType.BIRTHDAY ? '🎂' :
                         event.eventType === EventType.DEATH ? '🕯️' :
                         event.eventType === EventType.ACHIEVEMENT ? '🏆' : '📣'}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mr-4">{event.eventType}</span>
                             <span className="text-xs text-gray-400 font-bold">{new Date(event.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                           </div>
                           <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${event.isPublic ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-400'}`}>
                             {event.isPublic ? 'Public' : 'Private'}
                           </span>
                        </div>
                        <p className="text-gray-900 font-bold text-lg mb-4 leading-tight">{event.description}</p>
                        <div className="flex items-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
                          Submitted {new Date(event.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-20 border-2 border-dashed border-gray-200 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No events reported yet</h3>
                <p className="text-gray-500 text-sm">Use the form to share your first milestone.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Community Visuals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
         <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 grid md:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center">
               <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight">Strength in Our Stories</h3>
               <p className="text-gray-500 font-medium leading-relaxed mb-8">
                  The USSSOSA network is built on the collective experiences of its members. 
                  By reporting milestones, we celebrate successes together and support each other through life's transitions. 
                  Verified events are featured in our monthly alumni bulletins.
               </p>
               <div className="flex gap-4">
                  <div className="text-center">
                     <p className="text-2xl font-black text-emerald-700">1,200+</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Achievements Shared</p>
                  </div>
                  <div className="w-px h-10 bg-gray-100 mx-4"></div>
                  <div className="text-center">
                     <p className="text-2xl font-black text-emerald-700">450+</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Community Celebrations</p>
                  </div>
               </div>
            </div>
            <div className="relative min-h-[400px]">
               <img src="https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800" className="absolute inset-0 w-full h-full object-cover" alt="Nigerian Alumni Networking" />
               <div className="absolute inset-0 bg-emerald-950/20"></div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default MemberEvents;
