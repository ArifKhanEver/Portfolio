"use client";

import HeroImage from '@/assets/HeroFigure.png'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Text reveal animation
            gsap.from(".about-content > *", {
                scrollTrigger: {
                    trigger: ".about-content",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });
            
            gsap.from(".about-image-wrapper", {
                scrollTrigger: {
                    trigger: ".about-image-wrapper",
                    start: "top 80%",
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="w-full py-24 md:py-32 bg-[#02050A] relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: Image Visual */}
                    <div className="about-image-wrapper lg:w-[45%] relative">
                        <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(6,143,255,0.15)] bg-white/5 backdrop-blur-sm p-4">
                            <div className="aspect-[4/5] bg-theme-black rounded-[1.5rem] overflow-hidden relative flex items-center justify-center">
                                <Image src={HeroImage} alt='My Image' fill className='object-cover opacity-90' />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -right-10 w-full h-full border border-primary/30 rounded-[2rem] -z-10 bg-primary/5 blur-sm"></div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="lg:w-[55%] about-content space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent leading-tight uppercase tracking-tighter">
                                Bridging Narrative <br />
                                With Technology
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
                            <p>
                                Hello, I'm <strong className="text-white font-medium">Shafiqul Islam Khan</strong>, a web developer with a passion for creating innovative and impactful digital experiences. My interest in web development started when I discovered my love for modern UI interactions, and since then, I've been fortunate enough to build accessible and inclusive digital products that push the boundaries of what's possible.
                            </p>
                            <p>
                                As a full-stack engineer, I'm committed to helping businesses and individuals achieve their digital goals. Whether it's robust backend architecture or fluid frontend animations, I have the expertise to take your digital presence to the next level.
                            </p>
                        </div>

                        {/* Quick Skills/Focus Area */}
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:border-primary/50 transition-all backdrop-blur-md">
                                <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Strategy</h4>
                                <p className="text-white font-medium">Critical Thinking & Research</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 group hover:border-accent/50 transition-all backdrop-blur-md">
                                <h4 className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Execution</h4>
                                <p className="text-white font-medium">Modern Web Architecture</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;