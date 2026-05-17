#!/usr/bin/env node
/**
 * Scraper de imagens dos cocktails da IBA.
 * Para cada cocktail no raw-iba.json, busca a página e extrai o og:image ou
 * primeiro <img> relevante. Salva o resultado em src/data/cocktail-images.json.
 *
 * Uso: node scripts/scrape-images.mjs
 */
import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_PATH = join(__dirname, "..", "src", "data", "raw-iba.json");
const OUT_PATH = join(__dirname, "..", "src", "data", "cocktail-images.json");

const DELAY_MS = 600;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 DrinkGuide personal scraper",
      "Accept": "text/html",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function extractImage(html, cocktailName) {
  // 1. Tenta og:image (mais confiável)
  const ogMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)
    || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
  if (ogMatch) return ogMatch[1];

  // 2. Busca img que contenha o slug do cocktail no src
  const slug = cocktailName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const imgRe = new RegExp(`<img[^>]+src="([^"]+${slug}[^"]*\\.(?:webp|jpg|png))"`, "i");
  const slugMatch = html.match(imgRe);
  if (slugMatch) return slugMatch[1];

  // 3. Busca primeira img que pareça foto de cocktail (wp-content/uploads)
  const wpMatch = html.match(/<img[^>]+src="(https:\/\/iba-world\.com\/wp-content\/uploads\/[^"]+\.(?:webp|jpg|png))"/i);
  if (wpMatch) return wpMatch[1];

  return null;
}

async function main() {
  const cocktails = JSON.parse(readFileSync(RAW_PATH, "utf-8"));
  console.log(`→ ${cocktails.length} cocktails para processar\n`);

  const images = {};
  let ok = 0, fail = 0;

  for (let i = 0; i < cocktails.length; i++) {
    const { name, ibaUrl } = cocktails[i];
    const id = ibaUrl.replace(/.*\/iba-cocktail\/([^/]+)\/?$/, "$1");
    try {
      const html = await fetchHtml(ibaUrl);
      const url = extractImage(html, name);
      if (url) {
        images[id] = url;
        console.log(`  [${i + 1}/${cocktails.length}] ✓ ${name}`);
        ok++;
      } else {
        console.log(`  [${i + 1}/${cocktails.length}] ⚠ sem imagem: ${name}`);
        fail++;
      }
    } catch (err) {
      console.log(`  [${i + 1}/${cocktails.length}] ✗ ${name}: ${err.message}`);
      fail++;
    }
    await sleep(DELAY_MS);
  }

  writeFileSync(OUT_PATH, JSON.stringify(images, null, 2), "utf-8");
  console.log(`\n✓ ${ok} imagens / ${fail} falhas → ${OUT_PATH}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
