"use client";

import { useState } from "react";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  isSaved?: boolean;
}

export function RecipeCard({
  recipe,
  onSave,
  isSaved = false,
}: RecipeCardProps) {
  // Локальний стан для відстеження закреслених інгредієнтів та кроків
  const [checkedIngredients, setCheckedIngredients] = useState<
    Record<number, boolean>
  >({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Перевірка на "неїстівний" запит від AI
  if (!recipe.isEdible) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
        <span className="text-3xl">🤖❓</span>
        <h3 className="text-lg font-semibold text-amber-950">
          Схоже, з цих інгредієнтів не вийде приготувати страву
        </h3>
        <p className="text-amber-900/70 text-sm">
          Штучний інтелект вважає, що наданий список не підходить для
          кулінарного рецепта. Спробуйте додати їстівні продукти!
        </p>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-emerald-900/10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Шапка рецепта */}
      <div className="space-y-4 border-b border-emerald-900/5 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold tracking-wide uppercase mb-2">
              {recipe.mealType}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-950">
              {recipe.title}
            </h2>
          </div>

          {onSave && (
            <button
              type="button"
              onClick={() => onSave(recipe)}
              className={`p-3 rounded-xl border transition-all ${
                isSaved
                  ? "bg-amber-50 border-amber-300 text-amber-600"
                  : "border-emerald-900/15 text-emerald-900/60 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
              title={isSaved ? "Збережено" : "Зберегти в обране"}
            >
              {isSaved ? "★" : "☆"}
            </button>
          )}
        </div>

        <p className="text-emerald-900/70 text-sm md:text-base leading-relaxed">
          {recipe.description}
        </p>

        {/* Основна мета-інформація */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
            <span className="block text-xs text-emerald-900/60 font-medium">
              Час підготовки
            </span>
            <span className="text-sm font-semibold text-emerald-950">
              {recipe.prepTimeMinutes} хв
            </span>
          </div>
          <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
            <span className="block text-xs text-emerald-900/60 font-medium">
              Час готовки
            </span>
            <span className="text-sm font-semibold text-emerald-950">
              {recipe.cookTimeMinutes} хв
            </span>
          </div>
          <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
            <span className="block text-xs text-emerald-900/60 font-medium">
              Порції
            </span>
            <span className="text-sm font-semibold text-emerald-950">
              {recipe.servings}
            </span>
          </div>
          <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
            <span className="block text-xs text-emerald-900/60 font-medium">
              Складність
            </span>
            <span className="text-sm font-semibold text-emerald-950 capitalize">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Калорійність / БЖУ */}
      {recipe.nutrition && (
        <div className="bg-amber-50/50 border border-amber-900/10 rounded-xl p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900/70 mb-2">
            Харчова цінність (на порцію)
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center text-xs md:text-sm">
            <div>
              <span className="block font-bold text-amber-950">
                {recipe.nutrition.calories}
              </span>
              <span className="text-amber-900/60">ккал</span>
            </div>
            <div>
              <span className="block font-bold text-amber-950">
                {recipe.nutrition.protein}г
              </span>
              <span className="text-amber-900/60">Білки</span>
            </div>
            <div>
              <span className="block font-bold text-amber-950">
                {recipe.nutrition.fat}г
              </span>
              <span className="text-amber-900/60">Жири</span>
            </div>
            <div>
              <span className="block font-bold text-amber-950">
                {recipe.nutrition.carbs}г
              </span>
              <span className="text-amber-900/60">Вуглеводи</span>
            </div>
          </div>
        </div>
      )}

      {/* Інгредієнти та Кроки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Інгредієнти (1 колонка) */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-lg font-bold text-emerald-950 border-b border-emerald-900/10 pb-2">
            Інгредієнти
          </h3>
          <ul className="space-y-2.5">
            {recipe.ingredients.map((item, idx) => (
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

        {/* Кроки приготування (2 колонки) */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold text-emerald-950 border-b border-emerald-900/10 pb-2">
            Інструкція приготування
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, idx) => (
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
      </div>
    </article>
  );
}
