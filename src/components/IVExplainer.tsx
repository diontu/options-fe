import { cn } from "@/lib/utils";
import { ExternalLink, TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  impliedVolatility: number;
  symbol: string;
}

function ivLevel(iv: number): { label: string; color: string; description: string } {
  if (iv < 15)
    return {
      label: "Low",
      color: "text-emerald-600",
      description: "below-average uncertainty priced into the market",
    };
  if (iv < 25)
    return {
      label: "Moderate",
      color: "text-blue-600",
      description: "average uncertainty priced into the market",
    };
  if (iv < 40)
    return {
      label: "Elevated",
      color: "text-amber-600",
      description: "above-average uncertainty priced into the market",
    };
  return {
    label: "High",
    color: "text-rose-600",
    description: "significant uncertainty priced into the market",
  };
}

export function IVExplainer({ impliedVolatility, symbol }: Props) {
  const level = ivLevel(impliedVolatility);
  const ticker = symbol.trim().toUpperCase() || "AAPL";
  const mcUrl = `https://marketchameleon.com/Overview/${ticker}/IV/`;

  return (
    <div className="space-y-5">
      {/* IV summary */}
      <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
        <div className="mt-0.5 shrink-0">
          <span className={cn("text-2xl font-bold", level.color)}>
            {impliedVolatility.toFixed(1)}%
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-semibold">
            IV is currently <span className={level.color}>{level.label}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            There is {level.description}. Options premiums are priced accordingly.
          </p>
          {symbol.trim() && (
            <a
              href={mcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
            >
              View {ticker} IV history on Market Chameleon
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* IV Rank callout */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 space-y-2">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
          Why IV Rank matters more than IV alone
        </p>
        <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
          A raw IV of {impliedVolatility.toFixed(1)}% tells you the market's current expectation of
          volatility — but it says nothing about whether that number is cheap or expensive relative
          to this stock's own history. <strong>IV Rank (IVR)</strong> solves this by expressing
          today's IV as a percentile of its 52-week range:
        </p>
        <ul className="text-xs text-amber-900/80 dark:text-amber-200/80 space-y-1 pl-3">
          <li>
            <strong>IVR near 0</strong> — IV is at the low end of its historical range. Options are
            relatively cheap. Buyers get better value; sellers collect less premium.
          </li>
          <li>
            <strong>IVR near 100</strong> — IV is at the high end of its historical range. Options
            are relatively expensive. Sellers collect elevated premium; buyers overpay if IV
            reverts.
          </li>
        </ul>
        <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
          Two stocks can both have 30% IV but vastly different IVRs — one may be historically cheap,
          the other historically expensive. Always check IVR before deciding to buy or sell premium.
        </p>
        {symbol.trim() && (
          <a
            href={mcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline"
          >
            Check {ticker} IV Rank on Market Chameleon
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Buyer / Seller columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Perspective
          label="Buyer"
          icon={<TrendingUp className="w-4 h-4" />}
          color="blue"
          points={[
            {
              heading: "You pay the premium",
              body: "As a buyer you pay the option's premium upfront. High IV means you're paying more for the same strike and expiry — the market expects a larger move.",
            },
            {
              heading: "You want big moves",
              body: "Profit comes from the underlying moving far enough to exceed the premium paid. High IV raises the breakeven but also signals that large moves are expected.",
            },
            {
              heading: "IV crush is your enemy",
              body: `At ${impliedVolatility.toFixed(1)}% IV, if volatility drops after you buy, the option loses value even if price moves in your favor — this is called IV crush.`,
            },
            {
              heading: "When to buy",
              body: "Buying options is more attractive when IV is relatively low — you're paying less for the same potential payoff.",
            },
          ]}
        />

        <Perspective
          label="Seller"
          icon={<TrendingDown className="w-4 h-4" />}
          color="violet"
          points={[
            {
              heading: "You collect the premium",
              body: "As a seller you receive the premium immediately. High IV means you collect more — but the market is signaling the underlying may move significantly.",
            },
            {
              heading: "You want small moves",
              body: "Profit comes from the option expiring worthless or losing value over time. You benefit when the underlying stays within the expected range.",
            },
            {
              heading: "IV crush is your friend",
              body: `At ${impliedVolatility.toFixed(1)}% IV, if volatility drops after you sell, the option loses value quickly — even without much price movement. Theta and vega work in your favor.`,
            },
            {
              heading: "When to sell",
              body: "Selling options is more attractive when IV is relatively high — you're collecting more premium for the same obligation.",
            },
          ]}
        />
      </div>
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
