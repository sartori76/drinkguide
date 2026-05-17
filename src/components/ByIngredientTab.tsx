"use client";

import { useMemo, useState } from "react";
import type { Cocktail, IngredientCategory } from "@/lib/types";
import { INGREDIENT_CATEGORY_LABELS } from "@/lib/types";
import { INGREDIENTS } from "@/data/ingredients";
import { getAllUsedIngredientIds, getCocktailsByIngredient } from "@/lib/matching";
import { CocktailCard } from "./CocktailCard";

export function ByIngredientTab({ onSelect }: { onSelect: (c: Cocktail) => void }) {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  // Filtra só ingredientes que efetivamente aparecem em alguma receita.
  // Evita poluir a lista com itens do catálogo que ainda não têm cocktails associados.
  const usedIds = useMemo(() => new Set(getAllUsedIngredientIds()), []);
  const usedIngredients = useMemo(
    () => INGREDIENTS.filter((i) => usedIds.has(i.id)),
    [usedIds],
  );

  // Agrupa por categoria
  const grouped = useMemo(() => {
    const g = new Map<IngredientCategory, typeof usedIngredients>();
    for (const ing of usedIngredients) {
      const list = g.get(ing.category) ?? [];
      list.push(ing);
      g.set(ing.category, list);
    }
    // Ordena alfabeticamente dentro de cada grupo
    for (const list of g.values()) {
      list.sort((a, b) => a.displayName.localeCompare(b.displayName, "pt-BR"));
    }
    return g;
  }, [usedIngredients]);

  // Tela 2: cocktails que usam o ingrediente selecionado
  if (selectedIngredient) {
    const ingredient = INGREDIENTS.find((i) => i.id === selectedIngredient);
    const cocktails = getCocktailsByIngredient(selectedIngredient);

    return (
      <>
        <header className="screen-header">
          <button
            onClick={() => setSelectedIngredient(null)}
            style={{ color: "var(--text-muted)", marginBottom: 8, fontSize: 14 }}
          >
            ← Todos os ingredientes
          </button>
          <h1>{ingredient?.displayName}</h1>
          <p className="subtitle">
            {cocktails.length} cocktail{cocktails.length !== 1 ? "s" : ""}
          </p>
        </header>
        {cocktails.map((c) => (
          <CocktailCard key={c.id} cocktail={c} onClick={() => onSelect(c)} />
        ))}
      </>
    );
  }

  // Tela 1: lista de ingredientes agrupada por categoria
  // Ordem fixa das categorias — destilados primeiro
  const CATEGORY_ORDER: IngredientCategory[] = [
    "spirit",
    "liqueur",
    "vermouth",
    "wine",
    "juice",
    "syrup",
    "soda",
    "bitter",
    "other",
    "garnish",
  ];

  return (
    <>
      <header className="screen-header">
        <h1>Por ingrediente</h1>
        <p className="subtitle">Toque em um ingrediente para ver os cocktails</p>
      </header>

      {CATEGORY_ORDER.map((cat) => {
        const items = grouped.get(cat);
        if (!items || items.length === 0) return null;
        return (
          <section key={cat}>
            <div className="section-header">{INGREDIENT_CATEGORY_LABELS[cat]}</div>
            {items.map((ing) => (
              <button
                key={ing.id}
                className="cocktail-card"
                onClick={() => setSelectedIngredient(ing.id)}
              >
                <div className="name">{ing.displayName}</div>
                <div className="ingredients-preview">
                  {getCocktailsByIngredient(ing.id).length} cocktail
                  {getCocktailsByIngredient(ing.id).length !== 1 ? "s" : ""}
                </div>
              </button>
            ))}
          </section>
        );
      })}
    </>
  );
}
