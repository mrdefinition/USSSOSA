
import React, { useState } from 'react';
import { ALUMNI_SETS } from '../mockData';

const Community: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSets = ALUMNI_SETS.filter(set => 
    set.year.toString().includes(searchTerm) || 
    set.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20">
      <section className="bg-green-900 py-16 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Our Alumni Community</h1>
          <p className="text-green-100 max-w-xl">Find your graduating set, reconnect with old friends, and join your class leadership.</p>
          
          <div className="mt-8 flex max-w-md bg-white rounded-lg p-1 overflow-hidden shadow-lg">
            <input 
              type="text" 
              placeholder="Search by year or leader..."
              className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-green-700 px-6 rounded-md font-bold hover:bg-green-800 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSets.length > 0 ? filteredSets.map(set => (
            <div key={set.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <img src={set.image} alt={`Set of ${set.year}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Class of {set.year}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">The {set.year} Set</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>Set Leader: <strong>{set.leader}</strong></span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span><strong>{set.memberCount}</strong> Verified Alumni</span>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-green-700 text-green-700 rounded-lg font-bold hover:bg-green-700 hover:text-white transition-all">
                  Join Set Group
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg">No graduating sets found matching your criteria.</p>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-green-700 font-bold">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
