"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiMail, FiLinkedin, FiSend, FiMapPin, FiPhone, FiGithub, FiArrowRight } from "react-icons/fi";

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
        { x: 40, opacity: 0 },
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
          { x: -40, opacity: 0 },
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
    <section ref={sectionRef} id="contact" className="w-full py-24 bg-[#02050A] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <h4 className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">Get In Touch</h4>
          <h2 className="contact-title text-5xl md:text-7xl lg:text-[90px] font-semibold text-[#1877F2] mb-6 uppercase tracking-tighter leading-none">
            Let's Connect
          </h2>
          <p className="text-gray-400 font-light mx-auto text-sm">
            Ready to bring your ideas to life?
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Side: Contact Form */}
          <div className="lg:col-span-1">
            <form
              action="https://formsubmit.co/b9593152921aba84ef103074c9ed733d"
              method="POST"
              ref={formRef}
              className="bg-[#050914]/80 border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://arifkhanever.vercel.app/" />

              <h3 className="text-gray-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 text-center md:text-left">Send A Message</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-wider text-white">NAME<span className="text-gray-500">.REQUIRED</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Shafiqul Islam Khan"
                    className="w-full px-4 py-3 bg-[#0a1530]/30 border border-white/5 rounded-lg focus:outline-none focus:border-[#1877F2]/50 transition-all text-white placeholder-gray-600 text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-wider text-white">EMAIL<span className="text-gray-500">.REQUIRED</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="contact@example.com"
                    className="w-full px-4 py-3 bg-[#0a1530]/30 border border-white/5 rounded-lg focus:outline-none focus:border-[#1877F2]/50 transition-all text-white placeholder-gray-600 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-wider text-white">SUBJECT<span className="text-gray-500">.OPTIONAL</span></label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project discussion"
                    className="w-full px-4 py-3 bg-[#0a1530]/30 border border-white/5 rounded-lg focus:outline-none focus:border-[#1877F2]/50 transition-all text-white placeholder-gray-600 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-wider text-white">MESSAGE<span className="text-gray-500">.REQUIRED</span></label>
                  <textarea
                    name="message" 
                    required
                    rows="4"
                    placeholder="How can I help you with your next project?"
                    className="w-full px-4 py-3 bg-[#0a1530]/30 border border-white/5 rounded-lg focus:outline-none focus:border-[#1877F2]/50 transition-all text-white placeholder-gray-600 text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white/10 hover:bg-white/15 border border-white/5 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-xs tracking-wider mt-4"
                >
                  SEND_MESSAGE<FiArrowRight />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-center mt-8 lg:mt-0">
            
            <div className="mb-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Let's Build Something Amazing</h3>
              <p className="text-gray-400 text-sm">I'm always open to new projects and opportunities.</p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div className="contact-item flex items-center gap-6 p-5 md:p-6 bg-[#050914]/80 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-[#1877F2] rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg">
                  <FiMail size={22} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                  <p className="text-gray-400 text-xs md:text-sm">contact.arifkhanever@gmail.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item flex items-center gap-6 p-5 md:p-6 bg-[#050914]/80 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-[#1877F2] rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg">
                  <FiMapPin size={22} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Location</h4>
                  <p className="text-gray-400 text-xs md:text-sm">Available for remote work worldwide</p>
                </div>
              </div>
            </div>

            {/* Follow Me */}
            <div className="contact-item p-5 md:p-6 bg-[#050914]/80 rounded-xl border border-white/5">
              <h4 className="text-white font-bold text-lg mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a href="https://github.com/ArifKhanEver" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-sm font-semibold">
                  <FiGithub size={18} /> GitHub
                </a>
                <a href="https://linkedin.com/in/arifkhanever" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-sm font-semibold">
                  <FiLinkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;