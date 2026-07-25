"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Zustand"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "Firebase", "Mongoose", "REST APIs"]
  },
  {
    title: "Tools",
    skills: ["Git", "Github", "Vercel", "Postman", "Figma", "VS Code"]
  }
];

const Skills = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Infinite Marquee animation for each row
    const marquees = gsap.utils.toArray(".marquee-inner");
    marquees.forEach((marquee, i) => {
      // Alternate directions if desired, or all same direction
      const direction = i % 2 === 0 ? -1 : 1;
      
      gsap.to(marquee, {
        xPercent: direction * -50,
        ease: "none",
        duration: 30, // adjust speed here
        repeat: -1,
      });
    });
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="w-full py-20 bg-theme-white relative overflow-hidden">
      
      {/* Background Grid Pattern (optional subtle grid to match target) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative space-y-12">
        {SKILL_CATEGORIES.map((category, idx) => (
          <div key={category.title} className="relative overflow-hidden flex w-full">
            <div className="marquee-inner flex items-center gap-8 whitespace-nowrap w-max">
              {/* Duplicate content twice to create seamless loop */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 flex-shrink-0">
                  <h4 className="text-theme-black text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wider pl-8">
                    {category.title}
                  </h4>
                  <div className="h-[2px] w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-primary to-accent"></div>
                  
                  {category.skills.map((skill, sIdx) => (
                    <div key={skill + sIdx} className="flex items-center">
                      <p className="text-xl sm:text-2xl lg:text-3xl font-light tracking-wide inline-block text-theme-black">
                        {skill}
                      </p>
                      {/* Don't show dot after last item of the inner map, but since we are repeating we can just show it always */}
                      <span className="text-base sm:text-lg mx-6 text-primary">•</span>
                    </div>
                  ))}
                  
                  <div className="h-[2px] w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-accent to-primary pr-8"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Fade borders to make it look smooth on edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-theme-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-theme-white to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default Skills;