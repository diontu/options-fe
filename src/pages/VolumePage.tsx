import { NavBar } from "@/components/NavBar";
import { TableOfContents } from "@/components/TableOfContents";
import { VolumeGuide } from "@/components/VolumeGuide";
import { BarChart2 } from "lucide-react";

const SECTIONS = [
  { id: "volume-matters", label: "Does Volume Move Price?" },
  { id: "volume-days", label: "Volume by Day of Week" },
  { id: "volume-relative", label: "Relative Volume (RVOL)" },
  { id: "volume-options", label: "Volume & Your Options" },
];

export default function VolumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Volume & the Trading Week</h1>
            <p className="text-sm text-muted-foreground">
              How volume confirms price moves — and what to expect from each day of the week
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-48 shrink-0 md:sticky md:top-[64px]">
            <TableOfContents sections={SECTIONS} />
          </div>
          <div className="flex-1 min-w-0">
            <VolumeGuide />
          </div>
        </div>
      </div>
    </div>
  );
}
