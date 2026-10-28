# Seed Lifecycle — React migration

An interactive WebGL story following a seed through 17 lifecycle chapters. The page shell is authored in React + TypeScript, built with Vite, and keeps the authorized WebGL renderer as an isolated runtime layer.

## Run locally

```bash
npm ci
npm run dev -- --host 127.0.0.1 --port 3140
```

Open `http://127.0.0.1:3140`. Enter by holding the seed, using Space/Enter, or choosing **Continue in silence**.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
BASE_URL=http://127.0.0.1:3140 npm test
npm run assets:verify
```

The browser test covers desktop and mobile, WebGL initialization, the entry gate, all 17 chapter controls, chapter navigation, full-page scrolling, CDN responses, and console errors.

## Architecture

- `src/components/experience/` contains semantic React markup for the canvas, chapter UI, loader, accessibility fallback, and entry gate.
- `src/runtime/loadSeedRuntime.ts` starts the renderer once and prevents React Strict Mode from double-initializing it.
- `src/config/chapters.ts` documents the complete narrative structure.
- `src/config/assets.json` is the checksum-verified immutable R2 release manifest.
- `public/_/` contains JavaScript-only recovered rendering modules. Media binaries do not live in the repository.
- `scripts/` contains R2 upload/verification, runtime URL patching, and interaction tests.

## Media and rights

The repository owner confirmed authorization to use and modify the design, fonts, textures, shaders, and source/reference material. Fonts and textures are served from the owner's Cloudflare R2 bucket. No third-party license is granted by this repository; anyone redistributing the template must confirm that their license covers those materials.

See [PROMPT.md](PROMPT.md) for the universal Claude/GPT/agent prompt, [AI_START_HERE.md](AI_START_HERE.md) for repository-specific operating rules, [docs/product-draft.md](docs/product-draft.md) for the marketplace form draft, and [docs/r2-assets.md](docs/r2-assets.md) for media details.
