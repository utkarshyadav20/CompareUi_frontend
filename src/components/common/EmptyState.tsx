import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../ui/utils";

interface EmptyStateProps {
    icon: LucideIcon;
    title?: string;
    description: React.ReactNode;
    action?: React.ReactNode;
    fileInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    className?: string;
    variant?: "default" | "dashed";
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    fileInputProps,
    className,
    variant = "default",
}: EmptyStateProps) {
    if (variant === "dashed") {
        return (
            <div
                className={cn(
                    "relative border border-dashed border-black/20 dark:border-white/20 rounded-lg flex-1 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
                    className
                )}
            >
                <div className="flex flex-col items-center justify-center h-full gap-2.5 p-2.5">
                    <Icon className="w-5 h-5 text-black dark:text-white" />
                    <div className="font-mono text-[14px] text-black dark:text-white text-center">
                        {description}
                    </div>
                </div>
                {fileInputProps && (
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        {...fileInputProps}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col items-center justify-center gap-8 h-full", className)}>
            <div className="text-center">
                {title && (
                    <p className="text-black dark:text-white text-lg mb-3 font-mono">
                        {title}
                    </p>
                )}
                <div className="text-[18px] font-mono text-black/50 dark:text-white/50 text-center">
                    {description}
                </div>
            </div>
            {action}
        </div>
    );
}
