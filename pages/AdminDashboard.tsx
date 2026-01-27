
import React, { useState } from 'react';
import { EVENTS as INITIAL_EVENTS } from '../mockData';
import { AlumniEvent } from '../types';

interface DashboardItem {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Inactive';
  role: string;
  date: string;
  type: string;
  year?: number;
  location?: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  
  const [items, setItems] = useState<DashboardItem[]>([
    { id: 'US-2024-001', name: 'Adebayo Tunde', status: 'Active', role: 'Member', year: 1995, location: 'Lagos, Nigeria', date: 'Oct 11, 2024', type: 'members' },
    { id: 'US-2024-002', name: 'Chioma Okereke', status: 'Pending', role: 'Member', year: 2005, location: 'Abuja, Nigeria', date: 'Oct 12, 2024', type: 'members' },
    { id: 'US-2024-003', name: 'Olawale Johnson', status: 'Pending', role: 'Member', year: 1982, location: 'London, UK', date: 'Oct 13, 2024', type: 'members' },
    { id: 'US-2024-004', name: 'Ngozi Eze', status: 'Active', role: 'Admin', year: 1990, location: 'New York, USA', date: 'Oct 14, 2024', type: 'members' },
    { id: 'US-2024-005', name: 'Musa Ibrahim', status: 'Inactive', role: 'Member', year: 2012, location: 'Kano, Nigeria', date: 'Oct 15, 2024', type: 'members' },
    { id: 'PR-2024-001', name: 'Solar Power Project', status: 'Active', role: 'Infrastructure', date: 'Oct 10, 2024', type: 'programs' },
  ]);

  const [localEvents, setLocalEvents] = useState<AlumniEvent[]>(INITIAL_EVENTS);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: 'Meeting' as any
  });

  const stats = [
    { label: 'Total Members', value: '5,231', change: '+12%' },
    { label: 'Pending Approvals', value: items.filter(i => i.status === 'Pending' && i.type === 'members').length.toString(), change: '-5%' },
    { label: 'Active Projects', value: '8', change: '0%' },
    { label: 'Dues Collected', value: '₦12.4M', change: '+18%' },
  ];

  const handleApprove = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, status: 'Active' as const } : item
      )
    );
  };

  const handleDeleteEvent = (id: string) => {
    setLocalEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventToAdd: AlumniEvent = {
      ...newEvent,
      id: `e${Date.now()}`,
      rsvps: []
    };
    setLocalEvents(prev => [eventToAdd, ...prev]);
    setIsAddingEvent(false);
    setNewEvent({ title: '', date: '', time: '', location: '', description: '', category: 'Meeting' });
  };

  const filteredItems = items.filter(item => {
    const matchesTab = item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredEvents = localEvents.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white hidden md:block shrink-0">
        <div className="p-8">
          <h2 className="text-2xl font-black border-b border-green-800 pb-4 tracking-tight">USSSOSA</h2>
          <p className="text-xs text-green-400 font-bold mt-2 uppercase">Admin Portal</p>
        </div>
        <nav className="mt-4 px-4 space-y-2">
          {['Members', 'Sets', 'Programs', 'Events', 'Reports', 'Messages'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab.toLowerCase());
                setSearchTerm('');
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm flex items-center ${
                activeTab === tab.toLowerCase() ? 'bg-white text-green-900 shadow-lg scale-105' : 'text-green-300 hover:bg-green-800 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 capitalize tracking-tight">{activeTab} Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and moderate the {activeTab} of USSSOSA.</p>
          </div>
          <button 
            onClick={() => activeTab === 'events' ? setIsAddingEvent(true) : null}
            className="bg-green-700 text-white px-8 py-3 rounded-xl font-black shadow-xl hover:bg-green-800 transition-all hover:-translate-y-1"
          >
            + Add New {activeTab.slice(0, -1)}
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-green-700 transition-colors">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding event */}
        {isAddingEvent && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">Create New Event</h2>
                <button onClick={() => setIsAddingEvent(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <form className="space-y-5" onSubmit={handleSaveEvent}>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Event Title</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" 
                    placeholder="Grand Alumni Homecoming"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Time</label>
                    <input 
                      type="time" 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value as any})}
                  >
                    <option>Meeting</option>
                    <option>Social</option>
                    <option>Impact</option>
                    <option>Reunion</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Location</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" 
                    placeholder="Venue Name or Virtual Link"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Description</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" 
                    rows={3} 
                    placeholder="Short summary of the event..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsAddingEvent(false)} className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-4 bg-green-700 text-white rounded-2xl font-black shadow-lg hover:bg-green-800 transition-all">Publish Event</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-8 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <h2 className="font-black text-gray-900 whitespace-nowrap text-lg uppercase tracking-tight">Active {activeTab} Records</h2>
            <div className="flex w-full md:w-auto space-x-4">
              <div className="relative flex-grow min-w-[300px]">
                <input 
                  type="text" 
                  placeholder={`Quick search ${activeTab}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm" 
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {activeTab === 'events' ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white text-gray-400 text-[10px] font-black uppercase tracking-widest border-b">
                    <th className="px-8 py-5">Event Detail</th>
                    <th className="px-8 py-5">DateTime</th>
                    <th className="px-8 py-5">Location</th>
                    <th className="px-8 py-5">RSVPs</th>
                    <th className="px-8 py-5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEvents.map(e => (
                    <tr key={e.id} className="hover:bg-green-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div>
                          <p className="font-black text-gray-900 group-hover:text-green-800 transition-colors">{e.title}</p>
                          <span className="text-[10px] font-bold text-green-700 px-1.5 py-0.5 bg-green-50 rounded uppercase">{e.category}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                        <p>{e.date}</p>
                        <p className="text-xs text-gray-400">{e.time}</p>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-500 truncate max-w-[200px]">{e.location}</td>
                      <td className="px-8 py-5">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{e.rsvps.length} Going</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => handleDeleteEvent(e.id)}
                          className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white text-gray-400 text-[10px] font-black uppercase tracking-widest border-b">
                    <th className="px-8 py-5">Entity Name</th>
                    {activeTab === 'members' && (
                      <>
                        <th className="px-8 py-5">Graduating Year</th>
                        <th className="px-8 py-5">Location</th>
                        <th className="px-8 py-5">Member Status</th>
                      </>
                    )}
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.length > 0 ? filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-green-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-2xl bg-green-900 text-white flex items-center justify-center text-xs font-black mr-4 shadow-md group-hover:scale-110 transition-transform">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-gray-900 group-hover:text-green-800 transition-colors">{item.name}</p>
                            <p className="text-[10px] font-bold text-gray-400">UID: {item.id}</p>
                          </div>
                        </div>
                      </td>
                      {activeTab === 'members' && (
                        <>
                          <td className="px-8 py-5">
                            <span className="text-sm font-bold text-gray-700">Class of {item.year}</span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center text-sm text-gray-500 font-medium">
                              <svg className="w-4 h-4 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                              {item.location}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${
                                item.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 
                                item.status === 'Pending' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                              }`}></div>
                              <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${
                                item.status === 'Active' ? 'bg-green-50 text-green-700' : 
                                item.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                              }`}>
                                {item.status === 'Active' ? 'Active' : 
                                 item.status === 'Pending' ? 'Pending Approval' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                        </>
                      )}
                      <td className="px-8 py-5 text-right space-x-2">
                        {activeTab === 'members' && item.status === 'Pending' && (
                          <button 
                            onClick={() => handleApprove(item.id)}
                            className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-xl font-black text-xs transition-all shadow-md active:scale-95"
                          >
                            Verify
                          </button>
                        )}
                        <button className="text-gray-400 hover:text-green-700 p-2 hover:bg-white rounded-lg transition-all">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button className="text-gray-400 hover:text-blue-700 p-2 hover:bg-white rounded-lg transition-all">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center">
                         <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                         </div>
                         <p className="text-gray-500 font-bold">No records found matching "{searchTerm}"</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
