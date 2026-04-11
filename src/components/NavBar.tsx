import { cn } from "@/lib/utils";
import { Compass, Target, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const PAGES = [
  { to: "/", label: "Visualizer", icon: TrendingUp, end: true },
  { to: "/direction", label: "Direction", icon: Compass, end: false },
  { to: "/entry", label: "When to Buy", icon: Target, end: false },
];

export function NavBar() {
  return (
    <div className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-11 flex items-center gap-1">
        {PAGES.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
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
        ))}
      </div>
    </div>
  );
}
