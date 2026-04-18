import { InstitutionsGuide } from "@/components/InstitutionsGuide";
import { NavBar } from "@/components/NavBar";
import { TableOfContents } from "@/components/TableOfContents";
import { Building2 } from "lucide-react";

const SECTIONS = [
  { id: "inst-who", label: "Who Institutions Are" },
  { id: "inst-how", label: "How They Move Price" },
  { id: "inst-identify", label: "Identifying Their Entry" },
  { id: "inst-advantage", label: "Using It to Your Advantage" },
  { id: "inst-mistakes", label: "Common Mistakes" },
  { id: "inst-tools", label: "What to Look At" },
];

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Institutions & Market Structure</h1>
            <p className="text-sm text-muted-foreground">
              Who the big players are, how to spot them, and how to trade alongside them
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-48 shrink-0 md:sticky md:top-[64px]">
            <TableOfContents sections={SECTIONS} />
          </div>
          <div className="flex-1 min-w-0">
            <InstitutionsGuide />
          </div>
        </div>
      </div>
    </div>
  );
}
