# DrinkGuide

App pessoal de referência rápida para os 102 cocktails oficiais da IBA (International Bartenders Association). Next.js + PWA, instalável no celular.

## Stack

- **Next.js 15** com App Router
- **next-pwa** para o service worker e instalação como app nativo
- **TypeScript** estrito
- **Sem CSS framework** — CSS variables e dark theme próprio (vibe de bar à noite)
- Deploy: **Vercel**

## Setup

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Arquitetura

### Schema de dados

A base de dados é estática, compilada no build (não há fetch em runtime). Dois arquivos:

- **`src/data/ingredients.ts`** — catálogo canônico de ingredientes. Cada ingrediente único tem um `id` em inglês (estável), um `displayName` em português (mostrado na UI), uma `category`, e `aliases` (strings em inglês que o scraper bate para mapear ao catálogo).

- **`src/data/cocktails.ts`** — receitas. Cada cocktail referencia ingredientes pelo `id` (nunca por string solta) — isso é o que permite a busca reversa funcionar.

Os tipos vivem em **`src/lib/types.ts`**.

### As 4 abas

1. **Categorias** (`CategoriesTab`) — agrupa cocktails por Unforgettable / Contemporary / New Era.
2. **Por nome** (`ByNameTab`) — input de busca com filtro instantâneo.
3. **Por ingrediente** (`ByIngredientTab`) — navegação em 2 níveis. Lista de ingredientes agrupada por tipo (destilados, licores, sucos…). Toca → mostra cocktails que usam.
4. **Minha despensa** (`PantryTab`) — checkbox de ingredientes (persistido em `localStorage`). Botão "ver o que dá pra fazer" → resultado em 3 níveis: tem tudo / falta 1 / falta 2. Guarnições e ingredientes básicos (água, açúcar) não contam como faltantes.

O motor de matching vive em **`src/lib/matching.ts`**.

### PWA

Configurado em `next.config.js` via `next-pwa`. O service worker é gerado automaticamente. Para instalar no iPhone: Safari → compartilhar → adicionar à tela inicial.

Ícones faltando em `public/`: `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`. Gere-os a partir de um logo (ex: usando PWA Asset Generator ou o Image Generator do Vercel).

## Estado atual

Apenas **4 cocktails** populados na base como amostra: Negroni, Daiquiri, Old Fashioned, Penicillin. Suficiente para validar o schema e ver o app rodando.

Faltam ~98 cocktails — popular usando o script abaixo.

## Próximo passo: popular o resto dos 102 cocktails

```bash
npm run scrape
```

Este script (`scripts/scrape-iba.mjs`):

1. Visita as 3 páginas de categoria do site da IBA.
2. Extrai os links para cada cocktail individual (~102 links).
3. Visita cada página e captura: nome, ingredientes (texto cru), método, garnish.
4. Salva tudo em `src/data/raw-iba.json` em inglês, sem normalização.

**Depois disso** (passo manual ou via Claude Code):

1. Para cada string de ingrediente em `raw-iba.json` que não tem alias no catálogo, adicionar ao `src/data/ingredients.ts` (com `id`, `displayName` PT, `category`, e `aliases` cobrindo a forma da IBA).
2. Para cada cocktail, criar a entrada em `src/data/cocktails.ts` referenciando os IDs do catálogo e traduzindo `method` e `garnish` para português.

**Prompt sugerido pro Claude Code:**

> Leia `src/data/raw-iba.json`. Para cada cocktail:
> - Adicione qualquer ingrediente faltante em `src/data/ingredients.ts` (categoria correta, aliases que batem com o nome do raw, displayName em PT-BR).
> - Adicione a entrada do cocktail em `src/data/cocktails.ts` referenciando os IDs do catálogo, com `method` e `garnish` traduzidos para português brasileiro.
> - Mantenha o estilo dos cocktails que já estão lá (Negroni, Daiquiri…) como referência.
> Não duplique ingredientes — reuse o que já existe sempre que possível.

## Decisões de design

- **Português completo** na UI, mas mantemos os nomes dos cocktails em inglês (Negroni, Daiquiri, etc. são internacionais; traduzir confunde).
- **Modifiers ficam separados do ingredient base**: "Islay single malt" tem `ingredientId: islay-single-malt` (que é considerado diferente de blended scotch para fins de matching, porque clinicamente é). Mas "White Cuban Rum" e "Light Rum" mapeiam para o mesmo `white-rum` via aliases — para a despensa, são intercambiáveis.
- **Guarnições e básicos não contam no matching**: água, açúcar, fatia de laranja não vão fazer ninguém deixar de fazer um drink. A regra está em `ASSUMED_AVAILABLE` em `src/lib/matching.ts`.
- **Persistência em localStorage**: a despensa sobrevive entre sessões. Sem backend, sem auth — uso pessoal, dispositivo dele.
