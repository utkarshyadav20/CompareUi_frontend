"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../../ui/utils";
import gsap from "gsap";

export interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  followCursor?: boolean | 'x' | 'y';
}

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({
  children,
  followCursor,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> & { followCursor?: boolean | 'x' | 'y' }) => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!followCursor) return;
    
    const x = followCursor === 'y' ? 0 : e.clientX;
    const y = followCursor === 'x' ? 0 : e.clientY;
    
    setCoords({ x, y });

    if (contentRef.current) {
        gsap.to(contentRef.current, {
            x: x + 15,
            y: y + 15,
            duration: 0.1,
            ease: "none",
            overwrite: "auto"
        });
    }
  }, [followCursor]);

  React.useEffect(() => {
    if (followCursor) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [followCursor, handleMouseMove]);

  return (
    <TooltipPrimitive.Root {...props}>
      {children}
    </TooltipPrimitive.Root>
  );
};

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, followCursor, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-black px-3 py-1.5 text-xs text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-white dark:text-black",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
