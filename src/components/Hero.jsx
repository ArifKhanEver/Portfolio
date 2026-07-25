'use client';

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/HeroFigure.png"; // নিশ্চিত করুন আপনার এই ইমেজটি আছে
import { HiArrowRight } from "react-icons/hi";
import { FaDownload, FaLinkedinIn, FaGithub, FaCodepen } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    const containerRef = useRef(null);

    // Modern GSAP Implementation using useGSAP hook (Best for React 19)
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // 1. Badge & Texts reveal from bottom
        tl.from(".reveal-text", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
        })
        // 2. SVG Underline draw effect
        .fromTo(".underline-svg", 
            { strokeDasharray: 400, strokeDashoffset: 400 },
            { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
            "-=0.8"
        )
        // 3. Stats pop up
        .from(".reveal-stat", {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)"
        }, "-=0.6")
        // 4. Buttons slide in
        .from(".reveal-btn", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        }, "-=0.6")
        // 5. Image & Glow fade in smoothly
        .from(".hero-visual", {
            x: 50,
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.2");

        // Continuous Floating Animation for Image
        gsap.to(".hero-image", {
            y: "-=15",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Continuous Floating for decorative shapes
        gsap.to(".floating-shape", {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-15, 15)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2
        });

        // Slow rotation for background glows
        gsap.to(".gsap-rotate-bg", {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: "none"
        });

    }, { scope: containerRef }); // Scope ensures animations only happen inside this component

    // আপনার গুগল ড্রাইভের লিংকটি এখানে বসান
    const googleDriveCVLink = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";

    return (
        <section ref={containerRef} className="w-full min-h-screen pt-28 pb-16 bg-white dark:bg-black relative overflow-hidden flex items-center">
            
            {/* Premium Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="gsap-rotate-bg absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#149988]/10 dark:bg-[#149988]/5 rounded-full blur-[120px]"></div>
                <div className="gsap-rotate-bg absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-8">
                    
                    {/* Left Content */}
                    <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
                        
                        {/* Status Badge */}
                        <div className="reveal-text inline-flex items-center gap-2 bg-[#149988]/10 dark:bg-[#149988]/20 border border-[#149988]/20 text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-6 backdrop-blur-sm shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#149988] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#149988]"></span>
                            </span>
                            Available for new projects
                        </div>

                        {/* Headline */}
                        <h1 className="reveal-text text-5xl sm:text-6xl lg:text-[70px] font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                            Solving Problems <br />
                            <span className="text-[#149988] relative inline-block">
                                Through Code
                                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 318 12" fill="none">
                                    <path className="underline-svg" d="M1 10C78.5 2.5 240.5 2.5 317 10" stroke="#149988" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="reveal-text text-slate-500 dark:text-zinc-400 text-base sm:text-lg lg:text-xl max-w-xl mb-10 leading-relaxed font-medium">
                            Hi, I'm <span className="text-slate-800 dark:text-zinc-200 font-bold">Shafiqul Islam Khan</span>. A passionate MERN stack developer focused on crafting seamless, high-performance digital experiences.
                        </p>

                        {/* Buttons & Socials Container */}
                        <div className="reveal-btn flex flex-col sm:flex-row items-center gap-6 mb-12 w-full lg:w-auto justify-center lg:justify-start">
                            <div className="flex gap-4 w-full sm:w-auto">
                                <Link href='#contact' className="flex-1 sm:flex-none bg-[#149988] text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0f7d6f] hover:shadow-lg hover:shadow-[#149988]/30 transition-all active:scale-95">
                                    Hire me <HiArrowRight className="text-xl" />
                                </Link>
                                
                                {/* Updated Google Drive Link Button */}
                                <a
                                    href={googleDriveCVLink} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none border-2 border-[#149988] text-[#149988] dark:border-zinc-700 dark:text-zinc-300 px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#149988] hover:border-[#149988] hover:text-white dark:hover:bg-zinc-800 transition-all active:scale-95"
                                >
                                    View CV <FaDownload />
                                </a>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-3">
                                <a href="http://linkedin.com/in/arifkhanever" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-[#149988] hover:text-white dark:hover:bg-[#149988] transition-all shadow-sm border border-slate-200 dark:border-zinc-800 hover:scale-110">
                                    <FaLinkedinIn size={18} />
                                </a>
                                <a href="https://github.com/ArifKhanEver" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-[#149988] hover:text-white dark:hover:bg-[#149988] transition-all shadow-sm border border-slate-200 dark:border-zinc-800 hover:scale-110">
                                    <FaGithub size={18} />
                                </a>
                                <a href="https://codepen.io/arifkhanever" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-[#149988] hover:text-white dark:hover:bg-[#149988] transition-all shadow-sm border border-slate-200 dark:border-zinc-800 hover:scale-110">
                                    <FaCodepen size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Statistics (Modern Glassmorphism look) */}
                        <div className="flex gap-8 sm:gap-12 pt-6 border-t border-slate-200 dark:border-zinc-800/50 w-full justify-center lg:justify-start">
                            <div className="reveal-stat flex flex-col">
                                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">5<span className="text-[#149988]">+</span></span>
                                <p className="text-slate-500 dark:text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-1">Years Exp</p>
                            </div>
                            <div className="reveal-stat flex flex-col">
                                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">30<span className="text-[#149988]">+</span></span>
                                <p className="text-slate-500 dark:text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-1">Projects</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Main Image & Visuals */}
                    <div className="hero-visual lg:w-1/2 relative flex justify-center items-center w-full max-w-md lg:max-w-none mx-auto">
                        
                        {/* Modern Glowing Orb Background instead of dashed circle */}
                        <div className="absolute w-[85%] aspect-square bg-gradient-to-tr from-[#149988]/30 to-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute w-[70%] aspect-square border border-[#149988]/20 dark:border-[#149988]/10 rounded-full -z-10"></div>

                        <div className="relative w-full aspect-square flex items-center justify-center">
                            <Image
                                src={HeroImage}
                                alt="Shafiqul Islam Khan - Developer"
                                priority
                                className="hero-image relative z-10 w-[85%] h-auto drop-shadow-2xl"
                            />

                            {/* Floating Tech Decorative Shapes */}
                            <div className="floating-shape absolute top-[10%] right-[15%] w-10 h-10 bg-teal-400/20 backdrop-blur-md border border-teal-400/30 rounded-xl hidden md:flex items-center justify-center z-20">
                                <span className="text-teal-500 text-xs font-bold">JS</span>
                            </div>
                            <div className="floating-shape absolute bottom-[20%] left-[10%] w-12 h-12 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-full hidden md:flex items-center justify-center z-20">
                                <span className="text-blue-500 text-xs font-bold">Re</span>
                            </div>
                            <div className="floating-shape absolute top-[40%] left-[5%] w-6 h-6 bg-yellow-400/20 rounded-full hidden md:block z-0"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;