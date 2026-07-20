export interface Ingredient {
  name: string;
  amount: string; // Наприклад: "200г", "2 шт", "за смаком"
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "dessert";
export type Difficulty = "easy" | "medium" | "hard";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  mealType: MealType;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: NutritionFacts;
  tags: string[];
  isEdible: boolean; // Перевірка AI чи з наданих інгредієнтів взагалі можна готувати
}

export interface RecipeQueryParams {
  ingredients: string[];
  mealType?: MealType;
  maxTimeMinutes?: number;
  dietaryRestrictions?: string[];
}
