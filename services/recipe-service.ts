import { Recipe, RecipeQueryParams } from "@/types/recipe";

export async function generateRecipe(
  params: RecipeQueryParams,
): Promise<Recipe> {
  const response = await fetch("/api/generate-recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Помилка при генерації рецепта");
  }

  return result.data;
}
