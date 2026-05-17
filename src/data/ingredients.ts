import type { Ingredient } from "@/lib/types";

export const INGREDIENTS: Ingredient[] = [
  // ========== DESTILADOS ==========
  {
    id: "gin",
    displayName: "Gin",
    category: "spirit",
    aliases: ["Gin", "Dry Gin", "London Dry Gin", "London dry Gin"],
  },
  {
    id: "old-tom-gin",
    displayName: "Old Tom Gin",
    category: "spirit",
    aliases: ["Old Tom Gin"],
  },
  {
    id: "white-rum",
    displayName: "Rum branco",
    category: "spirit",
    aliases: ["White Rum", "White Cuban Rum", "White Cuban Ron", "Light Rum", "Cuban Rum", "Rum", "White rum"],
    substitutes: ["gold-rum"],
  },
  {
    id: "gold-rum",
    displayName: "Rum dourado",
    category: "spirit",
    aliases: ["Gold Rum", "Gold Jamaican Rum", "Aged Rum", "Amber Jamaican Rum", "Gold Puerto Rican Rum", "Blended Aged Rum", "Jamaican Rum"],
    substitutes: ["white-rum"],
  },
  {
    id: "dark-rum",
    displayName: "Rum escuro",
    category: "spirit",
    aliases: ["Dark Rum", "Jamaican Dark Rum", "Goslings Rum", "Blackstrap Rum"],
  },
  {
    id: "demerara-rum",
    displayName: "Rum Demerara",
    category: "spirit",
    aliases: ["Demerara Rum"],
  },
  {
    id: "martinique-rum",
    displayName: "Rhum agricole (Martinica)",
    category: "spirit",
    aliases: ["Martinique Molasses Rhum", "Rhum Martinique Agricole", "Martinique Rum"],
  },
  {
    id: "cuban-aguardiente",
    displayName: "Aguardente cubana",
    category: "spirit",
    aliases: ["Cuban Aguardiente"],
  },
  {
    id: "overproof-white-rum",
    displayName: "Rum branco overproof",
    category: "spirit",
    aliases: ["Jamaica Overproof White Rum", "Overproof White Rum"],
  },
  {
    id: "scotch-whisky",
    displayName: "Whisky escocês (blended)",
    category: "spirit",
    aliases: ["Scotch Whisky", "Blended Scotch Whisky", "Blended Scotch", "Blended scotch whisky"],
    substitutes: ["bourbon"],
  },
  {
    id: "islay-single-malt",
    displayName: "Single malt de Islay",
    category: "spirit",
    aliases: ["Islay Single Malt", "Islay Single Malt Whisky", "Lagavulin", "Lagavulin 16y", "Laphroaig"],
  },
  {
    id: "bourbon",
    displayName: "Bourbon",
    category: "spirit",
    aliases: ["Bourbon", "Bourbon Whiskey", "Bourbon or Rye Whiskey", "Bourbon Whiskey or Rye"],
    substitutes: ["scotch-whisky", "rye-whiskey"],
  },
  {
    id: "rye-whiskey",
    displayName: "Rye whiskey",
    category: "spirit",
    aliases: ["Rye Whiskey", "Rye", "Rye Whiskey or Bourbon", "Rye Whiskey or Bourbon Whiskey"],
    substitutes: ["bourbon"],
  },
  {
    id: "irish-whiskey",
    displayName: "Whiskey irlandês",
    category: "spirit",
    aliases: ["Irish Whiskey"],
  },
  {
    id: "cognac",
    displayName: "Conhaque / Brandy",
    category: "spirit",
    aliases: ["Cognac", "Brandy", "Cognac or Brandy"],
  },
  {
    id: "vodka",
    displayName: "Vodka",
    category: "spirit",
    aliases: ["Vodka"],
  },
  {
    id: "vodka-citron",
    displayName: "Vodka cítrica",
    category: "spirit",
    aliases: ["Vodka Citron", "Citrus Vodka"],
  },
  {
    id: "vanilla-vodka",
    displayName: "Vodka de baunilha",
    category: "spirit",
    aliases: ["Vanilla Vodka", "Vodka Vanilla"],
  },
  {
    id: "tequila",
    displayName: "Tequila",
    category: "spirit",
    aliases: ["Tequila", "Tequila 100% Agave", "100% Agave Tequila", "Tequila 100% agave"],
  },
  {
    id: "mezcal",
    displayName: "Mezcal",
    category: "spirit",
    aliases: ["Mezcal", "Espadin Mezcal"],
  },
  {
    id: "pisco",
    displayName: "Pisco",
    category: "spirit",
    aliases: ["Pisco"],
  },
  {
    id: "cachaca",
    displayName: "Cachaça",
    category: "spirit",
    aliases: ["Cachaça", "Cachaca"],
  },
  {
    id: "grappa",
    displayName: "Grappa",
    category: "spirit",
    aliases: ["Grappa", "White Smooth Grappa"],
  },
  {
    id: "fernet",
    displayName: "Fernet",
    category: "spirit",
    aliases: ["Fernet", "Fernet Branca"],
  },
  {
    id: "absinthe",
    displayName: "Absinto",
    category: "spirit",
    aliases: ["Absinthe", "Pernod"],
  },

  // ========== LICORES E APERITIVOS ==========
  {
    id: "campari",
    displayName: "Campari",
    category: "liqueur",
    aliases: ["Campari", "Bitter Campari"],
    substitutes: ["aperol"],
  },
  {
    id: "aperol",
    displayName: "Aperol",
    category: "liqueur",
    aliases: ["Aperol"],
    substitutes: ["campari"],
  },
  {
    id: "cynar",
    displayName: "Cynar",
    category: "liqueur",
    aliases: ["Cynar"],
  },
  {
    id: "triple-sec",
    displayName: "Triple sec",
    category: "liqueur",
    aliases: ["Triple Sec", "Cointreau"],
  },
  {
    id: "grand-marnier",
    displayName: "Grand Marnier",
    category: "liqueur",
    aliases: ["Grand Marnier"],
  },
  {
    id: "maraschino",
    displayName: "Maraschino Luxardo",
    category: "liqueur",
    aliases: ["Maraschino Luxardo", "Maraschino"],
  },
  {
    id: "curacao",
    displayName: "Curaçao",
    category: "liqueur",
    aliases: ["Curacao", "Orange Curacao"],
  },
  {
    id: "creme-de-cacao-dark",
    displayName: "Crème de cacao escuro",
    category: "liqueur",
    aliases: ["Crème de Cacao (Brown)", "Brown Creme de Cacao"],
  },
  {
    id: "creme-de-cacao-white",
    displayName: "Crème de cacao branco",
    category: "liqueur",
    aliases: ["Crème de Cacao (White)", "White Creme de Cacao"],
  },
  {
    id: "creme-de-menthe-white",
    displayName: "Crème de menthe branco",
    category: "liqueur",
    aliases: ["White Crème de Menthe", "White Creme de Menthe"],
  },
  {
    id: "creme-de-menthe-green",
    displayName: "Crème de menthe verde",
    category: "liqueur",
    aliases: ["Crème de Menthe (Green)", "Green Creme de Menthe"],
  },
  {
    id: "creme-de-violette",
    displayName: "Crème de violette",
    category: "liqueur",
    aliases: ["Crème de Violette", "Creme de Violette"],
  },
  {
    id: "creme-de-cassis",
    displayName: "Crème de cassis",
    category: "liqueur",
    aliases: ["Crème de Cassis", "Creme de Cassis"],
  },
  {
    id: "creme-de-mure",
    displayName: "Crème de mûre (licor de amora)",
    category: "liqueur",
    aliases: ["Crème de Mûre", "Creme de Mure"],
  },
  {
    id: "green-chartreuse",
    displayName: "Chartreuse verde",
    category: "liqueur",
    aliases: ["Green Chartreuse"],
  },
  {
    id: "yellow-chartreuse",
    displayName: "Chartreuse amarelo",
    category: "liqueur",
    aliases: ["Yellow Chartreuse"],
  },
  {
    id: "drambuie",
    displayName: "Drambuie",
    category: "liqueur",
    aliases: ["Drambuie"],
  },
  {
    id: "apricot-brandy",
    displayName: "Brandy de damasco",
    category: "liqueur",
    aliases: ["Apricot Brandy"],
  },
  {
    id: "peach-brandy",
    displayName: "Brandy de pêssego",
    category: "liqueur",
    aliases: ["Peach Brandy"],
  },
  {
    id: "calvados",
    displayName: "Calvados",
    category: "liqueur",
    aliases: ["Calvados"],
  },
  {
    id: "amaretto",
    displayName: "Amaretto",
    category: "liqueur",
    aliases: ["Amaretto"],
  },
  {
    id: "coffee-liqueur",
    displayName: "Licor de café",
    category: "liqueur",
    aliases: ["Coffee Liqueur", "Kahlúa", "Kahlua"],
  },
  {
    id: "raspberry-liqueur",
    displayName: "Licor de framboesa",
    category: "liqueur",
    aliases: ["Raspberry Liqueur"],
  },
  {
    id: "passion-fruit-liqueur",
    displayName: "Licor de maracujá",
    category: "liqueur",
    aliases: ["Passion Fruit Liqueur"],
  },
  {
    id: "peach-schnapps",
    displayName: "Schnapps de pêssego",
    category: "liqueur",
    aliases: ["Peach Schnapps"],
  },
  {
    id: "benedictine",
    displayName: "Bénédictine",
    category: "liqueur",
    aliases: ["Bénédictine", "Benedictine", "DOM Bénédictine"],
  },
  {
    id: "cherry-brandy",
    displayName: "Cherry brandy",
    category: "liqueur",
    aliases: ["Cherry Brandy Luxardo", "Cherry Sangue Morlacco", "Cherry Brandy"],
  },
  {
    id: "falernum",
    displayName: "Falernum",
    category: "liqueur",
    aliases: ["Falernum"],
  },
  {
    id: "amaro-nonino",
    displayName: "Amaro Nonino",
    category: "liqueur",
    aliases: ["Amaro Nonino"],
  },
  {
    id: "allspice-dram",
    displayName: "Allspice dram (pimenta da Jamaica)",
    category: "liqueur",
    aliases: ["Allspice Dram", "Allspice Saint Elizabeth"],
  },
  {
    id: "frangelico",
    displayName: "Frangelico",
    category: "liqueur",
    aliases: ["Frangelico"],
  },
  {
    id: "elderflower-cordial",
    displayName: "Cordial de flor de saúco",
    category: "liqueur",
    aliases: ["Elderflower Cordial"],
  },
  {
    id: "donns-mix",
    displayName: "Donn's Mix",
    category: "liqueur",
    aliases: ["Donn's Mix"],
  },

  // ========== VERMUTES E APERITIVOS VÍNICO ==========
  {
    id: "sweet-vermouth",
    displayName: "Vermute tinto",
    category: "vermouth",
    aliases: [
      "Sweet Vermouth",
      "Sweet Red Vermouth",
      "Red Vermouth",
      "Italian Vermouth",
      "Sweet Vermouth Cinzano Rosso",
    ],
  },
  {
    id: "dry-vermouth",
    displayName: "Vermute seco",
    category: "vermouth",
    aliases: ["Dry Vermouth"],
  },
  {
    id: "lillet-blanc",
    displayName: "Lillet Blanc",
    category: "vermouth",
    aliases: ["Lillet Blanc"],
  },

  // ========== VINHOS E ESPUMANTES ==========
  {
    id: "champagne",
    displayName: "Champagne",
    category: "wine",
    aliases: ["Champagne", "Chilled Champagne", "Brut Champagne", "Brut Champagne or Prosecco"],
  },
  {
    id: "prosecco",
    displayName: "Prosecco",
    category: "wine",
    aliases: ["Prosecco"],
  },
  {
    id: "sparkling-wine",
    displayName: "Vinho espumante",
    category: "wine",
    aliases: ["Sparkling Wine"],
  },
  {
    id: "dry-white-wine",
    displayName: "Vinho branco seco",
    category: "wine",
    aliases: ["Dry White Wine"],
  },
  {
    id: "red-wine",
    displayName: "Vinho tinto",
    category: "wine",
    aliases: ["Red Wine", "Red wine (Shiraz or Malbech)"],
  },
  {
    id: "port-wine",
    displayName: "Vinho do Porto",
    category: "wine",
    aliases: ["Red Tawny Port Wine", "Port Wine", "Port"],
  },
  {
    id: "amontillado-sherry",
    displayName: "Sherry Amontillado",
    category: "wine",
    aliases: ["Amontillado Sherry", "Amontillado"],
  },
  {
    id: "palo-cortado",
    displayName: "Palo Cortado (sherry)",
    category: "wine",
    aliases: ["Palo Cortado"],
  },

  // ========== SUCOS ==========
  {
    id: "lime-juice",
    displayName: "Suco de limão tahiti",
    category: "juice",
    aliases: [
      "Lime Juice",
      "Fresh Lime Juice",
      "Fresh Lime",
      "Fresh Squeezed Lime Juice",
      "Freshly Squeezed Lime Juice",
      "Fresh Squeezed Lime",
    ],
    substitutes: ["lemon-juice"],
  },
  {
    id: "lemon-juice",
    displayName: "Suco de limão siciliano",
    category: "juice",
    aliases: [
      "Lemon Juice",
      "Fresh Lemon Juice",
      "Fresh Squeezed Lemon Juice",
      "Freshly Squeezed Lemon Juice",
      "Fresh Squeezed Lemon Juice",
      "Fresh lemon Juice",
      "Lemon juice",
    ],
    substitutes: ["lime-juice"],
  },
  {
    id: "orange-juice",
    displayName: "Suco de laranja",
    category: "juice",
    aliases: ["Fresh Orange Juice", "Freshly Squeezed Orange Juice", "Fresh Squeezed Orange Juice"],
  },
  {
    id: "pineapple-juice",
    displayName: "Suco de abacaxi",
    category: "juice",
    aliases: ["Fresh Pineapple Juice", "Pineapple Juice", "Pineapple juice"],
  },
  {
    id: "grapefruit-juice",
    displayName: "Suco de toranja",
    category: "juice",
    aliases: ["Grapefruit Juice", "Fresh Grapefruit Juice"],
  },
  {
    id: "cranberry-juice",
    displayName: "Suco de cranberry",
    category: "juice",
    aliases: ["Cranberry Juice"],
  },
  {
    id: "tomato-juice",
    displayName: "Suco de tomate",
    category: "juice",
    aliases: ["Tomato Juice"],
  },
  {
    id: "sugar-cane-juice",
    displayName: "Caldo de cana",
    category: "juice",
    aliases: ["Sugar Cane Juice"],
  },
  {
    id: "white-peach-puree",
    displayName: "Purê de pêssego branco",
    category: "juice",
    aliases: ["White Peach Puree"],
  },
  {
    id: "passion-fruit-puree",
    displayName: "Purê de maracujá",
    category: "juice",
    aliases: ["Passion Fruit Puree"],
  },

  // ========== XAROPES E ADOÇANTES ==========
  {
    id: "superfine-sugar",
    displayName: "Açúcar refinado",
    category: "syrup",
    aliases: ["Superfine Sugar", "Sugar", "Caster Sugar", "White Cane Sugar", "Powdered Sugar"],
  },
  {
    id: "honey-syrup",
    displayName: "Xarope de mel",
    category: "syrup",
    aliases: ["Honey Syrup", "Honey mix", "Honey Mix", "Monin Honey Syrup"],
  },
  {
    id: "raw-honey",
    displayName: "Mel puro",
    category: "syrup",
    aliases: ["Raw Honey"],
  },
  {
    id: "simple-syrup",
    displayName: "Xarope simples",
    category: "syrup",
    aliases: ["Simple Syrup", "Sugar Syrup", "Simple syrup", "Sugar syrup"],
  },
  {
    id: "grenadine",
    displayName: "Grenadine",
    category: "syrup",
    aliases: ["Grenadine Syrup", "Grenadine syrup"],
  },
  {
    id: "orgeat-syrup",
    displayName: "Xarope de amêndoas (orgeat)",
    category: "syrup",
    aliases: ["Orgeat Syrup", "Orgeat Syrup (Almond)", "Orgeat"],
  },
  {
    id: "raspberry-syrup",
    displayName: "Xarope de framboesa",
    category: "syrup",
    aliases: ["Raspberry Syrup"],
  },
  {
    id: "passion-fruit-syrup",
    displayName: "Xarope de maracujá",
    category: "syrup",
    aliases: ["Passion Fruit Syrup"],
  },
  {
    id: "demerara-syrup",
    displayName: "Xarope Demerara",
    category: "syrup",
    aliases: ["Demerara Sugar Syrup", "Demerara Syrup"],
  },
  {
    id: "vanilla-sugar",
    displayName: "Açúcar de baunilha",
    category: "syrup",
    aliases: ["Vanilla Sugar"],
  },
  {
    id: "agave-nectar",
    displayName: "Néctar de agave",
    category: "syrup",
    aliases: ["Agave Nectar"],
  },
  {
    id: "chamomile-cordial",
    displayName: "Cordial de camomila",
    category: "syrup",
    aliases: ["Chamomile Cordial", "Chamomile cordial"],
  },
  {
    id: "sugar-cube",
    displayName: "Cubo de açúcar",
    category: "syrup",
    aliases: ["Sugar Cube"],
  },

  // ========== BITTERS ==========
  {
    id: "angostura-bitters",
    displayName: "Angostura bitters",
    category: "bitter",
    aliases: ["Angostura Bitters", "Angostura", "Bitters", "Aromatic Bitters"],
  },
  {
    id: "peychauds-bitters",
    displayName: "Peychaud's bitters",
    category: "bitter",
    aliases: ["Peychaud's Bitters", "Peychaud Bitters"],
  },
  {
    id: "orange-bitters",
    displayName: "Orange bitters",
    category: "bitter",
    aliases: ["Orange Bitters"],
  },

  // ========== REFRIGERANTES E TÔNICAS (SODA) ==========
  {
    id: "soda-water",
    displayName: "Água com gás",
    category: "soda",
    aliases: ["Soda Water", "Soda water"],
  },
  {
    id: "ginger-ale",
    displayName: "Ginger ale",
    category: "soda",
    aliases: ["Ginger Ale"],
  },
  {
    id: "ginger-beer",
    displayName: "Ginger beer",
    category: "soda",
    aliases: ["Ginger Beer", "Ginger beer"],
  },
  {
    id: "cola",
    displayName: "Refrigerante cola",
    category: "soda",
    aliases: ["Cola"],
  },
  {
    id: "pink-grapefruit-soda",
    displayName: "Refrigerante de toranja rosa",
    category: "soda",
    aliases: ["Pink Grapefruit Soda"],
  },

  // ========== OUTROS ==========
  {
    id: "water",
    displayName: "Água",
    category: "other",
    aliases: ["Water", "Plain Water", "Few Dashes of Plain Water"],
  },
  {
    id: "fresh-cream",
    displayName: "Creme de leite fresco",
    category: "other",
    aliases: ["Fresh Cream", "Cream", "Fresh cream (Chilled)", "Fresh Cream (Chilled)"],
  },
  {
    id: "egg-white",
    displayName: "Clara de ovo",
    category: "other",
    aliases: ["Egg White", "Few Drops of Egg White", "Raw whole Egg White"],
  },
  {
    id: "egg-yolk",
    displayName: "Gema de ovo",
    category: "other",
    aliases: ["Egg Yolk"],
  },
  {
    id: "hot-coffee",
    displayName: "Café quente",
    category: "other",
    aliases: ["Hot coffee", "Hot Coffee"],
  },
  {
    id: "espresso",
    displayName: "Espresso",
    category: "other",
    aliases: ["Strong Espresso", "Espresso"],
  },
  {
    id: "coconut-cream",
    displayName: "Creme de coco",
    category: "other",
    aliases: ["Coconut Cream"],
  },
  {
    id: "fresh-ginger",
    displayName: "Gengibre fresco",
    category: "other",
    aliases: ["Fresh Ginger", "Sliced Fresh Ginger", "Ginger"],
  },
  {
    id: "fresh-mint",
    displayName: "Hortelã fresca",
    category: "other",
    aliases: ["Fresh Mint Sprigs", "Mint Sprigs", "Mint Leaves", "Mint leaves", "Mint sprigs"],
  },
  {
    id: "fresh-basil",
    displayName: "Manjericão fresco",
    category: "other",
    aliases: ["Italian Basil Leaves", "Fresh Basil", "Basil Leaves"],
  },
  {
    id: "worcestershire-sauce",
    displayName: "Molho inglês",
    category: "other",
    aliases: ["Worcestershire Sauce"],
  },
  {
    id: "tabasco-spice-mix",
    displayName: "Tabasco, sal de aipo e pimenta",
    category: "other",
    aliases: ["Tabasco, Celery Salt, Pepper", "Tabasco"],
  },
  {
    id: "orange-flower-water",
    displayName: "Água de flor de laranjeira",
    category: "other",
    aliases: ["Orange Flower Water"],
  },
  {
    id: "vanilla-extract",
    displayName: "Extrato de baunilha",
    category: "other",
    aliases: ["Vanilla Extract"],
  },
  {
    id: "red-chili-pepper",
    displayName: "Pimenta vermelha",
    category: "other",
    aliases: ["Red Chili Pepper"],
  },
  {
    id: "cloves",
    displayName: "Cravo",
    category: "other",
    aliases: ["Cloves"],
  },

  // ========== GUARNIÇÕES ==========
  {
    id: "orange-slice",
    displayName: "Fatia de laranja",
    category: "garnish",
    aliases: ["Orange Slice", "Half Orange Slice"],
  },
  {
    id: "orange-zest",
    displayName: "Zeste de laranja",
    category: "garnish",
    aliases: ["Orange Zest", "Orange Peel"],
  },
  {
    id: "lemon-zest",
    displayName: "Zeste de limão",
    category: "garnish",
    aliases: ["Lemon Zest", "Lemon Peel", "Lemon Twist"],
  },
  {
    id: "cocktail-cherry",
    displayName: "Cereja para cocktail",
    category: "garnish",
    aliases: ["Cocktail Cherry", "Maraschino Cherry"],
  },
  {
    id: "lime-wedge",
    displayName: "Cunha de limão tahiti",
    category: "garnish",
    aliases: ["Lime Wedge", "Lime", "Lime wedge"],
  },
  {
    id: "orange-wheel",
    displayName: "Roda de laranja",
    category: "garnish",
    aliases: ["Orange Wheel", "Half Orange Wheel"],
  },
  {
    id: "lemon-wheel",
    displayName: "Roda de limão",
    category: "garnish",
    aliases: ["Lemon Wheel", "Half Lemon Wheel"],
  },
  {
    id: "nutmeg",
    displayName: "Noz-moscada",
    category: "garnish",
    aliases: ["Nutmeg", "Fresh Ground Nutmeg"],
  },
  {
    id: "salt",
    displayName: "Sal",
    category: "garnish",
    aliases: ["Salt", "Sea Salt"],
  },
];

export const INGREDIENT_BY_ID: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i]),
);

export const ALIAS_TO_ID: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const ing of INGREDIENTS) {
    map[ing.displayName.toLowerCase()] = ing.id;
    for (const alias of ing.aliases ?? []) {
      map[alias.toLowerCase()] = ing.id;
    }
  }
  return map;
})();
