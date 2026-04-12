import { DirectionGuide } from "@/components/DirectionGuide";
import { NavBar } from "@/components/NavBar";
import { TableOfContents } from "@/components/TableOfContents";
import { Compass } from "lucide-react";

const DIRECTION_SECTIONS = [
  { id: "dir-why", label: "Why Direction Matters" },
  { id: "dir-states", label: "Three Market States" },
  { id: "dir-structure", label: "Market Structure" },
  { id: "dir-ma", label: "Moving Averages" },
  { id: "dir-timeframes", label: "Timeframe Alignment" },
  { id: "dir-momentum", label: "Momentum" },
  { id: "dir-checklist", label: "Confirmation Checklist" },
];

export default function DirectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Understanding Stock Direction</h1>
            <p className="text-sm text-muted-foreground">
              How to read trend, structure, and momentum before committing to a bias
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sticky TOC sidebar */}
          <div className="w-full md:w-48 shrink-0 md:sticky md:top-[64px]">
            <TableOfContents sections={DIRECTION_SECTIONS} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <DirectionGuide />
          </div>
        </div>
      </div>
    </div>
  );
}
