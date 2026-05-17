"use client";

import { useMemo, useState } from "react";
import type { Cocktail, Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { COCKTAILS } from "@/data/cocktails";
import IMAGES from "@/data/cocktail-images.json";
import { INGREDIENT_BY_ID } from "@/data/ingredients";
import { useFavorites } from "@/lib/favorites";

const IMAGES_MAP = IMAGES as Record<string, string>;

const CATEGORY_META: Record<Category, { emoji: string; desc: string }> = {
  "unforgettable": {
    emoji: "🥃",
    desc: "Os clássicos absolutos de todos os tempos",
  },
  "contemporary": {
    emoji: "🍸",
    desc: "Nascidos no séc. XX, presentes em todo bar",
  },
  "new-era": {
    emoji: "✨",
    desc: "Criações pós-2000 que definiram uma geração",
  },
};

const ORDER: Category[] = ["unforgettable", "contemporary", "new-era"];

export function CategoriesTab({ onSelect }: { onSelect: (c: Cocktail) => void }) {
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const { favorites } = useFavorites();

  const grouped = useMemo(() => {
    const g: Record<Category, Cocktail[]> = {
      "unforgettable": [],
      "contemporary": [],
      "new-era": [],
    };
    for (const c of COCKTAILS) g[c.category].push(c);
    for (const k of ORDER) g[k].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    return g;
  }, []);

  const favoriteCocktails = useMemo(() => {
    if (favorites.size === 0) return [];
    return COCKTAILS.filter((c) => favorites.has(c.id)).sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR"),
    );
  }, [favorites]);

  // --- tela de seleção de categoria ---
  if (!selectedCat) {
    return (
      <>
        <header className="screen-header">
          <h1>Categorias IBA</h1>
          <p className="subtitle">102 cocktails oficiais em 3 eras</p>
        </header>

        {favoriteCocktails.length > 0 && (
          <section>
            <div className="section-header">★ Favoritos ({favoriteCocktails.length})</div>
            {favoriteCocktails.map((cocktail) => {
              const imgUrl = IMAGES_MAP[cocktail.id];
              const previewIngredients = cocktail.ingredients
                .filter((ri) => !["garnish", "other"].includes(INGREDIENT_BY_ID[ri.ingredientId]?.category ?? ""))
                .slice(0, 3)
                .map((ri) => INGREDIENT_BY_ID[ri.ingredientId]?.displayName ?? ri.ingredientId)
                .join(" · ");
              return (
                <button
                  key={cocktail.id}
                  type="button"
                  className="drink-row"
                  onClick={() => onSelect(cocktail)}
                >
                  {imgUrl ? (
                    <img src={imgUrl} alt={cocktail.name} className="drink-row__thumb" />
                  ) : (
                    <div className="drink-row__thumb drink-row__thumb--placeholder">🍹</div>
                  )}
                  <div className="drink-row__info">
                    <div className="drink-row__name">{cocktail.name}</div>
                    <div className="drink-row__ingredients">{previewIngredients}</div>
                  </div>
                  <div className="drink-row__arrow">›</div>
                </button>
              );
            })}
          </section>
        )}

        <div style={{ padding: "12px 0" }}>
          {ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const count = grouped[cat].length;
            return (
              <button
                key={cat}
                type="button"
                className={`cat-card cat-card--${cat}`}
                onClick={() => setSelectedCat(cat)}
              >
                <div className="cat-card__icon">{meta.emoji}</div>
                <div className="cat-card__body">
                  <div className="cat-card__name">{CATEGORY_LABELS[cat]}</div>
                  <div className="cat-card__desc">{meta.desc}</div>
                  <span className={`cat-pill ${cat}`} style={{ marginTop: 8, display: "inline-block" }}>
                    {count} cocktails
                  </span>
                </div>
                <div className="cat-card__arrow">›</div>
              </button>
            );
          })}
        </div>
      </>
    );
  }

  // --- lista de drinks da categoria selecionada ---
  const drinks = grouped[selectedCat];
  const meta = CATEGORY_META[selectedCat];

  return (
    <>
      <header className="screen-header" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          type="button"
          onClick={() => setSelectedCat(null)}
          style={{ fontSize: 22, color: "var(--text-muted)", flexShrink: 0, padding: "0 4px" }}
          aria-label="Voltar"
        >
          ←
        </button>
        <div>
          <h1 style={{ fontSize: 20 }}>{meta.emoji} {CATEGORY_LABELS[selectedCat]}</h1>
          <p className="subtitle">{drinks.length} cocktails</p>
        </div>
      </header>

      {drinks.map((cocktail) => {
        const imgUrl = IMAGES_MAP[cocktail.id];
        const previewIngredients = cocktail.ingredients
          .filter((ri) => !["garnish", "other"].includes(INGREDIENT_BY_ID[ri.ingredientId]?.category ?? ""))
          .slice(0, 3)
          .map((ri) => INGREDIENT_BY_ID[ri.ingredientId]?.displayName ?? ri.ingredientId)
          .join(" · ");

        return (
          <button
            key={cocktail.id}
            type="button"
            className="drink-row"
            onClick={() => onSelect(cocktail)}
          >
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={cocktail.name}
                className="drink-row__thumb"
              />
            ) : (
              <div className="drink-row__thumb drink-row__thumb--placeholder">🍹</div>
            )}
            <div className="drink-row__info">
              <div className="drink-row__name">{cocktail.name}</div>
              <div className="drink-row__ingredients">{previewIngredients}</div>
            </div>
            <div className="drink-row__arrow">›</div>
          </button>
        );
      })}
    </>
  );
}
