import { cn } from "@/lib/utils";
import { Bell, Moon, Sun, Sunrise } from "lucide-react";

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

function TimeLabel({ time, label }: { time: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-[11px] font-semibold text-primary">{time}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function MarketHoursGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* 1. Market close */}
      <section id="hours-close">
        <SectionHeader
          icon={<Bell className="w-4 h-4" />}
          title="What Happens at Market Close (4:00 PM ET)"
          subtitle="The closing bell doesn't stop price discovery — it just changes who is participating and how liquid the market is."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            When the regular session ends at 4:00 PM ET, price doesn't freeze — it continues to
            trade in the after-hours (AH) session until 8:00 PM ET. Volume drops dramatically,
            bid/ask spreads widen, and large institutional orders become less common. What moves
            price in after-hours is usually earnings reports, analyst upgrades or downgrades, and
            macro news released after the bell.
          </p>

          <div className="space-y-2">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <p className="text-xs font-semibold">
                The closing price is a reference point, not a verdict
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The official 4:00 PM close is used to calculate daily returns, moving averages, and
                technical levels — but after-hours price action can render those levels immediately
                outdated. A stock that closed at $150 and is trading at $130 in after-hours has
                already established a new reference point for the next day. The closing price is
                where you look back from; the after-hours price is where you look forward from.
              </p>
            </div>
          </div>

          <BulletList
            items={[
              {
                label: "Earnings after close",
                body: "Most companies report earnings after 4:00 PM specifically to allow the market time to digest the results before trading resumes. The after-hours reaction sets the expectation for where the stock will open — but low volume means a single large order can move price dramatically. Treat AH price as directional signal, not a precise entry level.",
              },
              {
                label: "Options don't trade in AH",
                body: "Equity options stop trading at 4:00 PM (with a few exceptions for SPX/SPY which trade until 4:15 PM). This means your options position is frozen while the underlying stock can move significantly in after-hours. You can't hedge or exit until the next morning — this is the gap risk options holders take into earnings.",
              },
              {
                label: "Watching closing candle character",
                body: "How a stock closes matters. A strong candle closing near its high into the bell shows buyers are in control into the end of day. A fade into close — opening strong then closing near the low — suggests distribution. These patterns carry forward into the next session.",
              },
            ]}
          />

          <Callout color="amber" title="After-hours trap">
            After-hours prices are thin and manipulable. A stock can spike or crash in AH on low
            volume, then completely reverse by the next morning's open once real liquidity returns.
            Don't panic-exit a position based on an after-hours print — wait for confirmation at the
            open before reacting.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 2. Overnight / weekend */}
      <section id="hours-overnight">
        <SectionHeader
          icon={<Moon className="w-4 h-4" />}
          title="Overnight & Weekend News"
          subtitle="Markets are closed but the world isn't. Geopolitical events, central bank decisions, and macro data releases don't wait for 9:30 AM."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Overnight and weekend sessions are when gaps form. Price discovery continues in futures
            markets (ES for S&P 500, NQ for Nasdaq) around the clock, so by the time equities open,
            the market has often already processed major news. Futures are your best real-time proxy
            for overnight sentiment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Callout color="rose" title="Weekend gap risk">
              Stocks don't trade on weekends but futures do (with reduced liquidity). A geopolitical
              event, central bank statement, or macro shock over the weekend can cause equities to
              open Monday with a large gap — up or down — that bypasses any stop-loss set at
              Friday's close. Holding speculative options over the weekend means accepting this gap
              risk without recourse.
            </Callout>
            <Callout color="blue" title="Futures as a preview">
              ES (S&P 500 futures) and NQ (Nasdaq futures) trade Sunday night and all week
              overnight. Their direction and magnitude give you a strong preview of where equities
              will open. If ES is down 1.5% Sunday night on macro news, expect broad selling at
              Monday's open unless that news reverses.
            </Callout>
          </div>

          <BulletList
            items={[
              {
                label: "Central bank decisions and macro data",
                body: "Fed statements, CPI prints, jobs reports, and foreign central bank decisions frequently drop outside regular trading hours. These move the entire market. Check the economic calendar before holding positions overnight — know exactly what is scheduled to be released and when.",
              },
              {
                label: "Geopolitical events",
                body: "Wars, sanctions, elections, and political shocks don't respect market hours. When they occur overnight or on weekends, futures absorb the initial reaction. By the time equities open, the market has partially digested the event. The opening candle often reflects this pre-priced reaction.",
              },
              {
                label: "Foreign market signals",
                body: "Asia markets open first (Tokyo, Hong Kong, Shanghai), followed by Europe (London, Frankfurt). A significant sell-off in Asian or European equities overnight is a warning for U.S. open weakness. Strong foreign markets can provide a tailwind. These aren't guarantees — but they are inputs.",
              },
              {
                label: "Pre-market earnings (before 9:30 AM)",
                body: "Many companies report earnings before market open. Pre-market trading (4:00 AM–9:30 AM ET) reacts immediately, but like after-hours, spreads are wide and volume is thin. The pre-market print sets an expectation for the open but is not always where the stock actually opens — price often adjusts in the final minutes before the bell.",
              },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* 3. Market open */}
      <section id="hours-open">
        <SectionHeader
          icon={<Sunrise className="w-4 h-4" />}
          title="What to Watch at Market Open (9:30 AM ET)"
          subtitle="The first 30–60 minutes are the most volatile and least predictable window of the day. Understanding the open's character tells you what kind of day is developing."
        />
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            The open is when overnight orders, pre-market positioning, and institutional desks all
            collide at once. Price frequently makes the first significant move of the day in the
            opening minutes — but it's also where the most fakeouts, stops hunts, and reversals
            occur. The opening candle and the first 30 minutes of price action set the context for
            the rest of the session.
          </p>

          <div className="space-y-2">
            <p className="text-xs font-semibold">Key times to watch</p>
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2.5">
              <TimeLabel
                time="9:30 AM"
                label="Open — highest volatility, widest spreads, largest orders hit the tape"
              />
              <TimeLabel
                time="9:30–10:00 AM"
                label="Opening range — the high and low of this window often define the day's range"
              />
              <TimeLabel
                time="10:00–10:30 AM"
                label="Trend confirmation window — does the open move hold or reverse?"
              />
              <TimeLabel
                time="10:30 AM"
                label="First significant reversal opportunity if the open was a fakeout"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold">Opening patterns and what they signal</p>
            <BulletList
              items={[
                {
                  label: "Gap up and hold (bullish)",
                  body: "Stock opens significantly above prior close, pulls back slightly, then resumes higher. Buyers are absorbing supply. This is a bullish continuation pattern — the gap is being defended. Look for entries on the first pullback to VWAP or the gap fill level.",
                },
                {
                  label: "Gap up and fade (bearish)",
                  body: "Stock opens high, trades sideways for a few minutes, then starts selling off consistently. This is the classic distribution pattern — sellers used the gap to unload inventory into retail buyers. By mid-morning it's often filling the entire gap. Chasing the open here is a common mistake.",
                },
                {
                  label: "Gap down and hold (bullish reversal candidate)",
                  body: "Stock opens below prior close but immediately finds buyers and starts grinding higher. The bearish news was already priced in overnight. If it reclaims the prior close by mid-morning, it's a strong sign of exhausted sellers — a potential long setup.",
                },
                {
                  label: "Gap down and continue (bearish)",
                  body: "Stock opens weak and keeps selling. No bounce, no attempt to recover. This signals strong institutional selling and a trending down day. Do not try to catch the bottom — wait for the first significant bounce attempt to fail before considering any bearish position.",
                },
                {
                  label: "Flat open with range contraction",
                  body: "Stock opens near prior close, price action is tight and indecisive for the first 30 minutes. This is an energy coil — a breakout is coming, but direction is unknown. Wait for the range to break with volume before committing to a direction.",
                },
              ]}
            />
          </div>

          <Callout color="violet" title="Implications for options traders">
            <div className="space-y-2">
              <p>
                <strong>IV is highest at open.</strong> Option premiums are most inflated in the
                first 30–60 minutes due to elevated uncertainty. Buying options at the open means
                paying the most premium you'll pay all day. If you must buy, wait for the opening
                range to establish itself first.
              </p>
              <p>
                <strong>Opening gaps change your levels.</strong> If a stock gaps up above a key
                resistance level you were watching, that level has already been broken — recalculate
                your targets and stops from the new price. Don't anchor to pre-gap levels as if the
                gap didn't happen.
              </p>
              <p>
                <strong>Never assume the gap direction is the day's direction.</strong> Gaps are
                filled more often than they sustain. Before trading in the direction of a gap, wait
                for confirmation that the gap is holding — at minimum, the first 15-minute candle
                closing in the direction of the gap.
              </p>
            </div>
          </Callout>

          <Callout color="blue" title="The opening range breakout (ORB)">
            One of the most reliable intraday patterns. Mark the high and low of the first 15 or 30
            minutes after open. When price breaks above the high with volume, it signals a bullish
            trending day — buying calls on the breakout or pullback to the ORB high is a structured
            entry. A break below the ORB low signals a bearish trending day. The ORB gives you a
            defined range, a clear trigger, and levels to stop against.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 4. Intraday rhythm */}
      <section id="hours-rhythm">
        <SectionHeader
          icon={<Sun className="w-4 h-4" />}
          title="Intraday Rhythm — The Typical Day's Shape"
          subtitle="Markets have a characteristic rhythm through the trading day. Knowing it helps you avoid fighting the wrong time window."
        />
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <p className="text-xs font-semibold">Typical daily flow</p>
            <div className="space-y-2.5">
              <TimeLabel
                time="9:30–10:30 AM"
                label="High volatility opening window — largest moves, most volume"
              />
              <TimeLabel
                time="10:30 AM–12:00 PM"
                label="First consolidation — trend from open either continues or reverses"
              />
              <TimeLabel
                time="12:00–2:00 PM"
                label="Lunch lull — volume drops, price often drifts or chops. Avoid new entries."
              />
              <TimeLabel
                time="2:00–3:00 PM"
                label="Afternoon trend development — institutional activity resumes"
              />
              <TimeLabel
                time="3:00–3:30 PM"
                label="Power hour begins — often the second-largest volume window of the day"
              />
              <TimeLabel
                time="3:30–4:00 PM"
                label="Final 30 minutes — closing orders, index rebalancing, momentum acceleration"
              />
            </div>
          </div>

          <BulletList
            items={[
              {
                label: "The lunch lull is a trap",
                body: "Price action between roughly 12:00 PM and 2:00 PM ET is notoriously choppy. Volume thins, spreads widen slightly, and price often reverses fake moves. Many traders have entered promising setups in the morning only to watch them chop sideways through lunch and then reverse. If you're not already in a position with a profit cushion, the lunch window is generally not the time to initiate new trades.",
              },
              {
                label: "Power hour (3:00–4:00 PM) can change everything",
                body: "The final hour of trading is often the second most active of the day. Institutional portfolio managers, index funds, and ETFs make large orders near the close. A stock that drifted sideways all day can trend hard into the close on this volume. Watch for momentum acceleration after 3:00 PM as a signal of institutional conviction.",
              },
              {
                label: "Close near high vs. close near low",
                body: "Where a stock closes within its daily range matters for the next day's open. A stock closing in the top quarter of its day's range signals buying pressure into the close — bullish carry-forward. A stock closing in the bottom quarter signals distribution — expect pressure at the next open.",
              },
            ]}
          />

          <Callout color="amber" title="Rule of thumb for options entries">
            The best options entries are typically in the first hour (with confirmation) or in the
            afternoon trend window (2:00–3:30 PM). Avoid initiating new option buys during the lunch
            lull — theta is working against you, IV is still elevated from the morning, and price
            action is unreliable. Time your entries when the market is actually moving.
          </Callout>
        </div>
      </section>
    </div>
  );
}
