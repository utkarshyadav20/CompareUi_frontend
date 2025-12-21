import React from "react";
import { cn } from "../ui/utils";

interface ImageCardProps {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    isSelected?: boolean;
    warning?: string;
    onSelect?: (id: string) => void;
    actions?: React.ReactNode;
    className?: string;
}

export function ImageCard({
    id,
    name,
    url,
    width,
    height,
    isSelected,
    warning,
    onSelect,
    actions,
    className,
}: ImageCardProps) {
    return (
        <div
            onClick={() => onSelect?.(id)}
            className={cn(
                "bg-white/5 border rounded-lg p-1.5 cursor-pointer hover:bg-white/10 transition-colors relative group",
                isSelected
                    ? "border-white/50"
                    : warning
                        ? "border-red-500"
                        : "border-white/20",
                className
            )}
        >
            <div className="flex flex-col gap-0.5">
                {/* Image Info */}
                <div className="flex items-center justify-between text-xs px-1">
                    <p
                        className="text-black dark:text-white overflow-ellipsis overflow-hidden max-w-[190px] font-bold"
                        title={name}
                    >
                        {name}
                    </p>
                    <div className="flex items-center gap-1">
                        <p className="text-black/20 dark:text-white/20 group-hover:hidden">
                            {width}x{height}
                        </p>
                        {/* Actions (Menu/Delete button) */}
                        {actions && (
                            <div className="relative hidden group-hover:block" onClick={(e) => e.stopPropagation()}>
                                {actions}
                            </div>
                        )}
                    </div>
                </div>

                {/* Image Display */}
                <div className="rounded overflow-hidden relative aspect-video bg-black/20">
                    <img
                        src={url}
                        alt={name}
                        className="w-full h-full object-contain"
                    />

                    {/* Warning Overlay */}
                    {warning && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <p className="text-red-500 text-sm font-semibold text-center px-4">
                                {warning}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
