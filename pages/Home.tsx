
import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, NEWS } from '../mockData';

const Home: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Nigerian Professionals Gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Connecting Our Past, <br/>
            <span className="text-green-400">Paving Our Future</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-200 font-light leading-relaxed">
            Welcome to the official portal of Unity Senior Secondary School Old Students Association. 
            Join over 5,000 alumni across the globe in building a stronger legacy for our alma mater.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/membership" className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl">
              Become a Member
            </Link>
            <Link to="/programs" className="bg-white hover:bg-gray-100 text-green-900 px-8 py-4 rounded-lg font-bold text-lg transition-all">
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To foster a vibrant network of alumni, promoting lifelong connections, 
            professional growth, and active contribution to the development of 
            Unity Senior Secondary School and our host communities.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To be a leading alumni association in Nigeria, recognized for our transparency, 
            transformative impact on education, and the excellence of our diverse global community.
          </p>
        </div>
      </section>

      {/* Recent News */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
              <p className="text-gray-500 mt-2">Stay informed with USSSOSA news and events</p>
            </div>
            <Link to="/news" className="text-green-700 font-semibold hover:underline">View all news &rarr;</Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {NEWS.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="md:flex h-full">
                  <div className="md:w-2/5">
                    <img src={item.image} alt={item.title} className="h-48 md:h-full w-full object-cover" />
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-xl font-bold mt-2 mb-3 leading-tight">{item.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{item.summary}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-400 text-xs">{item.date}</span>
                      <Link to="/news" className="text-green-700 font-bold text-sm">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Growing Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-extrabold text-green-700">5,000+</div>
            <div className="text-gray-500 mt-2 uppercase text-xs tracking-widest font-semibold">Active Members</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-green-700">35+</div>
            <div className="text-gray-500 mt-2 uppercase text-xs tracking-widest font-semibold">Alumni Sets</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-green-700">₦20M+</div>
            <div className="text-gray-500 mt-2 uppercase text-xs tracking-widest font-semibold">Funds Raised</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-green-700">120+</div>
            <div className="text-gray-500 mt-2 uppercase text-xs tracking-widest font-semibold">Scholarships</div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Ongoing Initiatives</h2>
            <Link to="/programs" className="mt-4 md:mt-0 text-green-400 font-semibold hover:text-green-300">Support a project &rarr;</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {PROJECTS.filter(p => p.status === 'ongoing').map(p => (
              <div key={p.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6">
                <img src={p.image} className="w-full md:w-48 h-48 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">{p.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{p.description}</p>
                  {p.raisedAmount && p.targetAmount && (
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${(p.raisedAmount / p.targetAmount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs font-medium">
                        <span>Raised: ₦{(p.raisedAmount/1000000).toFixed(1)}M</span>
                        <span>Goal: ₦{(p.targetAmount/1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  )}
                  <button className="mt-6 w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-bold transition-colors">
                    Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
