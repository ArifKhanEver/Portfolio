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
    <section id="skills" ref={containerRef} className="w-full py-24 bg-theme-black relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative space-y-16 lg:space-y-24">
        {SKILL_CATEGORIES.map((category, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div key={category.title} className="relative overflow-hidden flex items-center w-full min-h-[60px] sm:min-h-[80px]">

              {/* The Marquee */}
              <div className="marquee-inner flex items-center gap-8 whitespace-nowrap w-max relative z-10">
                {/* Repeat enough times so the stack name is always visible nearby */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-6 sm:gap-10 flex-shrink-0">
                    
                    {isLeft && (
                      <>
                        <h4 className="text-gray-500 text-4xl lg:text-6xl font-black uppercase tracking-tighter ml-8">
                          {category.title}
                        </h4>
                        <div className="h-[2px] w-24 sm:w-40 lg:w-56 bg-gradient-to-r from-primary to-transparent"></div>
                      </>
                    )}

                    {category.skills.map((skill, sIdx) => (
                      <div key={skill + sIdx} className="flex items-center">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide inline-block text-gray-200">
                          {skill}
                        </p>
                        {/* Only add dot if it's not the last skill OR if we need a separator before the stack name */}
                        <span className="text-lg sm:text-xl mx-6 sm:mx-10 text-primary opacity-60">•</span>
                      </div>
                    ))}

                    {!isLeft && (
                      <>
                        <div className="h-[2px] w-24 sm:w-40 lg:w-56 bg-gradient-to-l from-primary to-transparent"></div>
                        <h4 className="text-gray-500 text-4xl lg:text-6xl font-black uppercase tracking-tighter mr-8">
                          {category.title}
                        </h4>
                      </>
                    )}

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>
      
    </section>
  );
};

export default Skills;