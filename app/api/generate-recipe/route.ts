import { NextResponse } from "next/server";
import { Recipe, RecipeQueryParams } from "@/types/recipe";

export async function POST(req: Request) {
  try {
    const body: RecipeQueryParams = await req.json();
    const { ingredients, mealType } = body;

    // Зменшимо до 3-4 рецептів для максимальної швидкості та стабільності
    const count = 4;

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { success: false, error: "Вкажіть хоча б один інгредієнт." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "GEMINI_API_KEY не знайдено у файлі .env",
        },
        { status: 500 },
      );
    }

    const promptText = `
Ти — професійний шеф-кухар. Створи ${count} РІЗНИХ смачних рецептів українською мовою з цих інгредієнтів: ${ingredients.join(", ")}.
Можеш додавати ЛИШЕ базові спеції та воду (сіль, перець, олія, вода, зелень).
Категорія страви: ${mealType || "Будь-яка"}.

СУВОРІ ПРАВИЛА JSON:
1. Поверни ТІЛЬКИ чистий JSON МАСИВ без будь-якого вступного тексту чи markdown-тегів.
2. ВСІ текстові значення (title, description, name, amount, instructions) МАЮТЬ бути в один рядок (без переносів рядків всередині лапок).
3. НЕ використовуй подвійні лапки " всередині тексту (замінюй їх на апостроф ' або прибирай).
4. Згенеруй точно ${count} об'єктів.

Приклад структури:
[
  {
    "id": "recipe-1",
    "title": "Фріттата з ковбасою та томатами",
    "description": "Соковита та ситна яєчня із запеченими томатами та сиром",
    "prepTimeMinutes": 5,
    "cookTimeMinutes": 15,
    "servings": 2,
    "difficulty": "easy",
    "mealType": "${mealType || "breakfast"}",
    "isEdible": true,
    "nutrition": {
      "calories": 420,
      "protein": 22,
      "fat": 30,
      "carbs": 8
    },
    "ingredients": [
      { "name": "Яйця", "amount": "3 шт" },
      { "name": "Ковбаса", "amount": "80 г" },
      { "name": "Томати", "amount": "1 шт" },
      { "name": "Сир", "amount": "50 г" }
    ],
    "instructions": [
      "Порізати ковбасу та томати кубиками.",
      "Обсмажити ковбасу на пательні 2 хвилини.",
      "Збити яйця із сіллю та перцем, залити ковбасу з томатами.",
      "Посипати тертим сиром і готувати під кришкою 7 хвилин."
    ],
    "tags": ["сніданок", "швидко"]
  }
]
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
            maxOutputTokens: 8192,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || `Gemini API error: ${response.status}`,
      );
    }

    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      throw new Error("Порожня відповідь від ШІ");
    }

    // 1️⃣ Очищення від markdown розмітки
    let cleanContent = rawContent.replace(/```json|```/g, "").trim();

    // 2️⃣ Безпечний парсинг
    let parsedRecipes: Recipe[];
    try {
      parsedRecipes = JSON.parse(cleanContent);
    } catch (parseErr) {
      console.error("Первинна помилка парсингу JSON:", parseErr);
      // Спроба видалити некоректні коми перед закриваючими дужками
      cleanContent = cleanContent.replace(/,\s*([\]}])/g, "$1");
      parsedRecipes = JSON.parse(cleanContent);
    }

    // 3️⃣ Гарантуємо унікальні ID та прапорець isEdible
    const recipesData = parsedRecipes.map((item, index) => ({
      ...item,
      isEdible: true,
      id: `recipe-${Date.now()}-${index}`,
    }));

    return NextResponse.json({ success: true, data: recipesData });
  } catch (error) {
    console.error("Error in generate-recipe route:", error);
    const message =
      error instanceof Error ? error.message : "Не вдалося згенерувати рецепти";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
