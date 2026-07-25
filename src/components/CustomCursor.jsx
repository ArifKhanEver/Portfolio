"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize(); // Initial sizing
    window.addEventListener("resize", handleResize);

    // Initial mouse coordinates (center screen)
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Physics Setup: 'Handful of Hair' Strands
    const NUM_STRANDS = 4;
    const POINTS_PER_STRAND = 25;
    // Different stiffness values for organic separation when moving fast
    const STIFFNESS = [0.35, 0.45, 0.55, 0.65]; 
    
    // Array to hold state for each strand
    let strands = [];

    for (let i = 0; i < NUM_STRANDS; i++) {
      let points = [];
      for (let j = 0; j < POINTS_PER_STRAND; j++) {
        points.push({ x: mouse.x, y: mouse.y });
      }
      strands.push({ points, stiffness: STIFFNESS[i] });
    }

    let animationFrameId;

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Premium aesthetics
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      strands.forEach((strand) => {
        // The head of the strand exactly follows the mouse
        strand.points[0].x = mouse.x;
        strand.points[0].y = mouse.y;

        ctx.beginPath();
        ctx.moveTo(strand.points[0].x, strand.points[0].y);

        // Calculate trailing spring physics for the rest of the strand
        for (let j = 1; j < POINTS_PER_STRAND; j++) {
          const pt = strand.points[j];
          const prevPt = strand.points[j - 1];

          // Move current point towards the previous point based on stiffness
          pt.x += (prevPt.x - pt.x) * strand.stiffness;
          pt.y += (prevPt.y - pt.y) * strand.stiffness;

          // Smooth bezier curve through the points would be nice, but simple lines work great with many points
          ctx.lineTo(pt.x, pt.y);
        }
        
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]); 

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] hidden lg:block mix-blend-difference"
    />
  );
};

export default CustomCursor;
