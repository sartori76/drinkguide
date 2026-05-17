"use client";

import { useMemo } from "react";
import type { Cocktail, Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { COCKTAILS } from "@/data/cocktails";
import { CocktailCard } from "./CocktailCard";

const ORDER: Category[] = ["unforgettable", "contemporary", "new-era"];

export function CategoriesTab({ onSelect }: { onSelect: (c: Cocktail) => void }) {
  const grouped = useMemo(() => {
    const g: Record<Category, Cocktail[]> = {
      "unforgettable": [],
      "contemporary": [],
      "new-era": [],
    };
    for (const c of COCKTAILS) {
      g[c.category].push(c);
    }
    // Ordena cada categoria por nome para consistência
    for (const k of ORDER) {
      g[k].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    }
    return g;
  }, []);

  return (
    <>
      <header className="screen-header">
        <h1>Categorias IBA</h1>
        <p className="subtitle">102 cocktails oficiais em 3 eras</p>
      </header>

      {ORDER.map((cat) => (
        <section key={cat}>
          <div className="section-header">{CATEGORY_LABELS[cat]}</div>
          {grouped[cat].length === 0 ? (
            <div className="empty-state">Nenhum cocktail nesta categoria ainda.</div>
          ) : (
            grouped[cat].map((c) => (
              <CocktailCard
                key={c.id}
                cocktail={c}
                onClick={() => onSelect(c)}
              />
            ))
          )}
        </section>
      ))}
    </>
  );
}
