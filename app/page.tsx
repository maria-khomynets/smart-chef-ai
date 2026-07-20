"use client";

import { GeneratorForm } from "@/components/generator/generator-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/40 to-emerald-50/30 px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Хедер сторінки */}
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
        <GeneratorForm
          onSubmit={(data) => console.log("Запит на рецепт:", data)}
        />
      </div>
    </main>
  );
}
