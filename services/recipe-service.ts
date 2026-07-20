import { Recipe, RecipeQueryParams } from "@/types/recipe";

export async function generateRecipes(
  params: RecipeQueryParams,
): Promise<Recipe[]> {
  const response = await fetch("/api/generate-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || "Не вдалося згенерувати рецепти. Спробуйте ще раз.",
    );
  }

  // Переконуємося, що завжди повертаємо саме масив
  if (Array.isArray(result.data)) {
    return result.data;
  } else if (result.data) {
    return [result.data];
  }

  return [];
}
