import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, Flag, Mic, TrendingUp, Zap } from "lucide-react";

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

// ─── Day row ─────────────────────────────────────────────────────────────────

function DayRow({
  day,
  focus,
  detail,
  color,
}: {
  day: string;
  focus: string;
  detail: string;
  color: "slate" | "amber" | "emerald" | "rose" | "violet";
}) {
  const dayColor = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  }[color];

  return (
    <div className="flex gap-3 items-start text-xs">
      <span
        className={cn(
          "shrink-0 w-20 text-center rounded-md px-2 py-1 font-semibold text-[11px]",
          dayColor
        )}
      >
        {day}
      </span>
      <div className="flex-1 pt-0.5 space-y-0.5">
        <p className="font-semibold">{focus}</p>
        <p className="text-muted-foreground leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

// ─── Event card ───────────────────────────────────────────────────────────────

function EventCard({
  icon,
  name,
  timing,
  whatToWatch,
  optionsAngle,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  timing: string;
  whatToWatch: string[];
  optionsAngle: string;
  color: "blue" | "violet" | "amber" | "rose" | "emerald";
}) {
  const border = {
    blue: "border-blue-200 dark:border-blue-800",
    violet: "border-violet-200 dark:border-violet-800",
    amber: "border-amber-200 dark:border-amber-800",
    rose: "border-rose-200 dark:border-rose-800",
    emerald: "border-emerald-200 dark:border-emerald-800",
  }[color];

  const iconBg = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  }[color];

  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", border)}>
      <div className="px-4 pt-4 pb-3 flex items-center gap-2.5 border-b">
        <span className={cn("p-1.5 rounded-md", iconBg)}>{icon}</span>
        <p className="text-sm font-semibold">{name}</p>
      </div>
      <div className="px-4 py-3 space-y-3 text-xs">
        <p>
          <span className="font-medium">When — </span>
          <span className="text-muted-foreground">{timing}</span>
        </p>
        <div className="space-y-1">
          <p className="font-medium">What to watch</p>
          <ul className="space-y-1">
            {whatToWatch.map((item) => (
              <li key={item} className="flex gap-2 text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p>
          <span className="font-medium">Options angle — </span>
          <span className="text-muted-foreground">{optionsAngle}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Guide ────────────────────────────────────────────────────────────────────

export function EventWeekGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* 1. The week before */}
      <section id="event-week-before">
        <SectionHeader
          icon={<Calendar className="w-4 h-4" />}
          title="The Week Leading Up to the Event"
          subtitle="The most important positioning decisions happen before the event — not on the day of. How price behaves in the days prior tells you what the market already expects."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Known events — earnings, Fed meetings, economic data releases, elections — are scheduled
            in advance. That means the market has days or weeks to position for them, and price and
            implied volatility will reflect that positioning. By the time the event arrives, you're
            often trading the reaction to expectations, not the event itself.
          </p>

          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-semibold">Earnings week — day-by-day playbook</p>
            <div className="space-y-3">
              <DayRow
                day="Monday"
                color="slate"
                focus="Establish your baseline"
                detail="Check where the stock closed the prior week relative to key levels. Look at the IV percentile — is premium already expensive? Read the last earnings reaction to calibrate expectations. Don't enter yet."
              />
              <DayRow
                day="Tuesday"
                color="slate"
                focus="Watch the pre-earnings drift"
                detail="Stocks with upside expectations often grind higher into Tuesday and Wednesday. A stock already up 5–8% before earnings has priced in optimism — the bar to beat is higher. A stock that hasn't moved at all is pricing in nothing, giving any positive surprise more room to run."
              />
              <DayRow
                day="Wednesday"
                color="amber"
                focus="IV inflection point"
                detail="IV typically peaks 1–2 days before a Thursday after-close report (or the day before for morning reports). This is the most expensive window to buy options. If you're buying, do it earlier in the week. If you're selling premium, Wednesday or Thursday morning is often the sweet spot."
              />
              <DayRow
                day="Thursday"
                color="amber"
                focus="Last look before the event"
                detail="For after-close reports: this is your last chance to assess the setup. Check analyst estimate revisions — any last-minute upgrades or downgrades shift the whisper number. Watch intraday price action: a stock grinding up to resistance before the report with narrow spreads shows institutional confidence. A stock fading all day suggests selling into the event."
              />
              <DayRow
                day="Event day"
                color="violet"
                focus="Read the reaction, not the headline"
                detail="After the report drops, the first 15–30 minutes of price action is the most important signal. Does the stock gap in the direction of the result and hold? Or does it reverse? The post-event reaction tells you whether expectations were properly calibrated — and sets the bias for the following week."
              />
              <DayRow
                day="Next Monday"
                color="emerald"
                focus="IV crush resolution"
                detail="IV collapses after the event. If you held options through the report, reassess with post-crush IV. New directional positions can now be entered at much cheaper premium — the event is resolved, the trend is established, and IV is lower. This is often a better entry than the event itself."
              />
            </div>
          </div>

          <BulletList
            items={[
              {
                label: "Check the IV rank before anything else",
                body: "If IV is already at the 80th–90th percentile of its 52-week range going into earnings week, buying options is expensive. Selling premium or using spreads to define your risk becomes more attractive. If IV rank is low, buying directional options is cheaper — you're not paying a large uncertainty premium.",
              },
              {
                label: "Watch for unusual options activity",
                body: "Large blocks of out-of-the-money calls or puts being bought in the week before earnings can signal institutional positioning. This doesn't tell you which way the stock will move — institutions hedge both directions — but elevated call volume relative to puts (or vice versa) indicates where the smart money is leaning.",
              },
              {
                label: "Mark the prior earnings reactions",
                body: "Look at how the stock moved on its last 4–8 earnings reports. What was the average move? What was the largest? What did the options market price in as the expected move? A stock that consistently moves ±3% but the options market is pricing in ±8% is overpriced for buyers. A stock that consistently moves ±10% with options pricing in ±5% is underpriced.",
              },
              {
                label: "Check guidance and analyst sentiment",
                body: "Earnings isn't just about the number — guidance is often more important. A company that beats by 10% but lowers guidance for next quarter will typically sell off. A company that misses slightly but raises guidance often rallies. Track whether analysts have been revising estimates up or down in the two weeks before the report.",
              },
            ]}
          />

          <Callout color="violet" title="The expected move — price it into your strategy">
            The options market tells you explicitly what move it's pricing in. Look at the
            at-the-money straddle price for the expiration just after earnings — that's the market's
            expected move in dollar terms. If the straddle costs $8 and the stock is at $100, the
            market expects roughly an ±8% move. Any directional bet needs to exceed this to be
            profitable net of premium — make sure your target is realistic relative to what's priced
            in.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 2. Day of */}
      <section id="event-week-dayof">
        <SectionHeader
          icon={<Zap className="w-4 h-4" />}
          title="Day of the Event"
          subtitle="The day of the event is typically the worst time to initiate new options positions. IV is at its peak and the binary outcome makes direction unknowable. Focus on reading, not acting."
        />
        <div className="space-y-4">
          <BulletList
            items={[
              {
                label: "Don't buy options the morning of an after-close report",
                body: "IV will be at its highest point. You're paying maximum premium for a binary coin flip. If the stock moves in your direction but less than the expected move, your position can still lose. The only exception is if you identified a clear directional lean days earlier and the setup has only strengthened.",
              },
              {
                label: "Watch the intraday price action as a tell",
                body: "How the stock trades on event day is often informative. Steady, low-volatility grind higher into a report suggests institutional accumulation and bullish positioning. A stock fading from the open to close before its earnings suggests distribution — insiders and institutions lightening up ahead of a result they're not confident about.",
              },
              {
                label: "Check if the broader market cooperates",
                body: "A single-stock earnings reaction doesn't happen in a vacuum. If the S&P 500 is down 1.5% on the day of earnings, even a good report may not produce a meaningful rally — the macro headwind dampens the reaction. Before the event, confirm the market environment supports the directional move you're expecting.",
              },
              {
                label: "Have your post-event plan ready",
                body: "Decide in advance: if the stock gaps up 8%, do you take profits immediately? Hold for a continuation? If it gaps down on good earnings (sell-the-news), do you buy the dip or stand aside? Making these decisions in the moment, while the market is moving fast, leads to emotional errors.",
              },
            ]}
          />

          <Callout color="amber" title="If you're already in a position going into the event">
            Decide before the close whether you're holding through or exiting. Holding through
            earnings with a long options position is a high-risk, binary decision. It's valid — but
            it's a separate decision from the original trade. If your thesis was a pre-earnings
            drift and that drift has played out, taking partial profits before the event locks in
            gains and removes the binary risk. There's no rule that says you must hold through.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 3. Political events */}
      <section id="event-week-political">
        <SectionHeader
          icon={<Flag className="w-4 h-4" />}
          title="Political & Macro Events"
          subtitle="Political events are harder to trade than earnings — the market's reaction often depends on which outcome was already priced in, not the outcome itself."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unlike earnings, political events are often unpredictable in timing and magnitude. They
            can affect entire sectors, currencies, and the broad market simultaneously — meaning
            individual stock analysis matters less than sector and macro positioning. The key
            questions are always: what is currently priced in, and what would genuinely surprise the
            market?
          </p>

          <div className="grid grid-cols-1 gap-4">
            <EventCard
              icon={<Mic className="w-3.5 h-3.5" />}
              name="Federal Reserve Meetings (FOMC)"
              color="blue"
              timing="8 meetings per year, scheduled in advance. The statement drops at 2:00 PM ET; the press conference begins at 2:30 PM. Dates are published on the Fed's website a year ahead."
              whatToWatch={[
                "Rate decision (hike, cut, or hold) — already largely priced in via fed funds futures by meeting day",
                "The statement language — any change in wording around 'data dependent,' 'restrictive,' or 'labor market' signals a shift",
                "The dot plot (quarterly) — where each Fed member sees rates going; surprises here move markets more than the rate decision itself",
                "Powell's press conference tone — hawkish vs. dovish phrasing, willingness to commit to future moves",
                "Market reaction in the 30 minutes post-statement — direction of the move often reverses once Powell starts speaking",
              ]}
              optionsAngle="IV spikes into FOMC on broad index options (SPY, QQQ). Selling straddles or iron condors the week of FOMC can capture IV crush post-announcement. For rate-sensitive sectors (banks, utilities, REITs), individual stock options also expand. The 2:00–2:30 PM window is the most volatile 30 minutes of the meeting day."
            />

            <EventCard
              icon={<Flag className="w-3.5 h-3.5" />}
              name="Elections & Political Transitions"
              color="violet"
              timing="Scheduled years in advance (presidential, midterm) or announced (snap elections, referendums). Market impact is highest in the weeks leading up to and immediately following the result."
              whatToWatch={[
                "Polling trends and prediction markets — these are the market's real-time read on probabilities; sudden shifts move assets immediately",
                "Sector implications: defense, energy, healthcare, and financials each have distinct profiles under different administrations",
                "Currency markets — the dollar typically rallies or sells off sharply on electoral outcomes; this affects multinationals and commodity stocks",
                "Bond yields — fiscal policy expectations (deficit spending, tax cuts) move the 10-year yield; higher yields pressure growth stocks",
                "VIX behavior — election uncertainty causes VIX to rise into the event and collapse sharply once the result is clear",
              ]}
              optionsAngle="Election years typically see elevated broad market IV in October–November. Sector ETF options (XLF for financials, XLE for energy, XLV for healthcare) can express views on policy winners without picking individual stocks. After the result, IV crush is often dramatic — short premium positions established just before the election resolve quickly."
            />

            <EventCard
              icon={<TrendingUp className="w-3.5 h-3.5" />}
              name="Tariffs, Trade Policy & Sanctions"
              color="amber"
              timing="Often unannounced or announced with little lead time (executive orders, social media posts, diplomatic statements). This makes them harder to position for than scheduled events."
              whatToWatch={[
                "Which sectors are directly affected: tariffs on steel/aluminum hit industrials and auto manufacturers; tech tariffs hit semiconductors and consumer electronics",
                "Retaliatory risk — trade actions rarely happen in isolation; watch for counter-tariffs on U.S. exports (agriculture, aerospace, luxury goods)",
                "Supply chain exposure — companies with manufacturing in the targeted country face margin compression even if revenues hold",
                "Currency impact — tariffs on China weaken the yuan; a weaker yuan makes Chinese exports cheaper elsewhere, pressuring U.S. competitors in third markets",
                "The initial reaction vs. the week-two reaction — markets often overreact to tariff headlines and then partially recover as the actual implementation details emerge",
              ]}
              optionsAngle="Tariff announcements move individual stocks and sectors violently and without warning. Holding naked directional options in trade-sensitive names carries unhedged gap risk. Consider defined-risk spreads in sectors with known tariff exposure to cap the downside on unexpected announcements. The days after the announcement (not the day of) often provide better-priced entries once the dust settles."
            />

            <EventCard
              icon={<AlertTriangle className="w-3.5 h-3.5" />}
              name="Geopolitical Shocks (Conflicts, Crises)"
              color="rose"
              timing="By definition unpredictable in timing. Known flashpoints (Taiwan Strait, Middle East tensions, Eastern Europe) can be monitored for escalation risk even when no specific event is imminent."
              whatToWatch={[
                "Oil price reaction — Middle East conflicts typically spike crude; energy stocks (XLE) benefit while airlines, transportation, and consumer discretionary suffer",
                "Safe haven flows — gold, U.S. Treasuries, Japanese yen, and Swiss franc rally in true risk-off events; these are real-time barometers of fear",
                "Defense and aerospace stocks — conflicts historically produce sharp rallies in names with government contracts (LMT, RTX, NOC, GD)",
                "Broad market VIX spike — a genuine geopolitical shock causes VIX to spike 20–50% overnight; options buyers are suddenly very expensive if you don't already own them",
                "Duration of the shock — geopolitical events that don't escalate into broader conflict are typically V-shaped in market impact; buy-the-dip has historically worked within 2–4 weeks",
              ]}
              optionsAngle="Geopolitical shocks are nearly impossible to time directionally. The most reliable approach is: after the initial spike down, look for oversold conditions in quality companies with no direct exposure to the conflict — these are frequently dragged down by contagion selling and tend to recover first. Buying calls on these dips, post-shock, with IV still elevated but the worst of the panic behind you, is historically a strong setup."
            />

            <EventCard
              icon={<Calendar className="w-3.5 h-3.5" />}
              name="Key Economic Data Releases"
              color="emerald"
              timing="Scheduled monthly or quarterly. The most market-moving: CPI (inflation, ~mid-month), NFP/jobs report (first Friday of the month), GDP (quarterly), PPI, PCE, retail sales, PMI."
              whatToWatch={[
                "CPI — the single most market-moving monthly data point in recent years; a surprise in either direction moves the broad market 1–3% in minutes",
                "Jobs report (NFP) — released 8:30 AM ET on the first Friday of each month; strong jobs = potentially more Fed hikes (bad for growth stocks); weak jobs = potential cuts (good for rates-sensitive assets)",
                "PCE deflator — the Fed's preferred inflation gauge; released monthly, tends to confirm or contradict CPI; moves are smaller but still meaningful for rate expectations",
                "Core vs. headline — markets focus on core readings (excluding food and energy) as a better gauge of persistent inflation; a headline miss with a core beat is less bearish than both missing",
                "Revisions to prior data — a weak headline number with significant upward revisions to prior months is often net positive; always check the revision line",
              ]}
              optionsAngle="Economic data releases at 8:30 AM ET move the market before options open for most traders (regular equity options trading starts at 9:30 AM). SPY and QQQ gap significantly on hot CPI or jobs prints. Holding directional options overnight before a key data release carries gap risk similar to holding through earnings. Use defined-risk spreads if you want exposure, and size accordingly."
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* 4. Reading the reaction */}
      <section id="event-week-reaction">
        <SectionHeader
          icon={<Zap className="w-4 h-4" />}
          title="Reading the Post-Event Reaction"
          subtitle="How the market reacts to an event is more informative than the event itself. The reaction tells you what was priced in and what surprised participants."
        />
        <div className="space-y-3">
          <BulletList
            items={[
              {
                label: "The first 30 minutes set the tone",
                body: "Whether it's an earnings gap, a CPI print, or an election result, the first 30 minutes of trading reveals the initial sentiment. A gap that holds and builds on itself shows conviction. A gap that fades within 30 minutes shows the initial move was absorbed — the real direction is the fade, not the gap.",
              },
              {
                label: "Down on good news = bearish tell",
                body: "If a company beats estimates, raises guidance, and the stock is still down 5% the next day, that's the market telling you the good news was already fully priced in and there are motivated sellers. Don't buy this dip expecting a quick recovery — the stock may need weeks to find new buyers at lower prices.",
              },
              {
                label: "Up on bad news = bullish tell",
                body: "A company misses estimates and the stock gaps up or holds flat. This is one of the most reliable bullish signals — the bad news was already in the price, sellers are exhausted, and the stock has shown it can absorb negative information without breaking down. These setups often produce sustained multi-week rallies.",
              },
              {
                label: "Use the reaction to recalibrate your sector view",
                body: "When a sector leader reports earnings and the reaction is strongly negative despite good numbers, that's a warning for the entire sector — the group may be overvalued relative to expectations. When a beaten-down sector name rallies on mediocre results, it signals that pessimism was overdone and the sector may be bottoming.",
              },
              {
                label: "Give yourself 24–48 hours before re-entering",
                body: "The day-of reaction is often noisy and driven by options unwinding (dealers hedging delta as IV collapses). The cleaner read on the post-event direction comes on day 2 and 3, when the options noise has settled and genuine directional buyers or sellers are in control. Don't chase the gap — let the stock show you its hand.",
              },
            ]}
          />

          <Callout color="blue" title="The cleanest post-event trade">
            Wait for the event to resolve. Let IV crush play out. Then look for the stock to
            establish a clear direction — typically a higher low forming after a gap up, or a lower
            high forming after a gap down. Enter on that first pullback in the direction of the
            post-event reaction with a defined stop below the gap. You've sacrificed the first move
            to eliminate binary risk, and you're now trading with confirmed direction and cheaper
            premium.
          </Callout>
        </div>
      </section>
    </div>
  );
}
