import { useEffect } from "react";
import { X, TrendingUp, Clock, Activity, BarChart2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  symbol: string;
  indexPrice: number;
  strikePrice: number;
  iv: number;
  delta: number;
  theta: number;
  premium?: number;
  allValid: boolean;
  deltaValid: boolean;
  thetaValid: boolean;
}

const TRADING_DAYS_PER_YEAR = 252;

function calcRange(indexPrice: number, iv: number, days: number, sigma = 1) {
  const periodIv = (iv / 100) * Math.sqrt(days / TRADING_DAYS_PER_YEAR);
  const move = indexPrice * periodIv * sigma;
  return { lower: indexPrice - move, upper: indexPrice + move, move };
}

function fmt(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function ivLevel(iv: number) {
  if (iv < 15) return { label: "Low", color: "text-emerald-600" };
  if (iv < 25) return { label: "Moderate", color: "text-blue-600" };
  if (iv < 40) return { label: "Elevated", color: "text-amber-600" };
  return { label: "High", color: "text-rose-600" };
}

export function SummaryModal({
  open,
  onClose,
  symbol,
  indexPrice,
  strikePrice,
  iv,
  delta,
  theta,
  premium,
  allValid,
  deltaValid,
  thetaValid,
}: Props) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const ticker = symbol.trim().toUpperCase() || "—";
  const absDelta = Math.abs(delta);
  const itmPct = (absDelta * 100).toFixed(0);

  // Range calcs
  const week1 = calcRange(indexPrice, iv, 5);
  const month1 = calcRange(indexPrice, iv, 21);
  const month3 = calcRange(indexPrice, iv, 63);
  const strikeInWeek = strikePrice >= week1.lower && strikePrice <= week1.upper;
  const strikeInMonth = strikePrice >= month1.lower && strikePrice <= month1.upper;
  const strikeInQ = strikePrice >= month3.lower && strikePrice <= month3.upper;

  // Breakeven calcs
  const callBE = premium != null ? strikePrice + premium : undefined;
  const putBE = premium != null ? strikePrice - premium : undefined;
  const inRange = (val: number | undefined, r: { lower: number; upper: number }) =>
    val != null && val >= r.lower && val <= r.upper;

  // Theta calcs
  const dailyLoss = Math.abs(theta);
  const weeklyLoss = dailyLoss * 5;
  const monthlyLoss = dailyLoss * 21;

  // IV
  const level = ivLevel(iv);
  const oneMonthMovePct = ((month1.move / indexPrice) * 100).toFixed(1);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-5 py-4">
            <div>
              <p className="text-base font-semibold">Position Summary</p>
              <p className="text-xs text-muted-foreground">
                {ticker} · Index ${fmt(indexPrice)} · Strike ${fmt(strikePrice)} · IV {iv.toFixed(1)}%
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 py-4 space-y-4">
            {!allValid && (
              <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
                Some inputs are invalid — fill in all fields to see the full summary.
              </p>
            )}

            {/* Range section */}
            {allValid && (
              <Section icon={<BarChart2 className="w-4 h-4" />} title="Expected Range (1σ)">
                <div className="space-y-2">
                  <RangeRow
                    label="1 Week"
                    lower={week1.lower}
                    upper={week1.upper}
                    move={week1.move}
                    strikeInRange={strikeInWeek}
                    callBEInRange={inRange(callBE, week1)}
                    putBEInRange={inRange(putBE, week1)}
                    hasPremium={premium != null}
                  />
                  <RangeRow
                    label="1 Month"
                    lower={month1.lower}
                    upper={month1.upper}
                    move={month1.move}
                    strikeInRange={strikeInMonth}
                    callBEInRange={inRange(callBE, month1)}
                    putBEInRange={inRange(putBE, month1)}
                    hasPremium={premium != null}
                  />
                  <RangeRow
                    label="3 Months"
                    lower={month3.lower}
                    upper={month3.upper}
                    move={month3.move}
                    strikeInRange={strikeInQ}
                    callBEInRange={inRange(callBE, month3)}
                    putBEInRange={inRange(putBE, month3)}
                    hasPremium={premium != null}
                  />
                  <p className="text-xs text-muted-foreground pt-1">
                    At {iv.toFixed(1)}% IV, the market prices a ±{oneMonthMovePct}% move over the
                    next month. The strike at ${fmt(strikePrice)} is{" "}
                    <span className={strikeInMonth ? "text-emerald-600 font-medium" : "text-rose-500 font-medium"}>
                      {strikeInMonth ? "inside" : "outside"} the 1-month 1σ range
                    </span>
                    {premium != null && (
                      <>
                        {" "}— call breakeven ${fmt(callBE!)} is{" "}
                        <span className={inRange(callBE, month1) ? "text-emerald-600 font-medium" : "text-rose-500 font-medium"}>
                          {inRange(callBE, month1) ? "inside" : "outside"}
                        </span>
                        , put breakeven ${fmt(putBE!)} is{" "}
                        <span className={inRange(putBE, month1) ? "text-emerald-600 font-medium" : "text-rose-500 font-medium"}>
                          {inRange(putBE, month1) ? "inside" : "outside"}
                        </span>
                      </>
                    )}
                    .
                  </p>
                </div>
              </Section>
            )}

            {/* Delta section */}
            {deltaValid && (
              <Section
                icon={<TrendingUp className="w-4 h-4" />}
                title="Delta"
              >
                <div className="space-y-2 text-xs">
                  <span className="font-mono font-semibold">{delta.toFixed(2)}</span>
                  <p className="text-muted-foreground leading-relaxed">
                    ~<span className="text-foreground font-medium">{itmPct}% probability</span> of
                    expiring in-the-money. For every $1 move in {ticker}, this option gains or loses
                    approximately{" "}
                    <span className="text-foreground font-medium">${absDelta.toFixed(2)} per share</span>{" "}
                    (${(absDelta * 100).toFixed(0)} per contract).
                  </p>
                  {allValid && (
                    <p className="text-muted-foreground">
                      The strike is currently{" "}
                      <span className="text-foreground font-medium">
                        {strikePrice > indexPrice
                          ? `$${fmt(strikePrice - indexPrice)} OTM`
                          : `$${fmt(indexPrice - strikePrice)} ITM`}
                      </span>
                      .
                    </p>
                  )}
                </div>
              </Section>
            )}

            {/* IV section */}
            {allValid && (
              <Section icon={<Activity className="w-4 h-4" />} title="Implied Volatility">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-lg font-bold", level.color)}>{iv.toFixed(1)}%</span>
                    <span
                      className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full bg-muted",
                        level.color
                      )}
                    >
                      {level.label}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {iv < 25
                      ? `IV is relatively low — options premium is cheaper than average. Buyers get better value per dollar of premium paid, but the market is not pricing in large moves.`
                      : iv < 40
                      ? `IV is elevated — you are paying above-average premium. Be cautious of IV crush after a catalyst resolves; the option can lose value even if price moves in your favor.`
                      : `IV is high — premium is expensive. Buyers are paying a significant risk premium; a sharp drop in IV after the event (IV crush) can wipe out gains even on a correct directional bet.`}
                  </p>
                  <p className="text-muted-foreground">
                    Always compare this to the stock's 52-week IV Rank to judge whether{" "}
                    {iv.toFixed(1)}% is truly cheap or expensive for {ticker}.
                  </p>
                  {symbol.trim() && (
                    <a
                      href={`https://marketchameleon.com/Overview/${ticker}/IV/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      View {ticker} IV &amp; IV Rank on Market Chameleon
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Section>
            )}

            {/* Theta section */}
            {thetaValid && (
              <Section icon={<Clock className="w-4 h-4" />} title="Theta Decay">
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 gap-2">
                    <DecayStat label="Daily" value={`-$${dailyLoss.toFixed(3)}`} />
                    <DecayStat label="Weekly (5d)" value={`-$${weeklyLoss.toFixed(2)}`} />
                    <DecayStat label="Monthly (21d)" value={`-$${monthlyLoss.toFixed(2)}`} />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Per contract (100 shares), this option bleeds{" "}
                    <span className="text-foreground font-medium">
                      ${(dailyLoss * 100).toFixed(2)}/day
                    </span>{" "}
                    and{" "}
                    <span className="text-foreground font-medium">
                      ${(weeklyLoss * 100).toFixed(2)}/week
                    </span>{" "}
                    from time decay alone, regardless of price movement.
                  </p>
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-muted-foreground">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function RangeRow({
  label,
  lower,
  upper,
  move,
  strikeInRange,
  callBEInRange,
  putBEInRange,
  hasPremium,
}: {
  label: string;
  lower: number;
  upper: number;
  move: number;
  strikeInRange: boolean;
  callBEInRange: boolean;
  putBEInRange: boolean;
  hasPremium: boolean;
}) {
  const borderColor = hasPremium
    ? callBEInRange && putBEInRange
      ? "border-emerald-300 dark:border-emerald-700"
      : callBEInRange || putBEInRange
      ? "border-amber-300 dark:border-amber-600"
      : "border-rose-300 dark:border-rose-700"
    : strikeInRange
    ? "border-emerald-300 dark:border-emerald-700"
    : "border-rose-300 dark:border-rose-700";

  return (
    <div className={cn("rounded-lg border px-3 py-2 space-y-1.5", borderColor)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-muted-foreground">
          <span className="text-rose-500">${fmt(lower)}</span>
          {" — "}
          <span className="text-emerald-600">${fmt(upper)}</span>
          <span className="ml-2 text-muted-foreground">±${fmt(move)}</span>
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        {hasPremium ? (
          <>
            <span className={cn("font-medium", callBEInRange ? "text-emerald-600" : "text-rose-500")}>
              ▲ Call BE: {callBEInRange ? "in range" : "out"}
            </span>
            <span className={cn("font-medium", putBEInRange ? "text-emerald-600" : "text-rose-500")}>
              ▼ Put BE: {putBEInRange ? "in range" : "out"}
            </span>
          </>
        ) : (
          <span className={cn("font-medium", strikeInRange ? "text-emerald-600" : "text-rose-500")}>
            Strike: {strikeInRange ? "in range" : "OTM"}
          </span>
        )}
      </div>
    </div>
  );
}

function DecayStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background px-3 py-2 text-center">
      <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
      <p className="font-semibold text-rose-500">{value}</p>
    </div>
  );
}
