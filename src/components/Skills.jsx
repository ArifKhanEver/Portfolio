"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: [ "TyperScript" ,"React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Zustand"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "Better Auth", "Firebase", "Supabase", "Mongoose", "REST APIs"]
  },
  {
    title: "Tools",
    skills: ["Git", "Github", "Vercel", "Postman", "Figma", "VS Code", "Stripe", "React Hook Form", "Cloudinary", "Bun", "npm", "yarn",]
  }
];

const Skills = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Scroll-triggered Marquee animation for each row
    const marquees = gsap.utils.toArray(".marquee-inner");
    marquees.forEach((marquee, i) => {
      const direction = i % 2 === 0 ? -1 : 1;
      
      gsap.fromTo(marquee, 
        { xPercent: direction === -1 ? 0 : -30 },
        {
          xPercent: direction === -1 ? -30 : 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="w-full py-20 bg-theme-black relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative space-y-16">
        {SKILL_CATEGORIES.map((category, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div key={category.title} className="relative overflow-hidden flex items-center w-full min-h-[60px] sm:min-h-[80px]">
              
              {/* The Pinned Stack Name */}
              {isLeft ? (
                <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-theme-black pr-8 pl-4 sm:pl-10">
                  <h4 className="text-white text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tighter">
                    {category.title}
                  </h4>
                  <div className="h-[2px] w-20 sm:w-32 lg:w-48 bg-gradient-to-r from-primary to-transparent ml-6 sm:ml-10"></div>
                </div>
              ) : (
                <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center bg-theme-black pl-8 pr-4 sm:pr-10">
                  <div className="h-[2px] w-20 sm:w-32 lg:w-48 bg-gradient-to-l from-primary to-transparent mr-6 sm:mr-10"></div>
                  <h4 className="text-white text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tighter">
                    {category.title}
                  </h4>
                </div>
              )}

              {/* The Marquee (Scrolls behind the pinned titles) */}
              <div className="marquee-inner flex items-center gap-8 whitespace-nowrap w-max relative z-10">
                {/* Duplicate content to create seamless loop */}
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-8 flex-shrink-0">
                    {category.skills.map((skill, sIdx) => (
                      <div key={skill + sIdx} className="flex items-center">
                        <p className="text-xl sm:text-2xl lg:text-3xl font-light tracking-wide inline-block text-gray-300 hover:text-primary transition-colors">
                          {skill}
                        </p>
                        <span className="text-base sm:text-lg mx-6 text-primary">•</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>
      
      {/* Fade borders to make it look smooth on edges */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-theme-black to-transparent pointer-events-none z-30"></div>
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-theme-black to-transparent pointer-events-none z-30"></div>
    </section>
  );
};

export default Skills;