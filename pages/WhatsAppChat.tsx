
import React, { useState, useEffect, useRef } from 'react';
import { User, WhatsAppMessage, AlumniSet } from '../types';
import { ALUMNI_SETS } from '../mockData';

interface WhatsAppChatProps {
  user: User;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeChat, setActiveChat] = useState<AlumniSet | 'Global'>(ALUMNI_SETS[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial mock history
  useEffect(() => {
    const initialMessages: WhatsAppMessage[] = [
      {
        id: '1',
        senderId: 'system',
        senderName: 'USSSOSA Bot',
        receiverId: user.id,
        content: `Welcome to the Class of ${(activeChat as AlumniSet).year || 'Global'} WhatsApp Hub! Connect instantly with your peers.`,
        timestamp: new Date().toISOString(),
        status: 'read',
        isIncoming: true
      },
      {
        id: '2',
        senderId: 'user_123',
        senderName: 'Engr. Adebayo',
        receiverId: user.id,
        content: 'Good morning everyone! Any updates on the reunion gala?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        status: 'read',
        isIncoming: true
      }
    ];
    setMessages(initialMessages);
  }, [activeChat, user.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: WhatsAppMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      senderName: user.name,
      receiverId: typeof activeChat === 'string' ? 'global' : activeChat.id,
      content: inputValue,
      timestamp: new Date().toISOString(),
      status: 'sent',
      isIncoming: false
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate Receiving a reply
    setTimeout(() => {
      const reply: WhatsAppMessage = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: 'reply_bot',
        senderName: 'Dr. Chioma',
        receiverId: user.id,
        content: `Thanks for the message, ${user.name.split(' ')[0]}! We're processing that right now.`,
        timestamp: new Date().toISOString(),
        status: 'received',
        isIncoming: true
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex bg-[#f0f2f5] font-inter overflow-hidden">
      {/* Sidebar - Contacts */}
      <div className="w-full md:w-96 bg-white border-r flex flex-col shrink-0">
        <div className="p-4 bg-[#f0f2f5] flex justify-between items-center border-b">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-bold uppercase">
               {user.name.charAt(0)}
             </div>
             <p className="font-bold text-gray-900 text-sm">Chats</p>
          </div>
          <div className="flex gap-4 text-gray-500">
             <button title="Status"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></button>
             <button title="New Chat"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button>
          </div>
        </div>

        <div className="bg-white p-3 border-b">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Search or start new chat" 
                className="w-full bg-[#f0f2f5] rounded-xl py-2 px-10 text-xs focus:outline-none" 
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {ALUMNI_SETS.map((set) => (
            <button
              key={set.id}
              onClick={() => setActiveChat(set)}
              className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                typeof activeChat !== 'string' && activeChat.id === set.id ? 'bg-[#f0f2f5]' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                 <img src={set.image} alt={set.year.toString()} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-900 truncate">Class of {set.year} Hub</h4>
                  <span className="text-[10px] text-gray-400">12:45</span>
                </div>
                <p className="text-xs text-gray-500 truncate">Engr. Adebayo: Good morning everyone...</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col relative bg-[#e5ddd5] chat-bg">
        <style>{`
          .chat-bg::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            opacity: 0.06;
            background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
            z-index: 0;
            pointer-events: none;
          }
        `}</style>

        {/* Header */}
        <div className="relative z-10 p-4 bg-[#f0f2f5] flex justify-between items-center border-b shadow-sm">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                 <img 
                    src={typeof activeChat === 'string' ? '' : activeChat.image} 
                    className="w-full h-full object-cover" 
                 />
              </div>
              <div>
                 <h3 className="font-bold text-gray-900 text-sm">
                   {typeof activeChat === 'string' ? 'Global Community' : `Class of ${activeChat.year} Official Group`}
                 </h3>
                 <p className="text-[10px] text-gray-500 font-medium">online, clicking typing...</p>
              </div>
           </div>
           <div className="flex gap-6 text-gray-500">
              <button><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
              <button><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button>
           </div>
        </div>

        {/* Message Area */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4">
           {messages.map((msg) => (
             <div 
               key={msg.id} 
               className={`flex ${msg.isIncoming ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
             >
               <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm relative ${
                 msg.isIncoming 
                   ? 'bg-white rounded-tl-none' 
                   : 'bg-[#dcf8c6] rounded-tr-none'
               }`}>
                 {msg.isIncoming && <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">{msg.senderName}</p>}
                 <p className="text-sm text-gray-800 leading-relaxed">{msg.content}</p>
                 <div className="flex justify-end items-center mt-1 gap-1">
                   <span className="text-[9px] text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   {!msg.isIncoming && (
                     <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
                   )}
                 </div>
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="relative z-10 p-4 bg-[#f0f2f5] flex items-center gap-4">
           <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </button>
           <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13"></path></svg>
           </button>
           <form className="flex-1 flex gap-4" onSubmit={handleSendMessage}>
             <input 
                type="text" 
                placeholder="Type a message" 
                className="flex-1 bg-white rounded-2xl px-6 py-3 text-sm focus:outline-none shadow-inner"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button 
                type="submit"
                className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition-all shadow-lg active:scale-90"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChat;
