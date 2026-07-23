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
    const textRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Background elements animation
            gsap.to(".about-glow", {
                y: "random(-30, 30)",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Text reveal animation
            gsap.from(".about-content > *", {
                scrollTrigger: {
                    trigger: ".about-content",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="w-full md:py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
            {/* Background Decorative Glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="about-glow absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-teal-50 rounded-full blur-[100px] opacity-60"></div>
                <div className="about-glow absolute -bottom-[10%] -left-[5%] w-[300px] h-[300px] bg-blue-50 rounded-full blur-[80px] opacity-40"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Image/Visual Placeholder */}
                    <div className="lg:w-2/5 relative">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl shadow-slate-200 dark:shadow-none">
                            <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Image src={HeroImage} alt='my Image' fill  className='object-cover'/>
                            </div>
                        </div>
                        {/* Decorative Frame */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#149988] rounded-[3rem] -z-10 translate-x-4 translate-y-4"></div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="lg:w-3/5 about-content space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-[#E6F4F1] text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-3">
                                <span className="w-2 h-2 bg-[#149988] rounded-full animate-pulse"></span>
                                About Me
                            </div>
                            <h2 className="text-4xl lg:text-[50px] font-black text-slate-900 leading-tight">
                                Bridging Narrative <br />
                                <span className="text-[#149988]">With Technology</span>
                            </h2>
                            <div className="h-1.5 w-20 bg-[#149988] rounded-full"></div>
                        </div>

                        <div className="space-y-6 text-slate-500 font-medium text-lg leading-relaxed">
                            <p>
                                Hello, I'm <strong>Shafiqul Islam Khan</strong> , a web developer with a passion for creating innovative and impactful digital experiences. My interest in web development started when I discovered my love for HTML and CSS, and since then, I've been fortunate enough to work with a variety of clients, including advertising agencies, start-ups, and large corporations.At Upstatement, I'm focused on developing accessible and inclusive digital products and experiences, constantly pushing the boundaries of what's possible. I'm proficient in a variety of cutting-edge technologies necessary for both Frontend and Backend.
                            </p>
                            <p>
                                As an experienced web developer, I'm committed to help businesses and individuals achieve their digital goals. Whether you're a marketing professional, a small business owner, or a fellow developer, I have the expertise and knowledge to help take your digital presence to the next level.
                            </p>
                        </div>

                        {/* Quick Skills/Focus Area */}
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-[#149988]/30 transition-all">
                                <h4 className="text-[#149988] font-black text-xs uppercase tracking-widest mb-2">Strategy</h4>
                                <p className="text-slate-800 dark:text-slate-200 font-bold">Critical Thinking & Research</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-[#149988]/30 transition-all">
                                <h4 className="text-[#149988] font-black text-xs uppercase tracking-widest mb-2">Execution</h4>
                                <p className="text-slate-800 dark:text-slate-200 font-bold">Modern Web Architecture</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;