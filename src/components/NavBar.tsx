import { cn } from "@/lib/utils";
import { Clock, Compass, Newspaper, Target, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const MAIN_PAGES = [
  { to: "/", label: "The Greeks", icon: TrendingUp, end: true },
  { to: "/entry", label: "When to Buy", icon: Target, end: false },
];

const RESOURCE_PAGES = [
  { to: "/direction", label: "Direction", icon: Compass, end: false },
  { to: "/pricing", label: "Market Pricing", icon: Newspaper, end: false },
  { to: "/hours", label: "Market Hours", icon: Clock, end: false },
];

function NavItem({
  to,
  label,
  icon: Icon,
  end,
}: { to: string; label: string; icon: React.ElementType; end: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
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
  return (
    <div className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-11 flex items-center gap-1">
        {MAIN_PAGES.map((page) => (
          <NavItem key={page.to} {...page} />
        ))}

        <div className="flex-1" />

        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground px-1">
          Resources
        </span>

        {RESOURCE_PAGES.map((page) => (
          <NavItem key={page.to} {...page} />
        ))}
      </div>
    </div>
  );
}
