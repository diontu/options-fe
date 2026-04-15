import { cn } from "@/lib/utils";
import { GitBranch } from "lucide-react";

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="p-2 rounded-lg bg-muted shrink-0 text-muted-foreground">
        <GitBranch className="w-4 h-4" />
      </div>
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

function Callout({
  color,
  title,
  children,
}: {
  color: "emerald" | "rose" | "amber" | "blue" | "violet";
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    emerald:
      "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100",
    rose: "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100",
    amber:
      "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 text-amber-900 dark:text-amber-100",
    blue: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100",
    violet:
      "border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30 text-violet-900 dark:text-violet-100",
  };
  return (
    <div className={cn("rounded-lg border p-4 space-y-1.5", styles[color])}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{title}</p>
      <div className="text-xs leading-relaxed">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-border my-2" />;
}

// ─── Pattern card ─────────────────────────────────────────────────────────────

function PatternCard({
  name,
  type,
  when,
  signal,
  entry,
  children,
}: {
  name: string;
  type: "bullish" | "bearish" | "neutral";
  when: string;
  signal: string;
  entry: string;
  children: React.ReactNode; // SVG diagram
}) {
  const typeBadge = {
    bullish: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    bearish: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  }[type];

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-2 border-b">
        <p className="text-sm font-semibold">{name}</p>
        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", typeBadge)}>
          {type === "bullish" ? "Bullish" : type === "bearish" ? "Bearish" : "Either"}
        </span>
      </div>
      {/* Diagram */}
      <div className="bg-slate-50 dark:bg-slate-900/60 px-4 py-3">{children}</div>
      {/* Details */}
      <div className="px-4 py-3 space-y-2 text-xs">
        <p>
          <span className="font-medium text-foreground">When it forms — </span>
          <span className="text-muted-foreground">{when}</span>
        </p>
        <p>
          <span className="font-medium text-foreground">What it signals — </span>
          <span className="text-muted-foreground">{signal}</span>
        </p>
        <p>
          <span className="font-medium text-foreground">Entry trigger — </span>
          <span className="text-muted-foreground">{entry}</span>
        </p>
      </div>
    </div>
  );
}

// ─── SVG diagrams ─────────────────────────────────────────────────────────────

function BullFlagDiagram() {
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {/* Flagpole — strong rally */}
      <polyline
        points="10,95 60,20"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Flag — tight consolidation channel */}
      <polyline
        points="60,20 100,32 140,24 180,36 220,28"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeDasharray="4,2"
        fill="none"
        strokeLinejoin="round"
      />
      <polyline
        points="60,34 100,46 140,38 180,50 220,42"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeDasharray="4,2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Breakout */}
      <polyline
        points="220,28 250,10"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Labels */}
      <text x="25" y="65" fontSize="8" fill="#10b981" textAnchor="middle">
        Pole
      </text>
      <text x="140" y="18" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Flag (consolidation)
      </text>
      <text x="245" y="8" fontSize="8" fill="#10b981" textAnchor="end">
        Breakout
      </text>
      <text x="10" y="105" fontSize="8" fill="#cbd5e1">
        Time →
      </text>
    </svg>
  );
}

function BearFlagDiagram() {
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {/* Flagpole — sharp drop */}
      <polyline
        points="10,15 60,90"
        stroke="#f43f5e"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Flag — tight consolidation */}
      <polyline
        points="60,90 100,78 140,86 180,74 220,82"
        stroke="#f43f5e"
        strokeWidth="1.5"
        strokeDasharray="4,2"
        fill="none"
        strokeLinejoin="round"
      />
      <polyline
        points="60,76 100,64 140,72 180,60 220,68"
        stroke="#f43f5e"
        strokeWidth="1.5"
        strokeDasharray="4,2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Breakdown */}
      <polyline
        points="220,82 250,100"
        stroke="#f43f5e"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Labels */}
      <text x="25" y="42" fontSize="8" fill="#f43f5e" textAnchor="middle">
        Pole
      </text>
      <text x="140" y="60" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Flag (consolidation)
      </text>
      <text x="248" y="108" fontSize="8" fill="#f43f5e">
        Breakdown
      </text>
      <text x="10" y="108" fontSize="8" fill="#cbd5e1">
        Time →
      </text>
    </svg>
  );
}

function AscendingTriangleDiagram() {
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {/* Flat resistance top */}
      <line
        x1="10"
        y1="20"
        x2="230"
        y2="20"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      {/* Rising lows trendline */}
      <line x1="10" y1="95" x2="220" y2="25" stroke="#10b981" strokeWidth="1.5" />
      {/* Price oscillation */}
      <polyline
        points="10,95 50,20 70,65 110,20 135,45 175,20 195,30 225,20"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Breakout arrow */}
      <polyline
        points="225,20 250,5"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Labels */}
      <text x="10" y="14" fontSize="8" fill="#94a3b8">
        Flat resistance
      </text>
      <text x="12" y="88" fontSize="8" fill="#10b981">
        Rising lows
      </text>
      <text x="248" y="4" fontSize="8" fill="#10b981" textAnchor="end">
        Break↑
      </text>
    </svg>
  );
}

function DescendingTriangleDiagram() {
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {/* Flat support bottom */}
      <line
        x1="10"
        y1="90"
        x2="230"
        y2="90"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      {/* Falling highs trendline */}
      <line x1="10" y1="15" x2="220" y2="85" stroke="#f43f5e" strokeWidth="1.5" />
      {/* Price oscillation */}
      <polyline
        points="10,15 50,90 70,45 110,90 135,65 175,90 195,78 225,90"
        stroke="#f43f5e"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Breakdown arrow */}
      <polyline
        points="225,90 250,105"
        stroke="#f43f5e"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Labels */}
      <text x="10" y="105" fontSize="8" fill="#94a3b8">
        Flat support
      </text>
      <text x="12" y="28" fontSize="8" fill="#f43f5e">
        Falling highs
      </text>
      <text x="248" y="108" fontSize="8" fill="#f43f5e" textAnchor="end">
        Break↓
      </text>
    </svg>
  );
}

function HeadAndShouldersDiagram() {
  return (
    <svg viewBox="0 0 280 120" className="w-full" aria-hidden="true">
      {/* Neckline */}
      <line
        x1="40"
        y1="78"
        x2="240"
        y2="78"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      {/* Left shoulder */}
      <polyline
        points="10,100 40,50 70,78"
        stroke="#f43f5e"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Head */}
      <polyline
        points="70,78 110,18 150,78"
        stroke="#f43f5e"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Right shoulder */}
      <polyline
        points="150,78 185,52 215,78"
        stroke="#f43f5e"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Breakdown */}
      <polyline
        points="215,78 245,78 265,105"
        stroke="#f43f5e"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Labels */}
      <text x="40" y="44" fontSize="8" fill="#94a3b8" textAnchor="middle">
        L Shoulder
      </text>
      <text x="110" y="12" fontSize="8" fill="#f43f5e" textAnchor="middle">
        Head
      </text>
      <text x="185" y="46" fontSize="8" fill="#94a3b8" textAnchor="middle">
        R Shoulder
      </text>
      <text x="120" y="73" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Neckline
      </text>
      <text x="268" y="113" fontSize="8" fill="#f43f5e">
        Break↓
      </text>
    </svg>
  );
}

function DoubleTopDiagram() {
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {/* Neckline */}
      <line
        x1="10"
        y1="78"
        x2="240"
        y2="78"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      {/* Rally to first top */}
      <polyline
        points="10,100 60,22 110,78 160,22 210,78"
        stroke="#f43f5e"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Breakdown */}
      <polyline
        points="210,78 250,105"
        stroke="#f43f5e"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Dots at tops */}
      <circle cx="60" cy="22" r="3" fill="#f43f5e" />
      <circle cx="160" cy="22" r="3" fill="#f43f5e" />
      {/* Labels */}
      <text x="60" y="14" fontSize="8" fill="#f43f5e" textAnchor="middle">
        Top 1
      </text>
      <text x="160" y="14" fontSize="8" fill="#f43f5e" textAnchor="middle">
        Top 2
      </text>
      <text x="120" y="73" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Neckline
      </text>
      <text x="252" y="108" fontSize="8" fill="#f43f5e">
        Break↓
      </text>
    </svg>
  );
}

function DoubleBottomDiagram() {
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {/* Neckline */}
      <line
        x1="10"
        y1="32"
        x2="240"
        y2="32"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      {/* Dip to first bottom */}
      <polyline
        points="10,10 60,88 110,32 160,88 210,32"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Breakout */}
      <polyline
        points="210,32 250,5"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Dots at bottoms */}
      <circle cx="60" cy="88" r="3" fill="#10b981" />
      <circle cx="160" cy="88" r="3" fill="#10b981" />
      {/* Labels */}
      <text x="60" y="102" fontSize="8" fill="#10b981" textAnchor="middle">
        Bottom 1
      </text>
      <text x="160" y="102" fontSize="8" fill="#10b981" textAnchor="middle">
        Bottom 2
      </text>
      <text x="120" y="27" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Neckline
      </text>
      <text x="252" y="10" fontSize="8" fill="#10b981">
        Break↑
      </text>
    </svg>
  );
}

function SymmetricalTriangleDiagram() {
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {/* Falling highs */}
      <line
        x1="10"
        y1="12"
        x2="210"
        y2="55"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="4,3"
      />
      {/* Rising lows */}
      <line
        x1="10"
        y1="98"
        x2="210"
        y2="55"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="4,3"
      />
      {/* Price coiling */}
      <polyline
        points="10,12 50,90 90,28 130,78 165,42 195,60"
        stroke="#8b5cf6"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Breakout (bullish example) */}
      <polyline
        points="195,60 220,55 250,35"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Labels */}
      <text x="100" y="8" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Falling highs
      </text>
      <text x="100" y="108" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Rising lows
      </text>
      <text x="255" y="33" fontSize="8" fill="#10b981" textAnchor="end">
        Break either way
      </text>
    </svg>
  );
}

function CupAndHandleDiagram() {
  return (
    <svg viewBox="0 0 280 120" className="w-full" aria-hidden="true">
      {/* Cup — rounded bottom */}
      <path d="M 10,20 Q 110,110 210,20" stroke="#10b981" strokeWidth="2" fill="none" />
      {/* Handle — small pullback */}
      <polyline
        points="210,20 225,38 240,28 255,35 268,22"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Breakout */}
      <polyline
        points="268,22 278,8"
        stroke="#10b981"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Resistance line across cup rim */}
      <line
        x1="10"
        y1="20"
        x2="270"
        y2="20"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="4,3"
      />
      {/* Labels */}
      <text x="110" y="115" fontSize="8" fill="#10b981" textAnchor="middle">
        Cup (rounded base)
      </text>
      <text x="240" y="50" fontSize="8" fill="#94a3b8" textAnchor="middle">
        Handle
      </text>
      <text x="278" y="6" fontSize="8" fill="#10b981" textAnchor="end">
        Break↑
      </text>
      <text x="12" y="15" fontSize="8" fill="#94a3b8">
        Resistance
      </text>
    </svg>
  );
}

function WedgeDiagram({ direction }: { direction: "rising" | "falling" }) {
  const color = direction === "rising" ? "#f43f5e" : "#10b981";
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden="true">
      {direction === "rising" ? (
        <>
          {/* Rising wedge — bearish */}
          <line
            x1="10"
            y1="80"
            x2="210"
            y2="18"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
          <line
            x1="10"
            y1="98"
            x2="210"
            y2="50"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
          <polyline
            points="10,98 50,62 80,72 115,48 148,60 178,40 205,45"
            stroke={color}
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points="205,45 235,90"
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <text x="100" y="12" fontSize="8" fill="#94a3b8" textAnchor="middle">
            Rising wedge
          </text>
          <text x="240" y="95" fontSize="8" fill={color}>
            Break↓
          </text>
        </>
      ) : (
        <>
          {/* Falling wedge — bullish */}
          <line
            x1="10"
            y1="20"
            x2="210"
            y2="62"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
          <line
            x1="10"
            y1="38"
            x2="210"
            y2="92"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
          <polyline
            points="10,20 50,55 80,42 115,68 148,55 178,78 205,68"
            stroke={color}
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points="205,68 235,30"
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <text x="100" y="14" fontSize="8" fill="#94a3b8" textAnchor="middle">
            Falling wedge
          </text>
          <text x="238" y="28" fontSize="8" fill={color}>
            Break↑
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Guide ────────────────────────────────────────────────────────────────────

export function PatternsGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* Intro */}
      <section id="patterns-intro">
        <SectionHeader
          title="How Chart Patterns Form"
          subtitle="Patterns are the visual footprint of supply and demand playing out over time. They don't predict the future — they describe who has been winning and what a shift in control would look like."
        />
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every chart pattern is built from the same raw material: the push and pull between
            buyers and sellers. Continuation patterns form when one side pauses to rest before
            reasserting control. Reversal patterns form when the other side gradually overwhelms an
            exhausted trend. The pattern itself isn't the signal — the breakout with volume is.
          </p>
          <Callout color="amber" title="The most important rule">
            A pattern is only valid when it breaks out. Prices can develop 90% of a perfect head and
            shoulders and then reverse north. Wait for the break and retest before committing —
            don't trade the anticipation of a pattern completing.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* Continuation */}
      <section id="patterns-continuation">
        <SectionHeader
          title="Continuation Patterns"
          subtitle="Form mid-trend during a consolidation or pullback. The dominant trend is pausing, not ending. These are the highest-probability patterns when the broader trend is strong."
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PatternCard
              name="Bull Flag"
              type="bullish"
              when="After a sharp, high-volume rally (the pole). Price consolidates in a tight, slightly downward-sloping channel on declining volume."
              signal="Buyers are pausing, not retreating. The pullback is orderly — sellers can't push price meaningfully lower. Energy is coiling for another leg up."
              entry="Break above the upper channel line on expanding volume. Target: add the pole's length to the breakout point."
            >
              <BullFlagDiagram />
            </PatternCard>

            <PatternCard
              name="Bear Flag"
              type="bearish"
              when="After a sharp, high-volume drop (the pole). Price consolidates in a tight, slightly upward-sloping channel on declining volume."
              signal="Sellers are pausing. The bounce is weak — buyers can't push price meaningfully higher. The path of least resistance remains down."
              entry="Break below the lower channel line on expanding volume. Target: subtract the pole's length from the breakdown point."
            >
              <BearFlagDiagram />
            </PatternCard>

            <PatternCard
              name="Ascending Triangle"
              type="bullish"
              when="During an uptrend or base-building phase. Price repeatedly tests a flat resistance level while making higher lows — buyers are becoming more aggressive."
              signal="Supply at the resistance level is being absorbed with each test. Each higher low shows buyers willing to pay more. Eventual breakout is likely but not guaranteed."
              entry="Break and close above the flat resistance with volume. The flat level often becomes support after the break — a retest there is a second entry opportunity."
            >
              <AscendingTriangleDiagram />
            </PatternCard>

            <PatternCard
              name="Descending Triangle"
              type="bearish"
              when="During a downtrend or distribution phase. Price repeatedly tests a flat support level while making lower highs — sellers are becoming more aggressive."
              signal="Demand at the support level is being worn down with each test. Each lower high shows sellers willing to accept less. A break lower releases the pent-up selling."
              entry="Break and close below flat support on volume. The broken support often becomes resistance on a bounce — a retest there is a short entry opportunity."
            >
              <DescendingTriangleDiagram />
            </PatternCard>

            <PatternCard
              name="Symmetrical Triangle"
              type="neutral"
              when="After a strong move in either direction, or during indecision in a trend. Price coils between a falling upper trendline and a rising lower trendline — compression building."
              signal="Neither buyers nor sellers are in control. Volume typically declines as the pattern tightens. A breakout in either direction signals which side has won. The direction of the preceding trend is often (not always) the direction of the break."
              entry="Break above the upper trendline (bullish) or below the lower trendline (bearish) on volume expansion. False breakouts are common — wait for a candle close beyond the line."
            >
              <SymmetricalTriangleDiagram />
            </PatternCard>

            <PatternCard
              name="Cup and Handle"
              type="bullish"
              when="After a prior uptrend, price rounds out a U-shaped bottom (the cup) over weeks or months, then forms a short shallow pullback near the prior high (the handle) before breaking out."
              signal="The cup shows a complete cycle of distribution and re-accumulation. The handle is a final shakeout of weak holders before the stock breaks to new highs. Volume should dry up during the handle and surge on the breakout."
              entry="Break above the cup's rim (prior resistance) with strong volume. The deeper and more rounded the cup, the more powerful the eventual breakout tends to be."
            >
              <CupAndHandleDiagram />
            </PatternCard>
          </div>
        </div>
      </section>

      <Divider />

      {/* Reversal */}
      <section id="patterns-reversal">
        <SectionHeader
          title="Reversal Patterns"
          subtitle="Form at the end of a trend when momentum is failing and the opposing side is taking control. Require more confirmation than continuation patterns — don't jump early."
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PatternCard
              name="Head and Shoulders"
              type="bearish"
              when="At the top of an uptrend. Three peaks — left shoulder, a higher head, right shoulder at roughly the same level as the left. Volume typically declines on the head and is low on the right shoulder."
              signal="The stock made a new high (head) but couldn't sustain it. The right shoulder's failure to reach the head's level shows weakening momentum. A neckline break confirms the trend change."
              entry="Break and close below the neckline on strong volume. Measure the target by subtracting the head-to-neckline distance from the breakout level. A retest of the neckline from below is a high-probability short entry."
            >
              <HeadAndShouldersDiagram />
            </PatternCard>

            <PatternCard
              name="Double Top"
              type="bearish"
              when="After a sustained uptrend. Price hits a high, pulls back to a support level (neckline), rallies to approximately the same high, then fails again. The two tops are within ~3% of each other."
              signal="Buyers tried twice to push price above the level and were rejected both times. Two rejections at the same price is stronger evidence of supply than one. The second top often forms with lower volume — a divergence warning."
              entry="Break below the neckline (the low between the two tops) on volume. Measured target: subtract the distance from neckline to tops from the breakdown point."
            >
              <DoubleTopDiagram />
            </PatternCard>

            <PatternCard
              name="Double Bottom"
              type="bullish"
              when="After a sustained downtrend. Price hits a low, bounces to a resistance level (neckline), drops back to approximately the same low, then holds and reverses. The two bottoms are within ~3% of each other."
              signal="Sellers tried twice to push price below the level and were absorbed both times. The second bottom often forms with a positive RSI divergence — price makes the same low but momentum is improving."
              entry="Break above the neckline (the high between the two bottoms) on volume. Measured target: add the distance from neckline to bottoms to the breakout point."
            >
              <DoubleBottomDiagram />
            </PatternCard>

            <PatternCard
              name="Rising Wedge"
              type="bearish"
              when="After an uptrend or within a bear market bounce. Price makes higher highs and higher lows but both trendlines slope upward and converge — the highs are expanding slower than the lows. Often forms on weakening volume."
              signal="Despite appearances of an uptrend, buyers are losing momentum. Each new high takes more effort and gains less ground. When the lower trendline breaks, selling accelerates as trapped longs exit."
              entry="Break below the lower trendline with expanding volume. This pattern often resolves sharply — don't expect a slow grind. A failed bounce to the broken lower trendline is a secondary entry."
            >
              <WedgeDiagram direction="rising" />
            </PatternCard>

            <PatternCard
              name="Falling Wedge"
              type="bullish"
              when="After a downtrend or within a bull market pullback. Price makes lower highs and lower lows but both trendlines slope downward and converge — the lows are compressing faster than the highs. Volume typically declines."
              signal="Despite the downward appearance, sellers are losing control. The declining volume and converging lows suggest selling pressure is exhausting. A break above the upper trendline often comes with a volume surge."
              entry="Break above the upper trendline on volume. A retest of the broken upper trendline from above is the ideal entry. Falling wedges often produce strong, fast moves when they break out."
            >
              <WedgeDiagram direction="falling" />
            </PatternCard>
          </div>
        </div>
      </section>

      <Divider />

      {/* Options context */}
      <section id="patterns-options">
        <SectionHeader
          title="Using Patterns for Options Timing"
          subtitle="Patterns give you a framework for entry, target, and invalidation — all three of which are required before buying an option."
        />
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Callout color="emerald" title="Entry — wait for the break">
              Never buy options inside the pattern. The pattern is still forming and the direction
              isn't confirmed. Buy on the breakout candle close, or on the first pullback to the
              broken level. This keeps premium lower and probability higher.
            </Callout>
            <Callout color="blue" title="Target — use the measured move">
              Every pattern has a measured move target (pole length, head-to-neckline distance,
              etc.). Use this to select your strike and expiration — make sure the target is
              reachable within your timeframe and that the premium paid makes the trade worthwhile.
            </Callout>
            <Callout color="amber" title="Invalidation — know your exit before entry">
              A bull flag that breaks below the pole's top is invalidated. A double bottom that
              takes out the second low is invalidated. Define this level before you enter and treat
              a close beyond it as your stop — don't hold options through pattern failures.
            </Callout>
            <Callout color="violet" title="Expiration — give the pattern time">
              Patterns on the daily chart play out over days to weeks. Buy at least 30–45 days of
              expiration, ideally more. A pattern that is "almost there" can consolidate for another
              two weeks before breaking — don't let theta kill your trade before the pattern
              resolves.
            </Callout>
          </div>
        </div>
      </section>
    </div>
  );
}
