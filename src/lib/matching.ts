import type { Cocktail } from "@/lib/types";
import { COCKTAILS } from "@/data/cocktails";
import { INGREDIENT_BY_ID } from "@/data/ingredients";

// Ingredientes considerados "básicos" — assume-se que o usuário tem (água, açúcar, gelo).
// Não conta como "ingrediente faltando" no matching. Mantenha esta lista pequena.
const ASSUMED_AVAILABLE = new Set<string>([
  "water",
  "sugar-cube",
  "superfine-sugar",
]);

export interface MatchResult {
  cocktail: Cocktail;
  // Quantos ingredientes não-básicos da receita o usuário possui (numerador).
  matchedCount: number;
  // Quantos ingredientes não-básicos a receita tem ao todo (denominador).
  totalRequired: number;
  // Lista dos ingredientes faltantes (ids), excluindo guarnições opcionais e básicos.
  missing: string[];
}

// Regras de qualificação para a receita aparecer no resultado:
// - "exact": usuário possui todos os ingredientes essenciais (guarnições e básicos não contam)
// - "missing-1": falta exatamente 1 ingrediente essencial
// - "missing-2": faltam exatamente 2 ingredientes essenciais
// Acima disso a receita não aparece — o resultado vira ruído.

export interface MatchOptions {
  // Quando true, guarnições não contam como faltantes (recomendado, é o default).
  ignoreGarnishes?: boolean;
}

export function matchCocktails(
  userIngredientIds: string[],
  options: MatchOptions = {},
): {
  exact: MatchResult[];
  missing1: MatchResult[];
  missing2: MatchResult[];
} {
  const { ignoreGarnishes = true } = options;
  const userSet = new Set(userIngredientIds);

  const exact: MatchResult[] = [];
  const missing1: MatchResult[] = [];
  const missing2: MatchResult[] = [];

  for (const cocktail of COCKTAILS) {
    // Filtra ingredientes da receita que CONTAM no matching:
    // - exclui básicos (água, açúcar)
    // - opcionalmente exclui guarnições
    const essential = cocktail.ingredients.filter((ri) => {
      if (ASSUMED_AVAILABLE.has(ri.ingredientId)) return false;
      if (ri.optional) return false;
      if (ignoreGarnishes) {
        const ing = INGREDIENT_BY_ID[ri.ingredientId];
        if (ing?.category === "garnish") return false;
      }
      return true;
    });

    const missing = essential
      .map((ri) => ri.ingredientId)
      .filter((id) => !userSet.has(id));

    const result: MatchResult = {
      cocktail,
      matchedCount: essential.length - missing.length,
      totalRequired: essential.length,
      missing,
    };

    if (missing.length === 0 && essential.length > 0) {
      exact.push(result);
    } else if (missing.length === 1) {
      missing1.push(result);
    } else if (missing.length === 2) {
      missing2.push(result);
    }
  }

  // Ordena exatos por número de ingredientes (mais simples primeiro — mais fácil de fazer).
  exact.sort((a, b) => a.totalRequired - b.totalRequired);
  missing1.sort((a, b) => a.totalRequired - b.totalRequired);
  missing2.sort((a, b) => a.totalRequired - b.totalRequired);

  return { exact, missing1, missing2 };
}

// Retorna todos os IDs de ingredientes que aparecem em ao menos um cocktail.
// Usado para popular a lista de checkboxes da aba "Minha despensa".
export function getAllUsedIngredientIds(): string[] {
  const set = new Set<string>();
  for (const c of COCKTAILS) {
    for (const ri of c.ingredients) {
      set.add(ri.ingredientId);
    }
  }
  return Array.from(set);
}

// Para a aba "Por ingrediente": dado um ingredientId, retorna os cocktails que o usam.
export function getCocktailsByIngredient(ingredientId: string): Cocktail[] {
  return COCKTAILS.filter((c) =>
    c.ingredients.some((ri) => ri.ingredientId === ingredientId),
  );
}
