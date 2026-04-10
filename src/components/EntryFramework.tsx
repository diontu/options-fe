import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

type Signal = "green" | "yellow" | "red";

interface CheckItemProps {
  signal: Signal;
  label: string;
  description: string;
  green: string;
  yellow: string;
  red: string;
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

function CheckCard({ signal, label, description, green, yellow, red }: CheckItemProps) {
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
          <span><span className="font-semibold text-emerald-700 dark:text-emerald-400">Go: </span>{green}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <SignalDot signal="yellow" />
          <span><span className="font-semibold text-amber-700 dark:text-amber-400">Caution: </span>{yellow}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <SignalDot signal="red" />
          <span><span className="font-semibold text-rose-700 dark:text-rose-400">No-go: </span>{red}</span>
        </div>
      </div>
    </div>
  );
}

const CHECKS: Omit<CheckItemProps, "signal">[] = [
  {
    label: "1. Trend — Up or Down?",
    description:
      "Options trade in the direction of the prevailing trend far more often than against it. Before anything else, know whether the stock is in a clear uptrend, downtrend, or choppy range. Buying calls into a downtrend or puts into a rally is fighting the tape.",
    green: "Clear trend on the daily/weekly — higher highs and higher lows (calls) or lower highs and lower lows (puts).",
    yellow: "Trend is flattening or showing early reversal signals. Reduce size, shorten duration.",
    red: "Price is in a range-bound chop or moving hard against your directional bias.",
  },
  {
    label: "2. Support / Resistance — Where Are You Buying?",
    description:
      "Entering near a key level dramatically changes your risk/reward. Buying calls right at support gives a nearby, well-defined stop. Buying calls at the top of a range or just under resistance means the trade needs to fight through supply immediately.",
    green: "Buying calls just above a confirmed support level (or puts just below resistance). Risk is tight and defined.",
    yellow: "Mid-range with no nearby reference point. You can enter but widen your mental stop accordingly.",
    red: "Buying at the extreme of a move — at resistance for calls, at support for puts — where the market is already stretched.",
  },
  {
    label: "3. Momentum — Is It Overextended?",
    description:
      "Momentum indicators like RSI tell you whether price has run too far too fast. Chasing an overextended move is one of the most common ways to get caught in a reversal right after entry. Oversold doesn't mean buy and overbought doesn't mean sell — but combined with trend and levels it matters a lot.",
    green: "RSI is in a constructive range (40–60 for trend continuation, or bouncing from oversold/overbought for mean-reversion setups).",
    yellow: "RSI approaching extended territory (>70 for calls, <30 for puts) but trend is strong. Reduce size or wait for a pullback.",
    red: "RSI is deeply extended (>80 or <20) and you're thinking of buying more in that direction — high chance of getting caught in a snap-back.",
  },
  {
    label: "4. Volume — Is Anyone Else Showing Up?",
    description:
      "Volume confirms conviction. A breakout on low volume is suspect — it may not hold. Unusual options activity (UOA) in the chain can signal that informed money is positioning ahead of a move. High put/call volume asymmetry can also hint at where smart money is leaning.",
    green: "Price move accompanied by above-average volume; unusual call/put buying in the options chain aligns with your thesis.",
    yellow: "Volume is average or mixed. The setup is valid but lacks strong confirmation — use a smaller initial position.",
    red: "Breakout or trend move on thin volume. Price may revert quickly once volume returns.",
  },
  {
    label: "5. Catalyst — Why Would It Move?",
    description:
      "Options are time-limited instruments. Without a reason for the underlying to move within your contract's timeframe, theta erodes your premium even if you're directionally right eventually. A catalyst defines the 'why' and helps you choose an expiration that aligns with the expected event.",
    green: "Clear upcoming catalyst: earnings, FDA date, product launch, macro event, or a technical breakout in progress. Your expiration is comfortably past the event.",
    yellow: "Technical thesis only — no known catalyst. Valid, but choose longer expiration and size down to give the trade time to develop.",
    red: "No clear catalyst, short DTE, and the stock has been drifting. Pure premium bleed waiting to happen.",
  },
];

// Hardcoded example signals for illustration
const EXAMPLE_SIGNALS: Signal[] = ["green", "green", "yellow", "green", "green"];

export function EntryFramework() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
        <p className="text-sm font-semibold">Run this checklist before every entry</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          No single factor guarantees a winning trade. The framework below forces you to pressure-test
          your thesis across five independent dimensions before committing capital. Each check is
          rated green / yellow / red — the goal is not to find a perfect setup, but to avoid entries
          where multiple checks are flashing red.
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
              <span className="font-semibold">4–5 greens</span> — High-conviction setup. Full
              planned position size is warranted.
            </span>
          </div>
          <div className="flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold">2–3 greens, rest yellow</span> — Marginal setup. Half
              size, longer expiry, or wait for a better entry.
            </span>
          </div>
          <div className="flex gap-2 items-start">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold">Any red flag</span> — Re-evaluate. One red check on
              trend or catalyst should usually veto the trade.
            </span>
          </div>
        </div>
      </div>

      {/* Satisficing section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2">
            Mental Model
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                Satisficing — Good Enough Beats Waiting for Perfect
              </p>
              <p className="text-xs text-blue-900/70 dark:text-blue-200/70 leading-relaxed">
                The concept of <strong>satisficing</strong> (a blend of "satisfy" and "suffice"),
                introduced by Nobel laureate Herbert Simon, describes the decision strategy of
                choosing the first option that meets a defined threshold — rather than searching
                indefinitely for the optimal one.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-blue-900/80 dark:text-blue-200/80 leading-relaxed">
            <p>
              In trading, the instinct is to wait for the <em>perfect</em> setup: all five checks
              green, ideal entry price, the cleanest chart you've ever seen. But that setup rarely
              exists, and more often than not, waiting for perfection means either missing the move
              entirely or overtrading when a marginal setup finally starts to "feel" right just
              because you've been patient.
            </p>

            <p>
              Satisficing reframes the goal. Instead of asking <em>"is this the best possible
              entry?"</em>, ask <em>"does this setup meet my minimum criteria for a trade?"</em>
              If four of five checks are green and the one yellow isn't a dealbreaker (say, volume
              is average but the trend, level, momentum, and catalyst all align), that is a
              satisfactory setup. Take it.
            </p>

            <div className="rounded-md border border-blue-200 dark:border-blue-700 bg-blue-100/50 dark:bg-blue-900/30 p-3 space-y-2">
              <p className="font-semibold text-blue-800 dark:text-blue-300">
                Why this matters specifically for options:
              </p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex gap-2">
                  <span className="shrink-0 font-bold">·</span>
                  <span>
                    <strong>Theta doesn't wait.</strong> Every day you delay, your premium erodes.
                    A satisfactory entry today at fair premium beats a "perfect" entry next week at
                    higher cost with less time remaining.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 font-bold">·</span>
                  <span>
                    <strong>Analysis paralysis kills P&L.</strong> Spending hours refining a setup
                    is itself a cost — opportunity cost. Markets move. A workable setup acted on
                    outperforms a brilliant one that was never taken.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 font-bold">·</span>
                  <span>
                    <strong>Consistency compounds.</strong> Repeatedly executing satisfactory setups
                    with defined risk is how edge accumulates over time. Erratic, emotionally-timed
                    entries — often a result of waiting too long — don't.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 font-bold">·</span>
                  <span>
                    <strong>It enforces discipline over emotion.</strong> Satisficing gives you a
                    concrete bar to clear. If the checklist passes, you trade. If it doesn't, you
                    don't — regardless of how excited you feel about the ticker. That separation of
                    emotion from execution is the entire game.
                  </span>
                </li>
              </ul>
            </div>

            <p>
              The goal of the five-check framework above is to operationalize satisficing. Define
              your threshold (e.g., 4 of 5 checks green or yellow, no red flags on trend or
              catalyst), run the checklist, and act decisively when it clears. Stop searching for
              the perfect trade. Find the good enough one — and manage it well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
