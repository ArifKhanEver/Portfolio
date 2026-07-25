"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiMail, FiLinkedin, FiSend, FiMapPin } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Heading Animation
      gsap.fromTo(".contact-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Info Cards Entrance
      gsap.fromTo(".contact-item",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
          },
        }
      );

      // 3. Form Entrance
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid",
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="w-full py-24 bg-theme-black relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="contact-title text-5xl lg:text-[60px] font-black text-white mb-6 uppercase tracking-tighter">
            Let’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Connect</span>
          </h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-lg">
            Open for collaborations, innovative projects, or just a friendly tech talk.
            I'm currently seeking opportunities to architect scalable applications.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="contact-item p-8 bg-white/5 rounded-[2rem] border border-white/10 group hover:border-primary/50 transition-all backdrop-blur-md">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary shadow-sm mb-4 border border-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                <FiMail size={24} />
              </div>
              <h4 className="text-white font-bold mb-1">Email Me</h4>
              <p className="text-gray-400 text-sm font-light">contact.arifkhanever@gmail.com</p>
            </div>

            <div className="contact-item p-8 bg-white/5 rounded-[2rem] border border-white/10 group hover:border-primary/50 transition-all backdrop-blur-md">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary shadow-sm mb-4 border border-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                <FiLinkedin size={24} />
              </div>
              <h4 className="text-white font-bold mb-1">LinkedIn</h4>
              <p className="text-gray-400 text-sm font-light">@arifkhanever</p>
            </div>

            <div className="contact-item p-8 bg-white/5 rounded-[2rem] border border-white/10 group hover:border-primary/50 transition-all backdrop-blur-md">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary shadow-sm mb-4 border border-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                <FiMapPin size={24} />
              </div>
              <h4 className="text-white font-bold mb-1">Location</h4>
              <p className="text-gray-400 text-sm font-light">Available for remote work worldwide</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <form
            action="https://formsubmit.co/b9593152921aba84ef103074c9ed733d"
            method="POST"
            ref={formRef}
            className="lg:col-span-7 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://arifkhanever.vercel.app/" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Shafiqul Islam Khan"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary transition-all text-white placeholder-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="contact@example.com"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary transition-all text-white placeholder-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Message</label>
              <textarea
                name="message" 
                required
                rows="5"
                placeholder="How can I help you with your next project?"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary transition-all text-white placeholder-gray-600 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-primary to-accent text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(6,143,255,0.4)] active:scale-[0.98]"
            >
              Send Message <FiSend />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;