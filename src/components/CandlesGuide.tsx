import { cn } from "@/lib/utils";
import { CandlestickChart } from "lucide-react";

function SectionHeader({
  icon,
  title,
  subtitle,
}: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="p-2 rounded-lg bg-muted shrink-0 text-muted-foreground">{icon}</div>
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

function BulletList({ items }: { items: { label: string; body: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2 text-xs">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
          <span>
            <span className="font-semibold">{item.label} — </span>
            <span className="text-muted-foreground">{item.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <div className="h-px bg-border my-2" />;
}

// ─── Candle SVG diagrams ──────────────────────────────────────────────────────

function CandleShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="rounded-lg border overflow-hidden">
      <div className="px-3 py-1.5 border-b bg-muted/40 text-center">
        <p className="text-[11px] font-semibold text-muted-foreground">{title}</p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/60 p-3 flex justify-center">{children}</div>
    </figure>
  );
}

function BullishCandle() {
  return (
    <CandleShell title="Bullish (Green) Candle">
      <svg viewBox="0 0 80 140" className="w-20 h-36" aria-hidden="true">
        {/* Upper wick */}
        <line
          x1="40"
          y1="10"
          x2="40"
          y2="35"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body */}
        <rect x="22" y="35" width="36" height="70" rx="2" fill="#10b981" />
        {/* Lower wick */}
        <line
          x1="40"
          y1="105"
          x2="40"
          y2="130"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Labels */}
        <text x="64" y="14" fontSize="8" fill="#94a3b8">
          High
        </text>
        <text x="64" y="39" fontSize="8" fill="#10b981">
          Close
        </text>
        <text x="64" y="109" fontSize="8" fill="#10b981">
          Open
        </text>
        <text x="64" y="133" fontSize="8" fill="#94a3b8">
          Low
        </text>
      </svg>
    </CandleShell>
  );
}

function BearishCandle() {
  return (
    <CandleShell title="Bearish (Red) Candle">
      <svg viewBox="0 0 80 140" className="w-20 h-36" aria-hidden="true">
        {/* Upper wick */}
        <line
          x1="40"
          y1="10"
          x2="40"
          y2="35"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body */}
        <rect x="22" y="35" width="36" height="70" rx="2" fill="#f43f5e" />
        {/* Lower wick */}
        <line
          x1="40"
          y1="105"
          x2="40"
          y2="130"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Labels */}
        <text x="64" y="14" fontSize="8" fill="#94a3b8">
          High
        </text>
        <text x="64" y="39" fontSize="8" fill="#f43f5e">
          Open
        </text>
        <text x="64" y="109" fontSize="8" fill="#f43f5e">
          Close
        </text>
        <text x="64" y="133" fontSize="8" fill="#94a3b8">
          Low
        </text>
      </svg>
    </CandleShell>
  );
}

function DojiCandle() {
  return (
    <CandleShell title="Doji — Indecision">
      <svg viewBox="0 0 80 140" className="w-20 h-36" aria-hidden="true">
        {/* Upper wick */}
        <line
          x1="40"
          y1="10"
          x2="40"
          y2="68"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body (very thin — open ≈ close) */}
        <rect x="22" y="68" width="36" height="4" rx="1" fill="#94a3b8" />
        {/* Lower wick */}
        <line
          x1="40"
          y1="72"
          x2="40"
          y2="130"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Labels */}
        <text x="64" y="14" fontSize="8" fill="#94a3b8">
          High
        </text>
        <text x="50" y="67" fontSize="8" fill="#94a3b8">
          Open≈Close
        </text>
        <text x="64" y="133" fontSize="8" fill="#94a3b8">
          Low
        </text>
      </svg>
    </CandleShell>
  );
}

function HammerCandle() {
  return (
    <CandleShell title="Hammer — Bullish Reversal">
      <svg viewBox="0 0 80 140" className="w-20 h-36" aria-hidden="true">
        {/* Small upper wick */}
        <line
          x1="40"
          y1="25"
          x2="40"
          y2="35"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body */}
        <rect x="22" y="35" width="36" height="28" rx="2" fill="#10b981" />
        {/* Long lower wick */}
        <line
          x1="40"
          y1="63"
          x2="40"
          y2="130"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Labels */}
        <text x="3" y="40" fontSize="7.5" fill="#10b981">
          Body
        </text>
        <text x="3" y="100" fontSize="7.5" fill="#94a3b8">
          Long
        </text>
        <text x="3" y="110" fontSize="7.5" fill="#94a3b8">
          lower
        </text>
        <text x="3" y="120" fontSize="7.5" fill="#94a3b8">
          wick
        </text>
      </svg>
    </CandleShell>
  );
}

function ShootingStarCandle() {
  return (
    <CandleShell title="Shooting Star — Bearish Reversal">
      <svg viewBox="0 0 80 140" className="w-20 h-36" aria-hidden="true">
        {/* Long upper wick */}
        <line
          x1="40"
          y1="10"
          x2="40"
          y2="77"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body */}
        <rect x="22" y="77" width="36" height="28" rx="2" fill="#f43f5e" />
        {/* Small lower wick */}
        <line
          x1="40"
          y1="105"
          x2="40"
          y2="115"
          stroke="#f43f5e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Labels */}
        <text x="3" y="22" fontSize="7.5" fill="#94a3b8">
          Long
        </text>
        <text x="3" y="32" fontSize="7.5" fill="#94a3b8">
          upper
        </text>
        <text x="3" y="42" fontSize="7.5" fill="#94a3b8">
          wick
        </text>
        <text x="3" y="93" fontSize="7.5" fill="#f43f5e">
          Body
        </text>
      </svg>
    </CandleShell>
  );
}

function MarubozuCandle() {
  return (
    <CandleShell title="Marubozu — No Wicks, Strong Conviction">
      <svg viewBox="0 0 80 140" className="w-20 h-36" aria-hidden="true">
        {/* Body only — no wicks */}
        <rect x="22" y="20" width="36" height="100" rx="2" fill="#10b981" />
        {/* Labels */}
        <text x="64" y="25" fontSize="8" fill="#10b981">
          Open
        </text>
        <text x="64" y="123" fontSize="8" fill="#10b981">
          Close
        </text>
        <text
          x="4"
          y="70"
          fontSize="7.5"
          fill="#94a3b8"
          textAnchor="middle"
          transform="rotate(-90,10,70)"
        >
          No wicks
        </text>
      </svg>
    </CandleShell>
  );
}

export function CandlesGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* 1. Anatomy */}
      <section id="candles-anatomy">
        <SectionHeader
          icon={<CandlestickChart className="w-4 h-4" />}
          title="Anatomy of a Candlestick"
          subtitle="Every candle encodes four prices — open, high, low, close — in a single visual unit. Learning to read them quickly is the foundation of price action analysis."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Candlestick charts originated in 18th-century Japan and remain the most widely used
            chart type among traders. Each candle represents a single time period — a 1-minute
            candle on an intraday chart, a daily candle on a swing chart, a weekly candle on a macro
            chart. The same logic applies regardless of timeframe.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <BullishCandle />
            <BearishCandle />
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2.5 text-xs">
            <p className="font-semibold">The four prices</p>
            <div className="space-y-1.5">
              <p>
                <span className="font-medium">Open — </span>
                <span className="text-muted-foreground">
                  the first trade of the period. On a bullish candle, the open is at the bottom of
                  the body. On a bearish candle, it's at the top.
                </span>
              </p>
              <p>
                <span className="font-medium">Close — </span>
                <span className="text-muted-foreground">
                  the last trade of the period. The single most important price on the candle — it
                  represents the consensus of all buyers and sellers by the end of the session.
                </span>
              </p>
              <p>
                <span className="font-medium">High — </span>
                <span className="text-muted-foreground">
                  the highest price reached during the period, including the wick. If there's no
                  upper wick, the high equals the open or close.
                </span>
              </p>
              <p>
                <span className="font-medium">Low — </span>
                <span className="text-muted-foreground">
                  the lowest price reached during the period. If there's no lower wick, the low
                  equals the open or close.
                </span>
              </p>
            </div>
          </div>

          <BulletList
            items={[
              {
                label: "Body size signals conviction",
                body: "A wide body means price moved significantly from open to close — buyers or sellers were in control. A narrow body means the session ended near where it started — indecision or equilibrium.",
              },
              {
                label: "Wick length signals rejection",
                body: "A long wick means price moved far in that direction but was pushed back before the close. A long upper wick says buyers pushed price up but sellers overwhelmed them. A long lower wick says sellers pushed price down but buyers stepped in.",
              },
              {
                label: "The close is the verdict",
                body: "Where a candle closes matters far more than where it traded intraperiod. A candle that dips to a new low but closes strong is showing buyer absorption. A candle that rallies to a new high but closes weak is showing seller distribution.",
              },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* 2. Key patterns */}
      <section id="candles-patterns">
        <SectionHeader
          icon={<CandlestickChart className="w-4 h-4" />}
          title="Key Single-Candle Patterns"
          subtitle="Single candles at the right location — near a key level, after a strong trend — carry meaningful information about who is winning the battle between buyers and sellers."
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <DojiCandle />
              <p className="text-xs text-muted-foreground leading-relaxed px-1">
                Open and close are at (or very near) the same price. Neither buyers nor sellers won
                the session. At a support or resistance level, a doji signals that the current trend
                may be exhausted. Context is everything — a doji in the middle of a range means
                nothing.
              </p>
            </div>
            <div className="space-y-2">
              <MarubozuCandle />
              <p className="text-xs text-muted-foreground leading-relaxed px-1">
                No upper or lower wicks — price opened at one extreme and closed at the other with
                no retracement. This is the strongest single-candle conviction signal. A bullish
                marubozu after a breakout confirms strong buying; a bearish marubozu after a
                breakdown confirms strong selling.
              </p>
            </div>
            <div className="space-y-2">
              <HammerCandle />
              <p className="text-xs text-muted-foreground leading-relaxed px-1">
                Small body at the top, long lower wick (at least 2× the body). Sellers pushed price
                far down during the session but buyers recovered most of the loss by the close.
                Bullish reversal signal when it appears after a downtrend or at a support level. The
                color matters — a green hammer is stronger than a red one.
              </p>
            </div>
            <div className="space-y-2">
              <ShootingStarCandle />
              <p className="text-xs text-muted-foreground leading-relaxed px-1">
                Small body at the bottom, long upper wick (at least 2× the body). Buyers pushed
                price far up during the session but sellers overwhelmed them by the close. Bearish
                reversal signal when it appears after an uptrend or at a resistance level. The
                mirror of the hammer — and equally powerful at the right location.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* 3. Wicks in depth */}
      <section id="candles-wicks">
        <SectionHeader
          icon={<CandlestickChart className="w-4 h-4" />}
          title="Understanding Wicks (Shadows)"
          subtitle="Wicks tell you where the market went but couldn't stay. They reveal the presence of motivated buyers or sellers at specific price levels."
        />
        <div className="space-y-4">
          <BulletList
            items={[
              {
                label: "Upper wick = sellers rejected the high",
                body: "Price went up to a level, found sellers (or stop-loss triggers, or resistance), and was pushed back down before the close. The longer the upper wick, the more decisive the rejection. A series of candles with long upper wicks at the same price level is a strong resistance signal.",
              },
              {
                label: "Lower wick = buyers rejected the low",
                body: "Price dropped to a level, found buyers (or short-covering, or support), and recovered before the close. A long lower wick at a prior support level confirms that level is still active. A series of candles with long lower wicks forming a floor is a classic accumulation pattern.",
              },
              {
                label: "Wick-to-body ratio matters",
                body: "A wick that is 2× the body length or more is considered significant. A wick equal to the body length is neutral. Small wicks (shorter than half the body) are essentially noise — the market tested that direction briefly but didn't signal a meaningful rejection.",
              },
              {
                label: "Wicks at key levels are the signal",
                body: "A long wick in the middle of a range doesn't mean much. The same wick at a prior swing high, a moving average, a round number, or a gap fill level is meaningful — it shows you exactly where participants chose to push back. Mark these wick lows and highs as future reference levels.",
              },
              {
                label: "Stop hunts and wick fakeouts",
                body: "Institutional traders and algorithms know where retail stop-losses cluster — just below support or just above resistance. A wick that briefly breaks a well-known level, triggers stops, then immediately reverses is a stop hunt. The real tell is the speed of recovery: if price snaps back within one or two candles, the wick was a fakeout, not a genuine break.",
              },
            ]}
          />

          <Callout color="amber" title="Wicks at the open and close of key sessions">
            Pay special attention to wicks that form at the open of the regular session (9:30 AM)
            and in the final 30 minutes before close. Opening wicks often mark the day's extreme as
            the initial imbalance gets absorbed. Closing wicks show last-minute rejection — a long
            upper wick into the close means sellers came in hard before the bell.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 4. Multi-candle patterns */}
      <section id="candles-multi">
        <SectionHeader
          icon={<CandlestickChart className="w-4 h-4" />}
          title="Multi-Candle Patterns"
          subtitle="Single candles give you clues. Two or three candles together give you a narrative — the sequence of who controlled each session and what changed."
        />
        <div className="space-y-4">
          <BulletList
            items={[
              {
                label: "Engulfing pattern",
                body: "A candle whose body completely engulfs the prior candle's body. A bullish engulfing is a large green candle following a red candle, completely covering it. It signals a decisive shift from sellers to buyers. The larger the engulfing candle relative to the one it swallows, the stronger the signal.",
              },
              {
                label: "Inside bar (harami)",
                body: "A candle whose entire body fits within the prior candle's body. The market compressed — volatility contracted. An inside bar after a strong trend candle signals a pause, not necessarily a reversal. A breakout from the inside bar's range (above its high for bullish, below its low for bearish) is the tradeable event.",
              },
              {
                label: "Three-candle reversal (morning/evening star)",
                body: "A three-candle pattern: a large candle in the trend direction, a small-bodied candle (doji or spinning top) that gaps slightly, then a large candle in the opposite direction that closes well into the first candle's body. The middle candle is the pivot. This is one of the highest-probability reversal patterns in technical analysis.",
              },
              {
                label: "Three soldiers / three crows",
                body: "Three consecutive bullish (or bearish) candles, each opening within the prior candle's body and closing at or near the high (or low). This pattern shows sustained directional pressure without pause — momentum confirmation in the direction of the trend.",
              },
              {
                label: "Tweezer tops and bottoms",
                body: "Two candles with the same high (tweezer top) or same low (tweezer bottom), usually of opposite colors. The identical extreme price shows that the market tested that level twice and was rejected both times — a precise double rejection. More reliable when the wicks are the source of the matching level rather than the bodies.",
              },
            ]}
          />

          <Callout color="violet" title="Patterns need context">
            None of these patterns work in isolation. A bullish engulfing in a downtrend at no
            particular level is far less meaningful than the same pattern at a prior swing low,
            after a defined downmove, with declining volume on the preceding red candles. The
            pattern is the trigger — the context is what gives it probability.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 5. Options implications */}
      <section id="candles-options">
        <SectionHeader
          icon={<CandlestickChart className="w-4 h-4" />}
          title="Candles & Options — What to Actually Watch"
          subtitle="Candlestick patterns tell you about short-term momentum and rejection. Here's how they connect to options entry and exit timing."
        />
        <div className="space-y-3">
          <BulletList
            items={[
              {
                label: "Daily close is your primary signal",
                body: "Options positions are directional bets that play out over days to weeks. Daily candle closes — not intraday moves — are what matter for confirming or invalidating your thesis. A strong daily close above resistance is an entry signal. An intraday break that fades by close is not.",
              },
              {
                label: "Rejection wicks at your target level = don't enter",
                body: "If the stock is approaching a level you planned to buy calls at, but forms a shooting star or upper wick rejection there, that's a warning. The level is holding as resistance. Wait for a clean close above, not a wick above.",
              },
              {
                label: "Wide bullish candles on volume = ride the trend",
                body: "A wide-bodied bullish marubozu or near-marubozu on elevated volume is a momentum confirmation signal. If you're already in calls, this is not the time to take profit — it's the time to let the position run. The market is showing conviction.",
              },
              {
                label: "Doji after a run = manage your position",
                body: "A doji appearing after three or four consecutive trend candles is a pause signal. It's not necessarily a reversal, but it warrants tightening your mental stop or reducing position size if you're near expiration. Indecision candles reduce your edge.",
              },
              {
                label: "Long wicks against your position = reassess",
                body: "If you're long calls and the stock prints a candle with a long upper wick closing near the low, sellers are asserting control. This is not a hold-and-hope situation — it's a sign to revisit your thesis and check whether the trade structure still makes sense.",
              },
            ]}
          />

          <Callout
            color="blue"
            title="Use the daily chart for direction, lower timeframes for timing"
          >
            The daily candle gives you the trade thesis. The 15-minute or hourly candle gives you
            the entry timing. Don't enter options based on a 1-minute engulfing pattern — but do use
            a 15-minute bullish engulfing at a key level as the precise entry trigger after the
            daily chart has given you the directional read.
          </Callout>
        </div>
      </section>
    </div>
  );
}
