"use client";

import { useState, useEffect } from "react";
import { FiArrowUp, FiThumbsUp, FiMessageSquare, FiCode, FiServer, FiMonitor, FiDatabase, FiCpu, FiMessageCircle } from "react-icons/fi";

const LocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);
  
  return (
    <div className="flex items-center gap-2 mt-8 font-mono text-xs font-bold tracking-widest">
      <span className="text-cyan-400">LOCAL TIME: {time || "00:00:00"}</span>
      <span className="text-emerald-500 flex items-center gap-1">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        ACTIVE
      </span>
    </div>
  );
};

const ServiceItem = ({ icon, text }) => (
  <div className="group relative flex items-center gap-4 py-2 px-4 cursor-pointer w-full max-w-[250px]">
    {/* Hover Bracket Frame */}
    <div className="absolute inset-0 border border-cyan-500/30 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
      {/* Corner accents */}
      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
    </div>
    
    <span className="text-cyan-500 relative z-10 group-hover:text-cyan-300 transition-colors">{icon}</span>
    <span className="text-gray-400 relative z-10 group-hover:text-white transition-colors text-sm font-medium">{text}</span>
  </div>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#02050A] relative overflow-hidden border-t border-white/5 pt-20 pb-6"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Info & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-tight leading-tight mb-4">
              &gt; Arif Khan <br/> &lt;
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              MERN/Full stack developer turning complex problems into elegant solutions. From pixel-perfect UIs to bulletproof backends—every line of code is a promise of quality.
            </p>
            
            <LocalTime />

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-[#0B0F19]/80 border border-white/5 rounded-lg p-4 w-[110px] flex flex-col items-center justify-center">
                <h3 className="text-cyan-400 font-black text-2xl">4+</h3>
                <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest mt-1">Projects</p>
              </div>
              <div className="bg-[#0B0F19]/80 border border-white/5 rounded-lg p-4 w-[110px] flex flex-col items-center justify-center">
                <h3 className="text-emerald-400 font-black text-2xl">8462+</h3>
                <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest mt-1">Commits</p>
              </div>
              <div className="bg-[#0B0F19]/80 border border-white/5 rounded-lg p-4 flex-1 min-w-[130px] flex flex-col items-center justify-center">
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-black text-2xl">2+ Years</h3>
                <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest mt-1">Experience</p>
              </div>
              <div className="bg-[#0B0F19]/80 border border-white/5 rounded-lg p-4 w-[110px] flex flex-col items-center justify-center">
                <h3 className="text-amber-400 font-black text-2xl">295+</h3>
                <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest mt-1">Visitors</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0B0F19]/80 border border-white/5 hover:border-white/20 rounded-lg text-gray-300 hover:text-white transition-all text-xs font-bold">
                <FiThumbsUp size={14} /> 78
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0B0F19]/80 border border-white/5 hover:border-white/20 rounded-lg text-gray-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider">
                <FiMessageSquare size={14} /> Feedback
              </button>
            </div>
          </div>

          {/* Column 2: Services & Links */}
          <div className="lg:col-span-3 space-y-10 lg:pl-8">
            
            {/* Services */}
            <div>
              <h3 className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-6">Services</h3>
              <div className="space-y-1 flex flex-col items-start w-full">
                <ServiceItem icon={<FiCode size={16} />} text="Frontend Dev" />
                <ServiceItem icon={<FiServer size={16} />} text="Backend Dev" />
                <ServiceItem icon={<FiMonitor size={16} />} text="Full-Stack Dev" />
                <ServiceItem icon={<FiDatabase size={16} />} text="Database Design" />
                <ServiceItem icon={<FiCpu size={16} />} text="AI Services" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-6">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                {["Home", "Services", "Works", "Contact"].map((link) => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`}
                    className="px-4 py-2 bg-[#0B0F19]/80 border border-white/5 hover:border-white/20 hover:text-white rounded text-gray-400 text-[10px] font-bold tracking-widest uppercase transition-all"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Column 3: Availability & Back to Top */}
          <div className="lg:col-span-4 space-y-6 lg:pl-4">
            
            <h3 className="text-white text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-emerald-500 rounded-full"></span> AVAILABILITY
            </h3>

            <div className="bg-[#022c22]/30 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-emerald-400 font-black text-xl tracking-tight">AVAILABLE</h4>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                  Open
                </span>
              </div>
              <p className="text-gray-300 text-sm font-medium mb-3">For new projects</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Looking for freelance opportunities or full-time positions. Let's build something amazing together!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0B0F19]/80 border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Response</p>
                <p className="text-cyan-400 font-bold text-lg">~24h</p>
              </div>
              <div className="bg-[#0B0F19]/80 border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Timezone</p>
                <p className="text-purple-400 font-bold text-lg">GMT+6</p>
              </div>
            </div>

            <button 
              onClick={scrollToTop}
              className="w-full py-4 mt-2 bg-[#0B0F19]/90 hover:bg-[#111827] border border-white/5 hover:border-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-xs tracking-widest uppercase shadow-lg"
            >
              <FiArrowUp size={16} /> BACK_TO_TOP
            </button>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="relative w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-xs font-mono text-gray-500">
          
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 bg-[#02050A] px-4 flex flex-col items-center justify-center gap-2">
            <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-gray-600 rounded-full animate-bounce"></div>
            </div>
            <span className="font-bold tracking-[0.2em] uppercase">Scroll</span>
          </div>

          <div className="flex items-center gap-1 uppercase tracking-widest text-center md:text-left">
            © {currentYear} Arif Khan <span className="mx-2">|</span> Built with <span className="text-blue-500 text-sm mx-1">💙</span> and Vitamin-C
          </div>

          <div className="flex items-center gap-2 font-bold tracking-widest uppercase">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            System_Online <span className="text-gray-600 ml-2">v3.8.5</span>
          </div>

        </div>

      </div>

      {/* Floating Chat Button (Bottom Right outside container) */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <button className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-110 transition-transform">
          <FiMessageCircle size={24} />
        </button>
      </div>

    </footer>
  );
};

export default Footer;