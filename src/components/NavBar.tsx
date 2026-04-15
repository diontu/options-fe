import { cn } from "@/lib/utils";
import {
  CandlestickChart,
  Clock,
  Compass,
  GitBranch,
  Menu,
  MoreVertical,
  Newspaper,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const MAIN_PAGES = [
  { to: "/", label: "The Greeks", icon: TrendingUp, end: true },
  { to: "/entry", label: "When to Buy", icon: Target, end: false },
];

const RESOURCE_PAGES = [
  { to: "/direction", label: "Direction", icon: Compass },
  { to: "/pricing", label: "Market Pricing", icon: Newspaper },
  { to: "/hours", label: "Market Hours", icon: Clock },
];

const MORE_PAGES = [
  { to: "/candles", label: "Candles & Wicks", icon: CandlestickChart },
  { to: "/patterns", label: "Chart Patterns", icon: GitBranch },
];

const ALL_PAGES = [
  { group: null, pages: MAIN_PAGES },
  { group: "Resources", pages: RESOURCE_PAGES },
  { group: "More", pages: MORE_PAGES },
];

function NavItem({
  to,
  label,
  icon: Icon,
  end,
  onClick,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  end: boolean;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )
      }
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </NavLink>
  );
}

export function NavBar() {
  const [kebabOpen, setKebabOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const kebabRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Close mobile menu on navigation
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intentional trigger
  useEffect(() => {
    setMobileOpen(false);
    setKebabOpen(false);
  }, [pathname]);

  // Close kebab on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setKebabOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      {/* ── Desktop bar ── */}
      <div className="max-w-6xl mx-auto px-4 h-11 hidden md:flex items-center gap-1">
        {MAIN_PAGES.map((page) => (
          <NavItem key={page.to} {...page} />
        ))}

        <div className="flex-1" />

        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground px-1">
          Resources
        </span>

        {RESOURCE_PAGES.map((page) => (
          <NavItem key={page.to} {...page} end={false} />
        ))}

        {/* Kebab */}
        <div className="relative ml-1" ref={kebabRef}>
          <button
            type="button"
            onClick={() => setKebabOpen((v) => !v)}
            className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors",
              kebabOpen
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            aria-label="More pages"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {kebabOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 rounded-lg border bg-background shadow-lg z-50 py-1">
              {MORE_PAGES.map(({ to, label, icon: Icon }) => (
                <button
                  key={to}
                  type="button"
                  onClick={() => {
                    setKebabOpen(false);
                    navigate(to);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile bar ── */}
      <div className="md:hidden px-4 h-11 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">Options Guide</span>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-3 space-y-4">
          {ALL_PAGES.map(({ group, pages }) => (
            <div key={group ?? "main"}>
              {group && (
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 px-1">
                  {group}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {pages.map((page) => (
                  <NavItem
                    key={page.to}
                    {...page}
                    end={"end" in page ? page.end : false}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
