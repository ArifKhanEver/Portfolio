'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import gsap from 'gsap';

const HeroInspiration = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const underlineRef = useRef(null);
  const circlesRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Background Circles Entrance & Continuous Rotation
      gsap.from(circlesRef.current.children, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.to(".gsap-rotate-bg", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });

      // 2. Text Content Entrance
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // 3. SVG Underline Draw
      if (underlineRef.current) {
        gsap.fromTo(underlineRef.current, 
          { strokeDasharray: 400, strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", delay: 0.8 }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative py-10 flex items-center justify-center bg-white dark:bg-slate-950 overflow-hidden w-full"
    >
      
      {/* Background Decorative Circles - FIXED & ANIMATED */}
      <div ref={circlesRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="gsap-rotate-bg w-[500px] h-[500px] border border-slate-100 rounded-full absolute opacity-60"></div>
        <div className="gsap-rotate-bg w-[700px] h-[700px] border border-slate-50 rounded-full absolute opacity-40" style={{ animationDirection: 'reverse' }}></div>
        <div className="gsap-rotate-bg w-[900px] h-[900px] border border-slate-50/50 rounded-full absolute opacity-20"></div>
        
        {/* Added extra glow for consistency with Hero section */}
        <div className="absolute w-[600px] h-[600px] bg-teal-50 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Text Wrapper for GSAP Stagger */}
        <div ref={textRef}>
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
            Crafting Digital <br className="hidden md:block" />
            <span className="text-[#149988] relative inline-block">
              Experiences
              <svg 
                className="absolute -bottom-3 left-0 w-full" 
                viewBox="0 0 318 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  ref={underlineRef}
                  d="M1 10C78.5 2.5 240.5 2.5 317 10" 
                  stroke="#149988" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              </svg>
            </span> 
            {" "}That Inspire
          </h1>

          {/* Subtext */}
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Transforming ideas into exceptional digital solutions with modern design 
            and cutting-edge technology.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              href="#contact" 
              className="w-full sm:w-auto bg-[#149988] text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0f7d6f] transition-all shadow-2xl shadow-teal-100 group active:scale-95"
            >
              Hire Me <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="#projects" 
              className="w-full sm:w-auto border-2 border-[#149988] text-[#149988] px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#f0faf9] transition-all active:scale-95"
            >
              View Projects <HiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroInspiration;