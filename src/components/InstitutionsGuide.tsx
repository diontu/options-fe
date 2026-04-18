import { cn } from "@/lib/utils";
import { AlertTriangle, Building2, Eye, Lightbulb, Search } from "lucide-react";

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

// ─── Institution type card ────────────────────────────────────────────────────

function InstitutionCard({
  name,
  examples,
  size,
  behavior,
  impact,
}: {
  name: string;
  examples: string;
  size: string;
  behavior: string;
  impact: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-2.5 text-xs">
      <p className="text-sm font-semibold">{name}</p>
      <p>
        <span className="font-medium">Examples — </span>
        <span className="text-muted-foreground">{examples}</span>
      </p>
      <p>
        <span className="font-medium">Typical size — </span>
        <span className="text-muted-foreground">{size}</span>
      </p>
      <p>
        <span className="font-medium">How they trade — </span>
        <span className="text-muted-foreground">{behavior}</span>
      </p>
      <p>
        <span className="font-medium">Market impact — </span>
        <span className="text-muted-foreground">{impact}</span>
      </p>
    </div>
  );
}

// ─── Signal card ──────────────────────────────────────────────────────────────

function SignalCard({
  signal,
  whatItLooksLike,
  whyItMatters,
  caveat,
  color,
}: {
  signal: string;
  whatItLooksLike: string;
  whyItMatters: string;
  caveat: string;
  color: "emerald" | "blue" | "violet" | "amber";
}) {
  const border = {
    emerald: "border-emerald-200 dark:border-emerald-800",
    blue: "border-blue-200 dark:border-blue-800",
    violet: "border-violet-200 dark:border-violet-800",
    amber: "border-amber-200 dark:border-amber-800",
  }[color];

  const title = {
    emerald: "text-emerald-700 dark:text-emerald-300",
    blue: "text-blue-700 dark:text-blue-300",
    violet: "text-violet-700 dark:text-violet-300",
    amber: "text-amber-700 dark:text-amber-300",
  }[color];

  return (
    <div className={cn("rounded-lg border bg-card p-4 space-y-2 text-xs", border)}>
      <p className={cn("text-sm font-semibold", title)}>{signal}</p>
      <p>
        <span className="font-medium">What it looks like — </span>
        <span className="text-muted-foreground">{whatItLooksLike}</span>
      </p>
      <p>
        <span className="font-medium">Why it matters — </span>
        <span className="text-muted-foreground">{whyItMatters}</span>
      </p>
      <p className="pt-1 border-t border-dashed">
        <span className="font-medium text-amber-600 dark:text-amber-400">Caveat — </span>
        <span className="text-muted-foreground">{caveat}</span>
      </p>
    </div>
  );
}

// ─── Mistake card ─────────────────────────────────────────────────────────────

function MistakeCard({
  mistake,
  whatPeopleThink,
  whatActuallyHappens,
}: {
  mistake: string;
  whatPeopleThink: string;
  whatActuallyHappens: string;
}) {
  return (
    <div className="rounded-lg border border-rose-200 dark:border-rose-800 bg-card p-4 space-y-2 text-xs">
      <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">{mistake}</p>
      <p>
        <span className="font-medium">What people think — </span>
        <span className="text-muted-foreground">{whatPeopleThink}</span>
      </p>
      <p>
        <span className="font-medium">What actually happens — </span>
        <span className="text-muted-foreground">{whatActuallyHappens}</span>
      </p>
    </div>
  );
}

// ─── Guide ────────────────────────────────────────────────────────────────────

export function InstitutionsGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* 1. Who they are */}
      <section id="inst-who">
        <SectionHeader
          icon={<Building2 className="w-4 h-4" />}
          title="Who Institutions Are and Why They Dominate"
          subtitle="Institutions account for roughly 70–80% of all daily equity trading volume in U.S. markets. Understanding who they are and how they operate is the foundation of reading price action correctly."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            When you buy 100 shares of AAPL, you are on the other side of a transaction with someone
            — and that someone is almost always an institution. They set the price. They determine
            whether a support level holds. They decide whether a breakout sustains. Retail traders
            react to price; institutions create it. The more clearly you understand their
            constraints and motivations, the better you can read what price action is actually
            telling you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InstitutionCard
              name="Mutual Funds"
              examples="Fidelity Contrafund, Vanguard Active Funds, American Funds"
              size="Manage $1B–$500B+. A single position can be $500M–$5B in a large-cap stock."
              behavior="Buy and hold for quarters to years. Build positions slowly over weeks to avoid moving the market against themselves. Required to disclose holdings quarterly (13F filings)."
              impact="The most patient buyers. When they accumulate, price grinds higher on elevated but not explosive volume. Their selling (distribution) is slow and methodical — hard to see until it's already happened."
            />
            <InstitutionCard
              name="Hedge Funds"
              examples="Bridgewater, Citadel, Point72, Renaissance Technologies"
              size="Range from $500M to $150B+. More concentrated positions than mutual funds."
              behavior="Actively trade — can be long and short simultaneously. Use leverage, derivatives, and complex strategies. Move faster than mutual funds. Some use quantitative algorithms that trade in microseconds."
              impact="The most influential intraday movers. A large hedge fund initiating or exiting a position can cause sharp, high-volume moves. Their options activity is often visible before their equity buying begins."
            />
            <InstitutionCard
              name="Pension Funds & Endowments"
              examples="CalPERS, Norway Government Pension Fund, Harvard Endowment"
              size="Among the largest pools of capital — CalPERS alone manages $450B+."
              behavior="Extremely long-term, highly diversified. Rebalance periodically (quarterly, semi-annually). Mandated to hold certain asset classes regardless of market conditions."
              impact="Rebalancing flows are predictable and create seasonal patterns — quarter-end buying of underperforming assets, selling of outperformers. These flows can dominate the final week of a quarter."
            />
            <InstitutionCard
              name="Market Makers"
              examples="Citadel Securities, Virtu Financial, Jane Street"
              size="Trade billions of shares daily but are largely flat at day's end — they profit from the spread, not direction."
              behavior="Provide liquidity by standing ready to buy and sell at all times. Hedge their exposure continuously (delta hedging). Don't take directional bets — they manage risk mathematically."
              impact="Critical for options traders — market makers are the counterparty on most options trades. Their delta hedging activity (buying stock when calls are sold to them, selling stock when calls are bought) amplifies price moves at key levels."
            />
          </div>

          <Callout color="blue" title="The size problem — why institutions can't move fast">
            A hedge fund wanting to buy $500M of a stock trading $200M per day cannot just place a
            market order. That single order would move the price 20–30% against them before it was
            filled. Instead they spread the buy over days or weeks using algorithms that disguise
            the order as normal trading activity. This is why institutional accumulation is subtle
            and slow — and why it leaves footprints in volume and price action that you can learn to
            read.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 2. How they move markets */}
      <section id="inst-how">
        <SectionHeader
          icon={<Building2 className="w-4 h-4" />}
          title="How Institutions Actually Move Price"
          subtitle="Institutions don't just buy — they absorb, accumulate, distribute, and defend. Each phase leaves a different fingerprint in the price action."
        />
        <div className="space-y-4">
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-semibold">The four phases of institutional activity</p>
            <div className="space-y-3">
              {[
                {
                  phase: "Accumulation",
                  color: "text-emerald-600 dark:text-emerald-400",
                  desc: "An institution wants to build a large long position. They buy quietly over days or weeks, often using limit orders at or below the current price. Price action: tight range, above-average volume, multiple tests of support that hold. The stock appears to be going nowhere — but it's being accumulated under the surface.",
                },
                {
                  phase: "Markup",
                  color: "text-blue-600 dark:text-blue-400",
                  desc: "Once accumulation is complete, the institution (or coordinated buying from multiple funds) pushes price higher. Volume expands, the range widens, resistance levels break. This is when retail traders notice the move and begin chasing. The institution is now sitting on unrealized profits.",
                },
                {
                  phase: "Distribution",
                  color: "text-amber-600 dark:text-amber-400",
                  desc: "The institution wants to exit. They sell into the retail buying that followed the markup phase. Price action: wide swings up and down, high volume, but price making no net progress. Each rally is sold into. The stock looks volatile and healthy to outsiders — it's actually being unloaded.",
                },
                {
                  phase: "Markdown",
                  color: "text-rose-600 dark:text-rose-400",
                  desc: "Distribution is complete. The institutional support is gone. With no large buyer absorbing the selling, price falls, often sharply. Retail traders who bought near the highs are now trapped. Volume can be high (panic selling) or declining (no one wants it).",
                },
              ].map(({ phase, color, desc }) => (
                <div key={phase} className="flex gap-3 text-xs">
                  <span className={cn("font-bold w-24 shrink-0 pt-0.5", color)}>{phase}</span>
                  <p className="text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <BulletList
            items={[
              {
                label: "Dark pools hide the footprint",
                body: "Roughly 35–40% of U.S. equity volume trades in dark pools — private exchanges where large orders can be matched without showing up on the public order book. Institutions use them specifically to avoid tipping their hand. You won't see their full buying in the public tape, but the net effect still shows in price and volume over time.",
              },
              {
                label: "Algorithms disguise the orders",
                body: "Modern institutional algorithms (VWAP, TWAP, implementation shortfall) spread orders across the day to blend in with normal volume. A fund buying $200M of stock will have the algorithm execute small tranches every few minutes all day, making it look like ordinary market activity. The accumulation only becomes obvious in retrospect.",
              },
              {
                label: "Support and resistance are institutional price memory",
                body: "When a stock holds a specific level repeatedly, it's because an institution has buy orders there. They bought once, price rallied, price came back — and they bought again because their research still supports the thesis. When that level finally breaks on high volume, it means the institution has either been fully filled or has abandoned the level.",
              },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* 3. How to identify entry */}
      <section id="inst-identify">
        <SectionHeader
          icon={<Search className="w-4 h-4" />}
          title="How to Identify Institutional Entry"
          subtitle="You can't see their order book. But you can read the footprints they leave in price, volume, and the options market."
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <SignalCard
              signal="Volume surge on a quiet consolidation"
              color="emerald"
              whatItLooksLike="A stock that has been trading in a tight range for 2–4 weeks suddenly prints 3–5× its average daily volume with price barely moving. No news. No catalyst. The range holds."
              whyItMatters="Large buyers are absorbing all available supply at this price. For every seller, there's an institutional buyer. The lack of price movement despite the volume surge is the tell — someone very large is controlling the tape, willing to buy everything offered without urgency to push price higher yet."
              caveat="This can also be a distribution signal — an institution selling into residual buying demand. The difference is context: at a prior support after a downmove, it's more likely accumulation. At a prior high after a long rally, it's more likely distribution."
            />
            <SignalCard
              signal="Gap up on massive volume with a strong close"
              color="blue"
              whatItLooksLike="A stock gaps up 3–8% at the open on 3–5× average volume, pulls back slightly through the first hour, then recovers and closes near the high of the day. Volume remains elevated all session."
              whyItMatters="Institutional buyers absorbed the initial profit-taking from retail traders who bought pre-gap and are now selling. The fact that price held and closed strong means demand exceeded supply at elevated prices — a major buyer is defending the move. This is one of the clearest signals that institutions have initiated a position."
              caveat="Not all gap-and-hold days are institutional. Earnings beats naturally produce this pattern. The most meaningful version occurs when there is no earnings catalyst — just unexplained volume that is later confirmed by a 13F filing showing a new institutional position."
            />
            <SignalCard
              signal="Unusual options activity (UOA)"
              color="violet"
              whatItLooksLike="Large blocks of out-of-the-money calls or puts purchased weeks before a major move. Volume in a specific strike/expiry is 5–20× the normal daily options volume for that contract. Often in names with low retail options interest."
              whyItMatters="Options require less capital than stock for the same notional exposure. Hedge funds and well-informed institutions often buy options before establishing an equity position — or as the directional bet itself. A fund that expects a stock to move from $50 to $70 over 3 months might buy $60 calls rather than shares. The options activity precedes the equity move."
              caveat="Options flow is noisy and frequently misinterpreted. Large put buys are often hedges against long stock positions, not bearish bets. Large call buys can be covered call sales being unwound. Look for unusual flow in the context of the stock's price structure — not in isolation."
            />
            <SignalCard
              signal="Price reclaiming a level multiple times"
              color="amber"
              whatItLooksLike="A stock breaks below a key level (prior support, moving average, round number), but within 1–3 sessions snaps back above it with authority. This happens two or three times — false breaks that are immediately bought back."
              whyItMatters="An institution has a large buy order at or near that level. Each time price drops below, they absorb the selling and buy back. Retail traders who are shorting the break get squeezed out, further fueling the recovery. The repeated defense of the same level is the institutional fingerprint — no retail buyer has the size to repeatedly absorb selling at a specific price."
              caveat="Eventually institutional support gives way if the macro or fundamental case changes. A level that has held three times is not guaranteed to hold a fourth. The holding of the level is only meaningful until it isn't."
            />
          </div>

          <Callout color="violet" title="13F filings — the delayed paper trail">
            Every institution managing more than $100M is required to disclose their equity holdings
            to the SEC quarterly via a 13F filing, within 45 days of quarter-end. This means you can
            see exactly what funds like Berkshire Hathaway, Druckenmiller's family office, or any
            major hedge fund owned at the end of each quarter. The data is old by the time it's
            public — but it confirms which names large money was building positions in, and it gives
            you context for why a stock behaved the way it did in prior weeks.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 4. Using it to your advantage */}
      <section id="inst-advantage">
        <SectionHeader
          icon={<Lightbulb className="w-4 h-4" />}
          title="Using Institutional Activity to Your Advantage"
          subtitle="You can't compete with institutions in size or speed. But you can follow them — and following a large, patient buyer into a position is one of the most reliable edges available to retail traders."
        />
        <div className="space-y-4">
          <BulletList
            items={[
              {
                label: "Trade in the direction of institutional flow, not against it",
                body: "If a stock has shown signs of accumulation — elevated volume in a tight range, repeated defense of a support level, unusual call buying — the path of least resistance is up. Buying puts on a stock being actively accumulated by institutions is fighting the largest, best-funded, most informed participants in the market. You will lose that battle slowly and then suddenly.",
              },
              {
                label: "Enter after the institutional footprint is visible, not before",
                body: "You don't need to catch the very bottom of accumulation. Wait for confirmation — a break above the consolidation range on volume, or the first higher low after an institutional-level volume day. The move from accumulation to markup is where retail traders can participate with the best risk/reward: the institutions have already absorbed the supply, so your entry has natural support beneath it.",
              },
              {
                label: "Use the defended level as your stop",
                body: "If an institution is defending a specific price level, that level becomes your logical stop. If you're long and the stock is being repeatedly bought at $148, place your stop just below $148. If institutions abandon the level (break on high volume), your stop takes you out before the markdown phase begins. You're using their order flow as your risk management anchor.",
              },
              {
                label: "Watch the largest volume days for directional clues",
                body: "The single highest-volume day in a stock over the past 3 months almost always marks an institutional decision point — either the start of accumulation or the peak of distribution. Look at where price closed that day relative to the range. A close in the upper 25% of the day's range on high volume = institutions were buying into the close (bullish). A close in the lower 25% = they were selling into strength (bearish).",
              },
              {
                label: "Look for institutional confirmation before earnings",
                body: "If a stock shows signs of accumulation in the 2–3 weeks before its earnings report — elevated volume, tight range, multiple tests of support — it suggests informed money is positioning for a positive result. This doesn't guarantee an earnings beat, but it shifts the probabilities. A stock being quietly accumulated into earnings is a stronger pre-earnings call setup than one with no such footprint.",
              },
            ]}
          />

          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <p className="text-xs font-semibold">A practical step-by-step framework</p>
            <div className="space-y-2.5">
              {[
                {
                  step: "1",
                  action: "Identify the consolidation",
                  detail:
                    "Find a stock that has been in a tight range for 2–6 weeks with above-average but not explosive volume.",
                },
                {
                  step: "2",
                  action: "Check the volume character",
                  detail:
                    "Is volume elevated on up-days within the range and lower on down-days? That asymmetry suggests buyers are more active than sellers.",
                },
                {
                  step: "3",
                  action: "Look for options confirmation",
                  detail:
                    "Is there unusual call volume in strikes above the current price? Are open interest levels building in out-of-the-money calls?",
                },
                {
                  step: "4",
                  action: "Wait for the breakout",
                  detail:
                    "Don't enter inside the range. Wait for price to close above the range's upper boundary on above-average volume. That's institutional buying pushing through resistance.",
                },
                {
                  step: "5",
                  action: "Enter on the breakout or retest",
                  detail:
                    "Buy the breakout close or wait for the first pullback to the breakout level. The broken resistance becomes support — and institutional buyers will often defend it there.",
                },
              ].map(({ step, action, detail }) => (
                <div key={step} className="flex gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {step}
                  </span>
                  <div>
                    <span className="font-semibold">{action} — </span>
                    <span className="text-muted-foreground">{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Callout color="emerald" title="Options angle — buying into institutional accumulation">
            When a stock is showing signs of institutional accumulation and you expect a breakout
            over the next 4–8 weeks, buying calls with 60–90 days to expiration gives you leveraged
            upside on the eventual markup phase while keeping risk defined. IV is typically low
            during accumulation (the range is tight, there's no fear), so you're buying options at a
            relatively cheap point before the move attracts attention and inflates premium. This is
            the opposite of buying options after the stock has already run — you're early, not late.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 5. Common mistakes */}
      <section id="inst-mistakes">
        <SectionHeader
          icon={<AlertTriangle className="w-4 h-4" />}
          title="Common Mistakes When Trading Around Institutions"
          subtitle="Most retail errors around institutional activity come from misreading the signal, acting too early, or assuming institutions are always right."
        />
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <MistakeCard
              mistake="Assuming large volume always means buying"
              whatPeopleThink="Big volume spike = institutions are buying = I should buy too."
              whatActuallyHappens="Large volume is equally consistent with distribution. An institution selling $300M of stock creates exactly the same volume signature as one buying $300M. Direction of the close within the day's range and the prior trend context are what distinguish accumulation from distribution — not volume alone."
            />
            <MistakeCard
              mistake="Front-running unusual options flow"
              whatPeopleThink="Someone bought 10,000 out-of-the-money calls — they must know something. I'll buy the same calls and ride their coattails."
              whatActuallyHappens="Large put and call purchases are frequently hedges, not directional bets. A fund long $500M of stock might buy out-of-the-money puts as portfolio insurance — not because they're bearish. A covered call writer might buy back calls to close a position. Copying options flow without understanding the context behind it leads to losses far more often than wins."
            />
            <MistakeCard
              mistake="Thinking institutions are always right"
              whatPeopleThink="Buffett/Druckenmiller/Ackman bought this stock. They're smarter than me and have better information. It must go up."
              whatActuallyHappens="Institutional 13F filings are 45 days old by the time they're public — the fund may have already sold the position. Even the most sophisticated institutions are wrong regularly. Ackman's Valeant position, Einhorn's long-running Greenlight shorts, and countless others were high-conviction institutional bets that failed. Following institutions is a useful input, not a guaranteed edge."
            />
            <MistakeCard
              mistake="Chasing the breakout far from the institutional entry"
              whatPeopleThink="This stock just broke out on massive volume — institutions are buying, I need to get in now or I'll miss it."
              whatActuallyHappens="By the time a breakout is obvious to retail traders, the institutional accumulation phase is often complete. The fund is now in markup mode — they're already profitable and may be looking for an exit into the retail excitement you're part of. The best risk/reward entry was during the quiet accumulation, not after the move is public knowledge."
            />
            <MistakeCard
              mistake="Misidentifying stop hunts as breakdowns"
              whatPeopleThink="The stock just broke below support on high volume. Institutions must be selling. I need to short this or exit my longs."
              whatActuallyHappens="Institutions deliberately push price below well-known support levels to trigger retail stop-losses and create cheap buying opportunities. The spike below support is the buy, not the sell. If price immediately reverses back above the level within one or two candles, you just watched a stop hunt — the 'breakdown' was manufactured to shake out weak hands before the real move begins."
            />
            <MistakeCard
              mistake="Over-concentrating based on institutional conviction"
              whatPeopleThink="Multiple top hedge funds are in this name, the 13Fs show massive accumulation, unusual call volume is off the charts. This is a sure thing. I'll put 50% of my account into calls."
              whatActuallyHappens="No single signal is a sure thing, and stacking confirming signals only raises probability — it does not eliminate risk. Institutions can be early, wrong, or hit by an unforeseeable macro shock. Concentrated options positions on 'high conviction' institutional setups have destroyed accounts when the catalyst didn't materialize or arrived too late relative to expiration."
            />
          </div>

          <Callout color="rose" title="The fundamental asymmetry">
            Institutions have more information, more capital, better technology, and better access
            than you. The way to use this to your advantage is not to try to compete with them —
            it's to recognize their footprints after the fact and position yourself in the same
            direction before the move becomes consensus. You're a small boat following a large
            ship's wake. That works as long as you're following, not leading, and you know when to
            get out of the way.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 6. Tools */}
      <section id="inst-tools">
        <SectionHeader
          icon={<Eye className="w-4 h-4" />}
          title="What to Actually Look At"
          subtitle="You don't need expensive data feeds. These publicly available sources give you most of what you need to track institutional activity."
        />
        <div className="space-y-3">
          <BulletList
            items={[
              {
                label: "SEC EDGAR 13F filings",
                body: "Free at sec.gov/cgi-bin/browse-edgar. Search any institution by name and see their quarterly equity holdings. Look for new positions (not in prior quarter), position size increases, and exits. The best use is confirming accumulation you already spotted in the chart — not as a primary signal.",
              },
              {
                label: "Finviz and similar screeners",
                body: "Filter for stocks with institutional ownership changes, high relative volume, or unusual options activity. Finviz's 'inst own' filter and the screener's volume metrics let you find names with recent institutional footprints without manually checking every chart.",
              },
              {
                label: "Options flow tools",
                body: "Platforms like Unusual Whales, Market Chameleon, and Barchart show unusual options activity — large single-transaction block trades, contracts trading at multiples of normal volume, and sweeps (aggressive market orders filled across multiple exchanges). These are the most real-time signal available, though they require context to interpret correctly.",
              },
              {
                label: "Daily volume relative to 20-day average",
                body: "The simplest and most reliable tool. Any charting platform shows volume bars with the 20-day average overlay. A day where volume is 2× the average line with no news is your starting point for investigation. You don't need anything fancier than this to identify the majority of institutional footprints.",
              },
              {
                label: "Price action at key levels",
                body: "Free and on every chart. Watch how price behaves at prior highs, round numbers, and moving averages. Three tests of a level that all hold with volume are more telling than any data feed. The chart itself is the primary source — everything else is context.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
