"use client"; // Required for interactivity in Next.js App Router

import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiOutlineX, HiOutlineMoon } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Menu items array for easy maintenance
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Teal theme color */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#149988] rounded-tl-xl rounded-br-xl flex items-center justify-center transition-transform group-hover:rotate-12">
             <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-4xl font-extrabold text-[#149988] tracking-tight">SIK</span>
        </Link>

        {/* Desktop Menu - Center aligned as per image */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={`text-sm font-bold transition-all relative py-2 ${
                  link.name === 'Homee' 
                  ? 'text-[#149988] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#149988]' 
                  : 'text-slate-600 hover:text-[#149988]'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Tools - Theme Toggle and Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 text-slate-700 transition-colors">
            <HiOutlineMoon className="text-2xl" />
          </button>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 text-slate-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiOutlineX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ${
        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-5'
      }`}>
        <ul className="flex flex-col p-6 gap-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-slate-700 hover:text-[#149988] block"
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