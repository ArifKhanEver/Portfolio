"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Dragon from '@/assets/home-layout.png'
import KinKeeper from '@/assets/KinKeeper.png'
import BookVibe from '@/assets/BookVibe.png'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "dragon-news",
    title: "Dragon News",
    category: "Full Stack Development",
    desc: "A comprehensive news portal built with Next JS with some login and signin and register functionality where users can register/signin through Google and github",
    tags: ["NextJs", "Tailwind CSS", "Better Auth"],
    link: "https://dragon-news-ng7z.vercel.app/",
    github: "https://github.com/ArifKhanEver/Dragon-News",
    image: Dragon,
  },
  {
    id: "kin-keeper",
    title: "KinKeeper",
    category: "Relationship Management",
    desc: "KinKeeper is a modern personal relationship management tool designed to help you nurture and maintain your friendships by tracking interactions.",
    tags: ["React.js", "DaisyUI", "Responsive Design"],
    link: "https://kin-keeper-app.netlify.app/",
    github: "https://github.com/ArifKhanEver/KinKeeper",
    image: KinKeeper,
  },
  {
    id: "book-vibe",
    title: "Book Vibe",
    category: "Frontend Engineering",
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
      gsap.from(".fw-title-line", {
        y: 80,
        opacity: 0,
        rotationX: -45,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 2. Horizontal Scroll Logic
      const container = containerRef.current;
      const totalScrollWidth = container.scrollWidth - window.innerWidth;

      // Animate the container horizontally
      const horizontalTween = gsap.to(container, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          start: "top top",
          end: () => `+=${totalScrollWidth}`, // Pin for the exact horizontal distance
          onUpdate: (self) => {
            // Animate the border rotation angle based on scroll progress
            const angle = self.progress * 360 * 2; // Rotate 2 full times during the scroll
            cardsRef.current.forEach(card => {
              if (card) card.style.setProperty("--border-angle", `${angle}deg`);
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Hover Effect Logic
  const handleMouseMove = (e, idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
    const rotateY = ((x - centerX) / centerX) * 15;

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
    <section ref={sectionRef} id="featured-work" className="bg-theme-black relative overflow-hidden min-h-screen">
      
      {/* Title Section */}
      <div className="pt-24 md:pt-32 px-6 lg:px-16 w-full absolute top-0 left-0 z-10 pointer-events-none">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tight text-white flex flex-col gap-2">
          <span className="fw-title-line origin-bottom">Turning complex problems</span>
          <span className="fw-title-line origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">into Elegant Solution</span>
        </h2>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="flex items-center h-screen pt-48" ref={containerRef} style={{ width: 'max-content' }}>
        <div className="flex gap-12 lg:gap-24 px-6 md:px-16 lg:px-32">
          
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id}
              className="relative w-[320px] md:w-[500px] lg:w-[600px] flex-shrink-0"
              style={{ perspective: "1000px" }}
            >
              {/* The Card wrapper with 3D tilt */}
              <div 
                ref={(el) => cardsRef.current[idx] = el}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="group relative bg-[#111111] rounded-3xl p-1 overflow-hidden h-full flex flex-col"
                style={{ 
                  transformStyle: "preserve-3d", 
                  "--border-angle": "0deg" 
                }}
              >
                {/* Scroll-Animated Gradient Border Pseudo-element */}
                <div 
                  className="absolute inset-[-50%] z-0"
                  style={{
                    background: "conic-gradient(from var(--border-angle), transparent 70%, #068FFF 85%, #00D2FC 100%)",
                  }}
                ></div>

                {/* Inner Card Content */}
                <div className="relative z-10 bg-theme-black rounded-[1.3rem] flex flex-col h-full overflow-hidden transform-gpu translate-z-[50px]">
                  
                  {/* Image Container */}
                  <div className="relative h-64 md:h-80 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-black via-transparent to-transparent opacity-90"></div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-grow relative bg-gradient-to-t from-theme-black to-theme-black/80">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-black text-white group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* External Links */}
                      <div className="flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        <a href={project.github} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors"><FiGithub size={20} /></a>
                        <a href={project.link} target="_blank" className="p-3 bg-primary text-white rounded-full hover:bg-accent hover:text-black transition-colors shadow-[0_0_15px_rgba(6,143,255,0.5)]"><FiExternalLink size={20} /></a>
                      </div>
                    </div>

                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 font-light">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-white/5 text-gray-300 text-[10px] md:text-xs uppercase tracking-wider rounded-lg border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link 
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-white font-bold group/btn"
                    >
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-full">Explore Project</span>
                        <span className="absolute top-0 left-0 inline-block translate-y-full text-primary transition-transform duration-300 group-hover/btn:translate-y-0">Explore Project</span>
                      </span>
                      <FiArrowRight className="group-hover/btn:translate-x-2 group-hover/btn:text-primary transition-all duration-300" />
                    </Link>
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
