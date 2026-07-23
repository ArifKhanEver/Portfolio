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
    <section ref={sectionRef} id="portfolio" className="w-full py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden border-b border-slate-50 dark:border-slate-800">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E6F4F1] dark:bg-[#149988]/20 text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-3">
              <span className="w-2 h-2 bg-[#149988] rounded-full animate-pulse"></span>
              Portfolio
            </div>
            <h2 className="proj-title text-4xl lg:text-[50px] font-black text-slate-900 dark:text-white mb-6">
              Innovative <span className="text-[#149988]">Creations</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg italic">
              "Architecting scalable web applications with a focus on precision and performance."
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-sm">
            <FiLayers className="text-[#149988]" /> Showcase of 100 Innovative Apps
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card group bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-teal-100/50 dark:hover:shadow-teal-900/50 transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <a href={project.link} target="_blank" className="p-3 bg-[#149988] text-white rounded-full hover:bg-[#0f7d6f] transition-colors shadow-lg"><FiExternalLink size={20} /></a>
                    <a href={project.github} target="_blank" className="p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-full hover:bg-slate-100 transition-colors shadow-lg"><FiGithub size={20} /></a>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[#149988] font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 group-hover:text-[#149988] transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 text-[9px] font-bold uppercase rounded-lg border border-slate-100 dark:border-slate-700 group-hover:border-[#149988]/20 group-hover:text-[#149988] transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <div className="mt-auto">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#149988] transition-all active:scale-95 group/btn shadow-lg"
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