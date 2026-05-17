"use client";

import { useEffect, useState } from "react";
import type { Cocktail } from "@/lib/types";
import { CategoriesTab } from "@/components/CategoriesTab";
import { ByNameTab } from "@/components/ByNameTab";
import { ByIngredientTab } from "@/components/ByIngredientTab";
import { PantryTab } from "@/components/PantryTab";
import { CocktailDetail } from "@/components/CocktailDetail";
import { HistoryScreen } from "@/components/HistoryScreen";
import { loadHistory } from "@/lib/history";

type TabId = "categories" | "by-name" | "by-ingredient" | "pantry";

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: "categories", label: "Categorias", emoji: "📚" },
  { id: "by-name", label: "Por nome", emoji: "🔤" },
  { id: "by-ingredient", label: "Ingredientes", emoji: "🍋" },
  { id: "pantry", label: "Despensa", emoji: "🏠" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("categories");
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    setHistoryCount(loadHistory().length);
  }, []);

  // Refresh history count whenever history screen closes
  function handleHistoryClose() {
    setShowHistory(false);
    setHistoryCount(loadHistory().length);
  }

  function switchTab(tab: TabId) {
    setSelectedCocktail(null);
    setShowHistory(false);
    setActiveTab(tab);
  }

  // History screen takes over everything
  if (showHistory) {
    return (
      <div className="app">
        <HistoryScreen
          onBack={handleHistoryClose}
          onSelect={(c) => { handleHistoryClose(); setSelectedCocktail(c); }}
        />
      </div>
    );
  }

  const showTabBar = !selectedCocktail;

  return (
    <div className="app">
      {/* Global header — hidden inside CocktailDetail */}
      {showTabBar && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 6px",
          borderBottom: "1px solid var(--border)",
        }}>
          <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}>DrinkGuide</span>
          <button
            type="button"
            onClick={() => setShowHistory(true)}
            aria-label="Ver histórico"
            style={{
              position: "relative",
              fontSize: 22,
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📖
            {historyCount > 0 && (
              <span style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "var(--accent)",
                color: "var(--bg)",
                borderRadius: "50%",
                minWidth: 16,
                height: 16,
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
                padding: "0 3px",
              }}>
                {historyCount > 99 ? "99+" : historyCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Main content */}
      {selectedCocktail ? (
        <CocktailDetail
          cocktail={selectedCocktail}
          onBack={() => {
            setSelectedCocktail(null);
            setHistoryCount(loadHistory().length);
          }}
        />
      ) : (
        <>
          {activeTab === "categories" && <CategoriesTab onSelect={setSelectedCocktail} />}
          {activeTab === "by-name" && <ByNameTab onSelect={setSelectedCocktail} />}
          {activeTab === "by-ingredient" && <ByIngredientTab onSelect={setSelectedCocktail} />}
          {activeTab === "pantry" && <PantryTab onSelect={setSelectedCocktail} />}
        </>
      )}

      {/* Tab bar sempre visível — clicar em qualquer aba fecha o detalhe e navega */}
      <nav className="tabbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => switchTab(tab.id)}
            className={activeTab === tab.id && !selectedCocktail ? "active" : ""}
            aria-label={tab.label}
          >
            <span className="tab-emoji">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
