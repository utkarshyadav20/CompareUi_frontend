"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "./utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// Context to manage the sliding highlight
const DropdownHoverContext = React.createContext<{
  onItemEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMenuLeave: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  highlightRef: React.RefObject<HTMLDivElement | null>;
} | null>(null);

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const highlightRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -10,
        duration: 0.2,
        ease: "back.out(1.7)"
      });
    }
  }, []);

  const onItemEnter = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (highlightRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      gsap.to(highlightRef.current, {
        opacity: 1,
        x: targetRect.left - containerRect.left,
        y: targetRect.top - containerRect.top,
        height: targetRect.height,
        width: targetRect.width,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, []);

  const onMenuLeave = React.useCallback(() => {
    if (highlightRef.current) {
      gsap.to(highlightRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, []);

  return (
    <DropdownHoverContext.Provider value={{ onItemEnter, onMenuLeave, containerRef, highlightRef }}>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={(node) => {
            // @ts-ignore
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as any).current = node;
          }}
          sideOffset={sideOffset}
          onMouseLeave={onMenuLeave}
          className={cn(
            "bg-white dark:bg-[#1a1a1a] text-black dark:text-white z-50 min-w-[12rem] overflow-hidden rounded-lg border border-black/10 dark:border-white/10 p-1.5 shadow-xl relative",
            className
          )}
          {...props}
        >
          <div
            ref={highlightRef}
            className="absolute top-0 left-0 bg-black/5 dark:bg-white/5 rounded-md pointer-events-none opacity-0 z-0"
            style={{ height: 0, width: 0 }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownHoverContext.Provider>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  }
>(({ className, inset, variant = "default", onMouseEnter, ...props }, ref) => {
  const context = React.useContext(DropdownHoverContext);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    context?.onItemEnter(e);
    onMouseEnter?.(e);
  };

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        variant === "destructive" && "text-red-500 focus:text-red-500",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-3 py-1.5 text-xs font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-black/10 dark:bg-white/10", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
};
