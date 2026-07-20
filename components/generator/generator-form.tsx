"use client";

import { useState, KeyboardEvent } from "react";
import { MealType, RecipeQueryParams } from "@/types/recipe";

interface GeneratorFormProps {
  onSubmit?: (params: RecipeQueryParams) => void;
  isLoading?: boolean;
}

export function GeneratorForm({
  onSubmit,
  isLoading = false,
}: GeneratorFormProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [mealType, setMealType] = useState<MealType>("dinner");
  const [maxTime, setMaxTime] = useState<number>(30);

  // Додавання інгредієнта до списку
  const handleAddIngredient = () => {
    const trimmed = currentInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentInput("");
    }
  };

  // Додавання по натисканню на Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  // Видалення інгредієнта
  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredientToRemove));
  };

  // Відправка форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length === 0) return;

    if (onSubmit) {
      onSubmit({
        ingredients,
        mealType,
        maxTimeMinutes: maxTime,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-sm border border-emerald-900/10 space-y-6"
    >
      {/* Введення інгредієнтів */}
      <div>
        <label className="block text-sm font-semibold text-emerald-950 mb-2">
          Наявні інгредієнти <span className="text-emerald-600">*</span>
        </label>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Наприклад: томати, сир, куряче філе..."
            className="flex-1 px-4 py-3 rounded-xl border border-emerald-900/15 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all text-emerald-950 placeholder:text-emerald-900/40"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-5 py-3 bg-emerald-800 text-white rounded-xl font-medium hover:bg-emerald-900 active:scale-95 transition-all"
          >
            Додати
          </button>
        </div>

        {/* Список тегів */}
        <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
          {ingredients.length === 0 ? (
            <p className="text-xs text-emerald-900/50 italic">
              Додайте хоча б один інгредієнт, щоб згенерувати рецепт.
            </p>
          ) : (
            ingredients.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium animate-in fade-in zoom-in-95 duration-150"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(item)}
                  className="w-4 h-4 rounded-full inline-flex items-center justify-center hover:bg-emerald-200/60 text-emerald-700 transition-colors"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Опції та фільтри */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-emerald-900/5">
        <div>
          <label className="block text-sm font-medium text-emerald-950 mb-1.5">
            Тип страви
          </label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value as MealType)}
            className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/15 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 text-emerald-950 bg-white"
          >
            <option value="breakfast">Сніданок 🍳</option>
            <option value="lunch">Обід 🍲</option>
            <option value="dinner">Вечеря 🥗</option>
            <option value="snack">Перекус 🥪</option>
            <option value="dessert">Десерт 🍰</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-emerald-950 mb-1.5">
            Макс. час приготування:{" "}
            <span className="font-semibold text-emerald-700">{maxTime} хв</span>
          </label>
          <input
            type="range"
            min={10}
            max={90}
            step={5}
            value={maxTime}
            onChange={(e) => setMaxTime(Number(e.target.value))}
            className="w-full mt-3 accent-emerald-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Кнопка відправки */}
      <button
        type="submit"
        disabled={ingredients.length === 0 || isLoading}
        className="w-full py-4 px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-md shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-base"
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Створюємо рецепт...
          </>
        ) : (
          <>✨ Згенерувати рецепт</>
        )}
      </button>
    </form>
  );
}
