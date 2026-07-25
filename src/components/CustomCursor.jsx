"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position center offset and rotation (diamond shape)
    gsap.set(cursor, { xPercent: -50, yPercent: -50, rotation: 45 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Give a slight delay to allow React to render any new DOM elements completely
    const timeout = setTimeout(() => {
      const interactables = document.querySelectorAll("a, button, .magnetic-target");
      
      const handleMouseEnter = () => {
        gsap.to(cursor, {
          scale: 2.5,
          borderRadius: "50%",
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (e) => {
        const el = e.currentTarget;
        gsap.to(cursor, {
          scale: 1,
          borderRadius: "0%",
          rotation: 45,
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
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white pointer-events-none z-[99999] mix-blend-difference hidden lg:block"
    />
  );
};

export default CustomCursor;
