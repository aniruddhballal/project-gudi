"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function AimsExplorer({ aims }: { aims: readonly string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAim = aims[activeIndex] ?? aims[0] ?? "";

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Aims and objectives">
        {aims.map((aim, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={aim}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveIndex(index)}
              className={`group rounded-2xl border p-4 text-left transition ${active ? "border-[#9d431f] bg-[#9d431f] text-white shadow-[0_12px_25px_rgba(157,67,31,0.18)]" : "border-[#eadfd2] bg-white text-[#3b241c] hover:-translate-y-0.5 hover:border-[#c58a43] hover:shadow-[0_8px_20px_rgba(78,42,24,0.07)]"}`}
            >
              <span className={`text-xs font-bold tracking-[0.18em] ${active ? "text-amber-200" : "text-[#a45826]"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-3 block text-sm font-semibold leading-6">{aim}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-64 flex-col justify-between rounded-[1.5rem] bg-[#2c1916] p-7 text-white shadow-[0_18px_45px_rgba(78,42,24,0.12)] sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Selected objective</p>
          <p className="display-type mt-4 text-4xl text-white sm:text-5xl">{String(activeIndex + 1).padStart(2, "0")}</p>
          <p className="mt-5 text-lg font-semibold leading-8 text-[#f5e5d5]">{activeAim}</p>
        </div>
        <p className="mt-8 flex items-center gap-2 text-xs font-semibold text-stone-300"><ArrowRight className="h-4 w-4 text-amber-300" /> Select another aim to bring it into focus</p>
      </div>
    </div>
  );
}
