import { cn } from "@/lib/utils";
import { AlertTriangle, Newspaper } from "lucide-react";

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

export function MarketPricingGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* 1. Forward expectations */}
      <section id="pricing-expectations">
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
                  body: "How a stock reacts to news is more informative than the news itself. A stock that sells off on great earnings is telling you expectations were too high and insiders or large players are distributing. A stock that holds or rallies on bad news is showing you that the bad news was already in the price.",
                },
              ]}
            />
          </div>

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

      {/* 2. Common mistakes */}
      <section id="pricing-mistakes">
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
