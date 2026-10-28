# Migration report

## Reference conditions

- Browser: Chromium via Playwright
- Desktop: 1440 × 900
- Mobile: 390 × 844
- Locale: `en-US`
- Motion: normal
- Deterministic comparison seed: `plant=4242`

## Result

The original static build was migrated to a Vite React + TypeScript project. The canvas, scroll track, chapter interface, loader, gate, fallback, and controls are now explicit React components. No iframe, proxy, or `dangerouslySetInnerHTML` is used by the authored React source.

DOM metrics match the reference: 17 chapter buttons, 20 total controls after runtime initialization, 23,400 px desktop scroll height, 21,944 px mobile scroll height, and identical WebGL canvas dimensions at both tested viewports.

Gate and stationary frames match at roughly 95–100%. Mid-sequence raw pixel scores vary because camera easing, particles, weather, grain, and procedural animation continue advancing during capture. Manual diff inspection confirms the same scene, materials, chapter, composition, and responsive behavior; the remaining pixel movement is temporal rather than structural drift.

## Accessibility and states

- Entry works with pointer hold, touch, Space/Enter, or silent-mode button.
- PageUp/PageDown navigates the chapter timeline without changing the reference visual.
- The runtime rail retains native buttons with `aria-label` and `aria-current`; the reference stylesheet intentionally keeps the visual rail hidden.
- Loader exposes progressbar semantics.
- A WebGL2 fallback is present.
- Reduced-motion behavior remains supported by the renderer.

## Known boundary

The authorized rendering engine is retained as recovered JavaScript modules under `public/_/`. It is isolated from the maintainable React application rather than falsely represented as newly authored source. Media, configuration, page structure, and app lifecycle are maintained outside that layer.
