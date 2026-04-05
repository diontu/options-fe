import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "range-section", label: "Range by Time Period" },
  { id: "theta-section", label: "Theta" },
  { id: "delta-section", label: "Delta" },
  { id: "iv-section", label: "Implied Volatility" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function TableOfContents() {
  return (
    <nav className="rounded-lg border bg-card px-2 py-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground px-1 mb-1">
        On this page
      </p>
      <ul>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollTo(id)}
              className={cn(
                "w-full text-left text-[11px] px-1.5 py-1 rounded transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
