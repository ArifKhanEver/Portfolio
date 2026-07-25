"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const trailsRef = useRef([]);
  const pathname = usePathname();

  const numDots = 8;

  useEffect(() => {
    if (!mainCursor.current) return;

    // Set initial position centers
    gsap.set(mainCursor.current, { xPercent: -50, yPercent: -50 });
    
    // Set initial scales and opacities for the trails
    trailsRef.current.forEach((trail, index) => {
      if (trail) {
        gsap.set(trail, { 
          xPercent: -50, 
          yPercent: -50,
          scale: 1 - index * 0.1,
          opacity: Math.max(0.6 - index * 0.07, 0.1)
        });
      }
    });

    const xTo = gsap.quickTo(mainCursor.current, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(mainCursor.current, "y", { duration: 0.1, ease: "power3.out" });

    // Create quick setters with incremental durations for the trailing effect
    const trailXTo = trailsRef.current.map((trail, index) => 
      gsap.quickTo(trail, "x", { duration: 0.15 + index * 0.08, ease: "power3.out" })
    );
    const trailYTo = trailsRef.current.map((trail, index) => 
      gsap.quickTo(trail, "y", { duration: 0.15 + index * 0.08, ease: "power3.out" })
    );

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      trailXTo.forEach((to) => to(e.clientX));
      trailYTo.forEach((to) => to(e.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!mainCursor.current) return;

    // Give a slight delay to allow React to render any new DOM elements completely
    const timeout = setTimeout(() => {
      const interactables = document.querySelectorAll("a, button, .magnetic-target");
      
      const handleMouseEnter = () => {
        gsap.to(mainCursor.current, {
          scale: 2,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (e) => {
        const el = e.currentTarget;
        gsap.to(mainCursor.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });
      };

      const handleMagneticMove = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - elCenterX;
        const distanceY = e.clientY - elCenterY;

        gsap.to(el, {
          x: distanceX * 0.3,
          y: distanceY * 0.3,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mousemove", handleMagneticMove);
      });

      // Cleanup function to remove event listeners
      window.__cleanupMagnetic = () => {
        interactables.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
          el.removeEventListener("mousemove", handleMagneticMove);
        });
      };
    }, 100); // 100ms delay

    return () => {
      clearTimeout(timeout);
      if (window.__cleanupMagnetic) {
        window.__cleanupMagnetic();
      }
    };
  }, [pathname]);

  return (
    <div className="hidden lg:block">
      {/* Trail Dots */}
      {[...Array(numDots)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[99998] mix-blend-difference"
        />
      ))}

      {/* Main Cursor */}
      <div
        ref={mainCursor}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[99999] mix-blend-difference"
      />
    </div>
  );
};

export default CustomCursor;
