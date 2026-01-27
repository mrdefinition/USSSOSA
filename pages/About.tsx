
import React from 'react';

const About: React.FC = () => {
  const objectives = [
    { title: "Foster Connectivity", desc: "Building a global database of over 20,000 alumni to enable cross-generational support." },
    { title: "Institutional Support", desc: "Raising annual grants of ₦50M+ for infrastructure and staff welfare at our alma mater." },
    { title: "Student Empowerment", desc: "Providing 500+ annual scholarships and vocational training for current senior students." },
    { title: "Policy Advocacy", desc: "Collaborating with educational boards to maintain high standards of learning in Unity schools." }
  ];

  return (
    <div className="pb-20">
      <section className="bg-green-900 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-wider">Our Identity & Purpose</h1>
          <p className="text-lg text-green-100 font-light max-w-2xl mx-auto">
            Established in 1998, USSSOSA serves as the legitimate link between past excellence and future possibility.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px]">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-green-600 pl-4">The USSSOSA Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in Olodi Apapa by a collective of visionary alumni, USSSOSA has grown from a reunion group to a legally registered NGO (CAC Reg: IT/10423). Our history is tied to the resilience and unity of our formative years at Unity Senior Secondary School.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe that an alumnus's duty to their school is lifelong. Our association exists to ensure that the legacy of excellence is not just a memory, but a lived reality for every student walking through the gates today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition-all flex items-center shadow-lg">
                  View Constitution (PDF) 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
                <button className="border-2 border-green-700 text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all">
                  Governing Principles
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Alumni Board Meeting" 
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-green-100 rounded-2xl -z-0"></div>
            </div>
          </div>

          <div className="mt-24">
            <h3 className="text-2xl font-bold text-center mb-12">Our Strategic Objectives</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {objectives.map((obj, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors border border-transparent hover:border-green-200">
                  <h4 className="font-bold text-green-800 mb-3">{obj.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
