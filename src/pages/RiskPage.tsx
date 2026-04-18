import { NavBar } from "@/components/NavBar";
import { RiskGuide } from "@/components/RiskGuide";
import { TableOfContents } from "@/components/TableOfContents";
import { AlertTriangle } from "lucide-react";

const SECTIONS = [
  { id: "risk-intro", label: "Overview" },
  { id: "risk-mechanics", label: "Options Mechanics" },
  { id: "risk-strategy", label: "Poor Strategy" },
  { id: "risk-behavior", label: "Behavioral Mistakes" },
  { id: "risk-knowledge", label: "Knowledge Gaps" },
];

export default function RiskPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">How People Lose Money</h1>
            <p className="text-sm text-muted-foreground">
              Common ways options traders blow up — and how to make sure you don't
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-48 shrink-0 md:sticky md:top-[64px]">
            <TableOfContents sections={SECTIONS} />
          </div>
          <div className="flex-1 min-w-0">
            <RiskGuide />
          </div>
        </div>
      </div>
    </div>
  );
}
