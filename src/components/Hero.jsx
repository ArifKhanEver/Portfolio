'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/HeroFigure.png";
import { HiArrowRight } from "react-icons/hi";
import { FaDownload, FaLinkedinIn, FaDribbble, FaBehance, FaGithub, FaCodepen } from "react-icons/fa";
import gsap from "gsap";


const Hero = () => {
    const heroRef = useRef(null);
    const leftContentRef = useRef(null);
    const imageRef = useRef(null); // Ref for image instead of container
    const underlineRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // --- ENTRANCE ANIMATIONS ---

            // Left side content
            if (leftContentRef.current) {
                gsap.from(leftContentRef.current.children, {
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                });
            }

            // SVG underline
            if (underlineRef.current) {
                gsap.fromTo(underlineRef.current,
                    { strokeDasharray: 400, strokeDashoffset: 400 },
                    { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", delay: 0.5 }
                );
            }

            // Stats
            if (statsRef.current) {
                gsap.from(statsRef.current.children, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    delay: 0.8
                });
            }

            // Main image entrance and floating (Separated to avoid conflict)
            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    x: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    //   onComplete: () => {
                    //     // Floating effect ONLY after entrance is done
                    //     gsap.to(imageRef.current, {
                    //       y: 15,
                    //       duration: 2.5,
                    //       repeat: -1,
                    //       yoyo: true,
                    //       ease: "sine.inOut"
                    //     });
                    //   }
                });
            }

            // --- CONTINUOUS ANIMATIONS ---

            // Decorative shapes floating
            gsap.to(".gsap-float", {
                y: "random(-15, 15)",
                x: "random(-5, 5)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { amount: 1, from: "random" }
            });

            // Background glow rotation
            gsap.to(".gsap-rotate-bg", {
                rotation: 360,
                duration: 30,
                repeat: -1,
                ease: "none"
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="w-full pt-28 lg:pt-30 bg-white dark:bg-black relative overflow-hidden flex items-center">

            {/* BACKGROUND DECORATIVE ELEMENTS - FIXED POSITIONS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="gsap-rotate-bg absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-teal-50 dark:bg-teal-900/20 rounded-full blur-[120px] opacity-60"></div>
                <div className="gsap-rotate-bg absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-50 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-40"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Content */}
                    <div ref={leftContentRef} className="lg:w-1/2 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#E6F4F1] dark:bg-[#149988]/20 text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-3">
                            <span className="w-2 h-2 bg-[#149988] rounded-full animate-pulse"></span>
                            Available Now
                        </div>

                        <h1 className="text-4xl lg:text-[50px] font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6">
                            Solving Problems <br />
                            <span className="text-[#149988] relative inline-block">
                                Through Code
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 318 12" fill="none">
                                    <path ref={underlineRef} d="M1 10C78.5 2.5 240.5 2.5 317 10" stroke="#149988" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-slate-500 dark:text-zinc-400 text-base lg:text-lg max-w-xl mb-5 leading-relaxed font-medium mx-auto lg:mx-0">
                            Hi, I'm <span className="text-[#149988] font-bold">Shafiqul Islam Khan</span>, a passionate MERN stack developer focused on creating beautiful and functional digital experiences.
                        </p>

                        {/* Statistics */}
                        <div ref={statsRef} className="flex flex-wrap justify-center lg:justify-start gap-8 mb-6">
                            <div className="flex flex-col text-left">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">5+</span>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Years of Excellence</p>
                            </div>
                            <div className="border-l border-gray-200 hidden md:block"></div>
                            <div className="flex flex-col text-left">
                                <span className="text-3xl font-black text-slate-900 dark:text-white">30+</span>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Projects Delivered</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                            <Link href='#contact' className="w-full sm:w-auto bg-[#149988] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0f7d6f] transition-all active:scale-95">
                                Hire me <HiArrowRight />
                            </Link>
                            <a
                                href="/resume.pdf" 
                                download="Shafiqul_Islam_CV.pdf" 
                                className="w-full sm:w-auto border-2 border-[#149988] text-[#149988] px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#E6F4F1] dark:hover:bg-[#149988]/20 transition-all active:scale-95"
                            >
                                Download CV <FaDownload />
                            </a>
                        </div>

                        {/* Socials */}
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                                <a href="http://linkedin.com/in/arifkhanever" target="_blank" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-[#149988] hover:text-white transition-all shadow-sm border border-slate-100 dark:border-zinc-800">
                                    <FaLinkedinIn />
                                </a>
                                <a href="https://codepen.io/arifkhanever" target="_blank" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-[#149988] hover:text-white transition-all shadow-sm border border-slate-100 dark:border-zinc-800">
                                    <FaCodepen />
                                </a>
                                <a href="https://github.com/ArifKhanEver" target="_blank" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:bg-[#149988] hover:text-white transition-all shadow-sm border border-slate-100 dark:border-zinc-800">
                                    <FaGithub />
                                </a>
                        </div>
                    </div>

                    {/* Right Section - Main Image */}
                    <div className="lg:w-1/2 relative flex justify-center items-center">
                        {/* Dashed Circle */}
                        <div className="gsap-rotate-bg absolute w-[100%] h-[95%] border border-dashed border-teal-900 border-6px bg-teal-200 rounded-full -z-10 opacity-30"></div>

                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <Image
                                ref={imageRef}
                                src={HeroImage}
                                alt="3D Character"
                                priority
                                className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(20,153,136,0.3)]"
                            />

                            {/* Floating Shapes */}
                            <div className=" absolute top-10 right-5 w-8 h-8 bg-teal-400 rounded-lg rotate-12 opacity-20 hidden md:block"></div>
                            <div className="gsap-float absolute bottom-10 left-0 w-12 h-12 border-4 border-blue-200 rounded-full opacity-30 hidden md:block"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;