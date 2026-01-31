
import React, { useState } from 'react';
import { PROJECTS } from '../mockData';
import { ProjectCategory } from '../types';

const CATEGORIES: (ProjectCategory | 'All')[] = [
  'All',
  'Education & Scholarships',
  'School Development Initiatives',
  'Mentorship & Career Development',
  'Community Outreach',
  'Sustainability & Investment Initiatives'
];

const STATUSES: ('All' | 'ongoing' | 'completed' | 'planned')[] = ['All', 'ongoing', 'completed', 'planned'];

const Programs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [activeStatus, setActiveStatus] = useState<'All' | 'ongoing' | 'completed' | 'planned'>('All');

  const filteredProjects = PROJECTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesStatus = activeStatus === 'All' || p.status === activeStatus;
    return matchesCategory && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    if (status === 'All') return PROJECTS.length;
    return PROJECTS.filter(p => p.status === status).length;
  };

  return (
    <div className="pb-20 bg-white">
      {/* Hero Section - Simplified to focus on Content */}
      <section className="bg-emerald-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-800 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-700 rounded-full blur-[120px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            Project Impact Tracker
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">Our Global <br/><span className="text-emerald-400">Impact Legacies</span></h1>
          <p className="text-xl text-emerald-100/80 max-w-2xl mx-auto font-light leading-relaxed">
            Real-time tracking of USSSOSA infrastructure, welfare, and scholarship initiatives across the Nigerian education sector.
          </p>
        </div>
      </section>

      {/* Interactive Filter Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 md:p-12 space-y-10">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-10">
             <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Program Directory</h2>
                <p className="text-sm font-medium text-gray-400">Discover projects by their development cycle and focus area.</p>
             </div>
             {(activeCategory !== 'All' || activeStatus !== 'All') && (
               <button 
                onClick={() => { setActiveCategory('All'); setActiveStatus('All'); }}
                className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all border border-emerald-100"
               >
                 Reset All Filters
               </button>
             )}
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Status Segmented Control */}
            <div className="lg:col-span-4 space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Development Status</label>
              <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-[28px] border border-gray-100">
                 {STATUSES.map(status => (
                    <button
                      key={status}
                      onClick={() => setActiveStatus(status)}
                      className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 ${
                        activeStatus === status 
                          ? 'bg-emerald-700 text-white shadow-xl scale-[1.02]' 
                          : 'text-gray-400 hover:text-emerald-700 hover:bg-white'
                      }`}
                    >
                      <span>{status}</span>
                      <span className={`text-[8px] font-bold ${activeStatus === status ? 'text-emerald-300' : 'text-gray-300'}`}>
                        ({getStatusCount(status)} Items)
                      </span>
                    </button>
                 ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="lg:col-span-8 space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Initiative Categories</label>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3.5 rounded-2xl text-[10px] font-black transition-all border uppercase tracking-widest ${
                      activeCategory === cat 
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-sm ring-2 ring-emerald-100' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="py-20">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              {activeCategory === 'All' ? 'Consolidated' : activeCategory} Results
            </h3>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
              {filteredProjects.length} Verified Initiatives Found
            </span>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white rounded-[44px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col group animate-in fade-in slide-in-from-bottom-6 duration-500">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className={`absolute top-8 left-8 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl ${
                      project.status === 'ongoing' ? 'bg-emerald-600 text-white' : 
                      project.status === 'completed' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {project.status}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight tracking-tight">{project.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1 font-medium">{project.description}</p>
                    
                    {project.impact && (
                      <div className="mb-8 p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 relative overflow-hidden group/impact">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100/50 rounded-bl-[40px] flex items-center justify-center translate-x-4 -translate-y-4 group-hover/impact:translate-x-0 group-hover/impact:translate-y-0 transition-transform">
                          <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
                        </div>
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2">Impact Insight</p>
                        <p className="text-xs text-emerald-700/80 italic font-bold">"{project.impact}"</p>
                      </div>
                    )}

                    {project.targetAmount && (
                      <div className="mb-10">
                        <div className="flex justify-between items-end text-[10px] font-black mb-3">
                          <span className="text-gray-400 uppercase tracking-[0.2em]">Global Contribution</span>
                          <span className="text-emerald-700">{Math.round((project.raisedAmount || 0) / project.targetAmount * 100)}%</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-emerald-600 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000" 
                            style={{ width: `${(project.raisedAmount || 0) / project.targetAmount * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="text-[10px]">
                             <span className="text-gray-400 font-black block uppercase tracking-widest mb-1">Raised</span>
                             <span className="font-black text-gray-900 text-sm">₦{(project.raisedAmount || 0).toLocaleString()}</span>
                          </div>
                          <div className="text-[10px] text-right">
                             <span className="text-gray-400 font-black block uppercase tracking-widest mb-1">Target</span>
                             <span className="font-black text-gray-900 text-sm">₦{project.targetAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <button className="w-full py-5 bg-emerald-700 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all hover:-translate-y-1 active:scale-95">
                      {project.status === 'ongoing' ? 'Fuel this Initiative' : 'Read Case Study'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-gray-50 rounded-[60px] border-4 border-dashed border-gray-100">
              <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center mx-auto mb-8 border border-gray-50">
                 <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4 uppercase">No Projects Matched</h3>
              <p className="text-gray-400 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                We couldn't find any initiatives matching your current filter combination. 
                Try widening your status or category search.
              </p>
              <button 
                onClick={() => { setActiveCategory('All'); setActiveStatus('All'); }}
                className="bg-emerald-700 text-white px-10 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-emerald-800 shadow-2xl transition-all"
              >
                Clear Global Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Proposal Call-to-Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="bg-emerald-950 rounded-[60px] p-12 md:p-24 text-white flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden relative shadow-2xl border border-emerald-900">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="relative z-10 max-w-xl">
            <div className="w-16 h-1 bg-emerald-500 mb-8 rounded-full"></div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">Shape the <br/><span className="text-emerald-400">Next Chapter</span></h2>
            <p className="text-emerald-100/60 text-lg font-medium leading-relaxed mb-10">
              Verified Sets and Members have the constitutional right to propose infrastructure projects. 
              Our steering committee evaluates all submissions for long-term viability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-500 text-emerald-950 px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-2xl hover:scale-105">
                Submit Proposal
              </button>
              <button className="bg-white/5 border border-white/10 backdrop-blur-md px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                Guidelines PDF
              </button>
            </div>
          </div>
          <div className="relative z-10 hidden lg:block w-96">
            <div className="bg-emerald-900/40 backdrop-blur-2xl p-10 rounded-[48px] border border-emerald-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 group">
               <div className="flex gap-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-emerald-950 text-2xl group-hover:scale-110 transition-transform">?</div>
                  <div className="space-y-2 flex-1">
                     <div className="w-full h-4 bg-emerald-800 rounded-full"></div>
                     <div className="w-3/4 h-4 bg-emerald-800/50 rounded-full"></div>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="w-full h-32 bg-emerald-800/30 rounded-3xl border border-emerald-700/50 flex items-center justify-center italic text-emerald-500/50 text-xs font-black uppercase tracking-widest">Project Visual Mockup</div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
