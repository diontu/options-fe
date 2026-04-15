import { NavBar } from "@/components/NavBar";
import { PatternsGuide } from "@/components/PatternsGuide";
import { TableOfContents } from "@/components/TableOfContents";
import { GitBranch } from "lucide-react";

const SECTIONS = [
  { id: "patterns-intro", label: "How Patterns Form" },
  { id: "patterns-continuation", label: "Continuation Patterns" },
  { id: "patterns-reversal", label: "Reversal Patterns" },
  { id: "patterns-options", label: "Options Timing" },
];

export default function PatternsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Chart Patterns</h1>
            <p className="text-sm text-muted-foreground">
              Continuation and reversal patterns — what they look like, when they form, and how to
              trade them
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-48 shrink-0 md:sticky md:top-[64px]">
            <TableOfContents sections={SECTIONS} />
          </div>
          <div className="flex-1 min-w-0">
            <PatternsGuide />
          </div>
        </div>
      </div>
    </div>
  );
}
