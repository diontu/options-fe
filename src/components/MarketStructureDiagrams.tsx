function ChartShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="rounded-lg border overflow-hidden">
      <div className="px-3 py-1.5 border-b bg-muted/40 text-center">
        <p className="text-[11px] font-semibold text-muted-foreground">{title}</p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/60 p-3">{children}</div>
    </figure>
  );
}

export function UptrendDiagram() {
  return (
    <ChartShell title="Uptrend — Higher Highs & Higher Lows">
      <svg viewBox="0 0 270 130" className="w-full" aria-hidden="true">
        {/* Price line */}
        <polyline
          points="10,112 60,48 110,75 168,25 215,52 260,32"
          stroke="#10b981"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Turning point dots */}
        {(
          [
            [60, 48],
            [110, 75],
            [168, 25],
            [215, 52],
          ] as [number, number][]
        ).map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#10b981" />
        ))}
        {/* Start dot */}
        <circle cx="10" cy="112" r="3" fill="#94a3b8" />
        {/* Labels */}
        <text x="60" y="37" textAnchor="middle" fontSize="9" fill="#94a3b8">
          H₁
        </text>
        <text x="110" y="93" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">
          HL
        </text>
        <text x="168" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">
          HH
        </text>
        <text x="215" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">
          HL
        </text>
        {/* Axis label */}
        <text x="258" y="126" textAnchor="end" fontSize="8" fill="#cbd5e1">
          Price →
        </text>
      </svg>
    </ChartShell>
  );
}

export function DowntrendDiagram() {
  return (
    <ChartShell title="Downtrend — Lower Highs & Lower Lows">
      <svg viewBox="0 0 270 130" className="w-full" aria-hidden="true">
        {/* Price line */}
        <polyline
          points="10,20 60,90 110,58 168,112 215,80 260,105"
          stroke="#f43f5e"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {(
          [
            [60, 90],
            [110, 58],
            [168, 112],
            [215, 80],
          ] as [number, number][]
        ).map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#f43f5e" />
        ))}
        <circle cx="10" cy="20" r="3" fill="#94a3b8" />
        {/* Labels */}
        <text x="60" y="106" textAnchor="middle" fontSize="9" fill="#94a3b8">
          L₁
        </text>
        <text x="110" y="47" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f43f5e">
          LH
        </text>
        <text x="168" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f43f5e">
          LL
        </text>
        <text x="215" y="69" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f43f5e">
          LH
        </text>
        <text x="258" y="126" textAnchor="end" fontSize="8" fill="#cbd5e1">
          Price →
        </text>
      </svg>
    </ChartShell>
  );
}

export function BosChochDiagram() {
  // Downtrend: (10,20)->(65,112)->(118,60)->(175,122)
  // Recovery crosses prior LH at y=60 → ChoCh at (232,60)
  // Continues to new HH at (270,22)
  // Slope of recovery: (22-122)/(270-175) = -100/95 ≈ -1.053
  // y=60: 60=122-1.053(x-175) → x=175+59.4=234 ≈ 234
  return (
    <ChartShell title="Change of Character (ChoCh) & Break of Structure (BOS)">
      <svg viewBox="0 0 290 140" className="w-full" aria-hidden="true">
        {/* Prior LH dashed level */}
        <line
          x1="118"
          y1="60"
          x2="284"
          y2="60"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="4,3"
        />
        <text x="282" y="54" textAnchor="end" fontSize="8" fill="#94a3b8">
          Prior LH
        </text>

        {/* Downtrend */}
        <polyline
          points="10,20 65,112 118,60 175,122"
          stroke="#f43f5e"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Recovery approaching ChoCh — amber dashed */}
        <polyline
          points="175,122 234,60"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="5,2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Post-ChoCh rally — green solid */}
        <polyline
          points="234,60 270,22"
          stroke="#10b981"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Dots */}
        <circle cx="65" cy="112" r="3" fill="#f43f5e" />
        <circle cx="118" cy="60" r="3" fill="#f43f5e" />
        <circle cx="175" cy="122" r="3" fill="#f43f5e" />
        {/* ChoCh marker */}
        <circle cx="234" cy="60" r="5" fill="#f59e0b" stroke="white" strokeWidth="1.5" />
        {/* New HH marker */}
        <circle cx="270" cy="22" r="4" fill="#10b981" stroke="white" strokeWidth="1.5" />

        {/* Labels — downtrend */}
        <text x="65" y="127" textAnchor="middle" fontSize="9" fill="#94a3b8">
          L₁
        </text>
        <text x="118" y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f43f5e">
          LH
        </text>
        <text x="175" y="136" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f43f5e">
          LL
        </text>

        {/* ChoCh label */}
        <text x="240" y="50" textAnchor="start" fontSize="9" fontWeight="700" fill="#f59e0b">
          ChoCh ↑
        </text>

        {/* New HH / BOS label */}
        <text x="270" y="12" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981">
          HH
        </text>
        <text x="270" y="36" textAnchor="middle" fontSize="8" fill="#10b981">
          BOS ✓
        </text>
      </svg>
    </ChartShell>
  );
}

export function InternalExternalDiagram() {
  return (
    <ChartShell title="Internal vs. External Structure">
      <svg viewBox="0 0 300 135" className="w-full" aria-hidden="true">
        {/* External structure — thick slate */}
        <polyline
          points="10,118 150,18 290,75"
          stroke="#475569"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Internal upswing — thin violet dashed */}
        <polyline
          points="10,118 45,78 75,95 110,48 150,18"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          strokeDasharray="4,2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Internal pullback — thin violet dashed */}
        <polyline
          points="150,18 188,52 218,35 258,68 290,75"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          strokeDasharray="4,2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* External dots */}
        <circle cx="10" cy="118" r="4" fill="#475569" />
        <circle cx="150" cy="18" r="4" fill="#475569" />
        <circle cx="290" cy="75" r="4" fill="#475569" />
        {/* Internal dots */}
        {(
          [
            [45, 78],
            [75, 95],
            [110, 48],
            [188, 52],
            [218, 35],
            [258, 68],
          ] as [number, number][]
        ).map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="#8b5cf6" />
        ))}
        {/* Legend */}
        <line x1="10" y1="130" x2="32" y2="130" stroke="#475569" strokeWidth="3" />
        <text x="35" y="133" fontSize="9" fill="#64748b">
          External
        </text>
        <line
          x1="100"
          y1="130"
          x2="122"
          y2="130"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          strokeDasharray="4,2"
        />
        <text x="125" y="133" fontSize="9" fill="#8b5cf6">
          Internal
        </text>
      </svg>
    </ChartShell>
  );
}

export function MarketStructureDiagrams() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <UptrendDiagram />
      <DowntrendDiagram />
      <BosChochDiagram />
      <InternalExternalDiagram />
    </div>
  );
}
