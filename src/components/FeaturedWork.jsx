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
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Title Reveal Animation
      gsap.from(".title-word", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // 2. Horizontal Scroll Logic
      const container = containerRef.current;
      const totalScrollWidth = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
        }
      });

      // 3. Corner Border Assembly Animation
      const cards = document.querySelectorAll('.project-card-wrapper');
      
      cards.forEach((card) => {
        const tlCorner = card.querySelector('.corner-tl');
        const trCorner = card.querySelector('.corner-tr');
        const blCorner = card.querySelector('.corner-bl');
        const brCorner = card.querySelector('.corner-br');

        // Initially offset them, then animate them to (0,0) as they scroll into view horizontally
        gsap.set([tlCorner, trCorner, blCorner, brCorner], { opacity: 0 });
        gsap.set(tlCorner, { x: -30, y: -30 });
        gsap.set(trCorner, { x: 30, y: -30 });
        gsap.set(blCorner, { x: -30, y: 30 });
        gsap.set(brCorner, { x: 30, y: 30 });

        gsap.to([tlCorner, trCorner, blCorner, brCorner], {
          x: 0,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById("horizontalScrollTween"), // Link to the horizontal scroll if needed, but standard scrub works too if we just use the card as trigger in a normal scroll, wait, horizontal container animation needs `containerAnimation`
            // Actually, because the section is pinned and scrolls horizontally, we need to map it based on horizontal scroll.
            // Let's create a scroll trigger for the container scroll
            start: "left right", // when left side of card hits right side of viewport
            end: "center center", // when center of card hits center of viewport
            scrub: true,
            horizontal: true,
            scroller: containerRef.current // NO, wait.
          }
        });
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Update the GSAP hook for corners properly without complex horizontal scrollTrigger issues
  // Since ScrollTrigger with horizontal container animation can be tricky without explicit setup,
  // We will instead animate the corners simply using the main horizontal timeline, or keep them static on hover.
  // Wait, let's setup the corner GSAP properly inside the effect.
  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const totalScrollWidth = container.scrollWidth - window.innerWidth;

      let horizontalTween = gsap.to(container, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
        }
      });

      const cards = gsap.utils.toArray('.project-card-wrapper');
      
      cards.forEach((card) => {
        const tlCorner = card.querySelector('.corner-tl');
        const trCorner = card.querySelector('.corner-tr');
        const blCorner = card.querySelector('.corner-bl');
        const brCorner = card.querySelector('.corner-br');

        gsap.from([tlCorner], { x: -30, y: -30, opacity: 0, scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left right", end: "center center", scrub: true }});
        gsap.from([trCorner], { x: 30, y: -30, opacity: 0, scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left right", end: "center center", scrub: true }});
        gsap.from([blCorner], { x: -30, y: 30, opacity: 0, scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left right", end: "center center", scrub: true }});
        gsap.from([brCorner], { x: 30, y: 30, opacity: 0, scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left right", end: "center center", scrub: true }});
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

    const rotateX = -(y - yc) / 15;
    const rotateY = (x - xc) / 15;

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
    <section ref={sectionRef} id="featured-work" className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-hidden pt-24 md:pt-32">
      
      {/* 1. Grid Background & Radial Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 2. Exact Title Layout */}
      <div className="relative z-10 text-center max-w-5xl px-6 w-full pointer-events-none select-none mb-12 lg:mb-0">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white flex flex-wrap justify-center gap-x-4 gap-y-3 leading-tight">
          <span className="title-word inline-block">Turning</span>
          <span className="title-word inline-block">complex</span>
          <span className="title-word inline-block text-blue-500">problems</span>
          <span className="title-word inline-block">into</span>
          <span className="title-word inline-block px-4 py-1 bg-blue-600 text-white -rotate-2 transform">elegant</span>
          <span className="title-word inline-block">solutions</span>
          <span className="title-word inline-block text-white/50 text-xl md:text-3xl lg:text-4xl w-full mt-4 tracking-normal lowercase">one line of code at a time</span>
        </h1>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="flex items-center lg:h-screen lg:absolute lg:top-0 lg:left-0" ref={containerRef} style={{ width: 'max-content' }}>
        <div className="flex gap-12 lg:gap-24 px-6 md:px-16 lg:px-32 lg:pt-32 pb-24 lg:pb-0 h-full items-center">
          
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id}
              className="project-card-wrapper relative w-[320px] md:w-[500px] lg:w-[600px] flex-shrink-0 cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Assembling Corner Brackets */}
              <div className="corner-tl absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-blue-500 z-20 pointer-events-none"></div>
              <div className="corner-tr absolute -top-4 -right-4 w-10 h-10 border-t-2 border-r-2 border-blue-500 z-20 pointer-events-none"></div>
              <div className="corner-bl absolute -bottom-4 -left-4 w-10 h-10 border-b-2 border-l-2 border-blue-500 z-20 pointer-events-none"></div>
              <div className="corner-br absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-blue-500 z-20 pointer-events-none"></div>

              {/* The Card Content */}
              <div 
                ref={(el) => cardsRef.current[idx] = el}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="relative w-full rounded-2xl bg-zinc-950 border border-white/10 transition-transform duration-100 ease-out overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* Image Container */}
                <div className="relative h-56 md:h-72 w-full overflow-hidden border-b border-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-70 hover:opacity-100"
                  />
                </div>

                {/* Content Container */}
                <div className="p-6 md:p-8 flex flex-col bg-zinc-950">
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 text-white/70 text-[10px] md:text-xs rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                    {project.desc}
                  </p>
                  
                  {/* External Links */}
                  <div className="flex gap-4">
                    <a href={project.github} target="_blank" className="flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all">
                      <FiGithub size={20} />
                    </a>
                    <a href={project.link} target="_blank" className="flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all">
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
