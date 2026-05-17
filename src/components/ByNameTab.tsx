"use client";

import { useMemo, useState } from "react";
import type { Cocktail } from "@/lib/types";
import { COCKTAILS } from "@/data/cocktails";
import { CocktailCard } from "./CocktailCard";

export function ByNameTab({ onSelect }: { onSelect: (c: Cocktail) => void }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...COCKTAILS].sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR"),
    );
    if (!q) return sorted;
    return sorted.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <header className="screen-header">
        <h1>Por nome</h1>
        <p className="subtitle">Digite para filtrar</p>
        <div style={{ marginTop: 12 }}>
          <input
            type="search"
            placeholder="Negroni, Daiquiri…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="empty-state">Nenhum cocktail encontrado para “{query}”.</div>
      ) : (
        filtered.map((c) => (
          <CocktailCard key={c.id} cocktail={c} onClick={() => onSelect(c)} />
        ))
      )}
    </>
  );
}
