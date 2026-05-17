#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SVG = readFileSync(join(__dirname, "../public/icon-source.svg"));
const OUT = (f) => join(__dirname, "../public", f);

await sharp(SVG).resize(192, 192).png().toFile(OUT("icon-192.png"));
console.log("✓ icon-192.png");

await sharp(SVG).resize(512, 512).png().toFile(OUT("icon-512.png"));
console.log("✓ icon-512.png");

// maskable: fundo sólido #0a0a0a atrás do SVG (que já tem 15% de padding interno)
await sharp(SVG)
  .resize(512, 512)
  .flatten({ background: "#0a0a0a" })
  .png()
  .toFile(OUT("icon-512-maskable.png"));
console.log("✓ icon-512-maskable.png");

console.log("\nTodos os ícones gerados em public/");
