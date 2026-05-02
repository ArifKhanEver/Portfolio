"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { IoSchoolOutline, IoBriefcaseOutline } from "react-icons/io5";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EDUCATION = [
  {
    title: "MERN Stack Web Engineering",
    institution: "Programming Hero / Bootcamp",
    period: "2026",
    desc: "An intensive course focusing on React, Node.js, and scaling full-stack applications.",
    icon: <IoBriefcaseOutline />,
  },
  {
    title: "Master of English Literature",
    institution: "National University",
    period: "2025 - 2026",
    desc: "Specialized in Shakespeare & Post-Colonial Theory.",
    icon: <IoSchoolOutline />,
  },
  {
    title: "Bachelor's of English Literature",
    institution: "National University",
    period: "2021 - 2025",
    desc: "Visited diverse branches of English Literature",
    icon: <IoSchoolOutline />,
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.from(".edu-title", {
        scrollTrigger: {
          trigger: ".edu-title",
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Continuous Rotation (Looping) - Consistency with Hero
      gsap.to(".gsap-rotate-edu", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // 3. Staggered Entrance and Scrub for Items
      const items = gsap.utils.toArray(".edu-item");

      // Entrance
      gsap.from(items, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.5)",
      });

      // 4. Subtle Scaling while scrolling (Scrub) - Unique Feature
      if (typeof window !== "undefined") {
        gsap.to(items, {
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Linking animation directly to scroll position
          },
          y: -20, // Gentle upward movement
          ease: "sine.inOut",
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-white relative overflow-hidden border-b border-slate-50"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="gsap-rotate-edu absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[100px] opacity-40"></div>
        <div className="gsap-rotate-edu absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-blue-50 rounded-full blur-[80px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E6F4F1] text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-3">
            <span className="w-2 h-2 bg-[#149988] rounded-full animate-pulse"></span>
            Educational Qualification
          </div>
          <h2 className="edu-title text-4xl lg:text-6xl font-black text-slate-900 mb-4">
            Educational <span className="text-[#149988]">Pathway</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">
            "A seamless fusion of academic knowledge and technical specialization."
          </p>
        </div>

        {/* The Asymmetric Grid (Alternating Layout) */}
        <div ref={triggerRef} className="max-w-6xl mx-auto space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className={`edu-item relative p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-start gap-6 border border-slate-100 group ${idx % 2 !== 0 ? 'lg:translate-y-20' : ''}`}
            >
              {/* Special Icon Design with Rotation and Staggering */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100/50 flex items-center justify-center text-3xl text-[#149988] group-hover:scale-110 group-hover:bg-[#149988] group-hover:text-white transition-all duration-300">
                  {edu.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-800 leading-tight">
                    {edu.title}
                  </h3>
                  <p className="text-[#149988] font-bold text-sm uppercase tracking-wider">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-slate-500 leading-relaxed font-medium">
                  {edu.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#149988] animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#149988]/80">
                    {edu.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;