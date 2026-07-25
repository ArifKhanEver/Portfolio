"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import Dragon from '@/assets/home-layout.png'
import KinKeeper from '@/assets/KinKeeper.png'
import BookVibe from '@/assets/BookVibe.png'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "dragon-news",
    title: "DRAGON NEWS",
    category: "FULL STACK DEVELOPMENT",
    desc: "A comprehensive news portal built with Next JS with some login and signin and register functionality where users can register/signin through Google and github.",
    tags: ["NextJs", "Tailwind CSS", "Better Auth"],
    link: "https://dragon-news-ng7z.vercel.app/",
    github: "https://github.com/ArifKhanEver/Dragon-News",
    image: Dragon,
  },
  {
    id: "kin-keeper",
    title: "KINKEEPER",
    category: "RELATIONSHIP MANAGEMENT",
    desc: "KinKeeper is a modern personal relationship management tool designed to help you nurture and maintain your friendships by tracking interactions.",
    tags: ["React.js", "DaisyUI", "Responsive Design"],
    link: "https://kin-keeper-app.netlify.app/",
    github: "https://github.com/ArifKhanEver/KinKeeper",
    image: KinKeeper,
  },
  {
    id: "book-vibe",
    title: "BOOK VIBE",
    category: "FRONTEND ENGINEERING",
    desc: "Digital storefront featuring custom-designed hero sections and interactive UI components built for modern retail.",
    tags: ["React", "Modern UI"],
    link: "https://the-book-vibe-app.netlify.app/",
    github: "https://github.com/ArifKhanEver/Book_Vibe",
    image: BookVibe,
  }
];

const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. "Light on" effect for all text elements
      const lightElements = gsap.utils.toArray(".light-text");
      
      lightElements.forEach(el => {
        gsap.to(el, {
          color: "rgba(255, 255, 255, 1)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%", // Light up when element reaches 75% of screen height
            end: "top 45%",   
            scrub: true,
          }
        });
      });

      // 1b. The "INTO" covered by "ELEGANT SOLUTIONS" animation
      // We use clipPath to reveal the blue block from left to right
      gsap.to(".elegant-replacement", {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: ".into-container",
          start: "top 80%", // Start revealing early
          end: "top 50%",   // Finish exactly when it reaches the center of the screen
          scrub: true,
        }
      });

      // 1c. Background Glow Animation (Top-Right to Bottom-Left)
      gsap.fromTo(".scroll-glow", 
        { x: "50vw", y: "-50vh" }, // Start at top right
        {
          x: "-50vw", y: "50vh", // End at bottom left
          ease: "none",
          scrollTrigger: {
            trigger: ".into-container",
            // The scroll distance is from the bottom of the screen to the top of the screen
            // When into-container is exactly at the center (top 50%), this animation will be exactly at 50% (x=0, y=0)
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );

      // 2. Horizontal Scroll Logic for Projects
      const track = trackRef.current;
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: track, 
          pin: true,
          scrub: 1,
          start: "top 10%", 
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true, 
        }
      });

      // 3. Corner Border Assembly Animation
      const cards = gsap.utils.toArray('.project-card-wrapper');
      
      cards.forEach((card) => {
        const tl = card.querySelector('.corner-tl');
        const tr = card.querySelector('.corner-tr');
        const bl = card.querySelector('.corner-bl');
        const br = card.querySelector('.corner-br');

        gsap.from([tl, tr, bl, br], {
          x: (i) => (i % 2 === 0 ? -40 : 40), 
          y: (i) => (i < 2 ? -40 : 40),       
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 80%", 
            end: "center center",
            scrub: true,
          }
        });
      });
      
      // 4. Featured Work Showcase Slide-Up & Clip-path
      const showcaseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top 75%", // Trigger as the horizontal track container enters the screen vertically
          end: "top 20%",
          scrub: true,
        }
      });

      showcaseTimeline
        .to(".showcase-word", {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power2.out",
        })
        .to(".work-replacement", {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
        }, "-=0.2");
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Exact Math 3D Hover Effect Logic
  const handleMouseMove = (e, idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotateX = -(y - yc) / 20; 
    const rotateY = (x - xc) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (idx) => {
    const card = cardsRef.current[idx];
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
        duration: 0.8
      });
    }
  };

  return (
    <section ref={sectionRef} id="featured-work" className="relative min-h-screen w-full bg-black">
      
      {/* 1. Grid Background (Stretches across entire section) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none"></div>
      
      {/* 2. Massive Vertical Scroll Title Sequence */}
      <div className="relative z-10 w-full flex flex-col items-center pt-12 md:pt-24 pb-[30vh] select-none overflow-hidden">
        
        {/* Animated radial glow that moves from top-right to bottom-left */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="sticky top-0 w-full h-screen">
            {/* Positioned dead center. GSAP will offset it from here to top-right, and end at bottom-left */}
            <div className="scroll-glow absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#1877F2]/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        <h1 className="relative z-10 flex flex-col items-center text-center text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black uppercase tracking-tight text-white/20 leading-[1.1] w-full">
          <span className="light-text">TURNING</span>
          <span className="light-text">COMPLEX</span>
          <span className="light-text">PROBLEMS</span>
          
          {/* The INTO / ELEGANT SOLUTIONS swap container */}
          <div className="into-container relative flex justify-center items-center w-full h-[1.3em] my-2 lg:my-4">
            <span className="light-text absolute">INTO</span>
            
            {/* ELEGANT SOLUTIONS block sliding/clipping in from left */}
            <span 
              className="elegant-replacement absolute z-10 flex justify-center items-center"
              style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            >
              <span className="bg-[#1877F2] text-white px-4 md:px-8 py-1 md:py-2 -rotate-2 inline-block shadow-2xl">
                ELEGANT SOLUTIONS
              </span>
            </span>
          </div>

          <span className="light-text mt-4">ONE LINE OF CODE</span>
          <span className="light-text">AT A TIME</span>
        </h1>
        
        {/* Subtitle paragraph */}
        <p className="light-text text-white/30 text-sm md:text-base lg:text-lg max-w-xl mx-auto text-center mt-16 leading-relaxed px-6 font-medium tracking-wide">
          Building scalable full-stack applications with modern technologies. From MongoDB to React, NextJS to Postgres. I craft digital experiences that users love
        </p>
      </div>

      {/* Horizontal Scrolling Track - Pinning Target */}
      <div ref={trackRef} className="relative flex items-center h-[80vh] w-max px-6 md:px-16 lg:px-32 z-20">
        <div className="flex gap-12 lg:gap-24 h-full items-center">
          
          {/* NEW: Horizontal Intro Title */}
          <div className="w-[80vw] md:w-[60vw] lg:w-[600px] flex-shrink-0">
            <h2 className="flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black uppercase tracking-tight text-white leading-[1.1]">
              <span className="showcase-word opacity-0 translate-y-20 block">FEATURED</span>
              
              <div className="showcase-word opacity-0 translate-y-20 relative flex items-center w-full h-[1.3em] my-2 lg:my-4">
                <span 
                  className="work-replacement absolute z-10 flex items-center"
                  style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                >
                  <span className="bg-[#1877F2] text-white px-4 md:px-8 py-1 md:py-2 -rotate-2 inline-block border-2 md:border-4 border-white shadow-2xl">
                    WORK
                  </span>
                </span>
              </div>

              <span className="showcase-word opacity-0 translate-y-20 block">SHOWCASE</span>
            </h2>
          </div>
          
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id}
              className="project-card-wrapper relative w-[280px] md:w-[400px] lg:w-[480px] flex-shrink-0 cursor-pointer group"
              style={{ perspective: "1500px" }}
            >
              {/* Assembling Corner Brackets */}
              <div className="corner-tl absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-blue-500 z-20 pointer-events-none"></div>
              <div className="corner-tr absolute -top-4 -right-4 w-10 h-10 border-t-2 border-r-2 border-blue-500 z-20 pointer-events-none"></div>
              <div className="corner-bl absolute -bottom-4 -left-4 w-10 h-10 border-b-2 border-l-2 border-blue-500 z-20 pointer-events-none"></div>
              <div className="corner-br absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-blue-500 z-20 pointer-events-none"></div>

              {/* The Card Content */}
              {/* NOTE: No overflow-hidden here! overflow-hidden disables transform-style: preserve-3d */}
              <div 
                ref={(el) => cardsRef.current[idx] = el}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="relative w-full rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 transition-colors duration-300 ease-out flex flex-col shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* Image Container */}
                <div className="relative h-48 md:h-64 lg:h-64 w-full rounded-t-2xl border-b border-white/5 overflow-hidden" style={{ transform: "translateZ(10px)" }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-100"
                  />
                  {/* Subtle glare overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Container */}
                <div className="p-6 md:p-8 flex flex-col rounded-b-2xl bg-zinc-950" style={{ transform: "translateZ(20px)" }}>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 text-white/70 text-[10px] md:text-xs rounded-full border border-white/10 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                    {project.desc}
                  </p>
                  
                  {/* External Links */}
                  <div className="flex gap-4">
                    <a href={project.github} target="_blank" className="flex items-center justify-center w-12 h-12 bg-zinc-900 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 active:scale-95 transition-all shadow-lg z-30 relative">
                      <FiGithub size={20} />
                    </a>
                    <a href={project.link} target="_blank" className="flex items-center justify-center w-12 h-12 bg-zinc-900 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 active:scale-95 transition-all shadow-lg z-30 relative">
                      <FiExternalLink size={20} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
