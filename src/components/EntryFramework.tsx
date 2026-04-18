import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

type Signal = "green" | "yellow" | "red";

interface CheckItemProps {
  signal: Signal;
  label: string;
  description: string;
  green: string;
  yellow: string;
  red: string;
  tip?: string;
}

function SignalDot({ signal }: { signal: Signal }) {
  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-full shrink-0 mt-1.5",
        signal === "green" && "bg-emerald-500",
        signal === "yellow" && "bg-amber-400",
        signal === "red" && "bg-rose-500"
      )}
    />
  );
}

function SignalIcon({ signal }: { signal: Signal }) {
  if (signal === "green") return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
  if (signal === "yellow") return <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />;
  return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
}

function CheckCard({ signal, label, description, green, yellow, red, tip }: CheckItemProps) {
  const borderColor =
    signal === "green"
      ? "border-emerald-200 dark:border-emerald-800"
      : signal === "yellow"
        ? "border-amber-200 dark:border-amber-700"
        : "border-rose-200 dark:border-rose-800";

  const bgColor =
    signal === "green"
      ? "bg-emerald-50 dark:bg-emerald-950/30"
      : signal === "yellow"
        ? "bg-amber-50 dark:bg-amber-950/30"
        : "bg-rose-50 dark:bg-rose-950/30";

  const labelColor =
    signal === "green"
      ? "text-emerald-700 dark:text-emerald-300"
      : signal === "yellow"
        ? "text-amber-700 dark:text-amber-300"
        : "text-rose-700 dark:text-rose-300";

  return (
    <div className={cn("rounded-lg border p-4 space-y-3", borderColor, bgColor)}>
      <div className="flex items-center gap-2">
        <SignalIcon signal={signal} />
        <span className={cn("text-sm font-semibold", labelColor)}>{label}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      <div className="space-y-1.5 pt-1 border-t border-current/10">
        <div className="flex gap-2 text-xs">
          <SignalDot signal="green" />
          <span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">Go: </span>
            {green}
          </span>
        </div>
        <div className="flex gap-2 text-xs">
          <SignalDot signal="yellow" />
          <span>
            <span className="font-semibold text-amber-700 dark:text-amber-400">Caution: </span>
            {yellow}
          </span>
        </div>
        <div className="flex gap-2 text-xs">
          <SignalDot signal="red" />
          <span>
            <span className="font-semibold text-rose-700 dark:text-rose-400">No-go: </span>
            {red}
          </span>
        </div>
      </div>
      {tip && (
        <div className="pt-1 border-t border-current/10">
          <p className="text-[11px] text-muted-foreground/80 italic leading-relaxed">{tip}</p>
        </div>
      )}
    </div>
  );
}

const CHECKS: Omit<CheckItemProps, "signal">[] = [
  {
    label: "1. Direction — Is the trend unambiguous?",
    description:
      "Everything else is secondary to trend. Price above its rising 20 EMA and 50 SMA on the daily = tailwind for calls. Price below falling MAs = tailwind for puts. Market structure tells you the same thing: look for higher highs and higher lows (uptrend) or lower highs and lower lows (downtrend). If the structure is choppy or you can't tell, skip the trade.",
    green:
      "Daily trend is clear — MAs are sloping and aligned, and price is making the right kind of highs/lows. You're trading with the dominant direction.",
    yellow:
      "Trend is recovering from a recent break, or weekly and daily are mixed. Reduce size and choose a longer expiry to give the trade room.",
    red: "Price is in a choppy range, recently broke market structure, or you're trying to call a reversal without confirmation. This is where most money is lost.",
    tip: "Institutions trade with trend. If the structure is broken, they've already exited — you'll be buying the bag.",
  },
  {
    label: "2. Setup — Are you entering at a defined level with a pattern?",
    description:
      "A good entry is at a meaningful level (support, resistance, MA) with a recognizable continuation or reversal pattern forming, confirmed by the entry candle. Buying calls in the middle of a range with no nearby reference is guessing, not trading. Look for flags, triangles, or bounces off a key level. The entry candle matters: a strong engulfing or pin bar at support is a signal; a doji or small inside bar mid-range is noise.",
    green:
      "Clear pattern at a key level (bull flag at support, ascending triangle breakout, bounce off 50 SMA) with a strong confirming candle — engulfing, hammer, or clean close above resistance.",
    yellow:
      "Valid level but no clear pattern yet, or pattern is forming but the entry candle is weak. Wait for confirmation or take a starter position.",
    red: "Chasing a move that's already extended, buying at resistance for calls, or entering on a doji after a big run with no pullback.",
    tip: "The wick tells you who lost control. A long lower wick at support = buyers defended it. A long upper wick at resistance = sellers rejected it. Read the candle before clicking buy.",
  },
  {
    label: "3. Timing — Does the catalyst and IV make sense?",
    description:
      "Options are time-limited. You need a reason the stock moves within your contract window, and you need to understand what's already priced in. Markets price the future, not the present — if earnings beat is widely expected, the beat itself may not move the stock. IV spikes before events and crushes after: buying high-IV calls into earnings to 'play the move' often loses even when you're directionally right. Know your event, know your IV, and choose your expiry deliberately.",
    green:
      "Known catalyst within your expiry window, IV is at or below normal levels, and you're entering in a quality time window (10 AM–3 PM, not the first 15–30 min). Expiry is comfortably past the event.",
    yellow:
      "Technical thesis only with no hard catalyst, or IV is slightly elevated. Valid entry, but choose longer DTE and size down. Avoid entering pre-event without a clear IV crush strategy.",
    red: "Short DTE with no catalyst and a drifting stock. Or buying high-IV options right before an event expecting to profit from the move — IV crush will erase most of the gain even if you're right.",
    tip: "Monday and Friday are lower-conviction days for volume. Tuesday through Thursday — especially late morning and early afternoon — is when institutional flow is cleanest.",
  },
  {
    label: "4. Confirmation — Is volume and smart money agreeing?",
    description:
      "Volume is the proof of conviction. A breakout on low RVOL (relative volume) is a warning sign — it may not hold. RVOL above 1.5× on a breakout day is a strong signal. In the options chain, look for unusual activity: large blocks, call sweeps on the ask, or a lopsided put/call ratio that aligns with your thesis. Institutions leave footprints — you don't need to find them, just recognize when they're already there.",
    green:
      "RVOL > 1.5 on the breakout candle. Options chain shows unusual call (or put) buying that aligns with your direction. Block trades or sweeps at your strike zone.",
    yellow:
      "RVOL is 0.7–1.5 (normal range). Flow in the chain is neutral. Entry is valid but lacks institutional confirmation — size accordingly.",
    red: "Breakout or bounce on RVOL < 0.7. Options flow is contradicting your trade direction (e.g., heavy put buying while you're playing calls). Thin volume on a key day.",
    tip: "You don't need all four signals to be neon green. You need them to not be contradicting each other. One strong green and three neutrals is a tradeable setup.",
  },
];

const EXAMPLE_SIGNALS: Signal[] = ["green", "green", "yellow", "green"];

const VETO_RULES = [
  "Trend is broken on the daily and you're trying to call a reversal without confirmation",
  "IV is in the top quartile of its range and you're buying options — not selling them",
  "You're entering in the first 15 minutes of the open without a defined ORB (opening range breakout) strategy",
  "DTE is less than 7 days and there's no imminent catalyst — pure theta bleed",
  "You have no defined exit: no stop loss, no profit target, no plan for the event",
];

export function EntryFramework() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
        <p className="text-sm font-semibold">4 checks. If they pass, take the trade.</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Most of your edge comes from four things: trading with the trend, entering at a real level
          with a real pattern, understanding the catalyst and what's priced in, and having volume
          confirm. Get these right and you've eliminated 80% of bad trades. Everything else is
          refinement.
        </p>
      </div>

      {/* Decision checklist */}
      <div className="grid grid-cols-1 gap-4">
        {CHECKS.map((check, i) => (
          <CheckCard key={check.label} signal={EXAMPLE_SIGNALS[i]} {...check} />
        ))}
      </div>

      {/* Quick-score summary box */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4 space-y-3">
        <p className="text-sm font-semibold">How to score your setup</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex gap-2 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold">3–4 greens</span> — High-conviction. Full planned size
              is warranted. Take the trade.
            </span>
          </div>
          <div className="flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold">2 greens, rest yellow</span> — Marginal. Half size,
              longer expiry, or wait for check #2 (setup) to sharpen.
            </span>
          </div>
          <div className="flex gap-2 items-start">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold">Any red</span> — Stop. One red on direction or timing
              vetoes the trade regardless of other signals.
            </span>
          </div>
        </div>
      </div>

      {/* Auto-veto rules */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2">
            Auto-Veto Rules
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 p-4 space-y-2">
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            These are instant no-gos regardless of how good the rest of the setup looks. Each one
            has been the primary cause of account blowups.
          </p>
          {VETO_RULES.map((rule) => (
            <div key={rule} className="flex gap-2 text-xs">
              <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Satisficing */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2">
            Mental Model
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-5 space-y-3">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
            Good enough beats waiting for perfect
          </p>
          <div className="space-y-2 text-xs text-blue-900/80 dark:text-blue-200/80 leading-relaxed">
            <p>
              <strong>Satisficing</strong> — choosing the first option that meets a defined
              threshold rather than searching for the optimal one — is the right decision model for
              trading. The perfect setup rarely exists, and waiting for it usually means either
              missing the move or overtrading a marginal one that finally "feels" right.
            </p>
            <p>
              Define your threshold (3 of 4 checks green or yellow, no auto-veto triggered), run the
              checklist, and act when it clears. Theta doesn't wait. A satisfactory entry today
              beats a perfect one next week with less time remaining and higher premium. Consistency
              in executing defined setups is where edge accumulates — not in finding the perfect
              trade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
