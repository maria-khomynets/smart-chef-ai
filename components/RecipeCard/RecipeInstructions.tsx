"use client";
import { useState } from "react";

interface RecipeInstructionsProps {
  instructions: string[];
}
export default function RecipeInstructions({
  instructions,
}: RecipeInstructionsProps) {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <div className="space-y-4 md:col-span-2">
      <h3 className="text-lg font-bold text-emerald-950 border-b border-emerald-900/10 pb-2">
        Інструкція приготування
      </h3>
      <ol className="space-y-4">
        {instructions.map((step, idx) => (
          <li
            key={idx}
            onClick={() => toggleStep(idx)}
            className={`flex gap-3 text-sm cursor-pointer p-3 rounded-xl border transition-all ${
              checkedSteps[idx]
                ? "bg-emerald-50/40 border-emerald-900/5 text-emerald-900/40 line-through"
                : "bg-white border-emerald-900/10 text-emerald-950 hover:border-emerald-600/30 shadow-sm"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                checkedSteps[idx]
                  ? "bg-emerald-200 text-emerald-800"
                  : "bg-emerald-800 text-white"
              }`}
            >
              {idx + 1}
            </span>
            <p className="leading-relaxed pt-0.5">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
