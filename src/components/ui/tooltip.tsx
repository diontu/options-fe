import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Width class for the popover, defaults to w-64 */
  width?: string;
  /** Which side to open toward. Defaults to "top" */
  side?: "top" | "bottom";
}

export function Tooltip({ content, children, className, width = "w-64", side = "top" }: TooltipProps) {
  return (
    <div className={cn("relative inline-flex group", className)}>
      {children}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 z-50",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          width,
          "rounded-md border bg-popover px-3 py-2.5 text-xs text-popover-foreground shadow-md",
          // stay visible when hovering the popover itself so links are clickable
          "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150"
        )}
      >
        {content}
        {side === "top" ? (
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
        ) : (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-border" />
        )}
      </div>
    </div>
  );
}
