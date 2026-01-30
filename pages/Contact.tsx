
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    subject: 'Membership Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to POST /contact
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ fullName: '', email: '', subject: 'Membership Inquiry', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="pb-20 bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Nigerian Professionals Networking" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Get in Touch</h1>
          <p className="text-xl md:text-2xl font-light text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about membership, projects, or partnership, our secretariat is here to help you connect.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-emerald-900 text-white p-10 rounded-[40px] shadow-2xl h-full border border-emerald-800">
              <h2 className="text-3xl font-black mb-10 tracking-tight">Our Secretariat</h2>
              
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="bg-emerald-800 p-4 rounded-2xl mr-6 group-hover:bg-emerald-700 transition-colors">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Location</h3>
                    <p className="text-emerald-50/80 font-medium leading-relaxed">
                      Suite 12, Alumni Plaza, Plot 450 Unity Road,<br />
                      Victoria Island, Lagos, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-emerald-800 p-4 rounded-2xl mr-6 group-hover:bg-emerald-700 transition-colors">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Email Address</h3>
                    <p className="text-emerald-50/80 font-medium">info@usssosa.org.ng</p>
                    <p className="text-emerald-50/80 font-medium">secretariat@usssosa.org.ng</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-emerald-800 p-4 rounded-2xl mr-6 group-hover:bg-emerald-700 transition-colors">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">Phone Support</h3>
                    <p className="text-emerald-50/80 font-medium">+234 (0) 803 123 4567</p>
                    <p className="text-emerald-50/80 font-medium">+234 (0) 1 454 8899</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-emerald-800">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-6">Connect With Us</h3>
                <div className="flex gap-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                    <a key={social} href="#" className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1">
                      <span className="sr-only uppercase">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zM12 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Area */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] shadow-2xl p-10 md:p-16 border border-gray-100 h-full">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Send a Message</h2>
                <p className="text-gray-500 font-medium">Your feedback drives the growth of our unified community.</p>
              </div>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[32px] text-center animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-emerald-900 mb-3">Message Received!</h3>
                  <p className="text-emerald-700/70 font-medium">Thank you for reaching out. A representative will respond to your inquiry via email within 24-48 business hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-emerald-700 font-black uppercase tracking-widest text-xs hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                      <input 
                        name="fullName"
                        type="text" 
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold"
                        placeholder="Adebayo Tunde"
                        value={formState.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                      <input 
                        name="email"
                        type="email" 
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold"
                        placeholder="email@example.com"
                        value={formState.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Subject</label>
                    <select 
                      name="subject"
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold"
                      value={formState.subject}
                      onChange={handleInputChange}
                    >
                      <option>Membership Inquiry</option>
                      <option>Donation & Sponsorship</option>
                      <option>Technical Issue</option>
                      <option>Alumni Verification</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Message</label>
                    <textarea 
                      name="message"
                      rows={6} 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none transition-all font-semibold"
                      placeholder="How can we help you today?"
                      value={formState.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-5 rounded-[20px] shadow-xl shadow-emerald-900/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Maps Section Placeholder */}
        <section className="mt-20">
          <div className="bg-gray-100 rounded-[40px] overflow-hidden h-96 relative border border-gray-200 shadow-inner group">
            {/* Visual placeholder for Google Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/80 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                </div>
                <h4 className="text-xl font-black text-gray-900">Interactive Map View</h4>
                <p className="text-gray-500 font-medium">Click to interact with the location map</p>
              </div>
            </div>
            <img 
              src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=1920" 
              className="w-full h-full object-cover opacity-20 grayscale" 
              alt="Map Placeholder" 
            />
            <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-transparent transition-all duration-500"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
