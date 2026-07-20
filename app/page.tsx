"use client";

import { useState } from "react";
import { GeneratorForm } from "@/components/generator/generator-form";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { Recipe, RecipeQueryParams } from "@/types/recipe";
import { generateRecipes } from "@/services/recipe-service";

export default function HomePage() {
  // 1. Зберігаємо масив рецептів
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: RecipeQueryParams) => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const data = await generateRecipes(params); // Передає Recipe[]
      setRecipes(data); // Записуємо масив
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Щось пішло не так. Спробуйте ще раз.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/40 to-emerald-50/30 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold tracking-wide uppercase">
            SmartChef AI
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-emerald-950 tracking-tight">
            Що приготуємо сьогодні?
          </h1>
          <p className="text-emerald-900/70 text-base md:text-lg max-w-lg mx-auto">
            Введіть інгредієнти, які є в холодильнику, і штучний інтелект
            створить персональний рецепт.
          </p>
        </header>

        {/* Форма генератора */}
        <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />

        {/* Помилка, якщо є */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center text-sm">
            {error}
          </div>
        )}

        {/* 2. Рендеримо масив рецептів через map */}
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
