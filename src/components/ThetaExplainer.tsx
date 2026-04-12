import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  theta: number; // daily decay per share, typically negative e.g. -0.05
  optionPrice?: number; // optional: to show decay as % of premium
}

export function ThetaExplainer({ theta, optionPrice }: Props) {
  const dailyDecay = Math.abs(theta);
  const weeklyDecay = dailyDecay * 5;
  const monthlyDecay = dailyDecay * 21;

  const pctOfPremium = optionPrice && optionPrice > 0 ? (dailyDecay / optionPrice) * 100 : null;

  // Theta intensity label
  const intensity = (() => {
    if (dailyDecay >= 0.15) return { label: "Very High", color: "text-rose-600" };
    if (dailyDecay >= 0.07) return { label: "High", color: "text-amber-600" };
    if (dailyDecay >= 0.03) return { label: "Moderate", color: "text-blue-600" };
    return { label: "Low", color: "text-emerald-600" };
  })();

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
        <div className="mt-0.5 shrink-0">
          <span className={cn("text-2xl font-bold", intensity.color)}>
            ${dailyDecay.toFixed(3)}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold">
            <span className={intensity.color}>{intensity.label}</span> daily time decay
          </p>
          <p className="text-xs text-muted-foreground">
            This option loses ~${dailyDecay.toFixed(3)} per share per day ($
            {(dailyDecay * 100).toFixed(2)} per contract) purely from the passage of time, assuming
            all else stays the same.
            {pctOfPremium !== null && (
              <> That's ~{pctOfPremium.toFixed(1)}% of the current premium each day.</>
            )}
          </p>
        </div>
      </div>

      {/* Decay schedule */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Projected time decay</h3>
        <div className="grid grid-cols-3 gap-3">
          <DecayCard
            period="1 Day"
            perShare={dailyDecay}
            perContract={dailyDecay * 100}
            color="amber"
          />
          <DecayCard
            period="1 Week"
            perShare={weeklyDecay}
            perContract={weeklyDecay * 100}
            color="orange"
          />
          <DecayCard
            period="1 Month"
            perShare={monthlyDecay}
            perContract={monthlyDecay * 100}
            color="rose"
          />
        </div>
        <p className="text-[11px] text-muted-foreground">
          Assumes theta stays constant — in reality theta accelerates as expiration approaches.
        </p>
      </div>

      {/* Theta acceleration visual */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">How theta accelerates over time</h3>
        {(() => {
          const BAR_MAX_PX = 64;
          const days = [90, 60, 45, 30, 21, 14, 7, 3, 1];
          const raw = days.map((d) => 1 / Math.sqrt(d));
          const max = Math.max(...raw);
          return (
            <>
              <div className="flex items-end gap-1" style={{ height: BAR_MAX_PX }}>
                {days.map((d, i) => {
                  const px = Math.max(Math.round((raw[i] / max) * BAR_MAX_PX), 4);
                  return (
                    <div
                      key={d}
                      className="flex-1 rounded-t bg-rose-400 dark:bg-rose-600"
                      style={{ height: px }}
                    />
                  );
                })}
              </div>
              <div className="flex gap-1 mt-1">
                {days.map((d) => (
                  <div key={d} className="flex-1 text-center">
                    <span className="text-[9px] text-muted-foreground">{d}d</span>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
        <p className="text-[11px] text-muted-foreground">
          Theta decay is slowest when expiration is far away and steepest in the final days — this
          is why selling short-dated options collects premium quickly.
        </p>
      </div>

      {/* What theta means */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">What theta means for you</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InfoTile
            title="Time value erosion"
            body="An option's price is made up of intrinsic value (how deep ITM it is) and time value. Theta erodes the time value component every day — even if the stock doesn't move."
          />
          <InfoTile
            title="ATM decay is fastest"
            body="At-the-money options carry the most time value and therefore the highest theta. Deep ITM and deep OTM options have less time value and decay more slowly."
          />
          <InfoTile
            title="Weekends count"
            body="Markets are closed on weekends, but theta still accrues. Brokers typically charge Friday's theta across Saturday and Sunday on Monday's open."
          />
        </div>
      </div>

      {/* Buyer vs Seller */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Perspective
          label="Buyer"
          icon={<TrendingUp className="w-4 h-4" />}
          color="blue"
          points={[
            {
              heading: "Theta works against you",
              body: `You're losing ~$${(dailyDecay * 100).toFixed(2)} per contract every day just from time passing. The stock must move fast enough and far enough to overcome this daily drag.`,
            },
            {
              heading: "Time is your enemy",
              body: "The closer to expiration, the faster your option loses value if the underlying isn't moving in your favor. Buying with enough time to expiration is critical.",
            },
            {
              heading: "Avoid holding through slow periods",
              body: "Holding options over weekends, holidays, or low-volatility consolidation periods maximises theta loss with little chance of recovery.",
            },
          ]}
        />
        <Perspective
          label="Seller"
          icon={<TrendingDown className="w-4 h-4" />}
          color="violet"
          points={[
            {
              heading: "Theta works for you",
              body: `You collect ~$${(dailyDecay * 100).toFixed(2)} per contract per day in time decay. Even if the stock barely moves, the option you sold is losing value in your favor.`,
            },
            {
              heading: "Time is your ally",
              body: "Every day that passes without a large adverse move is a day of profit. Sellers benefit from patience — holding through expiration maximises collected premium.",
            },
            {
              heading: "Sell near-term for faster decay",
              body: "Shorter-dated options have higher theta relative to their premium. Many sellers focus on 30–45 DTE contracts where theta decay is accelerating but IV risk is still manageable.",
            },
          ]}
        />
      </div>
    </div>
  );
}

function DecayCard({
  period,
  perShare,
  perContract,
  color,
}: {
  period: string;
  perShare: number;
  perContract: number;
  color: "amber" | "orange" | "rose";
}) {
  const colorMap = {
    amber:
      "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300",
    orange:
      "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300",
    rose: "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300",
  };

  return (
    <div className={cn("rounded-lg border p-3 space-y-1", colorMap[color])}>
      <p className="text-xs font-semibold">{period}</p>
      <p className="text-sm font-bold">
        ${perShare.toFixed(3)}
        <span className="text-xs font-normal"> /share</span>
      </p>
      <p className="text-xs opacity-80">${perContract.toFixed(2)} /contract</p>
    </div>
  );
}

function InfoTile({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
      <p className="text-xs font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function Perspective({
  label,
  icon,
  color,
  points,
}: {
  label: string;
  icon: React.ReactNode;
  color: "blue" | "violet";
  points: { heading: string; body: string }[];
}) {
  const colorMap = {
    blue: {
      header: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      dot: "bg-blue-400",
      title: "text-blue-700 dark:text-blue-300",
    },
    violet: {
      header: "bg-violet-50 border-violet-200 dark:bg-violet-950/30 dark:border-violet-800",
      icon: "text-violet-600 dark:text-violet-400",
      dot: "bg-violet-400",
      title: "text-violet-700 dark:text-violet-300",
    },
  };
  const c = colorMap[color];

  return (
    <div className={cn("rounded-lg border p-4 space-y-3", c.header)}>
      <div className={cn("flex items-center gap-2 font-semibold text-sm", c.title)}>
        <span className={c.icon}>{icon}</span>
        {label}
      </div>
      <ul className="space-y-2.5">
        {points.map((p) => (
          <li key={p.heading} className="flex gap-2 text-xs">
            <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", c.dot)} />
            <span>
              <span className="font-semibold">{p.heading} — </span>
              {p.body}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
