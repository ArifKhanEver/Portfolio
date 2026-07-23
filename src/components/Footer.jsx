"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp, FiCodepen } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#149988]/50 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          
          {/* Logo & Vision */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Shafiqul<span className="text-[#149988]">.dev</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed font-medium">
              Architecting 100 innovative and scalable web applications while 
              bridging the gap between classical literature and modern tech.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mb-12">
            {[
              { icon: <FiGithub size={20} />, link: "https://github.com/ArifKhanEver", label: "GitHub" },
              { icon: <FiLinkedin size={20} />, link: "http://linkedin.com/in/arifkhanever", label: "LinkedIn" },
              { icon: <FiCodepen size={20} />, link: "https://codepen.io/arifkhanever", label: "CodePent" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                aria-label={social.label}
                className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:border-[#149988] hover:text-[#149988] hover:bg-[#149988]/5 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-8 mb-16">
            {["About", "Skills", "Education", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-500 dark:text-slate-400 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Bottom Bar */}
          <div className="w-full pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              © {currentYear} Shafiqul Islam Khan.
            </p>
            
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Back to top</span>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-[#149988] group-hover:text-white transition-all">
                <FiArrowUp />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;