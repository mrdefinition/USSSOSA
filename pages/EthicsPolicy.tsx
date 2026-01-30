
import React from 'react';
import { Link } from 'react-router-dom';

const EthicsPolicy: React.FC = () => {
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
          <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Ethics & Code of Conduct</h1>
          <p className="text-xl text-emerald-100 font-light max-w-2xl mx-auto leading-relaxed">
            Maintaining the highest standards of integrity, accountability, and professionalism across the global USSSOSA network.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-gray-100">
          
          {/* Content Sections */}
          <div className="prose prose-emerald max-w-none text-gray-700">
            
            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                1. Purpose & Scope
              </h2>
              <p className="mb-4 leading-relaxed">
                The purpose of this Ethics Policy is to establish a framework of integrity, transparency, and professional behavior for all individuals associated with the Unity Senior Secondary School Old Students Association (USSSOSA). Our reputation is built on the collective actions of our members, and we are committed to upholding the "Unity" bond with honor.
              </p>
              <p className="leading-relaxed">
                This policy applies to all <strong>verified members, board members, executives, staff, volunteers, and official partners</strong> of USSSOSA, regardless of their location or graduating set.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                2. Key Ethical Principles
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">2.1 Integrity & Honesty</h3>
                  <p className="text-sm leading-relaxed text-gray-600 italic">
                    "Members should act truthfully and ethically in all association matters."
                  </p>
                  <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
                    <li>Accurate representation of alumni status and credentials.</li>
                    <li>Honesty in financial reporting and donation handling.</li>
                    <li>Refraining from deceptive practices that may harm the USSSOSA brand.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">2.2 Respect & Dignity</h3>
                  <p className="text-sm leading-relaxed text-gray-600 italic">
                    "Promote respect in all interactions, free from harassment or discrimination."
                  </p>
                  <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
                    <li>Zero tolerance for bullying, tribalism, or discrimination based on religion or gender.</li>
                    <li>Professionalism in all set-specific and national forums.</li>
                    <li>Respectful disagreement and constructive criticism.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">2.3 Confidentiality & Privacy</h3>
                  <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
                    <li>Protection of the global alumni database from unauthorized commercial use.</li>
                    <li>Maintaining the privacy of sensitive welfare reports shared by members.</li>
                    <li>Adherence to USSSOSA Data Protection protocols.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">2.4 Conflict of Interest</h3>
                  <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
                    <li>Full disclosure of personal interests in USSSOSA contracts or vendor selections.</li>
                    <li>Refraining from using association influence for personal financial gain.</li>
                    <li>Recusal from decisions where a conflict of interest exists.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">2.5 Accountability & Transparency</h3>
                  <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
                    <li>Regular and accurate publishing of financial statements.</li>
                    <li>Open communication regarding project milestones and infrastructure spends.</li>
                    <li>Responsibility for decisions made at every level of governance.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-emerald-600 rounded-full mr-4"></span>
                3. Reporting & Enforcement
              </h2>
              <p className="mb-6 leading-relaxed">
                USSSOSA maintains a strict but fair enforcement process. Violations of this policy undermine our mission and will be addressed through the following channels:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Whistleblower Email</h4>
                  <p className="text-xs text-gray-500">ethics@usssosa.org.ng</p>
                </div>
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Anonymous Portal</h4>
                  <p className="text-xs text-gray-500">Available via Member Login</p>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-4">Disciplinary Actions:</h3>
              <p className="text-sm mb-4">Following a fair hearing by the Ethics Committee, breaches may result in:</p>
              <ul className="list-decimal ml-6 text-sm space-y-2 text-gray-600">
                <li><strong>Formal Warning:</strong> Recorded in the member's permanent registry.</li>
                <li><strong>Suspension:</strong> Temporary loss of portal access and voting rights.</li>
                <li><strong>Expulsion:</strong> Permanent removal of "Verified Member" status and barring from all official USSSOSA functions.</li>
                <li><strong>Legal Prosecution:</strong> For cases involving fraud, embezzlement, or criminal activity.</li>
              </ul>
            </section>

            <section>
              <div className="p-10 bg-emerald-50 rounded-[32px] border border-emerald-100 text-center">
                <h2 className="text-xl font-black text-emerald-900 mb-4 tracking-tight">Review & Updates</h2>
                <p className="text-sm text-emerald-800/70 font-medium leading-relaxed mb-6">
                  This policy is reviewed annually by the Board of Trustees to ensure it remains current with Nigerian laws and international non-profit best practices. 
                  <br /><strong>Last Updated: February 2024.</strong>
                </p>
                <button className="bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg">
                  Download Full Document (PDF)
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsPolicy;
