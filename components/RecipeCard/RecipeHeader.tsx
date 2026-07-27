import { Recipe } from "@/types/recipe";

interface RecipeHeaderProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  isSaved?: boolean;
}
export function RecipeHeader({
  recipe,
  onSave,
  isSaved = false,
}: RecipeHeaderProps) {
  return (
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
            Час готування
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
  );
}
