
import React from 'react';
import { Link } from 'react-router-dom';

const Transparency: React.FC = () => {
  const reports = [
    { id: 1, title: '2023 Annual Financial Statement', type: 'Financial', date: 'Jan 2024' },
    { id: 2, title: 'Project Impact Report: Scholarship Phase 1', type: 'Impact', date: 'Dec 2023' },
    { id: 3, title: 'AGM Minutes of Meeting', type: 'Governance', date: 'Nov 2023' },
    { id: 4, title: 'Infrastructure Fund Audit Report', type: 'Audit', date: 'Oct 2023' },
  ];

  const policies = [
    { title: "Ethics & Code of Conduct", desc: "Our core framework for integrity, transparency, and professional behavior.", path: "/transparency/ethics" },
    { title: "Privacy Charter", desc: "How we protect and manage your personal data within the global network.", path: "/transparency/privacy" },
    { title: "Conflict Resolution", desc: "Internal mediation protocols for member disputes.", path: "#" },
    { title: "Investment Policy", desc: "Guidelines for managing the USSSOSA endowment fund.", path: "#" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-wider">Transparency & Governance</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Credibility is our currency. We maintain open-source access to all governance documents for our verified members.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
          <h3 className="text-xl font-bold mb-4 text-green-900">Total Asset Base</h3>
          <p className="text-3xl font-extrabold text-green-700">₦45,250,000</p>
          <p className="text-sm text-gray-500 mt-2">Verified audited funds for 2023-24</p>
        </div>
        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Project Integrity</h3>
          <p className="text-3xl font-extrabold text-blue-700">100% Tracking</p>
          <p className="text-sm text-gray-500 mt-2">All school projects verified via on-site audits</p>
        </div>
        <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
          <h3 className="text-xl font-bold mb-4 text-purple-900">Admin Efficiency</h3>
          <p className="text-3xl font-extrabold text-purple-700">95.5% Impact</p>
          <p className="text-sm text-gray-500 mt-2">Only 4.5% of income goes to overheads</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Annual Reports & Audits</h2>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Financials</span>
            </div>
            <div className="divide-y divide-gray-100">
              {reports.map(report => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded mb-2 uppercase tracking-wide">{report.type}</span>
                    <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                    <p className="text-xs text-gray-400">Date: {report.date}</p>
                  </div>
                  <button className="mt-4 sm:mt-0 text-green-700 font-bold text-sm flex items-center hover:underline">
                    Download
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">Governing Policies</h2>
          <div className="space-y-4">
            {policies.map((pol, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 text-sm mb-1">{pol.title}</h4>
                <p className="text-xs text-gray-500 mb-3">{pol.desc}</p>
                {pol.path && pol.path.startsWith('/') ? (
                  <Link to={pol.path} className="text-green-700 text-xs font-bold hover:underline">Read Policy &rarr;</Link>
                ) : (
                  <button className="text-green-700 text-xs font-bold hover:underline">Read Policy &rarr;</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transparency;
