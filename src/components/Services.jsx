"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    title: "Full-Stack",
    description: "End-to-end web applications built with modern MERN stacks, ensuring seamless frontend-backend integration.",
    items: [
      "React/Next.js Frontend",
      "Node.js/Express Backend",
      "MongoDB/PostgreSQL Database",
      "Custom API Development"
    ]
  },
  {
    title: "Frontend",
    description: "Creating highly interactive, accessible, and performant user interfaces that deliver exceptional user experiences.",
    items: [
      "UI/UX Implementation",
      "Complex Animations (GSAP)",
      "Responsive Web Design",
      "State Management"
    ]
  },
  {
    title: "Backend",
    description: "Building scalable and secure server-side applications, APIs, and database architectures to power your web applications.",
    items: [
      "RESTful API Design",
      "Database Modeling",
      "Authentication & Security",
      "Cloud Deployment"
    ]
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Text Reveal Animation for the header elements
    gsap.from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // 2. Sticky Cards Animation (Scale down and fade as the next card covers it)
    const cards = gsap.utils.toArray(".service-card");
    
    cards.forEach((card, index) => {
      // We don't animate the last card because nothing covers it
      if (index !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.4,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1], // The next card
            start: "top bottom", // When the top of the next card hits the bottom of the viewport
            end: "top top", // When the top of the next card reaches the top of the viewport
            scrub: true,
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="min-h-screen bg-theme-black rounded-t-[2.5rem] relative">
      <div>
        <div>
          <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0 120%)" }}>
            <div className="flex flex-col justify-center gap-6 sm:gap-12 pt-16 sm:pt-24 pb-4">
              <p className="reveal-text text-xs sm:text-sm font-light tracking-[0.25rem] sm:tracking-[0.5rem] uppercase px-6 sm:px-10 text-white/70">
                Where Clean Code Meets Chaos Control
              </p>
              <div className="px-6 sm:px-10">
                <h1 className="reveal-text flex flex-col gap-4 sm:gap-12 uppercase text-6xl md:text-8xl lg:text-[10rem] font-black text-white select-none">
                  <span>Services</span>
                </h1>
              </div>
            </div>
          </div>
          
          <div className="relative px-6 sm:px-10 mt-6 sm:mt-0 text-white">
            <div className="absolute inset-x-0 border-t-2 border-white/20"></div>
            <div className="py-8 sm:py-16 text-end flex justify-end">
              <div className="reveal-text font-light uppercase text-xl sm:text-2xl lg:text-4xl text-white/80 select-none max-w-4xl">
                <span className="block leading-relaxed tracking-wide text-pretty">Your ideas deserve more than just code—they deserve speed,</span>
                <span className="block leading-relaxed tracking-wide text-pretty"> stability and a sleek experience.</span>
                <span className="block leading-relaxed tracking-wide text-pretty"> I build exactly that.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative pb-[5vh] lg:pb-[10vh]">
        {SERVICES_DATA.map((service, index) => (
          <div 
            key={service.title}
            className="sticky w-full"
            style={{ top: '0px', zIndex: index + 1 }}
          >
            <div className="service-card px-6 md:px-10 pt-8 sm:pt-12 pb-12 text-white bg-theme-black border-t border-white/20 w-full min-h-[480px] lg:min-h-[580px] transform-gpu origin-top">
              <div className="flex items-start justify-between gap-6 sm:gap-10 flex-col lg:flex-row">
                
                {/* Left Side: Title & Description */}
                <div className="flex flex-col gap-4 sm:gap-8 w-full lg:w-1/2">
                  <div className="h-[5rem] lg:h-[7rem] flex items-start">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-none text-white select-none">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/50 leading-relaxed font-light text-pretty max-w-xl">
                    {service.description}
                  </p>
                </div>

                {/* Right Side: Features List */}
                <div className="flex flex-col gap-2 sm:gap-4 w-full lg:w-1/2 mt-6 lg:mt-0">
                  {service.items.map((item, i) => (
                    <div key={i} className="group relative">
                      <div className="flex items-center py-4 sm:py-5 border-b border-white/5 group-last:border-none px-4 rounded-xl transition-all duration-300 group-hover:bg-white/[0.03] overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:w-full transition-all duration-700 ease-in-out"></div>
                        <span className="mr-6 sm:mr-8 text-base sm:text-lg md:text-xl font-mono text-white/10 group-hover:text-primary transition-all duration-300">
                          0{i + 1}
                        </span>
                        <h3 className="tracking-tight text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                          {item}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
