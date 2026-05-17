// Tipos centrais do app — schema validado contra a estrutura real do site da IBA.
// Mantenha este arquivo como fonte da verdade ao popular o JSON via scraping.

export type Category = "unforgettable" | "contemporary" | "new-era";

export const CATEGORY_LABELS: Record<Category, string> = {
  "unforgettable": "Os Inesquecíveis",
  "contemporary": "Contemporâneos",
  "new-era": "Nova Era",
};

// Unidades possíveis de medida. "bar-spoon" cobre casos tipo Daiquiri ("2 Bar Spoons Superfine Sugar"),
// "dash" cobre Angostura, "splash" cobre soda. "piece" cobre fatias de gengibre etc.
export type Unit = "ml" | "cl" | "oz" | "dash" | "bar-spoon" | "tsp" | "splash" | "piece" | "to-taste";

export const UNIT_LABELS: Record<Unit, string> = {
  "ml": "ml",
  "cl": "cl",
  "oz": "oz",
  "dash": "dash",
  "bar-spoon": "colher de bar",
  "tsp": "colher de chá",
  "splash": "splash",
  "piece": "pedaço(s)",
  "to-taste": "a gosto",
};

// Cada ingrediente da receita aponta para um ID canônico do catálogo de ingredientes.
// "modifier" preserva o adjetivo importante (ex: "Islay" em "Islay single malt") sem
// quebrar a normalização — o ingrediente base ainda é "single malt scotch", então
// a busca reversa funciona, mas a receita exibe a forma específica.
export interface RecipeIngredient {
  ingredientId: string;       // referência ao Ingredient.id
  amount: number | null;      // null quando "to-taste"
  unit: Unit;
  modifier?: string;          // ex: "Islay", "gold", "blended"
  note?: string;              // ex: "freshly squeezed", "para o float"
  optional?: boolean;         // ingrediente opcional na receita oficial
}

// Catálogo canônico de ingredientes. Cada ingrediente único do banco aparece UMA vez aqui.
// O id é o slug em inglês (estável); displayName é o que aparece na UI.
export interface Ingredient {
  id: string;                 // ex: "gin", "campari", "lime-juice", "scotch-whisky"
  displayName: string;        // ex: "Gin"
  category: IngredientCategory;
  // Aliases que apontam para este ingrediente. Útil quando a receita oficial usa
  // "White Cuban Rum" — esse string vira alias do ingrediente "white-rum".
  // Permite a busca reversa funcionar mesmo se o usuário marcar só "rum branco".
  aliases?: string[];
}

export type IngredientCategory =
  | "spirit"          // destilados: gin, vodka, rum, whisky, tequila, cachaça
  | "liqueur"         // licores: Campari, Aperol, Cointreau, Amaro
  | "vermouth"        // vermutes e aperitivos similares
  | "wine"            // vinhos e espumantes (prosecco, champagne)
  | "juice"           // sucos cítricos e de fruta
  | "syrup"           // xaropes (simples, grenadine, mel, açúcar)
  | "soda"            // água com gás, ginger beer, tônica
  | "bitter"          // bitters (Angostura, Peychaud)
  | "garnish"         // guarnições (limão, laranja, hortelã)
  | "other";          // ovo, leite, café, especiarias

export const INGREDIENT_CATEGORY_LABELS: Record<IngredientCategory, string> = {
  "spirit": "Destilados",
  "liqueur": "Licores",
  "vermouth": "Vermutes e aperitivos",
  "wine": "Vinhos e espumantes",
  "juice": "Sucos",
  "syrup": "Xaropes",
  "soda": "Refrigerantes e tônicas",
  "bitter": "Bitters",
  "garnish": "Guarnições",
  "other": "Outros",
};

export interface Cocktail {
  id: string;                 // slug do nome em inglês, ex: "negroni", "dons-special-daiquiri"
  name: string;               // nome do cocktail (mantemos em inglês — Negroni, Daiquiri são internacionais)
  category: Category;
  ingredients: RecipeIngredient[];
  method: string[];           // passos do preparo, traduzidos
  garnish: string | null;     // descrição da guarnição (null = "N/A" no site IBA)
  glassware?: string;         // tipo de copo, quando especificado
  ibaUrl: string;             // URL da página oficial — útil para verificação e atualização
}
