"use client";

import { useState } from "react";
import type { Cocktail } from "@/lib/types";
import { CategoriesTab } from "@/components/CategoriesTab";
import { ByNameTab } from "@/components/ByNameTab";
import { ByIngredientTab } from "@/components/ByIngredientTab";
import { PantryTab } from "@/components/PantryTab";
import { CocktailDetail } from "@/components/CocktailDetail";

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

  function switchTab(tab: TabId) {
    setSelectedCocktail(null);
    setActiveTab(tab);
  }

  return (
    <div className="app">
      {/* Conteúdo principal */}
      {selectedCocktail ? (
        <CocktailDetail
          cocktail={selectedCocktail}
          onBack={() => setSelectedCocktail(null)}
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
