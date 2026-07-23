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
    <section ref={sectionRef} id="experience" className="w-full py-20 bg-gray-100 dark:bg-slate-900 relative overflow-hidden border-t border-slate-50 dark:border-slate-800">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-50/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E6F4F1] text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-3">
            <span className="w-2 h-2 bg-[#149988] rounded-full animate-pulse"></span>
            Experience
          </div>
          <h2 className="exp-title text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4">
            Professional <span className="text-[#149988]">Journey</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            A chronological timeline of my evolution from an English Literature graduate to a specialized MERN Stack Developer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] hover:shadow-2xl hover:border-[#149988]/20 dark:hover:border-[#149988]/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 group-hover:text-[#149988] transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-[#149988] font-bold text-sm uppercase tracking-wider">
                    {exp.company}
                  </p>
                </div>
                <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-black rounded-full border border-slate-100 dark:border-slate-700 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                {exp.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-teal-50 text-[#149988] text-[10px] font-black uppercase rounded-lg border border-teal-100/50">
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