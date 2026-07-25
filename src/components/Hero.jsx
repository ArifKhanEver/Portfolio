'use client';

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/HeroFigure.png"; 
import { FaDownload, FaLinkedinIn, FaGithub, FaCodepen, FaEnvelope } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Texts & Elements reveal
        tl.from(".reveal-item", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
        })
        .from(".hero-visual", {
            x: 40,
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8");

        // Rotating Tech Rings around the image
        gsap.to(".tech-ring-1", {
            rotation: 360,
            duration: 25,
            repeat: -1,
            ease: "none"
        });
        
        gsap.to(".tech-ring-2", {
            rotation: -360,
            duration: 35,
            repeat: -1,
            ease: "none"
        });

        // Floating avatar
        gsap.to(".avatar-float", {
            y: "-=12",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    const googleDriveCVLink = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";

    return (
        <section ref={containerRef} className="w-full min-h-screen pt-28 pb-16 bg-[#0a0a0e] relative overflow-hidden flex items-center">
            
            {/* Deep Space / Galaxy Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[150px]"></div>
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    
                    {/* Left Content (Text) */}
                    <div className="lg:w-[55%] text-center lg:text-left flex flex-col items-center lg:items-start">
                        
                        {/* Status Badge */}
                        <div className="reveal-item inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-5 py-2 rounded-full text-xs font-semibold mb-6 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            Jr. Full Stack Developer • Backend Focused
                        </div>

                        {/* Greeting & Name */}
                        <h2 className="reveal-item text-xl sm:text-2xl text-gray-300 font-medium mb-2">
                            Hi, I'm
                        </h2>
                        <h1 className="reveal-item text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight">
                            Shafiqul Islam <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400">
                                Khan
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <h3 className="reveal-item text-xl sm:text-2xl text-gray-200 font-semibold mb-5">
                            I am a <span className="text-purple-400">Problem Solver</span>
                        </h3>

                        {/* Description */}
                        <p className="reveal-item text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mb-10 leading-relaxed">
                            Passionate about building modern, interactive, and beautiful web applications working with the <span className="text-fuchsia-400 font-medium">MERN stack</span>. I love solving complex problems and actively building an engineering mindset.
                        </p>

                        {/* Buttons */}
                        <div className="reveal-item flex flex-col sm:flex-row items-center gap-5 mb-10 w-full lg:w-auto justify-center lg:justify-start">
                            <a
                                href={googleDriveCVLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all hover:scale-105 active:scale-95"
                            >
                                <FaDownload /> Get Resume
                            </a>
                            
                            <Link href='#projects' className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
                                View Projects <HiArrowRight />
                            </Link>
                        </div>

                        {/* Social Icons */}
                        <div className="reveal-item flex items-center gap-4">
                            <a href="https://github.com/ArifKhanEver" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all hover:-translate-y-1">
                                <FaGithub size={18} />
                            </a>
                            <a href="http://linkedin.com/in/arifkhanever" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all hover:-translate-y-1">
                                <FaLinkedinIn size={18} />
                            </a>
                            <a href="https://codepen.io/arifkhanever" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all hover:-translate-y-1">
                                <FaCodepen size={18} />
                            </a>
                            <a href="mailto:your-email@example.com" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all hover:-translate-y-1">
                                <FaEnvelope size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Right Section - Main Image & Tech Rings */}
                    <div className="hero-visual lg:w-[45%] relative flex justify-center items-center w-full max-w-sm lg:max-w-none mx-auto mt-10 lg:mt-0">
                        
                        <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
                            
                            {/* Outer Dashed Ring (Slow reverse rotation) */}
                            <div className="tech-ring-2 absolute inset-[-10%] rounded-full border border-dashed border-purple-500/30"></div>
                            
                            {/* Inner Glowing Ring (Forward rotation) */}
                            <div className="tech-ring-1 absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]"></div>
                            
                            {/* Subtle background behind avatar */}
                            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-900/40 to-transparent backdrop-blur-sm border border-white/5"></div>

                            {/* Avatar Image */}
                            <Image
                                src={HeroImage}
                                alt="Shafiqul Islam Khan"
                                priority
                                className="avatar-float relative z-10 w-[85%] h-[85%] object-cover rounded-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                            />
                            
                            {/* Small decorative floating dots around the ring */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                            <div className="absolute bottom-10 left-0 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"></div>
                            <div className="absolute top-20 right-0 w-2.5 h-2.5 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#e879f9]"></div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;