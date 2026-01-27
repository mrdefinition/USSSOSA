
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

const Programs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="pb-20">
      <section className="bg-green-900 py-20 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-800 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-800 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Our Impact Initiatives</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto font-light leading-relaxed">
            From modernizing school infrastructure to empowering the next generation 
            with mentorship, we are committed to sustainable growth for Unity Senior Secondary School.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-black transition-all border uppercase tracking-widest ${
                  activeCategory === cat 
                    ? 'bg-white text-green-900 border-white shadow-xl scale-105' 
                    : 'bg-green-800/50 text-green-100 border-green-700 hover:bg-green-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                    project.status === 'ongoing' ? 'bg-green-500 text-white' : 
                    project.status === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {project.status}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-10 flex-1 flex flex-col">
                  <span className="text-[10px] font-black text-green-700 mb-3 uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{project.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{project.description}</p>
                  
                  {project.impact && (
                    <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-100">
                      <p className="text-[10px] font-black text-green-800 uppercase mb-1">Impact Highlight</p>
                      <p className="text-xs text-green-700 italic">"{project.impact}"</p>
                    </div>
                  )}

                  {project.targetAmount && (
                    <div className="mb-8">
                      <div className="flex justify-between items-end text-xs font-black mb-2">
                        <span className="text-gray-400 uppercase tracking-widest">Fundraising Progress</span>
                        <span className="text-green-700">{Math.round((project.raisedAmount || 0) / project.targetAmount * 100)}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-green-600 rounded-full" 
                          style={{ width: `${(project.raisedAmount || 0) / project.targetAmount * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-3">
                        <div className="text-[10px]">
                           <span className="text-gray-400 font-bold block">RAISED</span>
                           <span className="font-black text-gray-900">₦{(project.raisedAmount || 0).toLocaleString()}</span>
                        </div>
                        <div className="text-[10px] text-right">
                           <span className="text-gray-400 font-bold block">TARGET</span>
                           <span className="font-black text-gray-900">₦{project.targetAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button className="w-full py-4 bg-green-700 text-white rounded-[20px] font-black hover:bg-green-800 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                    {project.status === 'ongoing' ? 'Donate to Initiative' : 'View Impact Case Study'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No projects found in this category</h3>
            <p className="text-gray-500 mb-8">Try selecting a different initiative group or check back later.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Suggestion Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-green-900 rounded-[50px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl font-black mb-6 leading-tight">Have a New Project Idea?</h2>
            <p className="text-green-100 text-lg font-light leading-relaxed mb-8">
              Verified Sets and Members can propose new initiatives for school development. 
              Our project committee reviews all proposals for viability and impact.
            </p>
            <button className="bg-white text-green-900 px-10 py-4 rounded-2xl font-black hover:bg-green-50 transition-all shadow-2xl hover:scale-105 active:scale-95">
              Submit a Proposal
            </button>
          </div>
          <div className="relative z-10 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-inner">
               <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full"></div>
                  <div className="w-48 h-12 bg-white/20 rounded-xl"></div>
               </div>
               <div className="w-full h-32 bg-white/10 rounded-2xl border border-white/10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
