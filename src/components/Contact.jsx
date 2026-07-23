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

      // 2. Info Cards Entrance (Left Side)
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

      // 3. Form Entrance (Right Side)
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

    // Refresh for accurate calculations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="w-full py-24 bg-gray-100 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-50/40 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#E6F4F1] text-[#149988] px-4 py-2 rounded-full text-xs font-bold mb-3">
            <span className="w-2 h-2 bg-[#149988] rounded-full animate-pulse"></span>
            Contact Me
          </div>
          <h2 className="contact-title text-4xl lg:text-[50px] font-black text-slate-900 dark:text-white mb-6 opacity-1">
            Let’s <span className="text-[#149988]">Connect</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
            Open for collaborations, innovative projects, or just a friendly tech talk.
            I'm currently seeking opportunities to architect scalable MERN applications.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="contact-item p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 group hover:border-[#149988]/30 dark:hover:border-[#149988]/30 transition-all opacity-1">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-[#149988] shadow-sm mb-4">
                <FiMail size={24} />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1">Email Me</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">contact.arifkhanever@gmail.com</p>
            </div>

            <div className="contact-item p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 group hover:border-[#149988]/30 dark:hover:border-[#149988]/30 transition-all opacity-1">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-[#149988] shadow-sm mb-4">
                <FiLinkedin size={24} />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1">LinkedIn</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">@arifkhanever</p>
            </div>

            <div className="contact-item p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 group hover:border-[#149988]/30 dark:hover:border-[#149988]/30 transition-all opacity-1">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-[#149988] shadow-sm mb-4">
                <FiMapPin size={24} />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1">Location</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Available for remote work worldwide</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <form
            action="https://formsubmit.co/b9593152921aba84ef103074c9ed733d"
            method="POST"
            ref={formRef}
            className="lg:col-span-7 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-2xl shadow-slate-100/50 dark:shadow-none opacity-1"
          >
            {/* Form Configuration */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://arifkhanever.vercel.app/" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Shafiqul Islam Khan"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#149988] focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-800 dark:text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="contact@example.com"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#149988] focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
              <textarea
                name="message" 
                required
                rows="5"
                placeholder="How can I help you with your next MERN project?"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-[#149988] focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-800 dark:text-slate-200 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[#149988] text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#0f7d6f] transition-all shadow-xl shadow-teal-100 active:scale-[0.98]"
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