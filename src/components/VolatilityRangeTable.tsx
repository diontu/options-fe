import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/tooltip";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { useState } from "react";

interface Props {
  indexPrice: number;
  strikePrice: number;
  impliedVolatility: number; // annual IV as percentage e.g. 18 = 18%
  premium?: number;
  delta?: number;
}

const TRADING_DAYS_PER_YEAR = 252;

// Probability of price staying within ±Nσ (normal distribution)
const SIGMA_PROBABILITY: Record<number, string> = {
  1: "68.27%",
  2: "95.45%",
  3: "99.73%",
};

function calcRange(indexPrice: number, annualIv: number, days: number, sigma: number) {
  const ivDecimal = annualIv / 100;
  const periodIv = ivDecimal * Math.sqrt(days / TRADING_DAYS_PER_YEAR);
  const move = indexPrice * periodIv * sigma;
  return {
    move,
    lower: indexPrice - move,
    upper: indexPrice + move,
    periodIvPct: periodIv * 100,
  };
}

const PRESETS = [
  { label: "1 Day", days: 1 },
  { label: "1 Week", days: 5 },
  { label: "1 Month", days: 21 },
  { label: "3 Months", days: 63 },
  { label: "6 Months", days: 126 },
  { label: "1 Year", days: 252 },
];

export function VolatilityRangeTable({
  indexPrice,
  strikePrice,
  impliedVolatility,
  premium,
  delta,
}: Props) {
  const [showCustom, setShowCustom] = useState(false);
  const [customDaysRaw, setCustomDaysRaw] = useState("30");
  const [sigma, setSigma] = useState(1);
  const debouncedCustomDays = useDebounce(customDaysRaw);

  const customDays = Math.round(Number.parseFloat(debouncedCustomDays));
  const customValid = Number.isFinite(customDays) && customDays > 0 && customDays <= 3650;

  return (
    <div className="space-y-4">
      {/* Sigma selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Std. Deviation</span>
        <div className="flex rounded-lg border overflow-hidden text-sm">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSigma(s)}
              className={cn(
                "px-3 py-1.5 font-medium transition-colors",
                sigma === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted text-muted-foreground"
              )}
            >
              {s}σ
            </button>
          ))}
        </div>
        <Tooltip
          content={
            <span>
              Scales the range by the number of standard deviations. Under a normal distribution: 1σ
              covers ~68% of outcomes, 2σ covers ~95%, and 3σ covers ~99.7%.
            </span>
          }
        >
          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
        </Tooltip>
        <span className="text-xs text-muted-foreground">
          ~{SIGMA_PROBABILITY[sigma]} probability price stays within range
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border border-white shadow-sm shrink-0" />
          <span>Index price</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 bg-emerald-500 border border-white shadow-sm shrink-0"
            style={{ transform: "rotate(45deg)" }}
          />
          <span>Strike (ITM)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 bg-rose-500 border border-white shadow-sm shrink-0"
            style={{ transform: "rotate(45deg)" }}
          />
          <span>Strike (OTM)</span>
        </div>
        {premium != null && (
          <>
            <div className="flex items-center gap-1.5">
              <div
                className="w-0 h-0 shrink-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderBottom: "9px solid #f59e0b",
                }}
              />
              <span>Call breakeven</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-0 h-0 shrink-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "9px solid #8b5cf6",
                }}
              />
              <span>Put breakeven</span>
            </div>
          </>
        )}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-2.5 rounded-full bg-violet-200 dark:bg-violet-800/60 shrink-0" />
          <span>Expected range</span>
        </div>
      </div>

      {/* Preset grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRESETS.map(({ label, days }) => {
          const r = calcRange(indexPrice, impliedVolatility, days, sigma);
          return (
            <RangeCard
              key={label}
              label={label}
              days={days}
              sigma={sigma}
              indexPrice={indexPrice}
              strikePrice={strikePrice}
              premium={premium}
              delta={delta}
              {...r}
            />
          );
        })}
      </div>

      {/* Custom days toggle */}
      <div className="rounded-xl border bg-card p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Switch id="custom-toggle" checked={showCustom} onCheckedChange={setShowCustom} />
          <Label htmlFor="custom-toggle" className="cursor-pointer">
            Custom period
          </Label>
        </div>

        {showCustom && (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="space-y-1.5 w-48">
                <Label htmlFor="custom-days">Trading Days</Label>
                <Input
                  id="custom-days"
                  type="number"
                  min="1"
                  max="3650"
                  step="1"
                  value={customDaysRaw}
                  onChange={(e) => setCustomDaysRaw(e.target.value)}
                  className={!customValid ? "border-rose-400 focus-visible:ring-rose-400" : ""}
                />
                {!customValid && <p className="text-xs text-rose-500">Enter 1–3650 trading days</p>}
              </div>
              {customValid && (
                <p className="text-xs text-muted-foreground pt-5">
                  ~{(customDays / 21).toFixed(1)} months &nbsp;/&nbsp; ~
                  {(customDays / 252).toFixed(2)} years
                </p>
              )}
            </div>

            {customValid &&
              (() => {
                const r = calcRange(indexPrice, impliedVolatility, customDays, sigma);
                return (
                  <RangeCard
                    label={`${customDays} Trading Day${customDays !== 1 ? "s" : ""}`}
                    days={customDays}
                    sigma={sigma}
                    indexPrice={indexPrice}
                    strikePrice={strikePrice}
                    premium={premium}
                    delta={delta}
                    highlight
                    {...r}
                  />
                );
              })()}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <p className="text-xs text-muted-foreground">
          Ranges use the square-root-of-time rule:{" "}
          <span className="font-mono">±(σ × IV) × √(days / 252)</span>. Based on{" "}
          {TRADING_DAYS_PER_YEAR} trading days per year.
        </p>
        <Tooltip
          content={
            <span>
              Implied volatility is annualized. To scale it to a shorter period, multiply by √(days
              / 252). This gives the expected ±1σ move — roughly a 68% probability the price stays
              within this range. Increasing σ widens the range and raises the probability. 252 is
              used because that is the number of trading days in a year.
            </span>
          }
        >
          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help shrink-0" />
        </Tooltip>
      </div>
    </div>
  );
}

function RangeCard({
  label,
  days,
  sigma,
  indexPrice,
  strikePrice,
  move,
  lower,
  upper,
  periodIvPct,
  premium,
  highlight = false,
}: {
  label: string;
  days: number;
  sigma: number;
  indexPrice: number;
  strikePrice: number;
  move: number;
  lower: number;
  upper: number;
  periodIvPct: number;
  premium?: number;
  delta?: number;
  highlight?: boolean;
}) {
  const movePct = (move / indexPrice) * 100;
  const itm = strikePrice >= lower && strikePrice <= upper;
  const callBreakeven = premium != null ? strikePrice + premium : undefined;
  const putBreakeven = premium != null ? strikePrice - premium : undefined;

  const callInRange = callBreakeven != null && callBreakeven >= lower && callBreakeven <= upper;
  const putInRange = putBreakeven != null && putBreakeven >= lower && putBreakeven <= upper;
  const hasPremium = premium != null;

  const borderColor = hasPremium
    ? callInRange && putInRange
      ? "border-emerald-400 dark:border-emerald-600"
      : callInRange || putInRange
        ? "border-amber-400 dark:border-amber-500"
        : "border-rose-400 dark:border-rose-600"
    : itm
      ? "border-emerald-400 dark:border-emerald-600"
      : "border-rose-400 dark:border-rose-600";

  const tooltipText = hasPremium
    ? callInRange && putInRange
      ? `Green — Both call and put breakevens are within the ±${sigma}σ range.`
      : callInRange || putInRange
        ? `Yellow — Only one breakeven (${callInRange ? "call" : "put"}) is within the ±${sigma}σ range.`
        : `Red — Neither breakeven is within the ±${sigma}σ range.`
    : itm
      ? `Green border — Strike is inside this period's ±${sigma}σ range (ITM). There is a ~${SIGMA_PROBABILITY[sigma]} chance price stays within this range.`
      : `Red border — Strike is outside this period's ±${sigma}σ range (OTM). The expected move does not reach the strike within this timeframe.`;

  return (
    <div
      className={cn(
        "rounded-lg border-2 p-4 space-y-3",
        borderColor,
        highlight && "bg-violet-50 dark:bg-violet-950/30"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold">{label}</span>
          <span className="text-[10px] text-muted-foreground bg-muted rounded px-1 py-0.5">
            {SIGMA_PROBABILITY[sigma] ?? `${sigma}σ`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{days}d</span>
          <Tooltip content={tooltipText}>
            <Info
              className={cn(
                "w-3.5 h-3.5 cursor-help",
                hasPremium
                  ? callInRange && putInRange
                    ? "text-emerald-500"
                    : callInRange || putInRange
                      ? "text-amber-400"
                      : "text-rose-500"
                  : itm
                    ? "text-emerald-500"
                    : "text-rose-500"
              )}
            />
          </Tooltip>
        </div>
      </div>

      <MiniLine
        lower={lower}
        upper={upper}
        index={indexPrice}
        strike={strikePrice}
        callBreakeven={callBreakeven}
        putBreakeven={putBreakeven}
      />

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mt-5">
        <Stat
          label="Lower"
          value={`$${lower.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          color="text-rose-600"
        />
        <Stat
          label="Upper"
          value={`$${upper.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          color="text-emerald-600"
        />
        <Stat
          label="±Move"
          value={`$${move.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
        />
        <Stat label="Period IV" value={`${periodIvPct.toFixed(2)}%`} />
        <Stat label="±Move %" value={`${movePct.toFixed(2)}%`} />
      </div>
    </div>
  );
}

function MiniLine({
  lower,
  upper,
  index,
  strike,
  callBreakeven,
  putBreakeven,
}: {
  lower: number;
  upper: number;
  index: number;
  strike: number;
  callBreakeven?: number;
  putBreakeven?: number;
}) {
  const padding = (upper - lower) * 0.3;
  const min = lower - padding;
  const max = upper + padding;
  const span = max - min;
  const toP = (v: number) => ((v - min) / span) * 100;

  const strikeInRange = strike >= lower && strike <= upper;
  const strikeP = toP(strike);
  const strikeVisible = strikeP >= 0 && strikeP <= 100;

  const fmt = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v.toFixed(0)}`);

  return (
    <div className="space-y-1">
      <div className="relative h-2 rounded-full bg-muted">
        {/* vol band */}
        <div
          className="absolute top-0 h-full rounded-full bg-violet-200 dark:bg-violet-800/60"
          style={{ left: `${toP(lower)}%`, width: `${toP(upper) - toP(lower)}%` }}
        />
        {/* strike marker */}
        {strikeVisible && (
          <div
            className={cn(
              "absolute top-1/2 w-2.5 h-2.5 border border-white shadow-sm z-10",
              strikeInRange ? "bg-emerald-500" : "bg-rose-500"
            )}
            style={{
              left: `${strikeP}%`,
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
            }}
          />
        )}
        {/* call breakeven marker — amber triangle pointing up */}
        {(() => {
          if (callBreakeven == null) return null;
          const beP = toP(callBreakeven);
          if (beP < 0 || beP > 100) return null;
          return (
            <div
              className="absolute top-1/2 w-0 h-0 z-10"
              style={{
                left: `${beP}%`,
                transform: "translateX(-50%) translateY(-50%)",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "9px solid #f59e0b",
              }}
            />
          );
        })()}
        {/* put breakeven marker — violet triangle pointing down */}
        {(() => {
          if (putBreakeven == null) return null;
          const beP = toP(putBreakeven);
          if (beP < 0 || beP > 100) return null;
          return (
            <div
              className="absolute top-1/2 w-0 h-0 z-10"
              style={{
                left: `${beP}%`,
                transform: "translateX(-50%) translateY(-50%)",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "9px solid #8b5cf6",
              }}
            />
          );
        })()}
        {/* index dot */}
        <div
          className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 border border-white shadow-sm z-20"
          style={{ left: `${toP(index)}%`, transform: "translateX(-50%) translateY(-50%)" }}
        />
      </div>

      {/* bound labels */}
      <div className="relative h-3">
        <span
          className="absolute text-[10px] text-rose-500 font-medium"
          style={{ left: `${toP(lower)}%`, transform: "translateX(-50%)" }}
        >
          {fmt(lower)}
        </span>
        <span
          className="absolute text-[10px] text-emerald-600 font-medium"
          style={{ left: `${toP(upper)}%`, transform: "translateX(-50%)" }}
        >
          {fmt(upper)}
        </span>
      </div>
      {/* breakeven labels */}
      {(callBreakeven != null || putBreakeven != null) && (
        <div className="relative h-3">
          {(() => {
            if (callBreakeven == null) return null;
            const beP = toP(callBreakeven);
            if (beP < 0 || beP > 100) return null;
            return (
              <span
                className="absolute text-[10px] text-amber-500 font-medium"
                style={{ left: `${beP}%`, transform: "translateX(-50%)" }}
              >
                C {fmt(callBreakeven)}
              </span>
            );
          })()}
          {(() => {
            if (putBreakeven == null) return null;
            const beP = toP(putBreakeven);
            if (beP < 0 || beP > 100) return null;
            return (
              <span
                className="absolute text-[10px] text-violet-500 font-medium"
                style={{ left: `${beP}%`, transform: "translateX(-50%)" }}
              >
                P {fmt(putBreakeven)}
              </span>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}: </span>
      <span className={cn("font-medium", color)}>{value}</span>
    </div>
  );
}
