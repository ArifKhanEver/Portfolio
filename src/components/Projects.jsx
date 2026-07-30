"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiGithub, FiExternalLink, FiLayers, FiArrowRight } from "react-icons/fi";
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
    challenges: "Implementing social authentication with Better Auth while maintaining a seamless user session was a complex task.",
    futurePlans: "Add a real-time notification system for breaking news and an AI-based news summarizer."
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
    challenges: "Designing a local storage logic that efficiently tracks dates and intervals for contact goals.",
    futurePlans: "Integrate Google Calendar API to automatically sync meetings and call logs."
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
    challenges: "Creating smooth state transitions for the interactive cart system without sacrificing performance.",
    futurePlans: "Implement a dark mode UI and a recommendation engine based on user browsing history."
  }
];

const Projects = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".proj-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proj-title",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(".project-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="w-full py-24 bg-theme-black relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="proj-title text-5xl lg:text-[60px] font-black text-white mb-6 uppercase tracking-tighter">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Work</span>
            </h2>
            <p className="text-gray-400 font-light text-lg lg:text-xl">
              Architecting scalable web applications with a focus on precision and performance.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:shadow-[0_10px_30px_rgba(6,143,255,0.2)] transition-all duration-500 flex flex-col h-full backdrop-blur-md"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden border-b border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-black/90 via-theme-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary text-white rounded-full hover:bg-accent hover:text-black transition-colors shadow-[0_0_15px_rgba(6,143,255,0.5)]"><FiExternalLink size={20} /></a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors shadow-lg"><FiGithub size={20} /></a>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-primary font-bold text-[10px] uppercase tracking-widest mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light line-clamp-2">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] uppercase tracking-wider rounded-lg border border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <div className="mt-auto">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all active:scale-95 group/btn shadow-lg w-full justify-center"
                  >
                    View Details
                    <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
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