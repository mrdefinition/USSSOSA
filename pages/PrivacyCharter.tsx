
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyCharter: React.FC = () => {
  return (
    <div className="pb-20 bg-gray-50 min-h-screen font-inter">
      {/* Header */}
      <section className="bg-emerald-900 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-800 rounded-full blur-3xl opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Link to="/transparency" className="inline-flex items-center text-emerald-300 text-sm font-bold mb-8 hover:text-white transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Transparency Hub
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Privacy Charter</h1>
          <p className="text-xl text-emerald-100 font-light max-w-2xl mx-auto leading-relaxed">
            Our commitment to protecting your digital footprint and maintaining the confidentiality of the global USSSOSA family.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-gray-100">
          
          <div className="prose prose-emerald max-w-none text-gray-700">
            
            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                1. Introduction
              </h2>
              <p className="mb-4 leading-relaxed">
                At Unity Senior Secondary School Old Students Association (USSSOSA), we understand that your personal information is private and sensitive. This Privacy Charter outlines our rigorous standards for data protection and transparency. We value the trust you place in us to protect the "Unity" bond.
              </p>
              <p className="leading-relaxed">
                This charter applies to all <strong>verified members, alumni, staff, volunteers, and visitors</strong> of our official digital platforms, mobile applications, and physical secretariat.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                2. Information Collection
              </h2>
              <p className="mb-4 leading-relaxed">
                We collect information necessary to verify your alumni status and provide personalized membership benefits:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <h4 className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2">Identity & Contact</h4>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>• Legal Name & Alumni ID</li>
                    <li>• Personal & Professional Email</li>
                    <li>• Phone Number & WhatsApp Contact</li>
                    <li>• Current Residential Location</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <h4 className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2">Academic & Social</h4>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>• Graduating Year & Set Details</li>
                    <li>• Profile Pictures & Media Assets</li>
                    <li>• Event Attendance & RSVP Records</li>
                    <li>• Career Milestone Reports</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-sm bg-emerald-50 p-5 rounded-2xl border border-emerald-100 italic text-emerald-800/70">
                <strong>Method of Collection:</strong> Data is collected through secure portal registration, digital event check-ins, alumni surveys, and direct correspondence with the USSSOSA secretariat.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                3. Use of Information
              </h2>
              <p className="mb-4 leading-relaxed">Your data is utilized strictly for the following association purposes:</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">Membership Management</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Verification of alumni status and maintenance of official set registries for elections and dues.</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">Network Engagement</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Automated notifications for birthdays, achievement celebrations, and global/set reunions.</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">Impact Analytics</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Anonymized reporting for school project impact, scholarships, and program effectiveness.</p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">Official Communications</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Distributing quarterly bulletins, emergency welfare alerts, and constitutional amendments.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                4. Data Sharing & Third Parties
              </h2>
              <p className="leading-relaxed mb-4">
                USSSOSA operates on a <strong>Privacy-First</strong> principle:
              </p>
              <ul className="list-disc ml-6 space-y-3 text-sm">
                <li><strong>No Commercial Sale:</strong> We will NEVER sell, lease, or share your personal data with third-party marketers or commercial entities without explicit consent.</li>
                <li><strong>Internal Access Control:</strong> Information is shared only with authorized personnel, set leaders, or committee heads on a "need-to-know" basis for alumni activities.</li>
                <li><strong>Strategic Partnerships:</strong> Data shared with technical partners (e.g., payment gateways) is strictly for operational execution and protected by binding NDAs.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                5. Data Security
              </h2>
              <p className="leading-relaxed">
                We employ industry-standard security measures including <strong>End-to-End SSL encryption</strong>, multi-factor authentication for administrators, and weekly server integrity audits to prevent unauthorized access or data breaches within the Nigerian digital ecosystem. 
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                6. Member Rights (Data Sovereignty)
              </h2>
              <p className="mb-6">You have absolute control over your digital identity within USSSOSA:</p>
              <div className="space-y-4">
                <div className="flex items-start bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-700 text-white rounded-xl flex items-center justify-center mr-4 mt-0.5 text-xs font-black">R1</div>
                  <p className="text-sm text-emerald-900 font-medium leading-relaxed"><strong>Right to Access & Rectify:</strong> You can view and update your full profile through the "Privacy & Settings" tab in your Member Dashboard.</p>
                </div>
                <div className="flex items-start bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-700 text-white rounded-xl flex items-center justify-center mr-4 mt-0.5 text-xs font-black">R2</div>
                  <p className="text-sm text-emerald-900 font-medium leading-relaxed"><strong>Right to Erasure:</strong> You may request the deletion of your account. Data will be archived for a 12-month period for audit purposes before permanent removal.</p>
                </div>
                <div className="flex items-start bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-700 text-white rounded-xl flex items-center justify-center mr-4 mt-0.5 text-xs font-black">R3</div>
                  <p className="text-sm text-emerald-900 font-medium leading-relaxed"><strong>Right to Opt-Out:</strong> You can withdraw consent for directory visibility or specific communication channels at any time.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                7. Retention & Policy Updates
              </h2>
              <p className="leading-relaxed text-sm mb-6">
                Data is retained for the duration of your active membership. Updates to this Charter will be communicated via the official portal and quarterly bulletins. Continued use of the platform after updates constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <div className="p-10 bg-emerald-900 rounded-[32px] text-center text-white">
                <h2 className="text-xl font-black mb-4 tracking-tight">Privacy Inquiries & Disputes</h2>
                <p className="text-sm text-emerald-100 font-medium leading-relaxed mb-10">
                  For concerns regarding your data privacy or to report a violation:
                </p>
                <div className="font-black text-emerald-400 text-xl mb-10 uppercase tracking-[0.2em] border-2 border-emerald-800 rounded-2xl py-4">
                  privacy@usssosa.org.ng
                </div>
                <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                  Last Updated: February 2024 • Version 1.2
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyCharter;
