"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { FaGithub, FaLinkedinIn, FaCodepen } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at 90% 10%)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      gsap.fromTo(linksRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at 90% 10%)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[10000] flex flex-col items-center justify-center gap-[6px] transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 rounded-full cursor-pointer w-14 h-14 md:w-16 md:h-16 top-6 right-6 md:right-10 hover:bg-white/20 hover:scale-105 shadow-lg"
      >
        <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
        <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
      </div>

      {/* Fullscreen Overlay Menu */}
      <nav 
        ref={overlayRef}
        className="fixed inset-0 z-[9999] flex flex-col md:flex-row justify-between w-full h-full px-10 md:px-20 py-28 bg-theme-black text-white"
        style={{ clipPath: 'circle(0% at 90% 10%)' }}
      >
        {/* Left Side - Links */}
        <div className="flex flex-col text-5xl gap-y-4 md:text-6xl lg:text-8xl w-full md:w-1/2 md:justify-center">
          {navLinks.map((link, index) => (
            <div key={link.name} className="overflow-hidden">
              <Link 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group block w-full text-left font-black tracking-tighter"
                ref={el => linksRef.current[index] = el}
              >
                <span className="inline-block transition-all duration-500 ease-out origin-left group-hover:scale-[1.02] group-hover:translate-x-6 group-hover:text-primary group-hover:drop-shadow-[0_0_15px_rgba(6,143,255,0.5)]">
                  {link.name}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Right Side - Info */}
        <div className="flex flex-col justify-end md:justify-center gap-12 mt-16 md:mt-0 md:w-1/3">
          <div className="font-light">
            <p className="tracking-wider text-white/50 text-sm mb-2 uppercase">E-mail</p>
            <p className="text-xl md:text-2xl tracking-widest lowercase hover:text-primary transition-colors">example@gmail.com</p>
          </div>
          
          <div className="font-light">
            <p className="tracking-wider text-white/50 text-sm mb-4 uppercase">Social Media</p>
            <div className="flex flex-col gap-y-4">
              <a href="https://github.com/ArifKhanEver" target="_blank" rel="noopener noreferrer" className="inline-block text-lg tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 hover:text-primary">
                {"{ Github }"}
              </a>
              <a href="http://linkedin.com/in/arifkhanever" target="_blank" rel="noopener noreferrer" className="inline-block text-lg tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 hover:text-primary">
                {"{ LinkedIn }"}
              </a>
              <a href="https://codepen.io/arifkhanever" target="_blank" rel="noopener noreferrer" className="inline-block text-lg tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 hover:text-primary">
                {"{ Codepen }"}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;