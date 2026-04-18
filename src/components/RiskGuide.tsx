import { cn } from "@/lib/utils";
import { AlertTriangle, BookOpen, Brain, DollarSign, ShieldAlert } from "lucide-react";

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

function Divider() {
  return <div className="h-px bg-border my-2" />;
}

// ─── Loss card ────────────────────────────────────────────────────────────────

function LossCard({
  title,
  frequency,
  howItHappens,
  example,
  howToAvoid,
}: {
  title: string;
  frequency: "very common" | "common" | "less common";
  howItHappens: string;
  example: string;
  howToAvoid: string;
}) {
  const freqStyle = {
    "very common": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    common: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    "less common": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  }[frequency];

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="px-4 pt-3 pb-2.5 border-b flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{title}</p>
        <span
          className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0", freqStyle)}
        >
          {frequency}
        </span>
      </div>
      <div className="px-4 py-3 space-y-2.5 text-xs">
        <p>
          <span className="font-medium">How it happens — </span>
          <span className="text-muted-foreground">{howItHappens}</span>
        </p>
        <div className="rounded-md bg-muted/40 px-3 py-2 border-l-2 border-muted-foreground/30">
          <p className="text-muted-foreground italic leading-relaxed">{example}</p>
        </div>
        <p>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            How to avoid —{" "}
          </span>
          <span className="text-muted-foreground">{howToAvoid}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Guide ────────────────────────────────────────────────────────────────────

export function RiskGuide() {
  return (
    <div className="space-y-6 text-sm">
      {/* Intro */}
      <section id="risk-intro">
        <SectionHeader
          icon={<AlertTriangle className="w-4 h-4" />}
          title="How Most People Lose Money in Options"
          subtitle="Options are not inherently risky — they are precisely risky. The losses almost always come from predictable, repeatable mistakes, not bad luck."
        />
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Studies consistently show that the majority of retail options buyers lose money over
            time — not because the market is rigged, but because options have built-in forces
            working against buyers (theta decay, IV crush) that most people don't fully account for.
            The traders who survive long-term aren't necessarily smarter — they've simply stopped
            making the mistakes listed on this page.
          </p>
          <Callout color="amber" title="The core problem">
            With stocks, being right about direction is enough to make money. With options, you can
            be right about direction, right about timing, and still lose money if IV collapses or
            you paid too much premium. You need to be right about more variables simultaneously —
            and most people underestimate how hard that is.
          </Callout>
        </div>
      </section>

      <Divider />

      {/* 1. Options mechanics losses */}
      <section id="risk-mechanics">
        <SectionHeader
          icon={<DollarSign className="w-4 h-4" />}
          title="Losses from Options Mechanics"
          subtitle="These losses come from forces baked into the structure of every options contract — they work against buyers every single day, regardless of what the stock does."
        />
        <div className="space-y-3">
          <LossCard
            title="Theta decay — time working against you"
            frequency="very common"
            howItHappens="Every day you hold a long option, it loses a small amount of value purely from time passing. This happens even if the stock doesn't move. The closer to expiration, the faster the decay accelerates — it's not linear, it's exponential in the final 2–3 weeks."
            example="You buy a call for $3.00 with 30 days to expiration. The stock goes nowhere for two weeks. Your option is now worth $1.80 — you've lost 40% without the stock moving a single dollar against you."
            howToAvoid="Buy options with enough time to expiration that theta doesn't kill your trade before the move materializes. At least 45 days, ideally 60–90. Don't hold losing options into the final 2 weeks hoping for a recovery — theta accelerates and makes recovery mathematically harder each day."
          />
          <LossCard
            title="IV crush — paying for volatility that disappears"
            frequency="very common"
            howItHappens="Implied volatility is highest just before a known event (earnings, FDA decision, economic data). The moment the event resolves, uncertainty disappears and IV collapses — often 40–60% in a single session. If you bought options before the event, the IV crush reduces the value of your position even if price moves in your favor."
            example="You buy calls on a stock at $100 before earnings. The stock beats and gaps up to $106 — a 6% move in your direction. But IV dropped from 80% to 30% overnight. Your calls are worth less than you paid because the move was smaller than the expected move priced into the premium."
            howToAvoid="Understand the expected move before buying options into events. If the straddle prices in an 8% move and the stock only moves 5%, buyers lose money even on the right direction. Either size down, use spreads to reduce your IV exposure, or wait until after the event to enter when IV is lower."
          />
          <LossCard
            title="Paying too wide a bid-ask spread"
            frequency="common"
            howItHappens="Illiquid options contracts have wide spreads between the bid (what buyers pay) and the ask (what sellers receive). Buying at the ask and immediately needing to sell at the bid means starting the trade at an instant loss. On a $1.00 option with a $0.30 spread, you're already down 30% before price moves."
            example="You buy 10 contracts of a small-cap option at $1.20 (the ask). The bid is $0.90. The stock immediately moves slightly in your favor but your position shows a loss because the fair value hasn't crossed above what you paid."
            howToAvoid="Only trade options with tight bid-ask spreads relative to the premium — generally no more than 10–15% of the option price. Check open interest before trading: contracts with open interest below 500 are often too illiquid to trade efficiently. Stick to liquid names (S&P 500 components, major ETFs) unless you have a very specific reason."
          />
          <LossCard
            title="Buying deep out-of-the-money options"
            frequency="very common"
            howItHappens="Far OTM options are cheap in absolute dollar terms, which makes them tempting. A $0.20 call feels like a low-risk lottery ticket. But the probability of that option expiring in-the-money is often 5–10%. The stock needs to make a massive move just for the option to have any value at expiration."
            example="You buy 20 contracts of a $0.15 call 10% above the current price with 2 weeks to expiration, spending $300. The stock rises 4% — a solid move — but your strike is still out of the money. The calls expire worthless. You lost 100% of $300."
            howToAvoid="Understand that cheap premium doesn't mean low risk — it means low probability. For directional trades, buy options with a delta of at least 0.30–0.40. The premium is higher but the probability of profit is dramatically better. Reserve OTM lotto plays for a small, defined portion of capital you're comfortable losing entirely."
          />
        </div>
      </section>

      <Divider />

      {/* 2. Strategy mistakes */}
      <section id="risk-strategy">
        <SectionHeader
          icon={<ShieldAlert className="w-4 h-4" />}
          title="Losses from Poor Strategy"
          subtitle="These losses come from how people structure and manage trades — the decision-making around entries, exits, and position sizing."
        />
        <div className="space-y-3">
          <LossCard
            title="No defined exit before entering"
            frequency="very common"
            howItHappens="You buy a call with a vague idea that you'll sell 'when it goes up enough.' When the trade goes against you, there's no pre-defined point at which you admit you're wrong — so you hold, rationalize, and watch a 30% loss become 60%, then 90%."
            example="You buy calls on a stock at support. The stock breaks support. You tell yourself it will bounce. It keeps dropping. Your options lose 80% of their value. You finally sell the day before expiration for nearly nothing."
            howToAvoid="Before every trade, write down: (1) the target price where you take profits, (2) the price level where you're proven wrong and will exit, (3) the maximum percentage of premium you'll allow yourself to lose (typically 50%). Treat these as firm rules, not suggestions."
          />
          <LossCard
            title="Averaging down into losing options positions"
            frequency="common"
            howItHappens="The trade goes against you so you buy more at a lower price to 'reduce your cost basis.' The problem: averaging down on options is uniquely dangerous because time decay is simultaneously eating away at all positions. More contracts at a lower price means more daily theta loss — and expiration doesn't move."
            example="You buy 5 calls at $2.00. The stock drops and they're at $1.00. You buy 5 more to average down to $1.50. The stock continues lower. Now you have 10 contracts losing value daily. All 10 expire worthless."
            howToAvoid="Options are wasting assets. Averaging down makes intuitive sense for stocks (you own more of something at a better price) but rarely works for options because time is always working against you. If a trade is wrong, the correct action is usually to exit and preserve capital — not double down."
          />
          <LossCard
            title="Holding through expiration hoping for a miracle"
            frequency="very common"
            howItHappens="An option is deep out of the money with a week to expiration. Rather than accept the loss and move on, you hold because 'something could happen.' The theta decay in the final week is severe — the option loses most of its remaining value every day even if the stock moves slightly."
            example="Your calls have 5 days left and are $8 OTM. They're worth $0.30 each. You hold, hoping for a gap up. The stock drifts sideways. On expiration Friday they're worth $0.02 and expire worthless. You lost the final $0.28 per contract for nothing."
            howToAvoid="Set a personal rule: if an option loses more than 50% of its value, evaluate whether the thesis is still intact. If the thesis is broken, exit. If the thesis is intact but timing was off, only hold if there's enough time left for the move to materialize. The final week of a losing position is almost always better spent closing and redeploying capital."
          />
          <LossCard
            title="Wrong expiration for the timeframe"
            frequency="common"
            howItHappens="You have a solid thesis for a move that will play out over 4–6 weeks, but you buy options expiring in 2 weeks to save on premium. The stock eventually moves in your direction — but after your options have already expired worthless."
            example="You expect a breakout after an upcoming catalyst in 3 weeks. You buy 2-week calls to save money. The stock consolidates for 2 weeks, your options expire, then the stock breaks out and rallies 15%. You were right about everything except expiration."
            howToAvoid="Match your expiration to your thesis timeline, then add a buffer. If you expect a move in 3 weeks, buy 6–8 weeks of expiration. The extra premium is insurance against being right but early. Being right and having your position expire worthless is one of the most frustrating and avoidable losses in options trading."
          />
          <LossCard
            title="Over-sizing a single trade"
            frequency="common"
            howItHappens="A setup looks exceptional — all the signals align, the conviction is high. You put 30–50% of your account into a single options trade. Even with a great setup, options can go to zero. A single max loss becomes catastrophic to your overall account."
            example="You have a $10,000 account. You put $4,000 into one earnings call trade. The company beats estimates but the stock drops on guidance. Your calls lose 90%. You've lost $3,600 — 36% of your entire account on a single trade."
            howToAvoid="Risk no more than 2–5% of your account on any single options trade. On a $10,000 account, that's $200–$500 per trade. This feels small but it means you can be wrong 10 times in a row and still have 75%+ of your capital intact. Consistency compounds; big losses set you back months."
          />
        </div>
      </section>

      <Divider />

      {/* 3. Behavioral losses */}
      <section id="risk-behavior">
        <SectionHeader
          icon={<Brain className="w-4 h-4" />}
          title="Losses from Behavioral Mistakes"
          subtitle="The market doesn't care about your emotions. These losses come entirely from the space between what you know you should do and what you actually do under pressure."
        />
        <div className="space-y-3">
          <LossCard
            title="Revenge trading after a loss"
            frequency="very common"
            howItHappens="You lose on a trade and immediately enter another to 'make it back.' The emotional urgency to recover pushes you into a trade with no setup, wrong sizing, or a name you haven't properly analyzed. The second trade often loses too, compounding the damage."
            example="You lose $500 on a morning trade. Feeling angry, you immediately put $800 into a different call you've heard about. It drops 60% by the close. You've now lost $980 in a single session when your original loss was $500."
            howToAvoid="Institute a mandatory cool-down rule after any loss exceeding a set threshold — no new trades for 1 hour, or for the rest of the session. Walk away from the screen. The market will be open tomorrow. Capital preserved is always better than trying to recover immediately."
          />
          <LossCard
            title="Chasing a move that already happened"
            frequency="very common"
            howItHappens="A stock moves 5% and you buy calls because it's 'moving.' You're buying into strength after the move has already started — often near the top of an intraday push. The stock reverses, you're the last buyer before the pullback, and your options lose value fast."
            example="NVDA gaps up 6% at open. You buy calls at 9:45 AM. The stock immediately pulls back for the next 2 hours. Your options are down 40% before any recovery begins. Even if the stock ends the day higher, you bought at the worst intraday price."
            howToAvoid="Define your entry price before the session starts, not after a stock is already moving. If a stock has already made a large move, wait for a pullback to a level before entering — don't chase the open. Missing a move is far less painful than buying the top of it."
          />
          <LossCard
            title="Letting winners become losers"
            frequency="common"
            howItHappens="A trade is up 60–80%. Instead of taking some or all profit, you hold for more. The stock reverses, your profits evaporate, and you end up selling at a loss (or break-even) on a trade that was once a big winner."
            example="You buy calls that quickly double. You think they'll triple. The stock reports mixed news, reverses, and your options go from +100% back to -20%. You sell in frustration at a loss on a trade where you had doubled your money."
            howToAvoid="Set a partial profit-taking rule — for example, sell half at +75–100% to take your cost basis off the table and let the remainder ride for free. A profit target is not optional; it's as important as a stop loss. Define both before you enter."
          />
          <LossCard
            title="Confirmation bias — only seeing what supports the trade"
            frequency="very common"
            howItHappens="Once you're in a trade, your brain filters information to support the position. Bearish signals get rationalized away. Bullish data gets amplified. You end up holding a losing position far longer than your original plan because you're unconsciously constructing a narrative to justify not exiting."
            example="You're long calls on a stock. It breaks below support. You tell yourself 'it always bounces from here.' Volume is rising on the down-days. You explain it as 'shakeout before the move.' The stock keeps falling. Each new bearish signal gets a new rationalization."
            howToAvoid="Write down the conditions under which your trade is wrong before you enter — and commit to acting on them regardless of how you feel. 'If the stock closes below $148, my thesis is invalid and I exit.' Make the exit criteria objective and pre-committed so that emotions can't override them in the moment."
          />
          <LossCard
            title="FOMO — trading without a setup"
            frequency="very common"
            howItHappens="You see a stock mentioned on social media, in a group chat, or in the news. It's already up big. You buy options because you're afraid of missing a larger move. There's no analysis, no defined risk, no thesis — just fear of being left out."
            example="A stock trends on social media, up 12% on the day. You buy calls at 2:30 PM near the high. The stock fades into the close and gaps down the next morning. Your calls lose 70% in 24 hours. The 'hot tip' was the exit liquidity."
            howToAvoid="Every trade needs a written answer to three questions before you enter: Why will it move? By when? Where am I wrong? If you can't answer all three, you don't have a trade — you have a guess. FOMO trades rarely meet this standard. If you missed a move, the next setup will come."
          />
        </div>
      </section>

      <Divider />

      {/* 4. Knowledge gaps */}
      <section id="risk-knowledge">
        <SectionHeader
          icon={<BookOpen className="w-4 h-4" />}
          title="Losses from Knowledge Gaps"
          subtitle="Some of the most painful losses come from not knowing how options behave in specific situations — mechanics that are obvious in hindsight but devastating when encountered unexpectedly."
        />
        <div className="space-y-3">
          <LossCard
            title="Not understanding the expected move"
            frequency="common"
            howItHappens="You buy calls before earnings expecting a 5% move on a beat. The stock moves 5% — but the options market had priced in a 9% move. Because the actual move was less than expected, IV collapses and your calls lose value despite the stock going in your direction."
            example="Stock is at $100. You buy $105 calls before earnings for $2.50. Earnings drop — stock goes to $105 — right at your strike. But IV crushes from 90% to 25%. Your calls are now worth $0.80. You were directionally right and still lost 68%."
            howToAvoid="Always calculate the expected move before trading into an event. If the at-the-money straddle costs $7, the market expects roughly a ±7% move. For a directional call to be profitable, the stock needs to move meaningfully beyond what's priced in — not just in the right direction."
          />
          <LossCard
            title="Misunderstanding assignment risk on short options"
            frequency="less common"
            howItHappens="Selling options (covered calls, cash-secured puts, spreads) generates premium — but if the option expires in-the-money and is exercised, you may be forced to buy or deliver shares at the strike price. Traders unfamiliar with assignment wake up to unexpected stock positions they didn't intend to hold."
            example="You sell a cash-secured put on a $200 stock at the $190 strike for $3.00 premium. The stock drops to $185. The put gets exercised and you're now long 100 shares at $190 — a $1,900 loss on the position, partially offset by the $300 premium received."
            howToAvoid="Understand assignment mechanics before selling any option. If you're not prepared to own the stock at the strike price, don't sell a put. If you're not prepared to sell your stock at the strike, don't sell a covered call. Only sell options you are comfortable with the assigned outcome."
          />
          <LossCard
            title="Ignoring the Greeks on multi-leg positions"
            frequency="less common"
            howItHappens="Spreads, straddles, and multi-leg strategies have complex combined Greeks that change as price moves. A position that looked delta-neutral at entry can become heavily directional after a move. Traders who don't monitor the combined exposure get caught off guard by losses they don't understand."
            example="You enter a short strangle (short call and short put). The stock drops 8%. The short put is now deep ITM, your delta is no longer neutral, and you're effectively long a large delta-negative position losing money rapidly. You didn't realize the strangle could behave like a short stock position."
            howToAvoid="Before entering any multi-leg strategy, understand the maximum gain, maximum loss, breakeven points, and how the Greeks change across different price scenarios. Paper trade complex strategies first. Start with single-leg defined-risk trades until the mechanics are second nature."
          />

          <Callout color="rose" title="The compounding effect of small losses">
            A single 50% loss requires a 100% gain to break even. A single 80% loss requires a 400%
            gain to recover. Options losses compound in the wrong direction faster than most people
            internalize. This is why capital preservation — not maximizing upside — is the primary
            discipline of anyone trading options long-term. The traders who last aren't the ones
            with the biggest wins; they're the ones who keep their losses small enough that one bad
            trade can't end their ability to trade.
          </Callout>

          <Callout color="blue" title="One rule that covers most of these situations">
            Risk a fixed, small percentage of your account per trade (2–5%). Define your exit before
            you enter. Never average down into losing options positions. Take partial profits when
            you have them. These four rules, consistently applied, eliminate the majority of the
            loss scenarios on this page — not because they make every trade profitable, but because
            they ensure no single trade, or sequence of trades, can permanently damage your account.
          </Callout>
        </div>
      </section>
    </div>
  );
}
