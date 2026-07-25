"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const canvasRef = useRef(null);
  const pathname = usePathname();

  // Primary Canvas & Mouse Tracking setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mainCursor.current) return;
    const ctx = canvas.getContext("2d");

    // Initialize the main DOM cursor center offset
    gsap.set(mainCursor.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(mainCursor.current, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(mainCursor.current, "y", { duration: 0.1, ease: "power3.out" });

    // Handle Window Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);

    // Initial mouse coordinates
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xTo(mouse.x);
      yTo(mouse.y);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Physics Setup: Perfect Lerp Hair Strands
    const NUM_STRANDS = 4;
    const POINTS_PER_STRAND = 40; 
    
    const LERP_FACTORS = [0.2, 0.25, 0.3, 0.35];
    
    let strands = [];

    for (let i = 0; i < NUM_STRANDS; i++) {
      let points = [];
      for (let j = 0; j < POINTS_PER_STRAND; j++) {
        points.push({ x: mouse.x, y: mouse.y });
      }
      strands.push({ 
        points, 
        lerpFactor: LERP_FACTORS[i]
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(128, 128, 128, 0.3)"; 
      ctx.lineWidth = 1.5;

      strands.forEach((strand) => {
        // The head of the strand instantly locks to mouse
        strand.points[0].x = mouse.x;
        strand.points[0].y = mouse.y;

        ctx.beginPath();
        ctx.moveTo(strand.points[0].x, strand.points[0].y);

        // Calculate trailing lerp physics
        for (let j = 1; j < POINTS_PER_STRAND; j++) {
          const pt = strand.points[j];
          const prevPt = strand.points[j - 1];

          pt.x += (prevPt.x - pt.x) * strand.lerpFactor;
          pt.y += (prevPt.y - pt.y) * strand.lerpFactor;

          ctx.lineTo(pt.x, pt.y);
        }
        
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup phase
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Magnetic Hover & Cursor Scale Logic
  useEffect(() => {
    if (!mainCursor.current) return;

    // Slight delay so React finishes rendering the tree
    const timeout = setTimeout(() => {
      const interactables = document.querySelectorAll("a, button, .magnetic-target");
      
      const handleMouseEnter = () => {
        // Scale main cursor up on hover
        gsap.to(mainCursor.current, {
          scale: 2.5,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (e) => {
        const el = e.currentTarget;
        // Revert cursor scale
        gsap.to(mainCursor.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        // Snap element back to origin
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

        // Apply magnetic pull to the element
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
      if (window.__cleanupMagnetic) {
        window.__cleanupMagnetic();
      }
    };
  }, [pathname]);

  return (
    <div className="hidden lg:block">
      {/* Canvas for the long flowing hair trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998]"
      />
      {/* Primary Invert Spotlight Cursor */}
      <div
        ref={mainCursor}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[99999] mix-blend-difference"
      />
    </div>
  );
};

export default CustomCursor;
