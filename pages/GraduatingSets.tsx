
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALUMNI_SETS } from '../mockData';

const GraduatingSets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDecade, setActiveDecade] = useState<string>('All');

  const decades = ['All', '80s', '90s', '00s', '10s', '20s'];

  const filterByDecade = (year: number) => {
    if (activeDecade === 'All') return true;
    if (activeDecade === '80s') return year >= 1980 && year < 1990;
    if (activeDecade === '90s') return year >= 1990 && year < 2000;
    if (activeDecade === '00s') return year >= 2000 && year < 2010;
    if (activeDecade === '10s') return year >= 2010 && year < 2020;
    if (activeDecade === '20s') return year >= 2020;
    return true;
  };

  const filteredSets = ALUMNI_SETS.filter(set => 
    (set.year.toString().includes(searchTerm) || 
     set.leader.toLowerCase().includes(searchTerm.toLowerCase())) &&
    filterByDecade(set.year)
  );

  return (
    <div className="pb-20">
      <section className="bg-green-900 py-16 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4 uppercase tracking-wider">Graduating Sets Directory</h1>
          <p className="text-green-100 max-w-2xl">
            The heart of USSSOSA is its diverse graduating sets. Find your peers, reconnect, and see how your class is contributing to our legacy.
          </p>
          
          <div className="mt-10 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-96 bg-white rounded-xl p-1 flex shadow-lg">
              <input 
                type="text" 
                placeholder="Search set (e.g. 1995)..."
                className="flex-1 px-4 py-3 text-gray-900 focus:outline-none rounded-l-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="bg-green-50 px-4 flex items-center border-l rounded-r-xl">
                <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            <div className="flex bg-green-800/50 p-1 rounded-xl overflow-x-auto w-full md:w-auto border border-green-700">
              {decades.map(decade => (
                <button
                  key={decade}
                  onClick={() => setActiveDecade(decade)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    activeDecade === decade ? 'bg-white text-green-900' : 'text-green-100 hover:bg-green-700/50'
                  }`}
                >
                  {decade}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSets.length > 0 ? filteredSets.map(set => (
            <div key={set.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={set.image} 
                  alt={`Set of ${set.year}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-green-400">Class of</span>
                  <h3 className="text-3xl font-black">{set.year}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-[10px] uppercase font-black text-emerald-600 tracking-widest mb-2">Leadership Core</p>
                    <div className="space-y-1.5">
                      {set.executives && set.executives.length > 0 ? (
                        set.executives.slice(0, 3).map((exec, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <span className="text-[11px] font-bold text-gray-900 truncate max-w-[100px]">{exec.name}</span>
                            <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded tracking-tighter shrink-0">{exec.role}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-between items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                          <span className="text-[11px] font-bold text-gray-900">{set.leader}</span>
                          <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded tracking-tighter shrink-0">Chairperson</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Verified Members</p>
                    <div className="flex items-center mt-1">
                      <div className="flex -space-x-2 mr-3">
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-green-200"></div>
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-200"></div>
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-yellow-200"></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{set.memberCount} Members</span>
                    </div>
                  </div>
                </div>
                <Link 
                  to={`/community/sets/${set.id}`}
                  className="w-full py-2.5 bg-gray-50 text-green-700 rounded-xl text-xs font-bold hover:bg-green-700 hover:text-white transition-all border border-green-100 shadow-sm text-center"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matching sets found</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-6 text-sm">We couldn't find any sets for "{searchTerm}" in the {activeDecade} filter.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveDecade('All'); }}
                className="text-green-700 font-bold hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraduatingSets;
