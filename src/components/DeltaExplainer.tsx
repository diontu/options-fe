import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  delta: number; // -1 to 1
}

function deltaLabel(d: number): { moneyness: string; color: string; description: string } {
  const abs = Math.abs(d);
  if (abs >= 0.7)
    return { moneyness: "Deep ITM", color: "text-emerald-600", description: "deep in-the-money" };
  if (abs >= 0.5)
    return { moneyness: "ITM", color: "text-emerald-500", description: "in-the-money" };
  if (abs >= 0.45) return { moneyness: "ATM", color: "text-blue-500", description: "at-the-money" };
  if (abs >= 0.3)
    return { moneyness: "OTM", color: "text-amber-500", description: "out-of-the-money" };
  return {
    moneyness: "Deep OTM",
    color: "text-rose-500",
    description: "deep out-of-the-money",
  };
}

export function DeltaExplainer({ delta }: Props) {
  const isCall = delta >= 0;
  const abs = Math.abs(delta);
  const pctItm = Math.round(abs * 100);
  const { moneyness, color, description } = deltaLabel(delta);

  const dollarMove = abs.toFixed(2);

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
        <div className="mt-0.5 shrink-0">
          <span className={cn("text-2xl font-bold", color)}>{delta.toFixed(2)}</span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold">
            This is a <span className={color}>{moneyness}</span> {isCall ? "call" : "put"} — the
            strike is {description}
          </p>
          <p className="text-xs text-muted-foreground">
            ~{pctItm}% probability of expiring in-the-money · option moves ~${dollarMove} per $1
            move in the underlying
          </p>
        </div>
      </div>

      {/* Delta gauge */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{isCall ? "0 (far OTM)" : "−1 (deep ITM)"}</span>
          <span>{isCall ? "0.5 (ATM)" : "−0.5 (ATM)"}</span>
          <span>{isCall ? "1 (deep ITM)" : "0 (far OTM)"}</span>
        </div>
        <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "absolute top-0 h-full rounded-full",
              isCall ? "bg-emerald-400 left-0" : "bg-rose-400 right-0"
            )}
            style={{ width: `${abs * 100}%` }}
          />
          <div
            className="absolute top-1/2 w-3 h-3 rounded-full bg-primary border-2 border-white shadow -translate-y-1/2"
            style={{ left: `calc(${isCall ? abs * 100 : (1 - abs) * 100}% - 6px)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>0% ITM probability</span>
          <span>~50%</span>
          <span>~100%</span>
        </div>
      </div>

      {/* What delta measures */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">What delta measures</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InfoTile
            title="Price sensitivity"
            body={`For every $1 the underlying moves, this option's price changes by ~$${dollarMove}. Higher delta = option tracks the stock more closely.`}
          />
          <InfoTile
            title="ITM probability"
            body={`Delta is commonly used as a quick proxy for the probability of expiring ITM — here roughly ${pctItm}%. This is an approximation, not a guarantee.`}
          />
          <InfoTile
            title="Equivalent shares"
            body={`A delta of ${delta.toFixed(2)} means you have the equivalent directional exposure of ${pctItm} shares per contract (each contract = 100 shares).`}
          />
        </div>
      </div>

      {/* Buyer vs Seller */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Perspective
          label="Buyer"
          icon={<TrendingUp className="w-4 h-4" />}
          color="blue"
          delta={delta}
          points={[
            {
              heading: isCall ? "You profit as delta rises" : "You profit as delta falls",
              body: isCall
                ? `A rising stock price pushes delta toward 1, increasing the option's value. Starting at ${delta.toFixed(2)}, there's more room to gain if the stock rallies.`
                : `A falling stock price pushes put delta toward −1, increasing the option's value. Starting at ${delta.toFixed(2)}, puts gain more value as the stock drops.`,
            },
            {
              heading: "Delta erosion risk",
              body: `If the stock moves against you, delta shrinks toward zero and your option loses value quickly — especially for OTM options like this one near ${delta.toFixed(2)}.`,
            },
            {
              heading: "Leverage",
              body: `Paying a fraction of the stock price for ~${pctItm}% of the directional exposure gives you leverage — but theta works against you every day.`,
            },
          ]}
        />
        <Perspective
          label="Seller"
          icon={<TrendingDown className="w-4 h-4" />}
          color="violet"
          delta={delta}
          points={[
            {
              heading: "Short delta exposure",
              body: isCall
                ? `Selling this call gives you −${delta.toFixed(2)} delta. You profit if the stock stays flat or falls, but lose as it rises above the strike.`
                : `Selling this put gives you +${abs.toFixed(2)} delta. You profit if the stock stays flat or rises, but lose as it falls below the strike.`,
            },
            {
              heading: "Assignment risk",
              body: `The ~${pctItm}% ITM probability also reflects assignment risk. ${abs >= 0.5 ? "At this delta, assignment at expiration is more likely than not." : "Below 0.50 delta, assignment is less likely but not impossible."}`,
            },
            {
              heading: "Delta hedging",
              body: "Market makers and sophisticated sellers delta-hedge by trading the underlying to stay directionally neutral. This is more actively managed as delta approaches 0.50.",
            },
          ]}
        />
      </div>
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
  delta: number;
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
