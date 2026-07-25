"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
      ? 'bg-theme-black/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg' 
      : 'bg-theme-black py-6'
    }`}>
      <div className="container mx-auto px-6 lg:px-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-[0_0_15px_rgba(6,143,255,0.4)]">
             <div className="w-5 h-5 border-[3px] border-white rounded-full"></div>
          </div>
          <span className="text-3xl font-black text-white tracking-tighter">
            SI<span className="text-primary">K</span>
          </span>
        </Link>

        {/* Desktop Menu - Aligned Right */}
        <ul className="hidden lg:flex items-center justify-end gap-10 w-full">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className="text-sm font-bold text-gray-300 hover:text-primary transition-all relative group/link tracking-wider uppercase"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;