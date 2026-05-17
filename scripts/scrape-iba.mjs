#!/usr/bin/env node
/**
 * Scraper das receitas da IBA.
 *
 * Como funciona:
 * 1. Busca as 3 páginas de categoria (the-unforgettables, the-contemporary, the-new-era).
 * 2. Extrai os links para cada cocktail individual.
 * 3. Visita cada cocktail e extrai: nome, ingredientes (texto cru), método, garnish.
 * 4. Salva o resultado em src/data/raw-iba.json — receitas em INGLÊS, sem normalização.
 *
 * Próximo passo (manual ou via outro script):
 * - Mapear cada string de ingrediente para um ingredientId do catálogo em src/data/ingredients.ts.
 * - Traduzir os métodos para português.
 * - Adicionar entradas que faltarem em ingredients.ts conforme o scraper encontrar coisas novas.
 *
 * Uso: npm run scrape
 *
 * Cuidado: vamos fazer ~105 requests no site da IBA. Há um delay de 800ms entre páginas
 * para sermos educados. Isso leva ~90s ao todo.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "data", "raw-iba.json");

const BASE = "https://iba-world.com";
const CATEGORY_PAGES = [
  { url: `${BASE}/cocktails/the-unforgettables/`, category: "unforgettable" },
  { url: `${BASE}/cocktails/the-contemporary/`, category: "contemporary" },
  { url: `${BASE}/cocktails/the-new-era/`, category: "new-era" },
];

const DELAY_MS = 800;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 DrinkGuide personal scraper",
      "Accept": "text/html",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

// Extrai links para cocktails individuais a partir de uma página de categoria.
function extractCocktailLinks(html) {
  const $ = cheerio.load(html);
  const links = new Set();
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && /\/iba-cocktail\/[^/]+\/?$/.test(href)) {
      links.add(href.replace(/\/$/, "") + "/");
    }
  });
  return Array.from(links);
}

// Extrai os campos de uma página individual de cocktail.
// Estrutura observada (Negroni, Daiquiri, Penicillin): o conteúdo principal usa h4 tags
// para "Ingredients" / "Method" / "Garnish", seguidos de listas/parágrafos.
function parseCocktailPage(url, html, category) {
  const $ = cheerio.load(html);

  const name = $("h1").first().text().trim();
  const slug = url.replace(/.*\/iba-cocktail\/([^/]+)\/?/, "$1");

  const ingredients = [];
  let method = [];
  let garnish = null;

  // Estratégia: pegar o conteúdo após cada h4 até o próximo h4
  $("h4").each((_, h4) => {
    const label = $(h4).text().trim().toLowerCase();
    const nextElements = [];
    let node = $(h4).next();
    while (node.length && node[0].name !== "h4") {
      nextElements.push(node);
      node = node.next();
    }

    if (label.includes("ingredient")) {
      // Ingredients vêm como <ul><li>30 ml Gin</li>...</ul>
      for (const el of nextElements) {
        el.find("li").each((_, li) => {
          const text = $(li).text().trim();
          if (text) ingredients.push(text);
        });
      }
    } else if (label.includes("method")) {
      for (const el of nextElements) {
        const text = el.text().trim();
        if (text) {
          // Quebra por linha para preservar passos separados
          for (const line of text.split(/\n+/)) {
            const t = line.trim();
            if (t) method.push(t);
          }
        }
      }
    } else if (label.includes("garnish")) {
      const text = nextElements.map((el) => el.text().trim()).join(" ").trim();
      if (text && text.toLowerCase() !== "n/a") garnish = text;
    }
  });

  return {
    slug,
    name,
    category,
    ibaUrl: url,
    ingredientsRaw: ingredients, // strings cruas em inglês, para mapeamento posterior
    methodRaw: method,
    garnishRaw: garnish,
  };
}

async function main() {
  console.log("→ Buscando páginas de categoria…");

  const allLinks = [];
  for (const { url, category } of CATEGORY_PAGES) {
    console.log(`  ${url}`);
    const html = await fetchHtml(url);
    const links = extractCocktailLinks(html);
    console.log(`    ${links.length} cocktails encontrados`);
    for (const link of links) {
      allLinks.push({ url: link, category });
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n→ Total: ${allLinks.length} cocktails a processar`);
  const results = [];
  let i = 0;
  for (const { url, category } of allLinks) {
    i++;
    try {
      const html = await fetchHtml(url);
      const parsed = parseCocktailPage(url, html, category);
      results.push(parsed);
      console.log(`  [${i}/${allLinks.length}] ${parsed.name}`);
    } catch (err) {
      console.error(`  [${i}/${allLinks.length}] ERRO em ${url}:`, err.message);
    }
    await sleep(DELAY_MS);
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n✓ Salvo em ${OUT_PATH}`);
  console.log(`  ${results.length} cocktails capturados`);
  console.log(`\nPróximo passo: mapear cada string de ingrediente para um ingredientId`);
  console.log(`do catálogo em src/data/ingredients.ts, e traduzir os métodos.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
