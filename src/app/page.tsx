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

  // Se um cocktail está selecionado, mostra detalhes (cobre as 4 abas).
  if (selectedCocktail) {
    return (
      <div className="app">
        <CocktailDetail
          cocktail={selectedCocktail}
          onBack={() => setSelectedCocktail(null)}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {activeTab === "categories" && <CategoriesTab onSelect={setSelectedCocktail} />}
      {activeTab === "by-name" && <ByNameTab onSelect={setSelectedCocktail} />}
      {activeTab === "by-ingredient" && <ByIngredientTab onSelect={setSelectedCocktail} />}
      {activeTab === "pantry" && <PantryTab onSelect={setSelectedCocktail} />}

      <nav className="tabbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "active" : ""}
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
