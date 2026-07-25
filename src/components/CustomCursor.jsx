"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const canvasRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mainCursor.current) return;
    const ctx = canvas.getContext("2d");

    const defaultColor = "#61DAFB"; 
    const hoverColor = "#00ff73"; 

    gsap.set(mainCursor.current, { 
      xPercent: -50, 
      yPercent: -50, 
      rotation: 45,
      borderRadius: "0px", 
      backgroundColor: defaultColor,
      boxShadow: `0 0 3px ${defaultColor}`
    });

    const xTo = gsap.quickTo(mainCursor.current, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(mainCursor.current, "y", { duration: 0.1, ease: "power3.out" });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xTo(mouse.x);
      yTo(mouse.y);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Trail Setup (Dots)
    const TRAIL_LENGTH = 45; 
    const points = [];
    
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      points.push({ x: mouse.x, y: mouse.y });
    }

    const colors = ["#61DAFB", "#68A063", "#F7DF1E", "#61DAFB"]; 

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points[0].x = mouse.x;
      points[0].y = mouse.y;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const pt = points[i];
        const prevPt = points[i - 1];
        pt.x += (prevPt.x - pt.x) * 0.4;
        pt.y += (prevPt.y - pt.y) * 0.4;
      }

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const pt = points[i];
        const radius = Math.max(0.5, 3.5 * (1 - i / TRAIL_LENGTH));
        const colorIndex = Math.floor((i / TRAIL_LENGTH) * (colors.length - 1));

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[colorIndex];
        
        ctx.shadowBlur = 5;
        ctx.shadowColor = colors[colorIndex];
        
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!mainCursor.current) return;

    const defaultColor = "#61DAFB"; 
    const hoverColor = "#61dafb51"; 

    const timeout = setTimeout(() => {
      const interactables = document.querySelectorAll("a, button, .magnetic-target");
      
      const handleMouseEnter = () => {
        // হোভার করলে কালার চেঞ্জ হবে এবং গোল হবে
        gsap.to(mainCursor.current, { 
          scale: 2.2, 
          rotation: 0, 
          borderRadius: "50%", 
          backgroundColor: hoverColor,
          boxShadow: `0 0 15px ${hoverColor}`,
          duration: 0.3, 
          ease: "power2.out" 
        });
      };

      const handleMouseLeave = (e) => {
        const el = e.currentTarget;
        // হোভার থেকে সরলে আবার ডিফল্ট কালার এবং স্মুথ ডায়মন্ড হয়ে যাবে
        gsap.to(mainCursor.current, { 
          scale: 1, 
          rotation: 45, 
          borderRadius: "4px", 
          backgroundColor: defaultColor,
          boxShadow: `0 0 10px ${defaultColor}`,
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
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

      window.__cleanupMagnetic = () => {
        interactables.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
          el.removeEventListener("mousemove", handleMagneticMove);
        });
      };
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (window.__cleanupMagnetic) window.__cleanupMagnetic();
    };
  }, [pathname]);

  return (
    <div className="hidden lg:block">
      {/* Canvas for the colorful dots trail */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[99998]" />
      
      {/* Primary Diamond Cursor */}
      <div
        ref={mainCursor}
        className="fixed top-0 left-0 w-3 h-3 text-[#61dafb41] pointer-events-none z-[99999]"
      />
    </div>
  );
};

export default CustomCursor;