import { NutritionFacts } from "@/types/recipe";

interface RecipeNutritionProps {
  nutrition: NutritionFacts;
}

export function RecipeNutrition({ nutrition }: RecipeNutritionProps) {
  return (
    <div>
      <div className="bg-amber-50/50 border border-amber-900/10 rounded-xl p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900/70 mb-2">
          Харчова цінність (на порцію)
        </h4>
        <div className="grid grid-cols-4 gap-2 text-center text-xs md:text-sm">
          <div>
            <span className="block font-bold text-amber-950">
              {nutrition.calories}
            </span>
            <span className="text-amber-900/60">ккал</span>
          </div>
          <div>
            <span className="block font-bold text-amber-950">
              {nutrition.protein}г
            </span>
            <span className="text-amber-900/60">Білки</span>
          </div>
          <div>
            <span className="block font-bold text-amber-950">
              {nutrition.fat}г
            </span>
            <span className="text-amber-900/60">Жири</span>
          </div>
          <div>
            <span className="block font-bold text-amber-950">
              {nutrition.carbs}г
            </span>
            <span className="text-amber-900/60">Вуглеводи</span>
          </div>
        </div>
      </div>
    </div>
  );
}
