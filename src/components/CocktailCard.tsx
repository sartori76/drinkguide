import type { Cocktail } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { INGREDIENT_BY_ID } from "@/data/ingredients";

interface Props {
  cocktail: Cocktail;
  onClick: () => void;
  showMissing?: string[]; // ids dos ingredientes faltantes (modo pantry)
}

export function CocktailCard({ cocktail, onClick, showMissing }: Props) {
  // Preview dos primeiros 3 ingredientes (pelo displayName em português)
  const preview = cocktail.ingredients
    .slice(0, 3)
    .map((ri) => INGREDIENT_BY_ID[ri.ingredientId]?.displayName ?? ri.ingredientId)
    .join(", ");

  return (
    <button className="cocktail-card" onClick={onClick}>
      <div className="name">
        {cocktail.name}
        {showMissing && showMissing.length > 0 && (
          <span className="missing-tag">
            falta {showMissing.length} item{showMissing.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <span className={`cat-pill ${cocktail.category}`}>
        {CATEGORY_LABELS[cocktail.category]}
      </span>
      <div className="ingredients-preview">{preview}</div>
    </button>
  );
}
