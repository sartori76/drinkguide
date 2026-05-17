"use client";

import type { Cocktail } from "@/lib/types";
import { CATEGORY_LABELS, UNIT_LABELS } from "@/lib/types";
import { INGREDIENT_BY_ID } from "@/data/ingredients";
import IMAGES from "@/data/cocktail-images.json";
import { useFavorites } from "@/lib/favorites";
import { addEntry } from "@/lib/history";
import { useState } from "react";

const IMAGES_MAP = IMAGES as Record<string, string>;

interface Props {
  cocktail: Cocktail;
  onBack: () => void;
}

function formatAmount(amount: number | null, unit: string): string {
  if (amount === null) return "a gosto";
  const formatted = Number.isInteger(amount) ? amount.toString() : amount.toString();
  return `${formatted} ${unit}`;
}

export function CocktailDetail({ cocktail, onBack }: Props) {
  const imgUrl = IMAGES_MAP[cocktail.id];
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(cocktail.id);
  const [toastVisible, setToastVisible] = useState(false);

  function handleMarkPrepared() {
    const note = window.prompt("Nota opcional (deixe em branco para pular):", "") ?? undefined;
    addEntry(cocktail.id, note === "" ? undefined : note);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }

  return (
    <div className="detail">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button className="back" onClick={onBack} type="button" style={{ marginBottom: 0 }}>
          ← Voltar
        </button>
        <button
          type="button"
          onClick={() => toggle(cocktail.id)}
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          style={{
            fontSize: 28,
            color: fav ? "var(--accent)" : "var(--text-dim)",
            minWidth: 48,
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>

      {imgUrl && (
        <div className="detail__hero">
          <img src={imgUrl} alt={cocktail.name} className="detail__hero-img" />
        </div>
      )}

      <h2 style={{ marginTop: imgUrl ? 16 : 0 }}>{cocktail.name}</h2>
      <div className="meta">
        <span className={`cat-pill ${cocktail.category}`}>
          {CATEGORY_LABELS[cocktail.category]}
        </span>
        {cocktail.glassware && (
          <span style={{ marginLeft: 12 }}>🍸 {cocktail.glassware}</span>
        )}
      </div>

      <h3>Ingredientes</h3>
      <div>
        {cocktail.ingredients.map((ri, idx) => {
          const ing = INGREDIENT_BY_ID[ri.ingredientId];
          const name = ing?.displayName ?? ri.ingredientId;
          return (
            <div key={idx} className="ingredient-row">
              <div>
                {ri.modifier && (
                  <span style={{ color: "var(--text-muted)" }}>{ri.modifier} </span>
                )}
                <span>{name}</span>
                {ri.note && (
                  <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>
                    {ri.note}
                  </div>
                )}
              </div>
              <span className="amount">
                {formatAmount(ri.amount, UNIT_LABELS[ri.unit])}
              </span>
            </div>
          );
        })}
      </div>

      <h3>Preparo</h3>
      <ol>
        {cocktail.method.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      {cocktail.garnish && (
        <>
          <h3>Guarnição</h3>
          <p>{cocktail.garnish}</p>
        </>
      )}

      <div style={{ marginTop: 24 }}>
        <button
          type="button"
          onClick={handleMarkPrepared}
          style={{
            width: "100%",
            padding: "14px 16px",
            background: "var(--bg-elev)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            color: "var(--text)",
            fontSize: 15,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          ✓ Marcar como preparado
        </button>
        {toastVisible && (
          <div
            style={{
              marginTop: 8,
              padding: "10px 14px",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: 8,
              color: "#10b981",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            ✓ Registrado no histórico!
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, fontSize: 12, color: "var(--text-dim)" }}>
        Receita oficial:{" "}
        <a href={cocktail.ibaUrl} target="_blank" rel="noreferrer">
          iba-world.com ↗
        </a>
      </div>
    </div>
  );
}
