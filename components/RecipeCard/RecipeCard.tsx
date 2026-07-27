import { Recipe } from "@/types/recipe";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeNutrition } from "./RecipeNutrition";
import { RecipeIngredients } from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  isSaved?: boolean;
}
export default function RecipeCard({
  recipe,
  onSave,
  isSaved,
}: RecipeCardProps) {
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
    <>
      <RecipeHeader recipe={recipe} onSave={onSave} isSaved={isSaved} />
      <RecipeNutrition nutrition={recipe.nutrition} />
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipeInstructions instructions={recipe.instructions} />
    </>
  );
}
