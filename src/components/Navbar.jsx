"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // If it's the home link
    if (href === '/') {
      if (pathname === '/') {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState({}, '', '/');
      } else {
        router.push('/');
      }
      return;
    }

    // If it's a hash link
    if (pathname === '/') {
      if (lenis) {
        lenis.scrollTo(href);
      } else {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState({}, '', `/${href}`);
    } else {
      router.push(`/${href}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for active sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If we hit the hero section, active is 'home', else the section id
          const id = entry.target.id;
          setActiveSection(id === 'home' ? 'home' : id);
        }
      });
    }, { threshold: 0, rootMargin: "-20% 0px -70% 0px" });

    // Ensure we run this after the DOM is ready
    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Education', href: '#education' },
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
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-2 group cursor-pointer z-[101]">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-[0_0_15px_rgba(6,143,255,0.4)]">
             <div className="w-5 h-5 border-[3px] border-white rounded-full"></div>
          </div>
          <span className="text-3xl font-black text-white tracking-tighter">
            SI<span className="text-primary">K</span>
          </span>
        </a>

        {/* Desktop Menu - Aligned Right */}
        <ul className="hidden lg:flex items-center justify-end gap-6 lg:gap-8 w-full">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? activeSection === 'home' : activeSection === link.href.substring(1);
            return (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-bold transition-all relative group/link tracking-wider uppercase cursor-pointer ${
                    isActive ? "text-primary" : "text-gray-300 hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover/link:w-full"
                  }`}></span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white hover:text-primary transition-colors z-[101]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`lg:hidden fixed inset-0 bg-theme-black/95 backdrop-blur-xl z-[100] transition-all duration-300 flex flex-col items-center justify-center ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-8 w-full px-6">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? activeSection === 'home' : activeSection === link.href.substring(1);
            return (
              <li key={link.name} className="w-full text-center overflow-hidden">
                <a 
                  href={link.href} 
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsMobileMenuOpen(false); // Close menu on click
                  }}
                  className={`block text-2xl font-bold transition-all relative uppercase tracking-widest ${
                    isActive ? "text-primary" : "text-gray-300 hover:text-white"
                  }`}
                  style={{
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transition: 'all 0.4s ease-out',
                    transitionDelay: isMobileMenuOpen ? `${navLinks.indexOf(link) * 50}ms` : '0ms'
                  }}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;