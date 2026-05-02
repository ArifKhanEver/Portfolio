"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiGithub, FiExternalLink, FiLayers } from "react-icons/fi";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    title: "Dynamic Job Tracker",
    category: "Full Stack Development",
    desc: "A comprehensive application built with Vanilla JS and Tailwind CSS to track job applications, featuring high-order array methods and DOM manipulation.",
    tags: ["JavaScript", "Tailwind CSS", "Local Storage"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Elegant Kicks",
    category: "E-commerce Architecture",
    desc: "A high-end sneaker brand platform developed using Next.js and Tailwind, focusing on seamless user interface and brand identity.",
    tags: ["Next.js", "DaisyUI", "Responsive Design"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Style Arcade",
    category: "Frontend Engineering",
    desc: "Digital storefront featuring custom-designed hero sections and interactive UI components built for modern retail.",
    tags: ["React", "GSAP", "Modern UI"],
    link: "#",
    github: "#",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Heading Animation
      gsap.from(".proj-title", {
        scrollTrigger: {
          trigger: ".proj-title",
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Project Cards Entrance
      const cards = gsap.utils.toArray(".project-card");
      gsap.from(cards, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="w-full py-24 bg-white relative overflow-hidden border-b border-slate-50">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="proj-title text-4xl lg:text-7xl font-black text-slate-900 mb-6">
              Innovative <span className="text-[#149988]">Creations</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg italic">
              "Architecting scalable web applications with a focus on precision and performance."
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-sm">
             <FiLayers className="text-[#149988]" /> Showcase of 100 Innovative Apps
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={triggerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx} 
              className="project-card group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-teal-100/50 transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <div className="flex gap-4">
                     <a href={project.link} className="p-3 bg-[#149988] text-white rounded-full hover:bg-[#0f7d6f] transition-colors"><FiExternalLink size={20}/></a>
                     <a href={project.github} className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors"><FiGithub size={20}/></a>
                   </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[#149988] font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-[#149988] transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase rounded-lg border border-slate-100 group-hover:border-[#149988]/20 group-hover:text-[#149988] transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;