"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../../ui/utils";
import gsap from "gsap";

interface StarsBackgroundProps {
  starColor?: string;
  className?: string;
  starCount?: number;
}

export const StarsBackground = ({
  starColor = "#FFF",
  className,
  starCount = 200,
}: StarsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        initStars();
      }
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.05 + 0.02,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = starColor;

      stars.forEach((star) => {
        // Move with speed + mouse interaction
        star.y -= star.speed + mouseY * 0.2;
        star.x -= mouseX * 0.2;

        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;

        ctx.globalAlpha = star.opacity * (Math.sin(Date.now() * 0.001 * star.speed * 10) * 0.2 + 0.8);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starColor, starCount]);

  return (
    <div ref={containerRef} className={cn("pointer-events-none", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
