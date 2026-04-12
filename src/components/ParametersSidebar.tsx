import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import type React from "react";

interface Props {
  symbol: string;
  onSymbolChange: (v: string) => void;
  indexRaw: string;
  onIndexChange: (v: string) => void;
  indexValid: boolean;
  strikeRaw: string;
  onStrikeChange: (v: string) => void;
  strikeValid: boolean;
  ivRaw: string;
  onIvChange: (v: string) => void;
  ivValid: boolean;
  deltaRaw: string;
  onDeltaChange: (v: string) => void;
  deltaValid: boolean;
  thetaRaw: string;
  onThetaChange: (v: string) => void;
  thetaValid: boolean;
  premiumRaw: string;
  onPremiumChange: (v: string) => void;
  premiumValid: boolean;
}

export function ParametersSidebar({
  symbol,
  onSymbolChange,
  indexRaw,
  onIndexChange,
  indexValid,
  strikeRaw,
  onStrikeChange,
  strikeValid,
  ivRaw,
  onIvChange,
  ivValid,
  deltaRaw,
  onDeltaChange,
  deltaValid,
  thetaRaw,
  onThetaChange,
  thetaValid,
  premiumRaw,
  onPremiumChange,
  premiumValid,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-1 pt-3 px-3">
        <CardTitle className="text-sm">Parameters</CardTitle>
        <CardDescription className="text-[11px]">Enter the market data</CardDescription>
      </CardHeader>
      <CardContent className="px-3 pb-3 pt-2 space-y-2">
        <Field label="Ticker Symbol">
          <Input
            id="symbol"
            type="text"
            placeholder="e.g. AAPL"
            value={symbol}
            onChange={(e) => onSymbolChange(e.target.value.toUpperCase())}
            maxLength={10}
            className="h-8 text-xs"
          />
        </Field>

        <Field label="Index Price" error={!indexValid ? "Enter a positive number" : undefined}>
          <Input
            id="index-price"
            type="number"
            min="0.01"
            step="1"
            placeholder="e.g. 5250"
            value={indexRaw}
            onChange={(e) => onIndexChange(e.target.value)}
            className={`h-8 text-xs${!indexValid ? " border-rose-400 focus-visible:ring-rose-400" : ""}`}
          />
        </Field>

        <Field label="Strike Price" error={!strikeValid ? "Enter a positive number" : undefined}>
          <Input
            id="strike-price"
            type="number"
            min="0.01"
            step="1"
            placeholder="e.g. 5500"
            value={strikeRaw}
            onChange={(e) => onStrikeChange(e.target.value)}
            className={`h-8 text-xs${!strikeValid ? " border-rose-400 focus-visible:ring-rose-400" : ""}`}
          />
        </Field>

        <Field
          label="Premium (per share)"
          error={!premiumValid ? "Enter a positive number" : undefined}
        >
          <Input
            id="premium"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="e.g. 3.50"
            value={premiumRaw}
            onChange={(e) => onPremiumChange(e.target.value)}
            className={`h-8 text-xs${!premiumValid ? " border-rose-400 focus-visible:ring-rose-400" : ""}`}
          />
        </Field>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Label htmlFor="iv" className="text-xs">
              Implied Volatility (%)
            </Label>
            <Tooltip
              side="top"
              width="w-[450px]"
              content={
                <div className="space-y-2.5">
                  <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground">
                    What IV tells you
                  </p>

                  <div className="space-y-1.5">
                    <p className="font-medium">What is implied volatility?</p>
                    <p className="text-muted-foreground leading-relaxed">
                      IV is the market's forward-looking expectation of how much a stock will move,
                      expressed as an annualized percentage. It's derived from option prices — when
                      demand for options rises, IV rises with it. It reflects uncertainty, not
                      direction. A higher IV means you're paying more premium; a lower IV means
                      premium is cheaper.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-medium">How likely the contract expires in range</p>
                    <p className="text-muted-foreground leading-relaxed">
                      IV gives a rough sense of how likely the underlying is to land within a given
                      price range by expiration. A wider IV means a wider expected range — and a
                      higher chance the strike ends up in-the-money. See the{" "}
                      <button
                        type="button"
                        className="text-primary underline underline-offset-2"
                        onClick={() => {
                          document
                            .getElementById("range-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Range by Time Period
                      </button>{" "}
                      section for the exact probabilities at 1σ, 2σ, and 3σ.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-medium">Is the IV actually high?</p>
                    <p className="text-muted-foreground leading-relaxed">
                      A raw IV number alone doesn't tell you whether options are cheap or expensive.
                      IV Rank compares today's IV against its 52-week history — an IVR near 100
                      means IV is historically elevated, making selling premium more attractive. See
                      the{" "}
                      <button
                        type="button"
                        className="text-primary underline underline-offset-2"
                        onClick={() => {
                          document
                            .getElementById("iv-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Understanding Implied Volatility
                      </button>{" "}
                      section for more.
                    </p>
                  </div>
                </div>
              }
            >
              <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
            </Tooltip>
          </div>
          <Input
            id="iv"
            type="number"
            min="0.1"
            max="500"
            step="0.1"
            placeholder="e.g. 18"
            value={ivRaw}
            onChange={(e) => onIvChange(e.target.value)}
            className={`h-8 text-xs${!ivValid ? " border-rose-400 focus-visible:ring-rose-400" : ""}`}
          />
          {!ivValid && <p className="text-[11px] text-rose-500">Enter 0.1–500</p>}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Label htmlFor="delta" className="text-xs">
              Delta
            </Label>
            <Tooltip
              side="top"
              width="w-64"
              content={
                <p className="text-muted-foreground leading-relaxed">
                  Delta (0 to 1 for calls, −1 to 0 for puts) is commonly used as a rough estimate of
                  the probability the option expires in-the-money. A delta of 0.30 implies roughly a
                  30% chance of expiring ITM.
                </p>
              }
            >
              <Info className="w-3 h-3 text-muted-foreground cursor-help" />
            </Tooltip>
          </div>
          <Input
            id="delta"
            type="number"
            min="-1"
            max="1"
            step="0.01"
            placeholder="e.g. 0.30"
            value={deltaRaw}
            onChange={(e) => onDeltaChange(e.target.value)}
            className={`h-8 text-xs${!deltaValid ? " border-rose-400 focus-visible:ring-rose-400" : ""}`}
          />
          {!deltaValid && <p className="text-[11px] text-rose-500">Enter −1 to 1</p>}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Label htmlFor="theta" className="text-xs">
              Theta (daily)
            </Label>
            <Tooltip
              side="top"
              width="w-64"
              content={
                <p className="text-muted-foreground leading-relaxed">
                  Theta is the dollar amount an option loses in value each day purely from time
                  passing. Enter it as a negative number (e.g. −0.05 means the option loses $0.05
                  per share, or $5 per contract, daily).
                </p>
              }
            >
              <Info className="w-3 h-3 text-muted-foreground cursor-help" />
            </Tooltip>
          </div>
          <Input
            id="theta"
            type="number"
            max="0"
            step="0.001"
            placeholder="e.g. −0.05"
            value={thetaRaw}
            onChange={(e) => onThetaChange(e.target.value)}
            className={`h-8 text-xs${!thetaValid ? " border-rose-400 focus-visible:ring-rose-400" : ""}`}
          />
          {!thetaValid && <p className="text-[11px] text-rose-500">Enter a negative number</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
      {error && <p className="text-[11px] text-rose-500">{error}</p>}
    </div>
  );
}
