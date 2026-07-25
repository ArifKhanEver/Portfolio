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
      
      // 1. Title Reveal & Light-On Animation
      const titleWords = gsap.utils.toArray(".light-text");
      
      // Turn on lights (color to white) sequentially as user scrolls
      gsap.to(titleWords, {
        color: "white",
        stagger: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".title-container",
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        }
      });

      // 1b. Replace "into" with "elegant solutions"
      const replaceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".title-container",
          start: "bottom 60%", // when user scrolls past the title area
          end: "bottom 30%",
          scrub: true,
        }
      });

      replaceTimeline
        .to(".into-text", { opacity: 0, scale: 0.8, duration: 0.5 }, 0)
        .fromTo(".elegant-replacement", 
          { opacity: 0, scale: 0.8, rotate: 0 }, 
          { opacity: 1, scale: 1, rotate: -2, duration: 0.5 }, 0
        )
        .fromTo(".elegant-strip",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5 }, 0
        );

      // 2. Horizontal Scroll Logic
      const track = trackRef.current;
      
      // Calculate exactly how far we need to slide to the left
      // scrollWidth is total content width, clientWidth is viewport width
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: track, // Pin the track itself, not the whole section
          pin: true,
          scrub: 1,
          start: "top 10%", // Pin when track reaches near top
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true, // Recalculate if window resizes
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
          x: (i) => (i % 2 === 0 ? -40 : 40), // Offset X based on index (tl:0, tr:1, bl:2, br:3)
          y: (i) => (i < 2 ? -40 : 40),       // Offset Y
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 80%", // Assemble when card enters from right
            end: "center center",
            scrub: true,
          }
        });
      });
      
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

    const rotateX = -(y - yc) / 20; // Soften the tilt slightly
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
    <section ref={sectionRef} id="featured-work" className="relative min-h-screen w-full bg-black py-24 md:py-32">
      
      {/* 1. Grid Background & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 2. Vertical Title Layout with Light-on effect */}
      <div className="title-container relative z-10 text-center max-w-5xl mx-auto px-6 w-full pointer-events-none select-none mb-48 pt-20">
        <h1 className="flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black uppercase tracking-wider text-white/10 leading-[0.9] transition-colors">
          <span className="light-text block">Turning</span>
          <span className="light-text block">complex</span>
          <span className="light-text block text-transparent bg-clip-text bg-blue-500/10">problems</span>
          
          <div className="relative mt-4 h-[1em] flex justify-center items-center">
            {/* The word INTO that fades out */}
            <span className="light-text into-text absolute inset-0 flex items-center justify-center">into</span>
            
            {/* The ELEGANT SOLUTIONS replacement that scales in */}
            <span className="elegant-replacement absolute inset-0 flex items-center justify-center">
              <span className="relative px-6 sm:px-12 py-2 text-[6vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] text-white">
                <span className="relative z-10">elegant solutions</span>
                <div className="elegant-strip absolute inset-0 bg-blue-600 rounded-lg shadow-[0_0_40px_rgba(37,99,235,0.5)] origin-left -z-10"></div>
              </span>
            </span>
          </div>
        </h1>
        <p className="light-text text-white/10 text-xl md:text-3xl lg:text-4xl w-full mt-12 tracking-normal lowercase block">one line of code at a time</p>
      </div>

      {/* Horizontal Scrolling Track - Pinning Target */}
      <div ref={trackRef} className="relative flex items-center h-[80vh] w-max px-6 md:px-16 lg:px-32 z-20">
        <div className="flex gap-12 lg:gap-24 h-full items-center">
          
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
