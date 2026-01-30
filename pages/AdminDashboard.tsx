
import React, { useState } from 'react';
import { NEWS as INITIAL_NEWS, PROJECTS as INITIAL_PROJECTS, EVENTS as INITIAL_EVENTS, ALUMNI_SETS } from '../mockData';
import { AlumniEvent, Project, NewsItem, UserRole } from '../types';

interface DashboardMember {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Inactive';
  year: number;
  email: string;
  dateJoined: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [members, setMembers] = useState<DashboardMember[]>([
    { id: 'M-101', name: 'Engr. Adebayo Tunde', status: 'Active', year: 1995, email: 'adebayo@example.com', dateJoined: '2024-01-15' },
    { id: 'M-102', name: 'Dr. Chioma Okereke', status: 'Pending', year: 2005, email: 'chioma.o@mail.com', dateJoined: '2024-02-10' },
    { id: 'M-103', name: 'Olawale Johnson', status: 'Pending', year: 1982, email: 'ojohnson@corporate.ng', dateJoined: '2024-02-12' },
    { id: 'M-104', name: 'Ngozi Eze', status: 'Active', year: 1990, email: 'ngozi.eze@global.com', dateJoined: '2023-12-05' },
    { id: 'M-105', name: 'Musa Ibrahim', status: 'Inactive', year: 2012, email: 'mibrahim@kano.ng', dateJoined: '2023-11-20' },
  ]);

  const [events, setEvents] = useState<AlumniEvent[]>(INITIAL_EVENTS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  
  const [isAddingItem, setIsAddingItem] = useState(false);

  const stats = [
    { label: 'Verified Alumni', value: '5,231', change: '+12%', icon: '👥' },
    { label: 'Pending Approvals', value: members.filter(m => m.status === 'Pending').length.toString(), change: '-5%', icon: '⏳' },
    { label: 'Active Projects', value: projects.length.toString(), change: '0%', icon: '🏗️' },
    { label: 'Endowment Fund', value: '₦45.2M', change: '+8%', icon: '💰' },
  ];

  const handleApproveMember = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'Active' } : m));
  };

  const handleDeleteItem = (type: string, id: string) => {
    if (!window.confirm('Confirm deletion of this record? This action is irreversible.')) return;
    if (type === 'events') setEvents(prev => prev.filter(e => e.id !== id));
    if (type === 'projects') setProjects(prev => prev.filter(p => p.id !== id));
    if (type === 'news') setNews(prev => prev.filter(n => n.id !== id));
    if (type === 'members') setMembers(prev => prev.filter(m => m.id !== id));
  };

  const navItems = [
    { id: 'members', label: 'Member Registry', icon: '👤' },
    { id: 'sets', label: 'Alumni Sets', icon: '🎓' },
    { id: 'projects', label: 'Programs', icon: '🏗️' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'news', label: 'News Center', icon: '📰' },
    { id: 'reports', label: 'Transparency', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-emerald-950 text-white lg:sticky lg:top-0 lg:h-screen shrink-0 overflow-y-auto hidden lg:block">
        <div className="p-10">
          <h2 className="text-3xl font-black border-b border-emerald-900 pb-6 tracking-tighter">USSSOSA</h2>
          <div className="mt-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center font-bold">AD</div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Super Admin</p>
              <p className="text-sm font-bold text-white">Registry Control</p>
            </div>
          </div>
        </div>
        
        <nav className="px-6 space-y-2 pb-10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSearchTerm(''); }}
              className={`w-full text-left px-5 py-4 rounded-2xl transition-all font-black text-sm flex items-center gap-4 ${
                activeTab === item.id 
                  ? 'bg-white text-emerald-950 shadow-2xl scale-[1.05]' 
                  : 'text-emerald-300 hover:bg-emerald-900/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight capitalize">{activeTab} Management</h1>
            <p className="text-gray-500 font-medium mt-1">Authorized access to USSSOSA system operations.</p>
          </div>
          <button 
            onClick={() => setIsAddingItem(true)}
            className="bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-emerald-800 transition-all hover:-translate-y-1 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Operational Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                <div className={`text-xs font-black px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Registry */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex gap-4">
             <input 
                type="text" 
                placeholder={`Search records...`} 
                className="flex-1 px-6 py-4 bg-gray-50 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b">
                  <th className="px-10 py-6">Subject Identity</th>
                  <th className="px-10 py-6">Contextual Detail</th>
                  <th className="px-10 py-6">Operational Status</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeTab === 'members' && members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map(m => (
                  <tr key={m.id} className="hover:bg-emerald-50/30 transition-colors group">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-emerald-900 rounded-xl flex items-center justify-center text-white font-black">{m.name.charAt(0)}</div>
                        <div>
                          <p className="font-black text-gray-900">{m.name}</p>
                          <p className="text-xs font-bold text-gray-400">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                       <p className="text-sm font-black text-gray-700">Class of {m.year}</p>
                       <p className="text-xs text-gray-400">Joined {m.dateJoined}</p>
                    </td>
                    <td className="px-10 py-7">
                       <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${m.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                         {m.status}
                       </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         {m.status === 'Pending' && (
                           <button onClick={() => handleApproveMember(m.id)} className="p-3 bg-emerald-700 text-white rounded-xl shadow-md">Approve</button>
                         )}
                         <button onClick={() => handleDeleteItem('members', m.id)} className="p-3 bg-red-50 text-red-600 rounded-xl">Delete</button>
                       </div>
                    </td>
                  </tr>
                ))}
                {/* Fallback for other tabs in this demo logic */}
                {activeTab !== 'members' && (
                  <tr>
                    <td colSpan={4} className="px-10 py-20 text-center text-gray-400 font-medium italic">
                      Management module for {activeTab} is currently active. Showing 0 filtered results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Creation Modal */}
      {isAddingItem && (
        <div className="fixed inset-0 bg-emerald-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-gray-900">Create {activeTab.slice(0, -1)}</h2>
                <button onClick={() => setIsAddingItem(false)} className="text-gray-400 hover:text-gray-900">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Item Title / Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold" placeholder={`Enter ${activeTab.slice(0, -1)} title...`} />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Primary Description</label>
                    <textarea className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold" rows={4} placeholder="Detailed content..."></textarea>
                 </div>
                 <div className="flex gap-4 pt-6">
                    <button onClick={() => setIsAddingItem(false)} className="flex-1 py-5 border border-gray-200 rounded-[20px] font-black text-sm uppercase tracking-widest text-gray-500">Discard</button>
                    <button onClick={() => setIsAddingItem(false)} className="flex-1 py-5 bg-emerald-700 text-white rounded-[20px] font-black text-sm uppercase tracking-widest shadow-xl">Publish Record</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
