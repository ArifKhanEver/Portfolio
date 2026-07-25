"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERIENCES = [
  {
    role: "MERN Stack Engineer",
    company: "Freelance / Personal Projects",
    period: "2025 - Present",
    desc: "Architecting scalable web applications using MongoDB, Express, React, and Node.js with a focus on clean architecture.",
    tags: ["Next.js", "GSAP", "Tailwind CSS"]
  },
  {
    role: "Full Stack Developer",
    company: "Dev Wonder",
    period: "2023 -2025",
    desc: "Successfully engineered the 'Dynamic Job Application Tracker' and built brand identities like 'Elegant Kicks'.",
    tags: ["JavaScript", "MERN", "Branding"]
  },
  {
    role: "Office Executive",
    company: "Salma Shipping Corporation Ltd.",
    period: "2020 - 2021",
    desc: "Managed corporate documentation and workflow optimization while transitioning into professional web engineering.",
    tags: ["Management", "Workflow", "Documentation"]
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".exp-title", {
        scrollTrigger: {
          trigger: ".exp-title",
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Experience Cards Staggered Animation
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: (i) => (i % 2 === 0 ? -50 : 50),
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        clearProps: "all"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="w-full py-24 md:py-32 bg-[#02050A] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Experience
          </div>
          <h2 className="exp-title text-5xl md:text-6xl lg:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase tracking-tighter leading-tight mb-4">
            Professional Journey
          </h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm">
            A chronological timeline of my evolution from an English Literature graduate to a specialized MERN Stack Developer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative p-8 bg-[#0B0F19] border border-white/5 rounded-2xl hover:shadow-2xl hover:border-primary/50 transition-all duration-500 backdrop-blur-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-wider mt-1">
                    {exp.company}
                  </p>
                </div>
                <span className="px-4 py-1.5 bg-white/5 text-gray-300 text-xs font-bold rounded-full border border-white/10 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6 font-light">
                {exp.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;