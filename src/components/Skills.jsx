"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiNextdotjs, SiTailwindcss, SiTypescript, SiFirebase
} from "react-icons/si";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILLS = [
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, level: "Advanced" },
  { name: "Express.js", icon: <SiExpress className="text-[#000000]" />, level: "Expert" },
  { name: "React.js", icon: <SiReact className="text-[#61DAFB]" />, level: "Expert" },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, level: "Advanced" },
  { name: "Next.js", icon: <SiNextdotjs className="text-black" />, level: "Expert" },
  { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" />, level: "Master" },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, level: "Intermediate" },
  { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" />, level: "Advanced" },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Refresh ScrollTrigger on mount to ensure correct positioning
    ScrollTrigger.refresh();

    let ctx = gsap.context(() => {
      // Title Animation
      gsap.from(".skills-title", {
        scrollTrigger: {
          trigger: ".skills-title",
          start: "top 90%",
          toggleActions: "play none none none" // একবারই প্লে হবে
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        },
      });

      tl.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.4)",
        clearProps: "opacity, transform", // এনিমেশন শেষ হলে প্রোপার্টিগুলো ক্লিন করে দেবে
        onComplete: () => {
          // Floating animation starts AFTER entrance is totally done
          gsap.to(cardsRef.current, {
            y: "random(-8, 8)",
            duration: "random(2, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
              amount: 1.5,
              from: "random",
            },
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert(); // Cleanup on unmount
      ScrollTrigger.getAll().forEach(t => t.kill()); // Kill all triggers to prevent memory leak
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="w-full py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-50 dark:bg-teal-900/20 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E6F4F1] dark:bg-[#149988]/20 text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-3">
            <span className="w-2 h-2 bg-[#149988] rounded-full animate-pulse"></span>
            Crafting Skills
          </div>
          <h2 className="skills-title text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4">
            Technical <span className="text-[#149988]">Proficiency</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto italic">
            "Leveraging the power of the MERN stack and modern tools to build
            scalable, high-performance web applications."
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
          {SKILLS.map((skill, idx) => (
            <div
              key={skill.name}
              ref={(el) => (cardsRef.current[idx] = el)}
              style={{ opacity: 1 }} // Force initial visibility check
              className="group p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-[#149988]/30 dark:hover:border-[#149988]/30 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 ease-out leading-none">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">{skill.name}</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#149988] animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#149988]/80">
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;