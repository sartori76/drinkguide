"use client";

import { useEffect, useMemo, useState } from "react";
import type { Cocktail, IngredientCategory } from "@/lib/types";
import { INGREDIENT_CATEGORY_LABELS } from "@/lib/types";
import { INGREDIENTS, INGREDIENT_BY_ID } from "@/data/ingredients";
import { getAllUsedIngredientIds, matchCocktails, matchWithSubstitutes } from "@/lib/matching";
import { CocktailCard } from "./CocktailCard";

// Persistência em localStorage para a despensa sobreviver entre sessões.
// (Uso pessoal, dispositivo dele — sem privacidade preocupante.)
const STORAGE_KEY = "drinkguide.pantry.v1";

function loadPantry(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function savePantry(pantry: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(pantry)));
}

export function PantryTab({ onSelect }: { onSelect: (c: Cocktail) => void }) {
  const [pantry, setPantry] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<"pick" | "results">("pick");

  // Hidrata a despensa no client (evita mismatch de SSR)
  useEffect(() => {
    setPantry(loadPantry());
  }, []);

  // Ingredientes usados em receitas + filtra guarnições (não fazem sentido na despensa)
  const usedIds = useMemo(() => new Set(getAllUsedIngredientIds()), []);
  const selectableIngredients = useMemo(
    () =>
      INGREDIENTS.filter(
        (i) => usedIds.has(i.id) && i.category !== "garnish",
      ),
    [usedIds],
  );

  const groupedSelectable = useMemo(() => {
    const g = new Map<IngredientCategory, typeof selectableIngredients>();
    for (const ing of selectableIngredients) {
      const list = g.get(ing.category) ?? [];
      list.push(ing);
      g.set(ing.category, list);
    }
    for (const list of g.values()) {
      list.sort((a, b) => a.displayName.localeCompare(b.displayName, "pt-BR"));
    }
    return g;
  }, [selectableIngredients]);

  const toggle = (id: string) => {
    setPantry((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      savePantry(next);
      return next;
    });
  };

  const results = useMemo(
    () => matchCocktails(Array.from(pantry)),
    [pantry],
  );

  const substitutionResults = useMemo(() => {
    const baseIds = new Set([
      ...results.exact.map((r) => r.cocktail.id),
      ...results.missing1.map((r) => r.cocktail.id),
    ]);
    return matchWithSubstitutes(Array.from(pantry), baseIds);
  }, [pantry, results]);

  // Tela de resultados
  if (mode === "results") {
    const totalShown =
      results.exact.length + results.missing1.length + results.missing2.length + substitutionResults.length;

    return (
      <>
        <header className="screen-header">
          <button
            onClick={() => setMode("pick")}
            style={{ color: "var(--text-muted)", marginBottom: 8, fontSize: 14 }}
          >
            ← Editar despensa
          </button>
          <h1>O que dá pra fazer</h1>
          <p className="subtitle">
            {pantry.size} ingrediente{pantry.size !== 1 ? "s" : ""} selecionado
            {pantry.size !== 1 ? "s" : ""}
          </p>
        </header>

        {totalShown === 0 ? (
          <div className="empty-state">
            Nenhum cocktail encontrado com falta máxima de 2 ingredientes.
            <br />
            Selecione mais ingredientes na despensa.
          </div>
        ) : (
          <>
            {results.exact.length > 0 && (
              <section>
                <div className="section-header">
                  Você tem tudo ({results.exact.length})
                </div>
                {results.exact.map((r) => (
                  <CocktailCard
                    key={r.cocktail.id}
                    cocktail={r.cocktail}
                    onClick={() => onSelect(r.cocktail)}
                  />
                ))}
              </section>
            )}

            {results.missing1.length > 0 && (
              <section>
                <div className="section-header">
                  Falta apenas 1 ingrediente ({results.missing1.length})
                </div>
                {results.missing1.map((r) => (
                  <CocktailCard
                    key={r.cocktail.id}
                    cocktail={r.cocktail}
                    onClick={() => onSelect(r.cocktail)}
                    showMissing={r.missing}
                  />
                ))}
              </section>
            )}

            {results.missing2.length > 0 && (
              <section>
                <div className="section-header">
                  Faltam 2 ingredientes ({results.missing2.length})
                </div>
                {results.missing2.map((r) => (
                  <CocktailCard
                    key={r.cocktail.id}
                    cocktail={r.cocktail}
                    onClick={() => onSelect(r.cocktail)}
                    showMissing={r.missing}
                  />
                ))}
              </section>
            )}

            {substitutionResults.length > 0 && (
              <section>
                <div className="section-header">
                  Com substituições ({substitutionResults.length})
                </div>
                {substitutionResults.map((r) => (
                  <div key={r.cocktail.id} onClick={() => onSelect(r.cocktail)} className="cocktail-card" style={{ cursor: "pointer" }}>
                    <div className="name">{r.cocktail.name}</div>
                    <div style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {r.substitutions.map((s) => {
                        const orig = INGREDIENT_BY_ID[s.originalId]?.displayName ?? s.originalId;
                        const sub = INGREDIENT_BY_ID[s.substituteId]?.displayName ?? s.substituteId;
                        return (
                          <span key={s.originalId} className="missing-tag">
                            {sub} → {orig}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </>
    );
  }

  // Tela de seleção
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
  ];

  return (
    <>
      <header className="screen-header">
        <h1>Minha despensa</h1>
        <p className="subtitle">
          Marque o que você tem em casa
        </p>
      </header>

      <div className="pantry-result-banner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>
          <strong>{pantry.size}</strong> selecionado{pantry.size !== 1 ? "s" : ""} •{" "}
          <button
            onClick={() => setMode("results")}
            disabled={pantry.size === 0}
            style={{
              color: pantry.size === 0 ? "var(--text-dim)" : "var(--accent)",
              textDecoration: "underline",
              cursor: pantry.size === 0 ? "not-allowed" : "pointer",
            }}
          >
            ver o que dá pra fazer →
          </button>
        </span>
        {pantry.size > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Limpar todos os ingredientes da despensa?")) {
                const empty = new Set<string>();
                savePantry(empty);
                setPantry(empty);
              }
            }}
            style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "underline" }}
            aria-label="Limpar despensa"
          >
            limpar
          </button>
        )}
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = groupedSelectable.get(cat);
        if (!items || items.length === 0) return null;
        return (
          <section key={cat} className="pantry-section">
            <div className="section-header">{INGREDIENT_CATEGORY_LABELS[cat]}</div>
            {items.map((ing) => {
              const checked = pantry.has(ing.id);
              return (
                <label
                  key={ing.id}
                  className={`pantry-checkbox ${checked ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(ing.id)}
                  />
                  <span>{ing.displayName}</span>
                </label>
              );
            })}
          </section>
        );
      })}
    </>
  );
}
