"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../../ui/utils";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  originalOpacity: number;
  id: number;
}

interface GravityStarsBackgroundProps extends React.ComponentProps<"div"> {
  starsCount?: number;
  starsSize?: number;
  starsOpacity?: number;
  glowIntensity?: number;
  glowAnimation?: 'instant' | 'ease' | 'spring';
  movementSpeed?: number;
  mouseInfluence?: number;
  mouseGravity?: 'attract' | 'repel';
  gravityStrength?: number;
  starsInteraction?: boolean;
  starsInteractionType?: 'bounce' | 'merge';
  starColor?: string;
}

export const GravityStarsBackground = ({
  starsCount = 50,
  starsSize = 1.3,
  starsOpacity = 0.45,
  glowIntensity = 15,
  glowAnimation = 'ease',
  movementSpeed = 0.2,
  mouseInfluence = 100,
  mouseGravity = 'attract',
  gravityStrength = 75,
  starsInteraction = true,
  starsInteractionType = 'bounce',
  starColor = "#cfcfcf",
  className,
  ...props
}: GravityStarsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        initStars();
      }
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starsCount; i++) {
        stars.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * movementSpeed,
          vy: (Math.random() - 0.5) * movementSpeed,
          size: Math.random() * starsSize + 1,
          opacity: starsOpacity,
          originalOpacity: starsOpacity,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Movement
        s.x += s.vx;
        s.y += s.vy;

        // Mouse Gravity
        const dx = mouseRef.current.x - s.x;
        const dy = mouseRef.current.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseInfluence) {
          const force = (mouseInfluence - dist) / mouseInfluence;
          const strength = (gravityStrength / 1000) * force;
          
          if (mouseGravity === 'attract') {
            s.vx += (dx / dist) * strength;
            s.vy += (dy / dist) * strength;
          } else {
            s.vx -= (dx / dist) * strength;
            s.vy -= (dy / dist) * strength;
          }
        }

        // Star-to-Star Interaction
        if (starsInteraction) {
          for (let j = i + 1; j < stars.length; j++) {
            const s2 = stars[j];
            const dx2 = s2.x - s.x;
            const dy2 = s2.y - s.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            const minDist = s.size + s2.size + 2;

            if (dist2 < minDist) {
              if (starsInteractionType === 'bounce') {
                // Elastic collision approximation
                const tempVx = s.vx;
                const tempVy = s.vy;
                s.vx = s2.vx;
                s.vy = s2.vy;
                s2.vx = tempVx;
                s2.vy = tempVy;
              }
            }
          }
        }

        // Bounds
        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

        // Friction to prevent infinite speed buildup
        s.vx *= 0.99;
        s.vy *= 0.99;

        // Glow Animation Pulse
        if (glowAnimation === 'ease') {
            s.opacity = s.originalOpacity * (0.8 + Math.sin(Date.now() * 0.002 + s.id) * 0.2);
        }

        // Drawing
        ctx.save();
        ctx.shadowBlur = glowIntensity;
        ctx.shadowColor = starColor; // Assume hex or rgba
        ctx.fillStyle = starColor;
        ctx.globalAlpha = s.opacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
  }, [starsCount, starsSize, starsOpacity, glowIntensity, glowAnimation, movementSpeed, mouseInfluence, mouseGravity, gravityStrength, starsInteraction, starsInteractionType]);

  return (
    <div ref={containerRef} className={cn("pointer-events-none", className)} {...props}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
