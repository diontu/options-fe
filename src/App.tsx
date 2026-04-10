import { useState, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ParametersSidebar } from "@/components/ParametersSidebar";
import { VolatilityRangeTable } from "@/components/VolatilityRangeTable";
import { IVExplainer } from "@/components/IVExplainer";
import { DeltaExplainer } from "@/components/DeltaExplainer";
import { ThetaExplainer } from "@/components/ThetaExplainer";
import { TableOfContents } from "@/components/TableOfContents";
import { Watchlist } from "@/components/Watchlist";
import { NavBar } from "@/components/NavBar";
import { SummaryModal } from "@/components/SummaryModal";
import { TrendingUp, ClipboardList } from "lucide-react";

const DEFAULTS = {
  symbol: "AAPL",
  strikePrice: 5500,
  indexPrice: 5250,
  impliedVolatility: 18,
  delta: 0.3,
  theta: -0.05,
};

function parsePositiveNumber(val: string): number | null {
  const n = Number.parseFloat(val);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function App() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("watchlist");
      if (stored) return JSON.parse(stored) as string[];
    } catch {}
    return ["AAPL", "SPY", "QQQ"];
  });

  function updateWatchlist(next: string[]) {
    setWatchlist(next);
    localStorage.setItem("watchlist", JSON.stringify(next));
  }
  const [symbol, setSymbol] = useState(DEFAULTS.symbol);
  const [strikeRaw, setStrikeRaw] = useState(String(DEFAULTS.strikePrice));
  const [indexRaw, setIndexRaw] = useState(String(DEFAULTS.indexPrice));
  const [ivRaw, setIvRaw] = useState(String(DEFAULTS.impliedVolatility));
  const [deltaRaw, setDeltaRaw] = useState(String(DEFAULTS.delta));
  const [thetaRaw, setThetaRaw] = useState(String(DEFAULTS.theta));
  const [premiumRaw, setPremiumRaw] = useState("");

  const debouncedStrike = useDebounce(strikeRaw);
  const debouncedIndex = useDebounce(indexRaw);
  const debouncedIv = useDebounce(ivRaw);
  const debouncedDelta = useDebounce(deltaRaw);
  const debouncedTheta = useDebounce(thetaRaw);
  const debouncedPremium = useDebounce(premiumRaw);

  const strike = parsePositiveNumber(debouncedStrike) ?? DEFAULTS.strikePrice;
  const index = parsePositiveNumber(debouncedIndex) ?? DEFAULTS.indexPrice;
  const iv = parsePositiveNumber(debouncedIv) ?? DEFAULTS.impliedVolatility;

  const parseDelta = (val: string): number | null => {
    const n = Number.parseFloat(val);
    return Number.isFinite(n) && n >= -1 && n <= 1 && n !== 0 ? n : null;
  };
  const delta = parseDelta(debouncedDelta) ?? DEFAULTS.delta;

  const strikeValid = parsePositiveNumber(debouncedStrike) !== null;
  const indexValid = parsePositiveNumber(debouncedIndex) !== null;
  const ivValid =
    parsePositiveNumber(debouncedIv) !== null && parsePositiveNumber(debouncedIv)! <= 500;
  const deltaValid = parseDelta(debouncedDelta) !== null;

  const parseTheta = (val: string): number | null => {
    const n = Number.parseFloat(val);
    return Number.isFinite(n) && n < 0 ? n : null;
  };
  const theta = parseTheta(debouncedTheta) ?? DEFAULTS.theta;
  const thetaValid = parseTheta(debouncedTheta) !== null;

  const premium = parsePositiveNumber(debouncedPremium);
  const premiumValid = debouncedPremium === "" || premium !== null;

  const allValid = strikeValid && indexValid && ivValid;

  const [summaryOpen, setSummaryOpen] = useState(false);
  const closeSummary = useCallback(() => setSummaryOpen(false), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Watchlist */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-semibold text-muted-foreground shrink-0">Watchlist</span>
          <Watchlist
            tickers={watchlist}
            onAdd={(t) => updateWatchlist([...watchlist, t])}
            onRemove={(t) => updateWatchlist(watchlist.filter((x) => x !== t))}
          />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Options Visualizer</h1>
            <p className="text-sm text-muted-foreground">
              Visualize implied volatility range by time period
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sticky sidebar */}
          <div className="w-full md:w-56 shrink-0 md:sticky md:top-[64px] space-y-3">
            <TableOfContents />
            <ParametersSidebar
              symbol={symbol}
              onSymbolChange={setSymbol}
              indexRaw={indexRaw}
              onIndexChange={setIndexRaw}
              indexValid={indexValid}
              strikeRaw={strikeRaw}
              onStrikeChange={setStrikeRaw}
              strikeValid={strikeValid}
              ivRaw={ivRaw}
              onIvChange={setIvRaw}
              ivValid={ivValid}
              deltaRaw={deltaRaw}
              onDeltaChange={setDeltaRaw}
              deltaValid={deltaValid}
              thetaRaw={thetaRaw}
              onThetaChange={setThetaRaw}
              thetaValid={thetaValid}
              premiumRaw={premiumRaw}
              onPremiumChange={setPremiumRaw}
              premiumValid={premiumValid}
            />
            <button
              type="button"
              onClick={() => setSummaryOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              View Summary
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Range by time */}
            <Card id="range-section">
              <CardHeader>
                <CardTitle className="text-base">Range by Time Period</CardTitle>
                <CardDescription>
                  Expected ±Nσ move scaled by time using{" "}
                  <span className="font-mono text-xs">IV × √(days / 252)</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {allValid ? (
                  <VolatilityRangeTable
                    indexPrice={index}
                    strikePrice={strike}
                    impliedVolatility={iv}
                    premium={premium ?? undefined}
                    delta={deltaValid ? delta : undefined}
                  />
                ) : (
                  <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                    Fix the inputs to see the ranges.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delta explainer */}
            <Card id="delta-section">
              <CardHeader>
                <CardTitle className="text-base">Understanding Delta</CardTitle>
                <CardDescription>
                  What a delta of {delta.toFixed(2)} means for this option
                </CardDescription>
              </CardHeader>
              <CardContent>
                {deltaValid ? (
                  <DeltaExplainer delta={delta} />
                ) : (
                  <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                    Enter a valid delta above.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* IV explainer */}
            <Card id="iv-section">
              <CardHeader>
                <CardTitle className="text-base">Understanding Implied Volatility</CardTitle>
                <CardDescription>
                  What the current IV of {iv.toFixed(1)}% means for buyers and sellers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ivValid ? (
                  <IVExplainer impliedVolatility={iv} symbol={symbol} />
                ) : (
                  <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                    Enter a valid IV above.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Theta explainer */}
            <Card id="theta-section">
              <CardHeader>
                <CardTitle className="text-base">Understanding Theta</CardTitle>
                <CardDescription>
                  How the daily time decay of {theta.toFixed(3)} affects this option
                </CardDescription>
              </CardHeader>
              <CardContent>
                {thetaValid ? (
                  <ThetaExplainer theta={theta} />
                ) : (
                  <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                    Enter a valid theta above.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SummaryModal
        open={summaryOpen}
        onClose={closeSummary}
        symbol={symbol}
        indexPrice={index}
        strikePrice={strike}
        iv={iv}
        delta={delta}
        theta={theta}
        premium={premium ?? undefined}
        allValid={allValid}
        deltaValid={deltaValid}
        thetaValid={thetaValid}
      />
    </div>
  );
}
