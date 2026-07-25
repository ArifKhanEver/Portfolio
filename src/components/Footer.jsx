"use client";

import { FiGithub, FiLinkedin, FiArrowUp, FiCodepen } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-theme-black pt-20 pb-10 relative overflow-hidden border-t border-white/10">
      
      {/* Floating Scroll to Top Button (global style like reference) */}
      <div className="fixed bottom-10 right-10 z-[999]">
        <button 
          onClick={scrollToTop}
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all shadow-lg"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={24} />
        </button>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          
          {/* Logo & Vision */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">
              SI<span className="text-primary">.dev</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed font-light">
              Crafting premium digital experiences, ensuring clean code meets chaos control.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mb-12">
            {[
              { icon: <FiGithub size={20} />, link: "https://github.com/ArifKhanEver", label: "GitHub" },
              { icon: <FiLinkedin size={20} />, link: "http://linkedin.com/in/arifkhanever", label: "LinkedIn" },
              { icon: <FiCodepen size={20} />, link: "https://codepen.io/arifkhanever", label: "CodePen" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                aria-label={social.label}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:border-primary/50 hover:text-primary hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-8 mb-16">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-500 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Bottom Bar */}
          <div className="w-full pt-10 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-gray-500 text-xs font-light">
              © {currentYear} Shafiqul Islam Khan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;