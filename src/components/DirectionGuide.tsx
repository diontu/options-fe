import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Eye,
  Layers,
  Minus,
  Newspaper,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

// ─── Shared primitives ────────────────────────────────────────────────────────

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

// ─── Trend Types section ──────────────────────────────────────────────────────

function TrendCard({
  icon,
  label,
  color,
  structure,
  bias,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  color: "emerald" | "rose" | "amber";
  structure: string;
  bias: string;
  description: string;
}) {
  const border = {
    emerald: "border-emerald-200 dark:border-emerald-800",
    rose: "border-rose-200 dark:border-rose-800",
    amber: "border-amber-200 dark:border-amber-700",
  }[color];
  const iconColor = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    rose: "text-rose-600 dark:text-rose-400",
    amber: "text-amber-600 dark:text-amber-400",
  }[color];
  const labelColor = {
    emerald: "text-emerald-700 dark:text-emerald-300",
    rose: "text-rose-700 dark:text-rose-300",
    amber: "text-amber-700 dark:text-amber-300",
  }[color];

  return (
    <div className={cn("rounded-lg border p-4 space-y-3", border)}>
      <div className={cn("flex items-center gap-2 font-semibold text-sm", labelColor)}>
        <span className={iconColor}>{icon}</span>
        {label}
      </div>
      <div className="space-y-1.5 text-xs">
        <p>
          <span className="font-medium text-foreground">Structure: </span>
          <span className="text-muted-foreground">{structure}</span>
        </p>
        <p>
          <span className="font-medium text-foreground">Options bias: </span>
          <span className="text-muted-foreground">{bias}</span>
        </p>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Moving Average section ───────────────────────────────────────────────────

function MARow({
  name,
  period,
  use,
  signal,
}: { name: string; period: string; use: string; signal: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-4 py-3 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">{name}</span>
        <span className="text-[10px] text-muted-foreground bg-muted rounded px-1.5 py-0.5">
          {period}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="text-foreground font-medium">Use: </span>
        {use}
      </p>
      <p className="text-xs text-muted-foreground">
        <span className="text-foreground font-medium">Signal: </span>
        {signal}
      </p>
    </div>
  );
}

// ─── Confirmation checklist ───────────────────────────────────────────────────

function ConfirmRow({ check, green, red }: { check: string; green: string; red: string }) {
  return (
    <div className="rounded-lg border bg-muted/20 px-4 py-3 space-y-2">
      <p className="text-xs font-semibold">{check}</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex gap-1.5 items-start">
          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-muted-foreground">{green}</span>
        </div>
        <div className="flex gap-1.5 items-start">
          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
          <span className="text-muted-foreground">{red}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function DirectionGuide() {
  return (
    <div className="space-y-10">
      {/* 1. Why direction matters */}
      <section>
        <SectionHeader
          icon={<Eye className="w-4 h-4" />}
          title="Why Direction Is the First Question"
          subtitle="Options are directional instruments with a time limit. Getting the direction wrong is the single most common reason trades fail — more so than poor strike selection or bad timing."
        />
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            A call option on a stock in a strong downtrend can expire worthless even if the stock
            temporarily bounces. A put in a roaring uptrend faces the same fate. Before worrying
            about IV, delta, or strike price, you need a clear read on where the underlying is going
            — and on what timeframe.
          </p>
          <Callout color="amber" title="Core principle">
            Direction on the <strong>daily or weekly chart</strong> defines your bias. Direction on
            the <strong>intraday chart</strong> helps you time the entry. Never trade against the
            higher timeframe trend without a very specific reason.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 2. The three market states */}
      <section>
        <SectionHeader
          icon={<TrendingUp className="w-4 h-4" />}
          title="The Three Market States"
          subtitle="Every stock is in one of three conditions at any given time. Identifying which one you're in before entering is non-negotiable."
        />
        <div className="grid grid-cols-1 gap-3">
          <TrendCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Uptrend"
            color="emerald"
            structure="Higher highs (HH) and higher lows (HL) on a consistent basis"
            bias="Calls, call spreads, or cash-secured puts at support to acquire shares"
            description="Price makes a new swing high, pulls back but holds above the prior swing low, then pushes to another new high. Each pullback is a potential entry. The trend is intact as long as the most recent higher low holds."
          />
          <TrendCard
            icon={<TrendingDown className="w-4 h-4" />}
            label="Downtrend"
            color="rose"
            structure="Lower highs (LH) and lower lows (LL) forming a staircase down"
            bias="Puts, put spreads, or bear call spreads at resistance"
            description="Price makes a new swing low, bounces but fails to reclaim the prior swing high, then breaks to a new low. Each bounce into resistance is a potential short entry. The trend is intact as long as the most recent lower high holds."
          />
          <TrendCard
            icon={<Minus className="w-4 h-4" />}
            label="Ranging / Choppy"
            color="amber"
            structure="Price oscillating between a defined support floor and resistance ceiling"
            bias="Avoid directional options; favour premium selling (iron condors, strangles) or wait for a breakout"
            description="No sustained trend in either direction. Price bounces between two levels. Directional options bleed premium here without moving enough to overcome theta. The edge belongs to sellers, not buyers."
          />
        </div>
      </section>

      <Divider />

      {/* 3. Market structure */}
      <section>
        <SectionHeader
          icon={<Layers className="w-4 h-4" />}
          title="Reading Market Structure"
          subtitle="Market structure is the foundation — it's what the price action itself is telling you, before any indicator."
        />
        <div className="space-y-3">
          <BulletList
            items={[
              {
                label: "Swing highs and lows",
                body: "A swing high is a peak with lower prices on both sides. A swing low is a trough with higher prices on both sides. Connecting them tells you the trend's architecture.",
              },
              {
                label: "Break of structure (BOS)",
                body: "A confirmed break above a prior swing high (in a downtrend) or below a prior swing low (in an uptrend) signals a potential trend change. Wait for a candle close beyond the level — not just a wick.",
              },
              {
                label: "Change of character (ChoCh)",
                body: "The first time price breaks the opposite structure after a trend — e.g., making a higher high in a downtrend — this is a change of character. It doesn't confirm a new trend but warns you the old one may be ending.",
              },
              {
                label: "Internal vs. external structure",
                body: "External structure is the major swing points visible on the daily chart. Internal structure is the smaller swings within each leg. Trade in the direction of external structure; use internal structure for entry timing.",
              },
            ]}
          />
          <Callout color="blue" title="Practical rule">
            An uptrend is broken when price closes below the <strong>most recent higher low</strong>
            . A downtrend is broken when price closes above the{" "}
            <strong>most recent lower high</strong>. Until that happens, the trend is still active.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 4. Moving averages */}
      <section>
        <SectionHeader
          icon={<Activity className="w-4 h-4" />}
          title="Moving Averages as Trend Filters"
          subtitle="Moving averages don't predict direction — they confirm it by smoothing out noise. Use them as a filter, not as a signal in isolation."
        />
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            <MARow
              name="20 EMA"
              period="Short-term"
              use="Momentum and short-term trend direction"
              signal="Price above 20 EMA = short-term bullish. Price crossing below = momentum shift warning."
            />
            <MARow
              name="50 EMA"
              period="Medium-term"
              use="Primary trend filter for swing trades"
              signal="The most widely watched level. Price holding above = trend intact. Break below = caution."
            />
            <MARow
              name="200 SMA"
              period="Long-term"
              use="Macro trend filter and institutional reference"
              signal="Above 200 SMA = bull market regime. Below = bear market regime. Strong mean-reversion magnet."
            />
          </div>
          <Callout color="violet" title="MA stack — reading alignment">
            When 20 EMA &gt; 50 EMA &gt; 200 SMA and price is above all three, the trend is aligned
            across all timeframes — the strongest possible uptrend configuration. The reverse (price
            below all three, MAs stacked bearishly) is the strongest downtrend signal. Any other
            configuration signals transition or chop.
          </Callout>
          <Callout color="amber" title="Common mistake">
            Do not trade MA crossovers in real-time. By the time the 20 crosses the 50, most of the
            move has already happened. Use MAs to confirm the trend you identified through
            structure, not to generate entries.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 5. Timeframe alignment */}
      <section>
        <SectionHeader
          icon={<BarChart2 className="w-4 h-4" />}
          title="Timeframe Alignment — Top-Down Analysis"
          subtitle="Every trade should be evaluated from the highest timeframe down. Disagreement between timeframes is a warning sign."
        />
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              {
                tf: "Weekly",
                role: "Macro bias",
                question:
                  "Is the stock in a multi-week uptrend or downtrend? Where are the major support and resistance zones?",
              },
              {
                tf: "Daily",
                role: "Trend direction",
                question:
                  "Is the daily structure bullish or bearish? Are MAs aligned? This is your primary trading timeframe.",
              },
              {
                tf: "1H / 4H",
                role: "Entry timing",
                question:
                  "Is there a pullback to a key level? Is momentum turning in the direction of the daily trend?",
              },
            ].map(({ tf, role, question }) => (
              <div key={tf} className="rounded-lg border bg-muted/30 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{tf}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted rounded px-1.5 py-0.5">
                    {role}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{question}</p>
              </div>
            ))}
          </div>
          <Callout color="blue" title="The alignment rule">
            Only take directional options trades when the{" "}
            <strong>weekly, daily, and intraday</strong> charts all agree on the direction. Two out
            of three is marginal. One out of three is gambling.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 6. Momentum confirmation */}
      <section>
        <SectionHeader
          icon={<ArrowUpRight className="w-4 h-4" />}
          title="Momentum Confirmation"
          subtitle="Trend direction tells you where price is going. Momentum tells you how strongly it's getting there — and whether it's starting to tire."
        />
        <div className="space-y-3">
          <BulletList
            items={[
              {
                label: "RSI (14)",
                body: "Above 50 in an uptrend confirms bullish momentum. Below 50 in a downtrend confirms bearish momentum. RSI divergence — price makes a new high but RSI does not — is a warning that momentum is fading even if price hasn't reversed yet.",
              },
              {
                label: "MACD",
                body: "The MACD histogram shrinking while price is still trending signals weakening momentum. A histogram that's expanding confirms the trend has energy. Crossovers are lagging — use them to confirm, not to initiate.",
              },
              {
                label: "Volume",
                body: "Trend moves should be accompanied by expanding volume. Pullbacks should come on declining volume. A trend move on low volume or a reversal candle on high volume are both warnings the move may not sustain.",
              },
              {
                label: "Price action",
                body: "Wide-bodied candles in the trend direction show conviction. Small-bodied candles or wicks against the trend show hesitation. A series of doji or spinning tops at a key level signals indecision — not a time to enter aggressively.",
              },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* 7. Confirmation checklist */}
      <section>
        <SectionHeader
          icon={<ArrowDownRight className="w-4 h-4" />}
          title="Direction Confirmation Checklist"
          subtitle="Run through this before committing to a directional bias on any ticker. Green means the evidence supports the direction; red means it contradicts or is absent."
        />
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1 text-[10px] font-semibold text-muted-foreground px-4 mb-1">
            <span className="text-emerald-600">Bullish</span>
            <span className="text-rose-500">Bearish</span>
          </div>
          <ConfirmRow
            check="Market structure"
            green="Higher highs and higher lows on daily chart"
            red="Lower highs and lower lows — downtrend intact"
          />
          <ConfirmRow
            check="Price vs. moving averages"
            green="Price above 20, 50, and 200 EMA/SMA — all aligned"
            red="Price below key MAs or MAs crossing bearishly"
          />
          <ConfirmRow
            check="Timeframe alignment"
            green="Weekly, daily, and intraday all trending the same direction"
            red="Timeframes disagreeing — weekly up but daily breaking down"
          />
          <ConfirmRow
            check="RSI momentum"
            green="RSI above 50 and rising, no bearish divergence"
            red="RSI below 50, or divergence forming at a new price high"
          />
          <ConfirmRow
            check="Volume"
            green="Up moves on expanding volume, pullbacks on declining volume"
            red="Up moves on thin volume, selloffs on heavy volume"
          />
          <ConfirmRow
            check="Trend move quality"
            green="Wide bullish candles, small pullback candles, clean structure"
            red="Overlapping candles, large wicks, choppy price action"
          />
        </div>
        <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4 text-xs space-y-1.5">
          <p className="font-semibold">Interpreting your score</p>
          <p className="text-muted-foreground">
            <span className="text-emerald-600 font-medium">5–6 green:</span> Strong directional
            conviction — full size is warranted.
          </p>
          <p className="text-muted-foreground">
            <span className="text-amber-500 font-medium">3–4 green:</span> Directional bias exists
            but is uncertain — reduce size or wait for a cleaner setup.
          </p>
          <p className="text-muted-foreground">
            <span className="text-rose-500 font-medium">0–2 green:</span> No clear direction — do
            not take a directional options trade. Wait or sell premium instead.
          </p>
        </div>
      </section>

      <Divider />

      {/* 8. Forward expectations */}
      <section>
        <SectionHeader
          icon={<Newspaper className="w-4 h-4" />}
          title="Markets Price the Future, Not the Present"
          subtitle="Price moves in anticipation of events — not in reaction to them. By the time the news is public, the market has already moved."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            The stock market is a discounting mechanism. Participants are constantly placing bets on
            what they expect to happen — earnings beats, rate cuts, product launches, macro shifts —
            and price reflects that aggregated expectation in real time. When the actual event
            arrives, the only thing that matters is whether the outcome is{" "}
            <em>better or worse than what was already priced in</em>.
          </p>

          {/* Buy the rumor sell the news */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <p className="text-xs font-semibold">Buy the Rumor, Sell the News</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This is the most well-known expression of forward pricing. A stock rallies for weeks
              ahead of a product launch or earnings date as traders position for a positive outcome.
              When the event arrives — even if the result is good — there are no more buyers left to
              push it higher. The traders who bought the rumor now sell into the news, and price
              drops. The catalyst was real. The expectations were already in the price.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Callout color="emerald" title="Scenario A — Not priced in">
                Stock has been flat or declining into earnings. Expectations are low. A strong beat
                causes a genuine re-rating — price surges because the result was{" "}
                <strong>better than what was priced in</strong>.
              </Callout>
              <Callout color="rose" title="Scenario B — Already priced in">
                Stock has run up 30% into earnings. Expectations are euphoric. Even a strong beat
                produces a sell-off because the result wasn't{" "}
                <strong>better than the optimism already embedded in price</strong>.
              </Callout>
            </div>
          </div>

          {/* How to read what's priced in */}
          <div className="space-y-2">
            <p className="text-xs font-semibold">How to Read What's Already Priced In</p>
            <BulletList
              items={[
                {
                  label: "Price action leading into the event",
                  body: "A stock that has already rallied 20–40% into a catalyst has priced in a lot of good news. The more extended it is, the higher the bar the actual event needs to clear. A stock that hasn't moved is pricing in nothing — any positive surprise creates room to run.",
                },
                {
                  label: "Implied volatility level",
                  body: "IV spikes before known events (earnings, FDA dates, Fed meetings) because the market is pricing in the uncertainty of the outcome. Elevated IV going into an event signals that a large move is expected — but also that premium is expensive for buyers.",
                },
                {
                  label: "Analyst consensus and guidance revisions",
                  body: "When analysts have already raised price targets and estimates into an event, expectations are elevated. A result that merely meets consensus is not a beat relative to what's priced in — it needs to meaningfully exceed the whisper number.",
                },
                {
                  label: "Post-event price reaction",
                  body: "How a stock reacts to news is more informative than the news itself. A stock that sells off on great earnings is telling you expectations were too high and insiders or large players are distributing. A stock that holds or rallies on bad news is showing relative strength — the bad news was already in the price.",
                },
              ]}
            />
          </div>

          {/* Implications for options */}
          <Callout color="violet" title="Implications for options traders">
            <div className="space-y-2">
              <p>
                <strong>IV crush:</strong> After the event resolves, the uncertainty disappears and
                IV collapses — often by 40–60%. If you bought calls before earnings and the stock
                moves up but IV drops sharply, your position can still lose money. The event being
                priced in includes the volatility premium, not just direction.
              </p>
              <p>
                <strong>Directionality of the move vs. directionality of the trade:</strong> A stock
                can beat earnings and drop. A stock can miss and rally. The direction of the
                post-event move is determined by expectations minus reality — not by the absolute
                quality of the result. Always ask: <em>what is this stock pricing in right now?</em>
              </p>
              <p>
                <strong>The cleanest trades happen before the expectation forms:</strong> Entering a
                position early — before the stock has already run into the catalyst — gives you the
                best risk/reward. You're buying before the crowd prices in the good news, so you
                have less premium risk, lower IV, and a lower entry price.
              </p>
            </div>
          </Callout>

          {/* The post-event tell */}
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4 space-y-2">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              The post-event reaction is the signal
            </p>
            <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
              When a stock gaps down on good earnings, that gap is not noise — it is the market
              repricing expectations downward despite positive results. This is one of the most
              reliable signals of a stock that was overowned and over-expected. The same logic
              applies in reverse: a stock that gaps up on a mixed or negative report is showing you
              that the bad news was already priced in and sellers are exhausted. Trade with the
              post-event reaction, not against it.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* 9. Common traps */}
      <section>
        <SectionHeader
          icon={<AlertTriangle className="w-4 h-4" />}
          title="Common Direction Mistakes"
          subtitle="Most directional errors aren't about the tools — they're about how traders apply them."
        />
        <div className="space-y-3">
          <BulletList
            items={[
              {
                label: "Confusing news with direction",
                body: "A positive earnings report does not mean the stock will trend up. If it was already priced in and the stock was extended, it may sell off hard. Direction comes from price structure, not from headlines.",
              },
              {
                label: "Fighting the higher timeframe",
                body: "A stock can bounce sharply on the hourly chart while still being in a weekly downtrend. Trading that bounce with calls is fighting the dominant trend. Bounces within downtrends are shorting opportunities, not buying opportunities.",
              },
              {
                label: "Treating range as a trend",
                body: "A stock that has been bouncing between two levels for weeks is not trending — it is ranging. Buying calls at the top of a range or puts at the bottom is trading against the range, not with a trend.",
              },
              {
                label: "Anchoring to a prior trend",
                body: "A stock that was in a strong uptrend for months can break down structurally. Once the structure shifts — lower highs, lower lows — the prior uptrend is no longer relevant. Update your bias to match current structure.",
              },
              {
                label: "Ignoring sector and market context",
                body: "Individual stocks rarely trend strongly against their sector or the broader market for long. A bullish setup in a stock in a bearish sector, during a bearish market, has much lower odds than the same setup in a bullish environment.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
