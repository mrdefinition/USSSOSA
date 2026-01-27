
import React from 'react';

const GetInvolved: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="bg-green-900 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-wider">Drive Our Sustainability</h1>
          <p className="text-lg text-green-100 font-light">Every contribution, whether time, expertise, or funds, builds the legacy of USSSOSA.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Donate */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
            <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Support a Project</h2>
            <p className="text-gray-500 mb-8 flex-1">Directly fund school infrastructure, student scholarships, or the USSSOSA endowment fund. We provide full tax receipts and audit trails for every naira.</p>
            <button className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-all">Make a Donation</button>
          </div>

          {/* Volunteer */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Volunteer</h2>
            <p className="text-gray-500 mb-8 flex-1">Join a committee, mentor a student, or help organize our next global reunion. Your skills in law, medicine, tech, or business are needed.</p>
            <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all">Apply to Volunteer</button>
          </div>

          {/* Partner */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
            <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Corporate Partner</h2>
            <p className="text-gray-500 mb-8 flex-1">Align your CSR efforts with a high-integrity educational NGO. Partner with us for infrastructure builds or talent development pipelines.</p>
            <button className="w-full bg-purple-700 text-white py-3 rounded-xl font-bold hover:bg-purple-800 transition-all">Start a Partnership</button>
          </div>
        </div>

        <div className="mt-20 bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
          <h3 className="text-2xl font-bold mb-6">Our Promise to Supporters</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="font-bold text-green-800">100% Impact</div>
              <p className="text-sm text-gray-500">Every donation goes directly to the specified project cause.</p>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-green-800">Full Recognition</div>
              <p className="text-sm text-gray-500">Donors are listed in our annual transparency report (optional).</p>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-green-800">Regular Updates</div>
              <p className="text-sm text-gray-500">Get milestone reports on every project you support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
