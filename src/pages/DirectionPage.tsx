import { DirectionGuide } from "@/components/DirectionGuide";
import { NavBar } from "@/components/NavBar";
import { Compass } from "lucide-react";

export default function DirectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
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

        <DirectionGuide />
      </div>
    </div>
  );
}
