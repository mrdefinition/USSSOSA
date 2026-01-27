
import React from 'react';
import { GOVERNANCE } from '../mockData';

const Governance: React.FC = () => {
  const committees = [
    { name: "Investment Committee", purpose: "Managing the endowment fund and sustainability assets." },
    { name: "Education & Scholarship", desc: "Overseeing student screening and academic grants." },
    { name: "Welfare Committee", desc: "Supporting alumni members in times of need or celebration." },
    { name: "Audit & Risk", desc: "Ensuring compliance with financial standards and bylaws." }
  ];

  return (
    <div className="pb-20 bg-gray-50">
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Governance & Accountability</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            USSSOSA operates under a sophisticated governance model to ensure every kobo and every effort is accounted for.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Org Chart Concept */}
        <div className="mb-20 text-center">
          <h2 className="text-2xl font-bold mb-12 text-green-800">Our Organizational Structure</h2>
          <div className="flex flex-col items-center">
            <div className="bg-green-800 text-white p-4 rounded-lg w-64 shadow-lg mb-6">General Assembly (All Members)</div>
            <div className="w-1 h-8 bg-gray-300"></div>
            <div className="bg-green-700 text-white p-4 rounded-lg w-64 shadow-lg mb-6">Board of Trustees</div>
            <div className="w-1 h-8 bg-gray-300"></div>
            <div className="flex gap-8">
              <div className="bg-green-600 text-white p-3 rounded-lg w-48 shadow-md">Executive Council</div>
              <div className="bg-blue-600 text-white p-3 rounded-lg w-48 shadow-md">External Auditors</div>
            </div>
            <div className="w-1 h-8 bg-gray-300"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
              <div className="bg-white border p-3 rounded-lg text-sm font-semibold">Committees</div>
              <div className="bg-white border p-3 rounded-lg text-sm font-semibold">State Chapters</div>
              <div className="bg-white border p-3 rounded-lg text-sm font-semibold">Global Sets</div>
              <div className="bg-white border p-3 rounded-lg text-sm font-semibold">Secretariat</div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8 text-green-800">The National Executive Council</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {GOVERNANCE.filter(g => g.category === 'Executive').map(member => (
            <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
              <img src={member.image} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-green-700 font-medium mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Operational Committees</h2>
            <div className="space-y-4">
              {committees.map((com, idx) => (
                <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1">
                    <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{com.name}</h4>
                    <p className="text-sm text-gray-500">{com.purpose || (com as any).desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Join Leadership</h2>
            <p className="text-green-100 mb-8 leading-relaxed">
              We encourage all verified members with proven professional tracks to volunteer for committee leadership. Contribute your skills in law, finance, engineering, or media to build a better USSSOSA.
            </p>
            <button className="bg-white text-green-900 font-bold py-3 rounded-xl hover:bg-green-50 transition-all">
              Express Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
