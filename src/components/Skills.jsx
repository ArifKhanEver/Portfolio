"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: ["TyperScript", "React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Zustand"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "Better Auth", "Firebase", "Supabase", "Mongoose", "REST APIs"]
  },
  {
    title: "Tools",
    skills: ["Git", "Github", "Vercel", "Postman", "Figma", "VS Code", "Stripe", "React Hook Form", "Cloudinary", "Bun", "npm", "yarn"]
  },
  {
    title: "Others",
    skills: ["AI Agents & IDEs", "Leaflet and Google Maps", "TanStack Query", "ShadCN UI", "React Hook Form"]
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
        { xPercent: direction === -1 ? 0 : -15 },
        {
          xPercent: direction === -1 ? -15 : 0,
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
            <div key={category.title} className="relative overflow-hidden flex w-full">
              <div className="marquee-inner flex items-center gap-8 whitespace-nowrap w-max">
                
                {/* Duplicate content to create seamless loop */}
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-8 flex-shrink-0">
                    
                    {/* Stack name on the LEFT for odd rows */}
                    {isLeft && (
                      <>
                        <h4 className="text-gray-500 text-3xl lg:text-5xl font-black uppercase tracking-widest pl-8">
                          {category.title}
                        </h4>
                        <div className="h-[2px] w-20 sm:w-32 bg-gradient-to-r from-primary to-transparent"></div>
                      </>
                    )}

                    {category.skills.map((skill, sIdx) => (
                      <div key={skill + sIdx} className="flex items-center">
                        <p className="text-2xl lg:text-4xl font-light tracking-wide inline-block text-gray-200">
                          {skill}
                        </p>
                        <span className="text-xl mx-8 text-primary opacity-60">•</span>
                      </div>
                    ))}
                    
                    {/* Stack name on the RIGHT for even rows */}
                    {!isLeft && (
                      <>
                        <div className="h-[2px] w-20 sm:w-32 bg-gradient-to-l from-primary to-transparent"></div>
                        <h4 className="text-gray-500 text-3xl lg:text-5xl font-black uppercase tracking-widest pr-8">
                          {category.title}
                        </h4>
                      </>
                    )}

                    {/* Separator between duplicated blocks if the stack name isn't buffering it */}
                    {isLeft && <div className="h-[2px] w-20 sm:w-32 bg-gradient-to-l from-primary to-transparent pr-8"></div>}
                    {!isLeft && <div className="h-[2px] w-20 sm:w-32 bg-gradient-to-r from-primary to-transparent pl-8"></div>}

                  </div>
                ))}

              </div>
            </div>
          );
        })}
      </div>
      
      {/* Fade borders to make it look smooth on edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-theme-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-theme-black to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default Skills;