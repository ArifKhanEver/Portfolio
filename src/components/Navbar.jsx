"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { HiMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
      ? 'bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-zinc-900/50 py-3' 
      : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 lg:px-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#149988] rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-teal-500/20 dark:shadow-none">
             <div className="w-5 h-5 border-[3px] border-white rounded-full"></div>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
            SI<span className="text-[#149988]">K</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className="text-sm font-bold text-slate-600 dark:text-zinc-400 hover:text-[#149988] dark:hover:text-[#149988] transition-all relative group/link"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Animated Theme Toggle Button */}
          {mounted ? (
            <button 
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 text-slate-700 dark:text-zinc-200 hover:border-[#149988] transition-all shadow-sm group overflow-hidden"
              aria-label="Toggle Theme"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun 
                  className={`absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    resolvedTheme === 'dark' 
                      ? 'opacity-0 scale-50 -rotate-90' 
                      : 'opacity-100 scale-100 rotate-0 text-orange-500'
                  }`} 
                  size={20} 
                />
                <Moon 
                  className={`absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    resolvedTheme === 'dark' 
                      ? 'opacity-100 scale-100 rotate-0 text-[#149988]' 
                      : 'opacity-0 scale-50 rotate-90'
                  }`} 
                  size={20} 
                />
              </div>
            </button>
          ) : (
            <div className="w-[42px] h-[42px] rounded-xl bg-slate-100 dark:bg-zinc-900 animate-pulse"></div>
          )}

          <button 
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiOutlineX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 shadow-2xl transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
        <ul className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-black text-slate-800 dark:text-zinc-200"
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