import { Target } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { EntryFramework } from "@/components/EntryFramework";

export default function EntryFrameworkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <NavBar />

      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">When to Buy Into a Contract</h1>
            <p className="text-sm text-muted-foreground">
              A five-check decision framework for timing options entries
            </p>
          </div>
        </div>

        <EntryFramework />
      </div>
    </div>
  );
}
