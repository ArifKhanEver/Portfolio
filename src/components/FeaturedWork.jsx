"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiInfo } from "react-icons/fi";
import Dragon from '@/assets/home-layout.png'
import KinKeeper from '@/assets/KinKeeper.png'
import BookVibe from '@/assets/BookVibe.png'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "dragon-news",
    title: "DRAGON NEWS",
    category: "FULL STACK DEVELOPMENT",
    desc: "A comprehensive news portal built with Next JS with some login and signin and register functionality where users can register/signin through Google and github.",
    tags: ["NextJs", "Tailwind CSS", "Better Auth"],
    link: "https://dragon-news-ng7z.vercel.app/",
    github: "https://github.com/ArifKhanEver/Dragon-News",
    image: Dragon,
  },
  {
    id: "kin-keeper",
    title: "KINKEEPER",
    category: "RELATIONSHIP MANAGEMENT",
    desc: "KinKeeper is a modern personal relationship management tool designed to help you nurture and maintain your friendships by tracking interactions.",
    tags: ["React.js", "DaisyUI", "Responsive Design"],
    link: "https://kin-keeper-app.netlify.app/",
    github: "https://github.com/ArifKhanEver/KinKeeper",
    image: KinKeeper,
  },
  {
    id: "book-vibe",
    title: "BOOK VIBE",
    category: "FRONTEND ENGINEERING",
    desc: "Digital storefront featuring custom-designed hero sections and interactive UI components built for modern retail.",
    tags: ["React", "Modern UI"],
    link: "https://the-book-vibe-app.netlify.app/",
    github: "https://github.com/ArifKhanEver/Book_Vibe",
    image: BookVibe,
  }
];

const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsTrackRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // 1. "Light on" effect for all text elements
      const lightElements = gsap.utils.toArray(".light-text");

      lightElements.forEach(el => {
        gsap.to(el, {
          color: "rgba(255, 255, 255, 1)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "top 45%",
            scrub: true,
          }
        });
      });

      // 1b. The "INTO" covered by "ELEGANT SOLUTIONS" animation
      gsap.to(".elegant-replacement", {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: ".into-container",
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        }
      });

      // 1c. Global Background Glow Animation (Part 1: Top-Right to Bottom-Left)
      gsap.set(".global-glow", { x: "50vw", y: "-50vh" });

      gsap.to(".global-glow", {
        x: "-50vw", y: "50vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".into-container",
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });

      const track = trackRef.current;

      // 2. Featured Work Showcase Slide-Up & Clip-path
      const showcaseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        }
      });

      showcaseTimeline
        .to(".showcase-word", {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power2.out",
        })
        .to(".work-replacement", {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
        }, "-=0.2");

      // 3. Horizontal Cards Scroll Logic
      const getScrollAmount = () => {
        const ct = document.querySelector('.cards-track');
        return ct ? ct.scrollWidth : window.innerWidth * 2;
      };

      const horizontalTween = gsap.to(".cards-track", {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          pin: true,
          scrub: 1,
          start: "top 0%",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        }
      });

      // 4. Neon Corner Frame — drifts RIGHT as each card travels across
      // the viewport. Linked to horizontalTween via containerAnimation so
      // progress is measured against the horizontal scroll of THIS card,
      // not the page's vertical scroll.
      const cards = gsap.utils.toArray('.project-card-wrapper');

      cards.forEach((card) => {
        const frame = card.querySelector('.corner-frame');
        if (!frame) return;

        // Simple fade-in as card enters — stuck to the card, no offset.
        gsap.fromTo(frame,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 90%",
              end: "left 40%",
              scrub: true,
            }
          }
        );
      });

      // 5. Title Fade Out
      gsap.to(".showcase-title-container", {
        opacity: 0,
        x: -100,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 0%",
          end: "+=800",
          scrub: true,
        }
      });

      // 6. Global Background Glow Animation (Part 2: Bottom-Left to Bottom-Right)
      gsap.fromTo(".global-glow",
        { x: "-50vw", y: "50vh" },
        {
          x: "50vw", y: "50vh",
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 0%",
            end: () => `+=${getScrollAmount()}`,
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Exact Math 3D Hover Effect Logic
  const handleMouseMove = (e, idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotateX = -(y - yc) / 20;
    const rotateY = (x - xc) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (idx) => {
    const card = cardsRef.current[idx];
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
        duration: 0.8
      });
    }
  };

  return (
    <section ref={sectionRef} id="featured-work" className="relative min-h-screen w-full bg-black">

      {/* 1. Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-0"></div>

      {/* GLOBAL GLOW */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="sticky top-0 w-full h-screen">
          <div className="global-glow absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#1877F2]/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* 2. Massive Vertical Scroll Title Sequence */}
      <div className="relative z-10 w-full flex flex-col items-center pt-12 md:pt-24 pb-[30vh] select-none overflow-hidden">

        <h1 className="relative z-10 flex flex-col items-center text-center text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-semibold uppercase tracking-tight text-white/20 leading-[1.1] w-full">
          <span className="light-text">TURNING</span>
          <span className="light-text">COMPLEX</span>
          <span className="light-text">PROBLEMS</span>

          <div className="into-container relative flex justify-center items-center w-full h-[1.3em] my-2 lg:my-4">
            <span className="light-text absolute">INTO</span>
            <span
              className="elegant-replacement absolute z-10 flex justify-center items-center p-2"
              style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            >
              <span className="bg-gradient-to-br from-blue-400 to-blue-600 text-white px-4 md:px-8 py-1 md:py-2 -rotate-2 inline-block shadow-2xl">
                ELEGANT SOLUTIONS
              </span>
            </span>
          </div>

          <span className="light-text mt-4">ONE LINE OF CODE</span>
          <span className="light-text">AT A TIME</span>
        </h1>

        <p className="light-text text-white/30 text-sm md:text-base lg:text-lg max-w-xl mx-auto text-center mt-16 leading-relaxed px-6 tracking-wide">
          Building scalable full-stack applications with modern technologies. From MongoDB to React, NextJS to Postgres. I craft digital experiences that users love
        </p>
      </div>

      {/* Horizontal Scrolling Track - Pinning Target */}
      <div ref={trackRef} className="relative flex items-center h-screen w-full z-20 overflow-hidden">

        <div className="showcase-title-container absolute left-6 md:left-16 lg:left-32 z-10 w-[80vw] md:w-[60vw] lg:w-[600px]">
          <h2 className="flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-semibold uppercase tracking-tight text-white leading-[1.1]">
            <span className="showcase-word opacity-0 translate-y-20 block">FEATURED</span>
            <div className="showcase-word opacity-0 translate-y-20 relative flex items-center w-full h-[1.3em] my-2 lg:my-4">
              <span
                className="work-replacement absolute z-10 flex items-center p-2"
                style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              >
                <span className="bg-gradient-to-br from-blue-400 to-blue-600 text-white px-4 md:px-8 py-1 md:py-2 -rotate-2 inline-block border-2 md:border-4 border-white shadow-2xl">
                  WORK
                </span>
              </span>
            </div>
            <span className="showcase-word opacity-0 translate-y-20 block">SHOWCASE</span>
          </h2>
        </div>

        {/* Moving track of cards */}
        <div className="cards-track flex gap-16 lg:gap-32 h-[70vh] items-center absolute left-[90vw] md:left-[70vw] lg:left-[800px] z-20 w-max pr-[50vw]">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="project-card-wrapper relative w-[85vw] md:w-[480px] lg:w-[600px] h-[400px] md:h-[450px] flex-shrink-0 cursor-pointer group"
              style={{ perspective: "2000px" }}
            >
              {/* Neon border frame — same clip-path as card so chamfer aligns perfectly.
                  Outer neon div is 3px larger on each side. The card sits on top,
                  leaving exactly 3px of neon color visible as the border. */}
              <div
                className="corner-frame absolute pointer-events-none z-30"
                style={{
                  inset: '-3px',
                  background: '#38bdf8',
                  clipPath: 'polygon(0 0, calc(100% - 100px) 0, 100% 60px, 100% 100%, 0 100%)',
                  filter: 'drop-shadow(0 0 10px #38bdf8) drop-shadow(0 0 20px rgba(56,189,248,0.5))',
                  opacity: 0,
                }}
              />

              {/* Card Content — sharp chamfered top-right corner matching the SVG frame */}
              <div
                ref={(el) => cardsRef.current[idx] = el}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="relative w-full h-full bg-zinc-900 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-100 ease-out overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  clipPath: "polygon(0 0, calc(100% - 100px) 0, 100% 60px, 100% 100%, 0 100%)",
                }}
              >
                {/* Full Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                  />
                </div>

                {/* Overlay — dark navy/blue tint instead of flat black, ties into the corner-border accent color */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/95 via-[#0a1530]/60 to-[#0a1530]/10 group-hover:from-[#050914]/70 group-hover:via-[#0a1530]/40 transition-colors duration-500 pointer-events-none"></div>

                {/* Overlaid Content Container — left aligned like the reference card */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col items-start justify-center text-left" style={{ transform: "translateZ(30px)" }}>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-4 justify-start">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white/90 text-xs md:text-sm font-bold uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl leading-[1.05] text-left">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-white/80 text-sm md:text-base max-w-md font-medium leading-relaxed drop-shadow-md mb-8 line-clamp-3 md:line-clamp-none text-left">
                    {project.desc}
                  </p>

                </div>

                {/* Action Buttons (Absolute Bottom-Left) */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-wrap items-center gap-3 z-30" style={{ transform: "translateZ(40px)" }}>
                  <a
                    href={project.link}
                    target="_blank"
                    className="flex items-center gap-2 bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-md font-black uppercase tracking-widest text-xs md:text-sm hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    <FiExternalLink size={18} strokeWidth={2.5} />
                    Preview
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-black/50 backdrop-blur-md border border-white/20 rounded-md text-white hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all shadow-xl"
                  >
                    <FiGithub size={20} />
                  </a>

                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-md text-white px-4 py-2 md:py-2.5 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all shadow-xl text-xs md:text-sm font-bold uppercase tracking-widest"
                  >
                    Details
                    <FiInfo size={16} />
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

export default FeaturedWork;