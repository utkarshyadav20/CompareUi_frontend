import React from "react";
import { cn } from "../ui/utils";

interface ImageGridPanelProps {
    title?: string;
    headerActions?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export function ImageGridPanel({
    title,
    headerActions,
    children,
    className,
}: ImageGridPanelProps) {
    return (
        <div className={cn("flex flex-col gap-5 h-full", className)}>
            {/* Header */}
            {(title || headerActions) && (
                <div className="flex items-center justify-between w-full shrink-0">
                    {title && <h3 className="text-black dark:text-white text-[20px]">{title}</h3>}
                    <div className="flex items-center gap-0">{headerActions}</div>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
                {children}
            </div>
        </div>
    );
}

interface ImageGridProps {
    children: React.ReactNode;
    className?: string;
}

export function ImageGrid({ children, className }: ImageGridProps) {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-custom">
            <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", className) } style={{ padding: "0px 16px 0px 16px" }}>
                {children}
            </div>
        </div>
    );
}
