import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  tickers: string[];
  onAdd: (ticker: string) => void;
  onRemove: (ticker: string) => void;
}

export function Watchlist({ tickers, onAdd, onRemove }: Props) {
  const [input, setInput] = useState("");

  function submit() {
    const val = input.trim().toUpperCase();
    if (val && !tickers.includes(val)) {
      onAdd(val);
    }
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tickers.map((ticker) => (
        <span
          key={ticker}
          className={cn(
            "inline-flex items-center gap-1 rounded-md border bg-background",
            "px-2.5 py-1 text-xs font-semibold tracking-wide"
          )}
        >
          {ticker}
          <button
            type="button"
            onClick={() => onRemove(ticker)}
            className="ml-0.5 rounded text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Remove ${ticker}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <Input
        type="text"
        placeholder="Add ticker…"
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        onBlur={submit}
        maxLength={10}
        className="h-7 w-28 text-xs"
      />
    </div>
  );
}
