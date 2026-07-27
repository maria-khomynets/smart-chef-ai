"use client";

import { useState } from "react";
import { Ingredient } from "@/types/recipe";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}
export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<
    Record<number, boolean>
  >({});
  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Інгредієнти (1 колонка) */}
      <div className="space-y-4 md:col-span-1">
        <h3 className="text-lg font-bold text-emerald-950 border-b border-emerald-900/10 pb-2">
          Інгредієнти
        </h3>
        <ul className="space-y-2.5">
          {ingredients.map((item, idx) => (
            <li
              key={idx}
              onClick={() => toggleIngredient(idx)}
              className={`flex items-center justify-between text-sm cursor-pointer p-2 rounded-lg transition-colors ${
                checkedIngredients[idx]
                  ? "line-through text-emerald-900/40 bg-emerald-50/40"
                  : "text-emerald-950 hover:bg-emerald-50/60"
              }`}
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-xs text-emerald-900/60 font-mono ml-2">
                {item.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
