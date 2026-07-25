"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaDownload, FaLinkedinIn, FaGithub, FaCodepen, FaPhoneAlt, FaEnvelope, FaFacebook } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroImage from "@/assets/HeroFigure.png"; // Keeping just in case, but reference has no image here. If they want avatar, we can put it inside phone.

const TYPEWRITER_TEXTS = ["Backend Developer", "Problem Solver", "Full Stack Dev"];

const Hero = () => {
    const containerRef = useRef(null);
    const [typewriterText, setTypewriterText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter Effect
    useEffect(() => {
        const currentWord = TYPEWRITER_TEXTS[wordIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting && typewriterText === currentWord) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && typewriterText === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
            } else {
                setTypewriterText((prev) => 
                    isDeleting ? currentWord.substring(0, prev.length - 1) : currentWord.substring(0, prev.length + 1)
                );
            }
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [typewriterText, isDeleting, wordIndex]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".reveal-element", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
        });

        gsap.to(".phone-float", {
            y: "-=15",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    const googleDriveCVLink = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";

    return (
        <section id="home" ref={containerRef} className="relative bg-theme-black min-h-screen overflow-hidden flex items-center w-full">
            <div className="w-full px-6 md:px-12 lg:px-24 xl:px-32 py-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                
                {/* Left Content */}
                <div className="lg:w-[55%] text-left flex flex-col items-start z-10">
                    <h2 className="reveal-element text-4xl sm:text-5xl lg:text-7xl font-bold uppercase leading-tight flex flex-wrap items-center gap-x-4 text-white">
                        <span>HELLO</span>
                        <div className="inline-block cursor-pointer hover:animate-wave-fast animate-wave-gentle origin-bottom" role="img" aria-label="Waving Hand">👋</div>
                        <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>I'M</span>
                    </h2>
                    
                    <h1 className="reveal-element text-primary text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase mt-4 leading-tight tracking-tight">
                        Shafiqul Islam<br/>Khan
                    </h1>

                    <div className="reveal-element space-y-6 mt-8">
                        <div className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed flex flex-wrap items-center gap-x-3">
                            <span className="whitespace-nowrap">A highly skilled</span>
                            <div className="relative inline-flex items-center">
                                <span className="font-bold border-b-4 border-primary text-white">
                                    {typewriterText}
                                    <span className="inline-block w-[3px] h-[1em] ml-1 bg-white animate-pulse align-middle"></span>
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light">
                            Crafting exceptional digital experiences with modern technologies. Passionate about building scalable, user-friendly applications that make a difference.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="reveal-element flex flex-wrap gap-6 mt-10 w-full sm:w-auto">
                        <Link href="#projects" className="group relative inline-flex items-center justify-center font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 active:scale-95 px-10 py-4 bg-white/10 text-white hover:shadow-[0_10px_30px_rgba(6,143,255,0.3)] border border-white/20">
                            <span className="relative z-10">View My Work</span>
                            <span className="absolute inset-0 m-auto w-[120%] aspect-square rounded-full bg-gradient-to-r from-primary to-accent scale-0 group-hover:scale-125 transition-transform duration-500 ease-out z-0"></span>
                        </Link>
                        
                        <a href={googleDriveCVLink} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 active:scale-95 px-10 py-4 text-white border border-white hover:bg-white hover:text-black shadow-xl hover:-translate-y-1">
                            <span className="relative z-10 transition-colors duration-300">Download CV</span>
                        </a>
                    </div>
                </div>

                {/* Right Content - Phone Mockup */}
                <div className="reveal-element lg:w-[45%] relative flex justify-center lg:justify-end items-center z-10">
                    <div className="phone-float relative bg-black w-[320px] h-[550px] rounded-[3rem] flex flex-col p-4 shadow-[0_20px_50px_rgba(6,143,255,0.2)] border-4 border-zinc-800">
                        {/* Inner Screen */}
                        <div className="grow bg-zinc-100 dark:bg-[#eaeaff] rounded-[2rem] p-6 relative overflow-hidden flex flex-col">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

                            {/* Top icons */}
                            <div className="absolute top-4 left-4 flex gap-3 z-10">
                                <a href="tel:+1234567890" className="text-zinc-800 hover:text-primary transition-colors"><FaPhoneAlt size={16} /></a>
                                <a href="mailto:example@gmail.com" className="text-zinc-800 hover:text-primary transition-colors"><FaEnvelope size={16} /></a>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-3 z-10">
                                <a href="https://github.com/ArifKhanEver" target="_blank" rel="noreferrer" className="text-zinc-800 hover:text-primary transition-colors"><FaGithub size={18} /></a>
                                <a href="http://linkedin.com/in/arifkhanever" target="_blank" rel="noreferrer" className="text-zinc-800 hover:text-primary transition-colors"><FaLinkedinIn size={18} /></a>
                            </div>

                            {/* Main Phone Content */}
                            <div className="flex flex-col justify-center items-center h-full pt-12 pb-4 text-center z-10">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                                    <Image src={HeroImage} alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <h1 className="text-3xl font-bold text-black font-sans leading-tight mb-8">Hello There, Stranger!</h1>
                                <a href="#contact" className="w-full py-4 bg-black text-white rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-lg cursor-pointer">
                                    Let's Talk
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;