import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/logo.png";

interface PreloaderProps {
  onComplete?: () => void;
  isLoading?: boolean;
  theme?: string;
}

export function Preloader({ onComplete, isLoading = true, theme = "dark" }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const slicesRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // We only call onComplete if isLoading is already false
        // or we can wait here until isLoading is false.
      }
    });

    // Initial animations
    tl.fromTo(logoRef.current, 
      { scale: 0.9, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    )
    .fromTo(textRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    // Subtle breathing/pulse animation while loading
    gsap.to(logoRef.current, {
        scale: 1.03,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    return () => {
        tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Shutter/Slice exit animation - extremely smooth stagger
      const slices = slicesRef.current?.children;
      if (slices) {
        tl.to(logoRef.current, { 
            opacity: 0, 
            scale: 0.95, 
            filter: "blur(5px)",
            duration: 0.6, 
            ease: "power2.in" 
          })
          .to(textRef.current, { opacity: 0, y: -5, duration: 0.5, ease: "power2.in" }, "-=0.5")
          .to(slices, {
            scaleY: 0,
            duration: 1,
            stagger: {
              amount: 0.4,
              from: "center"
            },
            ease: "power4.inOut"
          }, "-=0.2")
          .to(containerRef.current, { visibility: "hidden", duration: 0 });
      }
 else {
          tl.to(containerRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" })
            .to(containerRef.current, { visibility: "hidden", duration: 0 });
      }
    }
  }, [isLoading, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Background Slices for the shutter effect */}
      <div ref={slicesRef} className="absolute inset-0 flex">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="flex-1 origin-top h-full"
            style={{ backgroundColor: isDark ? "#111111" : "#ffffff" }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <img
          ref={logoRef}
          src={logo}
          alt="Logo"
          className="h-16 w-auto mb-6 object-contain"
        />
        <div ref={textRef} className="overflow-hidden">
          <p className={`text-sm font-medium tracking-[0.2em] uppercase ${isDark ? "text-white/40" : "text-black/40"}`}>
            Initializing Pixby Experience
          </p>
        </div>
      </div>
    </div>
  );
}
