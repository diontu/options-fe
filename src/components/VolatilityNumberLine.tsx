import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  strikePrice: number;
  indexPrice: number;
  impliedVolatility: number; // as a percentage e.g. 20 = 20%
}

interface Marker {
  value: number;
  label: string;
  color: string;
  textColor: string;
  zIndex: number;
  shape: "diamond" | "circle" | "triangle";
}

export function VolatilityNumberLine({ strikePrice, indexPrice, impliedVolatility }: Props) {
  const ivDecimal = impliedVolatility / 100;
  const volRange = indexPrice * ivDecimal;
  const lowerBound = indexPrice - volRange;
  const upperBound = indexPrice + volRange;

  const { markers, ticks, rangeStart, rangeEnd } = useMemo(() => {
    const padding = volRange * 0.6;
    const globalMin = Math.min(lowerBound, strikePrice) - padding;
    const globalMax = Math.max(upperBound, strikePrice) + padding;
    const span = globalMax - globalMin;

    const toPercent = (v: number) => ((v - globalMin) / span) * 100;

    const markers: Marker[] = [
      {
        value: indexPrice,
        label: `Index\n$${indexPrice.toLocaleString()}`,
        color: "bg-blue-500",
        textColor: "text-blue-600",
        zIndex: 30,
        shape: "circle",
      },
      {
        value: strikePrice,
        label: `Strike\n$${strikePrice.toLocaleString()}`,
        color:
          strikePrice >= lowerBound && strikePrice <= upperBound ? "bg-emerald-500" : "bg-rose-500",
        textColor:
          strikePrice >= lowerBound && strikePrice <= upperBound
            ? "text-emerald-600"
            : "text-rose-600",
        zIndex: 20,
        shape: "diamond",
      },
    ];

    const tickCount = 8;
    const tickStep = span / tickCount;
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) => {
      const val = globalMin + i * tickStep;
      return { value: val, percent: toPercent(val) };
    });

    return {
      markers,
      ticks,
      rangeStart: toPercent(lowerBound),
      rangeEnd: toPercent(upperBound),
      toPercent,
    };
  }, [strikePrice, indexPrice, lowerBound, upperBound, volRange]);

  const padding = volRange * 0.6;
  const globalMin = Math.min(lowerBound, strikePrice) - padding;
  const globalMax = Math.max(upperBound, strikePrice) + padding;
  const span = globalMax - globalMin;
  const toPercent = (v: number) => ((v - globalMin) / span) * 100;

  const isStrikeInRange = strikePrice >= lowerBound && strikePrice <= upperBound;
  const strikeDelta = ((strikePrice - indexPrice) / indexPrice) * 100;

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Index Price"
          value={`$${indexPrice.toLocaleString()}`}
          sub="Current price"
          color="blue"
        />
        <StatCard
          label="Strike Price"
          value={`$${strikePrice.toLocaleString()}`}
          sub={`${strikeDelta >= 0 ? "+" : ""}${strikeDelta.toFixed(2)}% from index`}
          color={isStrikeInRange ? "emerald" : "rose"}
        />
        <StatCard
          label="Vol Range"
          value={`$${lowerBound.toLocaleString(undefined, { maximumFractionDigits: 0 })} – $${upperBound.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          sub={`±${impliedVolatility.toFixed(1)}% IV · ±$${volRange.toFixed(0)}`}
          color="violet"
        />
      </div>

      {/* Number line */}
      <div className="relative pt-14 pb-10 px-4">
        {/* Marker labels (above) */}
        {markers.map((m) => {
          const pct = toPercent(m.value);
          const lines = m.label.split("\n");
          return (
            <div
              key={m.label}
              className="absolute top-0 flex flex-col items-center"
              style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
            >
              {lines.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-xs font-semibold whitespace-nowrap leading-tight",
                    m.textColor,
                    i === 0 ? "font-bold text-sm" : ""
                  )}
                >
                  {line}
                </span>
              ))}
            </div>
          );
        })}

        {/* Track */}
        <div className="relative h-3 rounded-full bg-muted overflow-visible">
          {/* Volatility range band */}
          <div
            className="absolute top-0 h-full rounded-full bg-violet-200 dark:bg-violet-900/50"
            style={{
              left: `${rangeStart}%`,
              width: `${rangeEnd - rangeStart}%`,
            }}
          />

          {/* Center line of track */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-border" />
          </div>

          {/* Lower bound tick */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-400"
            style={{ left: `${rangeStart}%` }}
          />
          {/* Upper bound tick */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-400"
            style={{ left: `${rangeEnd}%` }}
          />

          {/* Strike marker */}
          <MarkerPin
            percent={toPercent(strikePrice)}
            color={isStrikeInRange ? "bg-emerald-500" : "bg-rose-500"}
            shape="diamond"
          />

          {/* Index marker */}
          <MarkerPin percent={toPercent(indexPrice)} color="bg-blue-500" shape="circle" />
        </div>

        {/* Tick labels below */}
        <div className="relative mt-5">
          {ticks.map((t) => (
            <div
              key={t.value}
              className="absolute flex flex-col items-center"
              style={{ left: `${t.percent}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-2 bg-border" />
              <span className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
                {t.value >= 1000 ? `$${(t.value / 1000).toFixed(1)}k` : `$${t.value.toFixed(0)}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <LegendItem color="bg-blue-500" shape="circle" label="Index Price" />
        <LegendItem
          color={isStrikeInRange ? "bg-emerald-500" : "bg-rose-500"}
          shape="diamond"
          label={`Strike Price (${isStrikeInRange ? "within range" : "outside range"})`}
        />
        <LegendItem color="bg-violet-300" shape="rect" label={`±${impliedVolatility}% IV Range`} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: "blue" | "emerald" | "rose" | "violet";
}) {
  const colorMap = {
    blue: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30",
    emerald: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
    rose: "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30",
    violet: "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30",
  };
  const textMap = {
    blue: "text-blue-700 dark:text-blue-300",
    emerald: "text-emerald-700 dark:text-emerald-300",
    rose: "text-rose-700 dark:text-rose-300",
    violet: "text-violet-700 dark:text-violet-300",
  };

  return (
    <div className={cn("rounded-lg border p-4", colorMap[color])}>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <p className={cn("text-base font-bold", textMap[color])}>{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}

function MarkerPin({
  percent,
  color,
  shape,
}: {
  percent: number;
  color: string;
  shape: "circle" | "diamond";
}) {
  return (
    <div
      className="absolute top-1/2 z-10"
      style={{ left: `${percent}%`, transform: "translateX(-50%) translateY(-50%)" }}
    >
      {shape === "circle" ? (
        <div className={cn("w-5 h-5 rounded-full border-2 border-white shadow-md", color)} />
      ) : (
        <div className={cn("w-4 h-4 border-2 border-white shadow-md rotate-45", color)} />
      )}
    </div>
  );
}

function LegendItem({
  color,
  shape,
  label,
}: {
  color: string;
  shape: "circle" | "diamond" | "rect";
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {shape === "circle" && <div className={cn("w-3 h-3 rounded-full", color)} />}
      {shape === "diamond" && <div className={cn("w-2.5 h-2.5 rotate-45", color)} />}
      {shape === "rect" && <div className={cn("w-5 h-3 rounded-sm opacity-70", color)} />}
      <span>{label}</span>
    </div>
  );
}
