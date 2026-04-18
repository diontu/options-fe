import { cn } from "@/lib/utils";
import { BarChart2, TrendingDown, TrendingUp } from "lucide-react";

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

// ─── Day card ─────────────────────────────────────────────────────────────────

function DayCard({
  day,
  volumeLabel,
  volumeLevel,
  character,
  whatToExpect,
  optionsTip,
}: {
  day: string;
  volumeLabel: string;
  volumeLevel: "low" | "moderate" | "high" | "variable";
  character: string;
  whatToExpect: string[];
  optionsTip: string;
}) {
  const volumeStyle = {
    low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    moderate: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    high: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    variable: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  }[volumeLevel];

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="px-4 pt-3 pb-2.5 flex items-center justify-between border-b">
        <p className="text-sm font-semibold">{day}</p>
        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", volumeStyle)}>
          {volumeLabel}
        </span>
      </div>
      <div className="px-4 py-3 space-y-2.5 text-xs">
        <p className="text-muted-foreground leading-relaxed italic">{character}</p>
        <ul className="space-y-1.5">
          {whatToExpect.map((item) => (
            <li key={item} className="flex gap-2 text-muted-foreground">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="pt-1 border-t">
          <span className="font-medium text-foreground">Options — </span>
          <span className="text-muted-foreground">{optionsTip}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Volume bar chart (SVG) ───────────────────────────────────────────────────

function WeeklyVolumeChart() {
  const days = [
    { label: "Mon", height: 72, color: "#60a5fa" },
    { label: "Tue", height: 58, color: "#94a3b8" },
    { label: "Wed", height: 54, color: "#94a3b8" },
    { label: "Thu", height: 68, color: "#94a3b8" },
    { label: "Fri", height: 80, color: "#60a5fa" },
  ];
  const barW = 32;
  const gap = 16;
  const maxH = 90;
  const baseY = 105;
  const startX = 20;

  return (
    <figure className="rounded-lg border overflow-hidden">
      <div className="px-3 py-1.5 border-b bg-muted/40 text-center">
        <p className="text-[11px] font-semibold text-muted-foreground">
          Typical Weekly Volume Pattern
        </p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/60 p-3">
        <svg viewBox="0 0 260 130" className="w-full" aria-hidden="true">
          {/* Gridlines */}
          {[0.25, 0.5, 0.75, 1].map((pct) => {
            const y = baseY - maxH * pct;
            return (
              <line
                key={pct}
                x1="10"
                y1={y}
                x2="250"
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
            );
          })}
          {/* Baseline */}
          <line x1="10" y1={baseY} x2="250" y2={baseY} stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Bars */}
          {days.map((d, i) => {
            const x = startX + i * (barW + gap);
            const barH = (d.height / 100) * maxH;
            return (
              <g key={d.label}>
                <rect
                  x={x}
                  y={baseY - barH}
                  width={barW}
                  height={barH}
                  rx="3"
                  fill={d.color}
                  opacity="0.85"
                />
                <text
                  x={x + barW / 2}
                  y={baseY + 13}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#64748b"
                >
                  {d.label}
                </text>
              </g>
            );
          })}

          {/* Labels */}
          <text x="12" y={baseY - maxH + 4} fontSize="8" fill="#94a3b8">
            High
          </text>
          <text x="12" y={baseY - maxH * 0.5 + 4} fontSize="8" fill="#94a3b8">
            Mid
          </text>
          <text x="250" y="128" textAnchor="end" fontSize="8" fill="#cbd5e1">
            Day →
          </text>

          {/* Highlight Monday and Friday */}
          <text x="36" y={baseY - 72 - 6} textAnchor="middle" fontSize="8" fill="#3b82f6">
            ↑ Active
          </text>
          <text x="196" y={baseY - 80 - 6} textAnchor="middle" fontSize="8" fill="#3b82f6">
            ↑ Active
          </text>
        </svg>
      </div>
    </figure>
  );
}

// ─── Volume vs price diagram ──────────────────────────────────────────────────

function VolumeConfirmationChart({
  title,
  pricePoints,
  volHeights,
  priceColor,
  label,
}: {
  title: string;
  pricePoints: string;
  volHeights: number[];
  priceColor: string;
  label: string;
}) {
  const baseY = 95;
  const barW = 18;
  const gap = 10;
  const startX = 18;

  return (
    <figure className="rounded-lg border overflow-hidden">
      <div className="px-3 py-1.5 border-b bg-muted/40 text-center">
        <p className="text-[11px] font-semibold text-muted-foreground">{title}</p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/60 p-3">
        <svg viewBox="0 0 200 120" className="w-full" aria-hidden="true">
          {/* Price line */}
          <polyline
            points={pricePoints}
            stroke={priceColor}
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Baseline for volume */}
          <line x1="10" y1={baseY} x2="190" y2={baseY} stroke="#e2e8f0" strokeWidth="1" />
          {/* Volume bars */}
          {volHeights.map((h, i) => {
            const x = startX + i * (barW + gap);
            return (
              <rect
                key={`vol-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed static list
                  i
                }`}
                x={x}
                y={baseY - h}
                width={barW}
                height={h}
                rx="2"
                fill={priceColor}
                opacity="0.35"
              />
            );
          })}
          {/* Label */}
          <text x="10" y="113" fontSize="8" fill="#64748b">
            Vol
          </text>
          <text x="100" y="10" textAnchor="middle" fontSize="8" fill={priceColor}>
            {label}
          </text>
        </svg>
      </div>
    </figure>
  );
}

// ─── Guide ────────────────────────────────────────────────────────────────────

export function VolumeGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* 1. Does volume matter */}
      <section id="volume-matters">
        <SectionHeader
          icon={<BarChart2 className="w-4 h-4" />}
          title="Does Volume Actually Move Price?"
          subtitle="Volume doesn't cause price to move — but it tells you whether the players behind a move are real and whether the move is likely to continue."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Price moves when there is an imbalance between buyers and sellers. Volume is the measure
            of how many shares changed hands to create that imbalance. A move on high volume means
            many participants agreed to transact at that price — institutional money, funds, and
            informed traders are all participating. A move on low volume means only a few
            participants drove the price change — it may not reflect broad conviction and is more
            likely to reverse.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <VolumeConfirmationChart
              title="Trend with volume confirmation"
              pricePoints="20,70 50,55 80,40 110,28 140,18 170,10"
              volHeights={[22, 28, 32, 38, 42, 48]}
              priceColor="#10b981"
              label="Rising price + rising volume = confirmed"
            />
            <VolumeConfirmationChart
              title="Move without volume (suspect)"
              pricePoints="20,70 50,55 80,40 110,28 140,18 170,10"
              volHeights={[22, 18, 14, 10, 8, 6]}
              priceColor="#f59e0b"
              label="Rising price + falling volume = weak"
            />
          </div>

          <BulletList
            items={[
              {
                label: "High volume confirms the move",
                body: "When a stock breaks above resistance on 2–3× its average daily volume, institutions are participating — the move is more likely to sustain. When volume is thin on a breakout, the move is driven by fewer participants and is much more likely to fail and reverse.",
              },
              {
                label: "Low volume on pullbacks is bullish",
                body: "In an uptrend, pullbacks on declining volume show that sellers are not motivated — they're taking profits, not running from the stock. When volume dries up during a retracement, it signals the trend is healthy and buyers will likely step back in.",
              },
              {
                label: "High volume on a reversal candle is a warning",
                body: "A shooting star or bearish engulfing candle on 2× average volume at a resistance level is far more significant than the same candle on light volume. The volume confirms that motivated sellers are present at that price level, not just a small number of participants.",
              },
              {
                label: "Volume divergence is an early warning",
                body: "When price makes new highs but volume is declining across each successive high, fewer participants are buying the move. This divergence between price and volume is one of the earliest warnings that a trend is weakening before the price itself breaks down.",
              },
              {
                label: "Climax volume often marks a turning point",
                body: "Extraordinarily high volume — 5–10× the average — on a sharp move often signals a capitulation or blow-off top. All the motivated buyers (or sellers) have been satisfied at once, leaving no one left to push price further. The move often exhausts and reverses shortly after.",
              },
            ]}
          />

          <Callout color="blue" title="Volume is context, not a trigger">
            Never buy or sell based on volume alone. Volume tells you the quality of a price move
            after it has started — it doesn't predict which direction price will move. Use it to
            confirm entries that are already justified by price structure and trend, and to filter
            out low-conviction setups.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 2. Days of the week */}
      <section id="volume-days">
        <SectionHeader
          icon={<BarChart2 className="w-4 h-4" />}
          title="Volume by Day of the Week"
          subtitle="Each day of the trading week has a characteristic volume profile driven by institutional behavior, settlement cycles, and weekly option expirations."
        />
        <div className="space-y-4">
          <WeeklyVolumeChart />

          <div className="grid grid-cols-1 gap-3">
            <DayCard
              day="Monday"
              volumeLabel="Above average"
              volumeLevel="high"
              character="Institutional rebalancing and weekend gap resolution. The week's directional bias often gets established Monday."
              whatToExpect={[
                "Gaps from weekend news get resolved — watch whether the gap holds or fills in the first hour",
                "Fund managers deploy capital or reduce risk after reviewing weekend developments",
                "Monday's trend often carries into Tuesday; a Monday reversal of the prior week's trend is significant",
                "Options traders position for the week ahead, creating volume in near-term expiries",
              ]}
              optionsTip="Monday is a good day to initiate weekly or multi-week options positions — the week's thesis is forming and you have time for the trade to develop. Avoid chasing Monday gap moves in either direction; wait for confirmation the gap is holding."
            />

            <DayCard
              day="Tuesday"
              volumeLabel="Below average"
              volumeLevel="moderate"
              character="The quietest day of the week on average. Institutions have deployed Monday capital and are waiting for mid-week catalysts."
              whatToExpect={[
                "Continued follow-through from Monday's direction — if Monday was strongly bullish, Tuesday often grinds higher",
                "Lower volatility and tighter ranges than Monday or Friday",
                "Economic data releases (if scheduled) get digested; no major structural shifts without a catalyst",
                "Options premium decay is steady but not accelerated — theta works at its normal pace",
              ]}
              optionsTip="Tuesday is often the best day to buy options for a multi-day trade — IV has settled from Monday's open, the week's direction is clearer, and you have several days of potential movement ahead. Spreads tend to be tighter than Monday morning."
            />

            <DayCard
              day="Wednesday"
              volumeLabel="Below average"
              volumeLevel="moderate"
              character="Mid-week drift. Often the continuation of whichever direction Monday established, unless a catalyst interrupts. FOMC statements drop on Wednesdays."
              whatToExpect={[
                "Slow, directional drift continuing the week's bias — the path of least resistance usually holds until Thursday",
                "FOMC meetings (8 per year) end Wednesday at 2:00 PM ET with the statement and press conference — the most volatile non-earnings event in the calendar",
                "Mid-week earnings reports hit for companies that report mid-cycle",
                "CPI and PPI data often released Wednesday mornings — sharp 8:30 AM moves before the open",
              ]}
              optionsTip="On non-FOMC Wednesdays, position sizing is straightforward. On FOMC Wednesdays, treat it like an earnings event — IV on broad index options (SPY, QQQ) is elevated going in and collapses after the 2:00 PM statement. Buying options into FOMC is expensive; selling straddles the morning of and closing after the press conference is a classic theta strategy."
            />

            <DayCard
              day="Thursday"
              volumeLabel="Moderate to high"
              volumeLevel="high"
              character="Institutional activity picks up as funds rebalance ahead of the weekend. Weekly options expiration on some tickers. Most S&P 500 companies report earnings Thursday after close."
              whatToExpect={[
                "Volume increases as Friday positioning begins — institutions don't want to carry unhedged risk into the weekend",
                "Weekly options (0DTE and 1DTE) create elevated gamma in heavily traded names — large moves can be amplified",
                "Many earnings reports drop Thursday after close, creating Friday gap situations",
                "Jobless claims data released Thursday 8:30 AM ET — moves bond markets and rate-sensitive stocks",
                "Price action can be choppy as competing forces (earnings positioning, weekly expiration, institutional rebalancing) interact",
              ]}
              optionsTip="Thursday is a risky day to initiate new long options positions if earnings are that evening — you're paying peak IV for a binary event. For non-earnings setups, Thursday afternoon often offers cleaner entries for Friday momentum plays, particularly on stocks with bullish or bearish weekly structure."
            />

            <DayCard
              day="Friday"
              volumeLabel="Above average"
              volumeLevel="high"
              character="The second-highest volume day of the week. Monthly options expiration (third Friday) creates the highest volume of the month. Risk reduction into the weekend creates distinct patterns."
              whatToExpect={[
                "Monthly options expiration (third Friday) — massive volume as dealers and traders close or roll positions; stocks often pin near high open-interest strikes",
                "Risk-off into the weekend — institutions reduce position size before two days of potential news flow; this can cause Friday afternoon selling even in uptrends",
                "Earnings gap resolution — stocks that reported Thursday after close establish their post-event trend on Friday",
                "Window dressing at month-end — fund managers buy recent winners to show them in quarterly reports, creating artificial late-month buying",
                "0DTE (zero days to expiration) options on Friday are the highest-risk, highest-reward instruments — extreme gamma, decay to zero by 4 PM",
              ]}
              optionsTip="Expiration Friday is not a day to initiate new multi-week options positions — premiums are distorted by expiration mechanics. It's a day to close or roll existing positions and to observe which direction the market is leaning for the following week. If you're selling premium, Friday mornings on non-expiration weeks are good entries for the following week's theta decay."
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* 3. Relative volume */}
      <section id="volume-relative">
        <SectionHeader
          icon={<BarChart2 className="w-4 h-4" />}
          title="Relative Volume — The Number That Actually Matters"
          subtitle="Raw share count means nothing in isolation. A stock trading 5 million shares is high volume for a small-cap and low volume for a mega-cap. Relative volume puts it in context."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Relative volume (RVOL) compares today's current volume to the average volume for the
            same time of day over the past 10–20 sessions. An RVOL of 2.0 means the stock is trading
            at twice its normal pace for this point in the day — something unusual is driving
            participation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-xs font-semibold">RVOL &lt; 0.7</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Below-average participation. Moves are less reliable — avoid initiating new
                positions. Price may appear to break levels but lacks the volume to sustain it.
              </p>
            </div>
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                  RVOL 0.7–1.5
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Normal range. Moves in this range reflect everyday supply and demand — valid for
                trend-following but not signaling anything unusual.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  RVOL &gt; 2.0
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Institutional-level activity. Something is happening — news, a catalyst, or
                accumulation/distribution. Moves on this volume are high conviction and more likely
                to follow through.
              </p>
            </div>
          </div>

          <BulletList
            items={[
              {
                label: "Check RVOL before entering any breakout",
                body: "A stock breaking above a 3-month resistance on 3× average volume is one of the highest-probability setups in technical trading. The same break on 0.6× volume is more likely to be a fakeout that reverses the same day. Always check RVOL before committing to a breakout entry.",
              },
              {
                label: "Volume precedes price at turning points",
                body: "Institutional accumulation often starts before price moves significantly — the buying shows up as above-average volume days while price consolidates. When RVOL is elevated for 3–5 consecutive days in a tight range, it suggests a large buyer is being filled. The price move follows.",
              },
              {
                label: "RVOL spikes without news are the most interesting",
                body: "When a stock trades 4–5× its average volume with no obvious catalyst (no earnings, no news), it often means informed traders are positioning ahead of an announcement. This doesn't mean you front-run it — but it's a signal to pay attention to the name in the coming days.",
              },
            ]}
          />

          <Callout color="violet" title="Volume and options together">
            High RVOL in a stock combined with a surge in options open interest or unusual options
            flow (large out-of-the-money call or put buys) is one of the strongest signals available
            to retail traders. It means both the equity and derivatives market are showing elevated
            conviction in the same direction at the same time. These setups don't appear every day —
            when they do, they deserve attention.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 4. Volume and options */}
      <section id="volume-options">
        <SectionHeader
          icon={<BarChart2 className="w-4 h-4" />}
          title="How Volume Affects Your Options Trades"
          subtitle="Volume impacts options traders in two ways: the volume of the underlying stock affects the reliability of the directional move, and the volume of the options contract itself affects execution quality."
        />
        <div className="space-y-3">
          <BulletList
            items={[
              {
                label: "Options volume and open interest = liquidity",
                body: "An options contract with low volume and low open interest will have wide bid-ask spreads — you pay more to enter and receive less to exit. Always check the bid-ask spread before buying: a $0.05 wide spread on a $2.00 option is fine; a $0.80 wide spread means you're starting the trade down 40% before price moves.",
              },
              {
                label: "High underlying volume = reliable directional signal",
                body: "When the underlying stock is moving on 3× average volume, a directional options trade has a higher-quality setup beneath it. The move has institutional backing. When the underlying is moving on thin volume, the options premium may be elevated relative to the actual probability of follow-through.",
              },
              {
                label: "Low volume days erode options value faster",
                body: "On low-volume consolidation days (Tuesday/Wednesday), the underlying barely moves, but theta is still decaying your position. If you bought options expecting a move and are sitting through a quiet mid-week drift, you're paying theta for nothing. This is why entry timing matters — buy when the setup is close to resolving, not days early.",
              },
              {
                label: "Friday expiration volume distorts price action",
                body: "On monthly expiration Fridays, dealer hedging of large options positions (gamma hedging) creates unusual price behavior — stocks can appear pinned to a specific strike price as dealers buy and sell the underlying to stay delta-neutral. This is 'max pain' in action. Don't fight it; be aware that price behavior on expiration Friday is mechanically influenced, not purely directional.",
              },
            ]}
          />

          <Callout color="amber" title="The best setups combine both">
            Look for days where the underlying is trading on above-average volume AND the options
            contract you want to buy has tight bid-ask spreads with decent open interest. This means
            the directional move has institutional backing AND you can execute without giving up a
            large percentage of your premium in the spread. Avoid high-conviction directional ideas
            in illiquid options — the execution cost can make an otherwise good trade unprofitable.
          </Callout>
        </div>
      </section>
    </div>
  );
}
