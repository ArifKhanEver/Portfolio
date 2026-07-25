"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode, FaServer, FaMobileAlt, FaDatabase } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Frontend Development",
    description: "Building responsive, interactive, and highly optimized user interfaces using React, Next.js, and modern CSS frameworks.",
    icon: FaCode,
  },
  {
    title: "Backend Development",
    description: "Designing robust and scalable RESTful APIs and server-side logic using Node.js, Express, and modern backend practices.",
    icon: FaServer,
  },
  {
    title: "Database Architecture",
    description: "Structuring and managing both SQL and NoSQL databases like MongoDB and PostgreSQL for optimal performance and data integrity.",
    icon: FaDatabase,
  },
  {
    title: "Full Stack Solutions",
    description: "End-to-end web application development from concept to deployment, ensuring seamless integration between frontend and backend.",
    icon: FaMobileAlt,
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".service-card");
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="w-full py-24 bg-theme-black relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white flex items-center gap-6">
            Services
            <span className="h-[2px] w-24 sm:w-40 lg:w-64 bg-gradient-to-r from-primary to-transparent"></span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="service-card group relative p-8 md:p-10 rounded-2xl bg-[#111111] border border-white/10 hover:border-primary/50 transition-colors duration-500 overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="text-3xl text-primary" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-wide">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
