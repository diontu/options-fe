import * as React from "react";
import { createPortal } from "react-dom";
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

interface Pos {
  top: number;
  left: number;
  placement: "top" | "bottom";
}

export function Tooltip({ content, children, className, width = "w-64", side = "top" }: TooltipProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [pos, setPos] = React.useState<Pos>({ top: 0, left: 0, placement: side });

  function calcPos(placement: "top" | "bottom") {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;
    if (!trigger) return;

    const tr = trigger.getBoundingClientRect();
    const ph = popover?.offsetHeight ?? 0;
    const pw = popover?.offsetWidth ?? 0;

    const left = Math.min(
      Math.max(tr.left + tr.width / 2 - pw / 2, 8),
      window.innerWidth - pw - 8
    );

    const top =
      placement === "top"
        ? tr.top + window.scrollY - ph - 8
        : tr.bottom + window.scrollY + 8;

    setPos({ top, left, placement });
  }

  function show() {
    setVisible(true);
    // defer so popoverRef has rendered and has a size
    requestAnimationFrame(() => calcPos(side));
  }

  function hide() {
    setVisible(false);
  }

  const popover = visible
    ? createPortal(
        <div
          ref={popoverRef}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={hide}
          style={{ position: "absolute", top: pos.top, left: pos.left }}
          className={cn(
            "z-[9999]",
            width,
            "rounded-md border bg-popover px-3 py-2.5 text-xs text-popover-foreground shadow-md",
            "transition-opacity duration-150",
            visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {content}
          {pos.placement === "top" ? (
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
          ) : (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-border" />
          )}
        </div>,
        document.body
      )
    : null;

  return (
    <div
      ref={triggerRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {popover}
    </div>
  );
}
