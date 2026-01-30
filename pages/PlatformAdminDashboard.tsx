
import React, { useState } from 'react';

const PlatformAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const systemHealth = [
    { service: 'Database Cluster', status: 'Operational', latency: '24ms', load: '12%' },
    { service: 'Authentication Engine', status: 'Operational', latency: '45ms', load: '5%' },
    { service: 'File Storage (S3)', status: 'Operational', latency: '110ms', load: '22%' },
    { service: 'Mailing Server', status: 'Healthy', latency: '1.2s', load: '1%' },
  ];

  const globalStats = [
    { label: 'Total Network Users', value: '18,422', icon: '🌍' },
    { label: 'Active Sessions', value: '452', icon: '⚡' },
    { label: 'Monthly Traffic', value: '2.4 TB', icon: '📡' },
    { label: 'Global Funds Managed', value: '₦142.5M', icon: '💎' },
  ];

  const logEntries = [
    { time: '14:22:01', event: 'New Admin created for 1995 Set', user: 'system_root' },
    { time: '13:45:12', event: 'Global transparency report published', user: 'super_admin' },
    { time: '11:05:55', event: 'Security patch v2.4.1 applied', user: 'dev_ops' },
    { time: '09:30:00', event: 'Daily database backup successful', user: 'cron_job' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-slate-900 border-r border-slate-800 lg:h-screen lg:sticky lg:top-0">
        <div className="p-8 border-b border-slate-800">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-slate-950 text-2xl shadow-lg shadow-emerald-500/20">P</div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase">Platform Root</h2>
           </div>
           <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated As</p>
              <p className="text-sm font-bold text-emerald-400">Master Controller</p>
           </div>
        </div>

        <nav className="p-6 space-y-2">
           {[
             { id: 'overview', label: 'Global Overview', icon: '📊' },
             { id: 'nodes', label: 'Infrastructure Nodes', icon: '🖥️' },
             { id: 'users', label: 'Identity Management', icon: '🛡️' },
             { id: 'logs', label: 'System Audit Logs', icon: '📜' },
             { id: 'finance', label: 'Global Financials', icon: '💰' },
             { id: 'config', label: 'Platform Config', icon: '⚙️' },
           ].map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`w-full text-left px-5 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest flex items-center gap-4 ${
                 activeTab === item.id 
                   ? 'bg-emerald-500 text-slate-950 shadow-xl scale-[1.05]' 
                   : 'text-slate-400 hover:bg-slate-800 hover:text-white'
               }`}
             >
               <span className="text-lg grayscale-0">{item.icon}</span>
               {item.label}
             </button>
           ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-16 space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Platform Command Center</h1>
              <p className="text-slate-500 font-medium mt-1">Global management of USSSOSA decentralized alumni network.</p>
           </div>
           <div className="flex gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                 <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Platform Online</span>
              </div>
           </div>
        </header>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {globalStats.map(stat => (
             <div key={stat.label} className="bg-slate-900 p-8 rounded-[32px] border border-slate-800 hover:border-emerald-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
                   <svg className="w-5 h-5 text-slate-700 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
             </div>
           ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
           {/* System Health */}
           <div className="lg:col-span-7 space-y-8">
              <div className="bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden shadow-2xl">
                 <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Core Infrastructure</h3>
                    <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Re-ping All Nodes</button>
                 </div>
                 <div className="p-4">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                             <th className="p-6">Node Service</th>
                             <th className="p-6">Status</th>
                             <th className="p-6 text-right">Metrics</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-800/50">
                          {systemHealth.map(node => (
                            <tr key={node.service} className="hover:bg-slate-800/30 transition-colors">
                               <td className="p-6">
                                  <p className="font-bold text-slate-200">{node.service}</p>
                               </td>
                               <td className="p-6">
                                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                     {node.status}
                                  </span>
                               </td>
                               <td className="p-6 text-right">
                                  <p className="text-xs font-black text-slate-400">{node.latency}</p>
                                  <div className="w-24 h-1 bg-slate-800 rounded-full mt-2 ml-auto overflow-hidden">
                                     <div className="h-full bg-emerald-500" style={{ width: node.load }}></div>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Activity Log */}
           <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900 rounded-[40px] border border-slate-800 p-10 shadow-2xl">
                 <h3 className="text-lg font-black text-white uppercase tracking-widest mb-10">Global Audit Trail</h3>
                 <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
                    {logEntries.map((log, i) => (
                      <div key={i} className="relative pl-10 group">
                         <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border-4 border-slate-950 group-hover:bg-emerald-500 group-hover:border-emerald-500/30 transition-all"></div>
                         <p className="text-[10px] font-black text-slate-600 uppercase mb-1 tracking-widest">{log.time} • {log.user}</p>
                         <p className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{log.event}</p>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-12 py-4 border border-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                    Access Detailed Logs
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default PlatformAdminDashboard;
