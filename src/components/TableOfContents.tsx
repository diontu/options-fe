import { cn } from "@/lib/utils";

const DEFAULT_SECTIONS = [
  { id: "range-section", label: "Range by Time Period" },
  { id: "delta-section", label: "Delta" },
  { id: "iv-section", label: "Implied Volatility" },
  { id: "theta-section", label: "Theta" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function TableOfContents({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: { id: string; label: string }[];
}) {
  return (
    <nav className="rounded-lg border bg-card px-2 py-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground px-1 mb-1">
        On this page
      </p>
      <ul>
        {sections.map(({ id, label }) => (
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
