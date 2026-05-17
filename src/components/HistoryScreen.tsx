"use client";

import { useEffect, useState } from "react";
import type { Cocktail } from "@/lib/types";
import { COCKTAILS } from "@/data/cocktails";
import { loadHistory, deleteEntry, clearHistory, formatRelativeTime, type HistoryEntry } from "@/lib/history";

interface Props {
  onBack: () => void;
  onSelect: (c: Cocktail) => void;
}

export function HistoryScreen({ onBack, onSelect }: Props) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(loadHistory());
  }, []);

  const cocktailById = Object.fromEntries(COCKTAILS.map((c) => [c.id, c]));

  function handleDelete(timestamp: number) {
    deleteEntry(timestamp);
    setEntries((prev) => prev.filter((e) => e.timestamp !== timestamp));
  }

  function handleClear() {
    if (window.confirm("Limpar todo o histórico de preparo?")) {
      clearHistory();
      setEntries([]);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header className="screen-header" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          type="button"
          onClick={onBack}
          style={{ fontSize: 22, color: "var(--text-muted)", flexShrink: 0, padding: "0 4px" }}
          aria-label="Voltar"
        >
          ←
        </button>
        <div>
          <h1 style={{ fontSize: 20 }}>📖 Histórico</h1>
          <p className="subtitle">{entries.length} drink{entries.length !== 1 ? "s" : ""} preparado{entries.length !== 1 ? "s" : ""}</p>
        </div>
      </header>

      {entries.length === 0 ? (
        <div className="empty-state">
          Nenhum drink preparado ainda.<br />
          Abra uma receita e toque em "✓ Marcar como preparado".
        </div>
      ) : (
        <>
          {entries.map((entry) => {
            const cocktail = cocktailById[entry.cocktailId];
            if (!cocktail) return null;
            return (
              <div
                key={entry.timestamp}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--border)",
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  style={{ flex: 1, textAlign: "left" }}
                  onClick={() => { onBack(); onSelect(cocktail); }}
                >
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>{cocktail.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                    {formatRelativeTime(entry.timestamp)}
                    {entry.note && (
                      <span style={{ marginLeft: 8, color: "var(--text-muted)", fontStyle: "italic" }}>
                        "{entry.note}"
                      </span>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.timestamp)}
                  aria-label="Remover do histórico"
                  style={{
                    color: "var(--text-dim)",
                    fontSize: 18,
                    minWidth: 44,
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>
            );
          })}

          <div style={{ padding: "20px 16px" }}>
            <button
              type="button"
              onClick={handleClear}
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                textDecoration: "underline",
              }}
            >
              Limpar histórico
            </button>
          </div>
        </>
      )}
    </div>
  );
}
