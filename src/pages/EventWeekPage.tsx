import { EventWeekGuide } from "@/components/EventWeekGuide";
import { NavBar } from "@/components/NavBar";
import { TableOfContents } from "@/components/TableOfContents";
import { Calendar } from "lucide-react";

const SECTIONS = [
  { id: "event-week-before", label: "Week Leading Up" },
  { id: "event-week-dayof", label: "Day of the Event" },
  { id: "event-week-political", label: "Political & Macro Events" },
  { id: "event-week-reaction", label: "Reading the Reaction" },
];

export default function EventWeekPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Event Week Playbook</h1>
            <p className="text-sm text-muted-foreground">
              What to watch before, during, and after earnings, political events, and macro releases
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-48 shrink-0 md:sticky md:top-[64px]">
            <TableOfContents sections={SECTIONS} />
          </div>
          <div className="flex-1 min-w-0">
            <EventWeekGuide />
          </div>
        </div>
      </div>
    </div>
  );
}
